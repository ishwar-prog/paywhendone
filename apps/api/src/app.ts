import { randomUUID } from 'node:crypto';
import express from 'express';
import { pinoHttp } from 'pino-http';
import type { Logger } from 'pino';
import { createErrorHandler, notFoundHandler } from './middleware/error-handler.js';
import { healthRouter } from './routes/health.js';

interface AppDependencies {
  logger: Logger;
}

/**
 * Builds the Express app without starting a server.
 * Keeping this separate from server.ts lets tests use the app without opening a network port.
 */
export function createApp({ logger }: AppDependencies) {
  const app = express();

  app.disable('x-powered-by');

  // Logs one line per request and gives each request a unique id.
  app.use(
    pinoHttp({
      logger,
      genReqId: () => randomUUID(),
      customLogLevel: (_req, res, err) => {
        if (err || res.statusCode >= 500) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
      },
    }),
  );

  // Send the request id back so a user can quote it when reporting a problem.
  app.use((req, res, next) => {
    res.setHeader('X-Request-Id', String(req.id));
    next();
  });

  app.use(express.json({ limit: '100kb' }));

  app.use('/health', healthRouter);

  // These two must stay last: a 404 for unmatched routes, then the catch-all error handler.
  app.use(notFoundHandler);
  app.use(createErrorHandler(logger));

  return app;
}
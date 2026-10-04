import { pino, type Logger } from 'pino';
import type { Config } from './config.js';

export function createLogger(config: Pick<Config, 'NODE_ENV' | 'LOG_LEVEL'>): Logger {
  return pino({
    level: config.LOG_LEVEL,
    // Never write credentials into logs.
    redact: {
      paths: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
      censor: '[redacted]',
    },
    // Human-friendly colored output in development; plain JSON everywhere else.
    ...(config.NODE_ENV === 'development' && {
      transport: { target: 'pino-pretty' },
    }),
  });
}
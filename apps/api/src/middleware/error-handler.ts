import type { ErrorRequestHandler, RequestHandler } from 'express';
import type { Logger } from 'pino';
import { AppError, NotFoundError } from '../errors.js';

interface ErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId?: string;
  };
}

/** Runs when no route matched the request. */
export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.path} not found`));
};

/** Turns any thrown error into a safe, consistent JSON response. */
function describe(err: unknown): {
  status: number;
  code: string;
  message: string;
  details?: unknown;
} {
  if (err instanceof AppError) {
    return { status: err.statusCode, code: err.code, message: err.message, details: err.details };
  }
  // Errors raised by Express's JSON body parser carry a `type` field.
  const type = (err as { type?: string } | null)?.type;
  if (type === 'entity.parse.failed') {
    return { status: 400, code: 'INVALID_JSON', message: 'Request body is not valid JSON' };
  }
  if (type === 'entity.too.large') {
    return { status: 413, code: 'PAYLOAD_TOO_LARGE', message: 'Request body is too large' };
  }
  return { status: 500, code: 'INTERNAL_ERROR', message: "Internal server error" };
}

export function createErrorHandler(logger: Logger): ErrorRequestHandler {
  // Express recognizes an error handler by its four parameters, so `_next` must stay
  // in the signature even though we never call it.
  return (err, req, res, _next) => {
    const { status, code, message, details } = describe(err);
    const requestId = req.id === undefined ? undefined : String(req.id);

    if (status >= 500) {
      // Unexpected: log everything (including the stack) for us, reveal nothing to the client.
      logger.error({ err, requestId }, 'Unhandled error');
    }

    const body: ErrorBody = { error: { code, message, details, requestId } };
    res.status(status).json(body);
  };
}
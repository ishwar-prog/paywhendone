import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { NotFoundError, ValidationError } from '../src/errors.js';
import { createErrorHandler } from '../src/middleware/error-handler.js';
import { silentLogger } from './helpers.js';

describe('error responses through the real app', () => {
  const app = createApp({ logger: silentLogger });

  it('returns a JSON 404 for an unknown route', async () => {
    const res = await request(app).get('/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
    expect(res.body.error.message).toBe('Route GET /nope not found');
    expect(res.body.error.requestId).toBe(res.headers['x-request-id']);
  });

  it('returns 400 INVALID_JSON for a malformed JSON body', async () => {
    const res = await request(app)
      .post('/health')
      .set('Content-Type', 'application/json')
      .send('{"broken":');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('INVALID_JSON');
  });

  it('returns 413 for a body over the size limit', async () => {
    const res = await request(app)
      .post('/health')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ data: 'x'.repeat(200_000) }));
    expect(res.status).toBe(413);
    expect(res.body.error.code).toBe('PAYLOAD_TOO_LARGE');
  });
});

describe('error handler in isolation', () => {
  // A tiny app whose routes throw on purpose, wired to the real error handler.
  const app = express();
  app.get('/known', () => {
    throw new ValidationError('Amount must be positive', { field: 'amount' });
  });
  app.get('/missing', () => {
    throw new NotFoundError('Contract not found');
  });
  app.get('/boom', () => {
    throw new Error('database password is hunter2');
  });
  app.get('/async-boom', async () => {
    throw new Error('async failure with secret detail');
  });
  app.use(createErrorHandler(silentLogger));

  it('maps an AppError to its own status, code and details', async () => {
    const res = await request(app).get('/known');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatchObject({
      code: 'VALIDATION_ERROR',
      message: 'Amount must be positive',
      details: { field: 'amount' },
    });
  });

  it('maps NotFoundError to 404', async () => {
    const res = await request(app).get('/missing');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('hides the details of an unexpected error', async () => {
    const res = await request(app).get('/boom');
    expect(res.status).toBe(500);
    expect(res.body.error.code).toBe('INTERNAL_ERROR');
    expect(res.body.error.message).toBe('Internal server error');
    expect(JSON.stringify(res.body)).not.toContain('hunter2');
  });

  it('also catches errors thrown inside async handlers (Express 5)', async () => {
    const res = await request(app).get('/async-boom');
    expect(res.status).toBe(500);
    expect(JSON.stringify(res.body)).not.toContain('secret');
  });
});
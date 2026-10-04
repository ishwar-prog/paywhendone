import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { silentLogger } from './helpers.js';

const app = createApp({ logger: silentLogger });

describe('GET /health', () => {
  it('returns 200 and a status of ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('includes a unique request id header on every response', async () => {
    const first = await request(app).get('/health');
    const second = await request(app).get('/health');
    expect(first.headers['x-request-id']).toMatch(/^[0-9a-f-]{36}$/);
    expect(first.headers['x-request-id']).not.toBe(second.headers['x-request-id']);
  });

  it('does not reveal the framework in headers', async () => {
    const res = await request(app).get('/health');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
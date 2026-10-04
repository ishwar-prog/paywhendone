import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config.js';

describe('loadConfig', () => {
  it('applies defaults when nothing is set', () => {
    expect(loadConfig({})).toEqual({ NODE_ENV: 'development', PORT: 3000, LOG_LEVEL: 'info' });
  });

  it('converts PORT from a string to a number', () => {
    expect(loadConfig({ PORT: '4000' }).PORT).toBe(4000);
  });

  it('rejects an invalid PORT with a readable message', () => {
    expect(() => loadConfig({ PORT: 'abc' })).toThrow(/PORT/);
    expect(() => loadConfig({ PORT: '70000' })).toThrow(/PORT/);
  });

  it('rejects an unknown NODE_ENV', () => {
    expect(() => loadConfig({ NODE_ENV: 'staging' })).toThrow(/NODE_ENV/);
  });
});
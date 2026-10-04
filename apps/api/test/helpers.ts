import { pino } from 'pino';

/** A logger that prints nothing, so test output stays clean. */
export const silentLogger = pino({ level: 'silent' });
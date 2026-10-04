import { Router } from 'express';

export const healthRouter = Router();

// Liveness check: "is the process up and able to answer?"
healthRouter.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});
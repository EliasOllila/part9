import express, { type Response } from 'express';
import diagnosisService from '../services/diagnoseService.ts';
import type { Diagnosis } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnosisService.getDiagnoses());
});

export default router;
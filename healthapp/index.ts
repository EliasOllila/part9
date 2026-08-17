import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const bmiResult = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi: bmiResult
  });
});
interface ExerciseRequestBody {
  daily_exercises: unknown;
  target: unknown;
}

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseRequestBody;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  const isTargetValidNumber = typeof target === 'number' && !isNaN(target);
  const areDaysValidNumbers = Array.isArray(daily_exercises) && 
    daily_exercises.length > 0 &&
    daily_exercises.every(item => typeof item === 'number' && !isNaN(item));

  if (!isTargetValidNumber || !areDaysValidNumbers) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercises(daily_exercises as number[], Number(target));
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
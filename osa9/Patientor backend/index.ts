import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());

import { Request, Response, NextFunction } from 'express';

const jsonErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({ error: 'Invalid JSON' });
  } else {
    next();
  }
};

app.use(jsonErrorHandler);

import diagnosisRouter from "./routes/diagnoses"; 
app.use('/api/diagnoses', diagnosisRouter);

import patientsRouter from "./routes/patients"; 
app.use('/api/patients', patientsRouter);

app.get("/api/ping", (_req, res) => {
  res.send("PONG");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
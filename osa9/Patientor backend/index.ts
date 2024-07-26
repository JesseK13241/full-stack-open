import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());

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
import express from 'express';
import getPatients from "../services/patients";

const router = express.Router();

router.get('/', (_req, res) => {
  const data = getPatients();
  res.json(data);
});

export default router;
import express from 'express';
import { getPatientsWithoutSSN, addNewPatientIfValid } from "../services/patients";

const router = express.Router();

router.get('/', (_req, res) => {
  const data = getPatientsWithoutSSN();
  res.json(data);
});

router.post("/", (req, res) => {
  const result = addNewPatientIfValid(req.body);
  if ("id" in result) {
    return res.status(200).json({
      success: true,
      message: 'New patient created',
      data: result
    });
  } else {
    return res.status(400).json({
      success: false,
      errors: result.errors
    });
  }
});

export default router;
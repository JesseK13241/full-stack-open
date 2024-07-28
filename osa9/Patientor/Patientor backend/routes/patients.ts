import express from 'express';
import { getPatientsWithoutSSN, addNewPatientIfValid, getPatientByID } from "../services/patients";

const router = express.Router();

router.get('/', (_req, res) => {
  const data = getPatientsWithoutSSN();
  res.json(data);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = getPatientByID(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(400).send("Patient not found");
  }
  
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
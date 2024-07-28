import patients from "../data/patients";
import { v1 as uuidv1 } from "uuid";
import {
  Patient,
  Gender,
  PatientWithoutSSN,
  NewPatient,
  ValidationResult
} from "../types";

export const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export const getPatientByID = (id: string): Patient | undefined => {
  const result = patients.find(patient => patient.id === id);
  if (result) {
    return result;
  } else {
    return undefined;
  }
};

const validateNewPatientWithErrors = (data: unknown): ValidationResult => {
  const errors: string[] = [];

  if (typeof data !== "object" || data === null) {
    errors.push("Invalid data format");
    return { isValid: false, errors };
  }

  const isValidString = (value: unknown): value is string => {
    return (
      (typeof value === "string" || value instanceof String) &&
      value.trim().length > 0
    );
  };

  const isValidName = (value: unknown): value is string => {
    return isValidString(value);
  };

  const isValidDateOfBirth = (value: unknown): value is string => {
    return isValidString(value);
  };

  const isValidSSN = (value: unknown): value is string => {
    return isValidString(value);
  };

  const isValidGender = (value: unknown): value is string => {
    return isValidString(value) && Object.values(Gender).includes(value as Gender);
  };

  const isValidOccupation = (value: unknown): value is string => {
    return isValidString(value);
  };

  const validationRules = {
    name: isValidName,
    dateOfBirth: isValidDateOfBirth,
    ssn: isValidSSN,
    gender: isValidGender,
    occupation: isValidOccupation
  };

  Object.entries(validationRules).forEach(([key, validateField]) => {
    const value = (data as Record<string, unknown>)[key];
    if (!validateField(value)) {
      errors.push(`Invalid or missing ${key}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const addNewPatientIfValid = (
  input: unknown
): Patient | ValidationResult => {
  const validationResult = validateNewPatientWithErrors(input);
  if (validationResult.isValid) {
    const newId: string = uuidv1();
    const newPatient: Patient = {
      ...(input as NewPatient),
      id: newId
    };
    patients.push(newPatient);
    return newPatient;
  } else {
    return validationResult;
  }
};

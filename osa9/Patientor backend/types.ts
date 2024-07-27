export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export enum Gender {
  "male",
  "female",
  "other"
}

export type PatientWithoutSSN = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type ValidationResult = { isValid: boolean; errors: string[] };

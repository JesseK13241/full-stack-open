export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[]
};

export enum Gender {
  "male",
  "female",
  "other"
}

export type PatientWithoutSSN = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;

export type ValidationResult = { isValid: boolean; errors: string[] };

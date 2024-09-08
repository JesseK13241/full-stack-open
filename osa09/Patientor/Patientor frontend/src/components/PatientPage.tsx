import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";
import EntryComponent from "./EntryComponent";

const PatientPage = ({diagnoses}: {diagnoses: Diagnosis[]}) => {
  const id = useParams().id;

  const [detailedPatientData, setDetailedPatientData] = useState<Patient>();

  useEffect(() => {
    if (id) {
      const fetchPatientList = async () => {
        const patient = await patientService.getPatient(id);
        setDetailedPatientData(patient);
      };
      void fetchPatientList();
    }
  }, [id]);

  if (detailedPatientData) {
    return (
      <div>
        <h2>{detailedPatientData.name}</h2>
        <p>Date of birth: {detailedPatientData.dateOfBirth}</p>
        <p>gender: {detailedPatientData.gender}</p>
        <p>ssn: {detailedPatientData.ssn}</p>
        <p>Occupation: {detailedPatientData.occupation}</p>
        <h3>Entires:</h3>
        {detailedPatientData.entries.map(entry => <EntryComponent key={entry.id} entry={entry} diagnoses={diagnoses}/>)}
      </div>
    );
  } else {
    return <h2>Patient not found</h2>;
  }
};

export default PatientPage;

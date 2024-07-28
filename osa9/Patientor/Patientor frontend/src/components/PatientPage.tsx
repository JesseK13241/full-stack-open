import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient } from "../types";
import patientService from "../services/patients";

const PatientPage = () => {
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
      </div>
    );
  } else {
    return <h2>Patient not found</h2>;
  }
};

export default PatientPage;

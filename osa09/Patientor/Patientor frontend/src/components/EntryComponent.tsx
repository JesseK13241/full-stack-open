import { Entry, Diagnosis } from "../types";

const EntryComponent = ({
  entry,
  diagnoses
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <>
      <div>{entry.date} - {entry.description}</div>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map(code => {
            const diagnosis = diagnoses.find(d => d.code === code);
            return (
              <li key={code}>
                {code} - {diagnosis?.name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default EntryComponent;

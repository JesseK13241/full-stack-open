import { Entry } from "../types";

const EntryComponent = ({ entry }: { entry: Entry }) => {
  return (
    <>
      {entry.date} {entry.description}
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map(code => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default EntryComponent;

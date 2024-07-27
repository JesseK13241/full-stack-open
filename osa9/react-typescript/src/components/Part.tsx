import { CoursePart } from "../types";

const BasicDetails = ({ part }: { part: CoursePart }) => {
  return (
    <h4>
      {part.name} {part.exerciseCount}
    </h4>
  );
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <BasicDetails part={part}/>
          <p>{part.description}</p>
        </> 
      );
    case "group":
      return (
        <>
          <BasicDetails part={part}/>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    case "background":
      return (
        <>
          <BasicDetails part={part}/>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </>
      );
    case "special":
      return (
        <>
          <BasicDetails part={part}/>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(",")}</p>
        </>
      )
    default:
      return assertNever(part);
  }
};

export default Part;

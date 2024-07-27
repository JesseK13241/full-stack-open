import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => (
  <> 
    {parts.map((part, index) => (
      <div key={index}>
        <Part part={part} />
      </div>
    ))}
  </>
);

export default Content;

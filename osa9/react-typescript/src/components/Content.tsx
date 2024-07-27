interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Part[];
}

const Content = (props: ContentProps) => (
  <>
    {props.parts.map((part, index) => (
      <p key={index}>
        {part.name} {part.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;

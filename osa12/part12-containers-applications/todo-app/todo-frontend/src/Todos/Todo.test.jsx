import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders todo", () => {
  const todo = {
    text: "Hello world",
    done: false
  };

  render(<Todo todo={todo} />);

  const element = screen.getByText("Hello world");
  expect(element).toBeDefined();
});

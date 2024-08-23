/* eslint-disable react/prop-types */
import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Todo
            todo={todo}
            onDelete={() => deleteTodo(todo)}
            onComplete={() => completeTodo(todo)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

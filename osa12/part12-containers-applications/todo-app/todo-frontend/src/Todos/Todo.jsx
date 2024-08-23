/* eslint-disable react/prop-types */
// src/Todos/Todo.jsx

const Todo = ({ todo, onDelete, onComplete }) => {
  const handleDelete = () => onDelete(todo);
  const handleComplete = () => onComplete(todo);

  return (
    <div>
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleComplete}>Complete</button>
    </div>
  );
};

export default Todo;
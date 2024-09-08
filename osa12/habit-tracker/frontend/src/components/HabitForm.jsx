/* eslint-disable react/prop-types */
import { useState } from "react";

const HabitForm = ({ onAddHabit }) => {
  const [habitName, setHabitName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (habitName.trim()) {
      onAddHabit(habitName.trim());
      setHabitName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={habitName}
        onChange={e => setHabitName(e.target.value)}
        placeholder="Enter new habit"
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;

import { useEffect, useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitGrid from "./components/HabitGrid";

const API_URL = "http://localhost:3000/api";

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch(`${API_URL}/habits`);
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  const addHabit = async name => {
    try {
      const response = await fetch(`${API_URL}/habits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      const newHabit = await response.json();
      setHabits([...habits, newHabit]);
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  const toggleHabitCompletion = async (habitId, date) => {
    try {
      console.log("toggleHabitCompletion", habitId, date);
      const habit = habits.find(h => h.id === habitId);
      const isCompleted = habit.completion_dates.includes(date);
      const method = isCompleted ? "DELETE" : "POST";

      const response = await fetch(`${API_URL}/habits/${habitId}/complete`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date })
      });

      const updatedHabit = await response.json();
      setHabits(habits.map(h => (h.id === habitId ? updatedHabit : h)));
    } catch (error) {
      console.error("Error toggling habit completion:", error);
    }
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <HabitForm onAddHabit={addHabit} />
      <HabitGrid
        habits={habits}
        onToggleCompletion={toggleHabitCompletion}
      />
    </div>
  );
}

export default App;

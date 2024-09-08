/* eslint-disable react/prop-types */

const HabitGrid = ({ habits, onToggleCompletion }) => {
  const today = new Date();
  const last7Days = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  }).reverse();

  const isCompleted = (habit, date) => {
    const result = habit.completion_dates.includes(date + "T00:00:00.000Z");
    return result;
  };

  const sortedHabits = habits.slice().sort((a, b) => a.id < b.id).reverse();

  return (
    <div className="habit-grid">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            {sortedHabits.map(habit => (
              <th key={habit.id}>{habit.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {last7Days.map(date => (
            <tr key={date}>
              <td>
                {date === today.toISOString().split("T")[0] ? "Today" : date}
              </td>
              {sortedHabits.map(habit => (
                <td key={`${habit.id}-${date}`}>
                  <input
                    type="checkbox"
                    checked={isCompleted(habit, date)}
                    onChange={() => onToggleCompletion(habit.id, date)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitGrid;

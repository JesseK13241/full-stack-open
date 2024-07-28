import { useState, useEffect } from "react";
import { getAll } from "./services/diary";
import { Diary } from "./types";
import { DiaryEntry } from "./components/DiaryEntry";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const existingDiaries = await getAll();
      setDiaries(existingDiaries);
    };
    void fetchDiaries();
  }, []);

  return (
    <div className="App">
      <h3>Diary entries</h3>
      {diaries.map(diary => (
        <DiaryEntry
          key={diary.id}
          diary={diary}
        />
      ))}
    </div>
  );
};

export default App;

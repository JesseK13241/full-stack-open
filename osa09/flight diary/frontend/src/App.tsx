import { useState, useEffect } from "react";
import axios from "axios";
import { getAll, createNew } from "./services/diary";
import { NewDiary, Diary } from "./types";
import { DiaryEntry } from "./components/DiaryEntry";
import { DiaryForm } from "./components/DiaryForm";
import Notify from "./components/Notify";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const fetchDiaries = async () => {
      const existingDiaries = await getAll();
      setDiaries(existingDiaries);
    };
    fetchDiaries();
  }, []);

  const handleNewDiary = async (diary: NewDiary) => {
    try {
      const newDiary = await createNew(diary);
      setDiaries(diaries.concat(newDiary));
      setNotificationMessage("New diary entry added!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setNotificationMessage(error.response.data);
      } else {
        console.error(error)
      }
    }
  };

  return (
    <div className="App">
      <h3>Add new entry</h3>
      <Notify errorMessage={notificationMessage} />
      <DiaryForm handleNewDiary={handleNewDiary} />
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

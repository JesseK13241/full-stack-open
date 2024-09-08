import { Diary } from "../types";

export const DiaryEntry = ({diary}: {diary: Diary}) => {
  return (
    <>
      <h4>{diary.date}</h4>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </>
  );
};

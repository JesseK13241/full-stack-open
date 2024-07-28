import React, { useState } from "react";
import { NewDiary } from "../types";

const useField = (type: string) => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    htmlFields: {
      type,
      value,
      onChange
    },
    reset: () => setValue("")
  };
};

interface DiaryFormProps {
  handleNewDiary: (diary: NewDiary) => void;
}

export const DiaryForm: React.FC<DiaryFormProps> = ({ handleNewDiary }) => {
  const dateInput = useField("text");
  const visibilityInput = useField("text");
  const weatherInput = useField("text");
  const commentInput = useField("text");

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    await handleNewDiary({
      date: dateInput.htmlFields.value,
      visibility: visibilityInput.htmlFields.value,
      weather: weatherInput.htmlFields.value,
      comment: commentInput.htmlFields.value
    });
    dateInput.reset(),
    visibilityInput.reset(),
    weatherInput.reset(),
    commentInput.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Date <input {...dateInput.htmlFields} /> </div>
        <div>Visibility <input {...visibilityInput.htmlFields} /> </div>
        <div>Weather <input {...weatherInput.htmlFields} /> </div>
        <div>Comment <input {...commentInput.htmlFields} /> </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

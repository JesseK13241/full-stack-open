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
  const dateInput = useField("date");
  const commentInput = useField("text");

  const [weatherValue, setWeatherValue] = useState('');
  const [visibilityValue, setvisibilityValue] = useState('');

  const handlevisibilityValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvisibilityValue(event.target.value);
  };

  const handleweatherValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeatherValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    await handleNewDiary({
      date: dateInput.htmlFields.value,
      visibility: visibilityValue,
      weather: weatherValue,
      comment: commentInput.htmlFields.value
    });
    dateInput.reset(),
    commentInput.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Date <input {...dateInput.htmlFields} /> </div>

        <div onChange={handlevisibilityValueChange.bind(this)}>
          Visibility 
          <input type="radio" name="visibility" value="great" /> great 
          <input type="radio" name="visibility" value="good" /> good 
          <input type="radio" name="visibility" value="ok" /> ok
          <input type="radio" name="visibility" value="poor" /> poor 
        </div>

        <div onChange={handleweatherValueChange.bind(this)}>
          Visibility 
          <input type="radio" name="weather" value="sunny" /> sunny 
          <input type="radio" name="weather" value="rainy" /> rainy 
          <input type="radio" name="weather" value="cloudy" /> cloudy 
          <input type="radio" name="weather" value="stormy" /> stormy 
          <input type="radio" name="weather" value="windy" /> windy 
        </div>
        
        <div>Comment <input {...commentInput.htmlFields} /> </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

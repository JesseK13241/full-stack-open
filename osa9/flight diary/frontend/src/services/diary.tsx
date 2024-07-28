import axios from "axios";
import { Diary, NewDiary } from "../types";

const API_URL = "http://localhost:3000/api/diaries";

export const getAll = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(API_URL);
  return response.data;
};

export const createNew = async (diary: NewDiary): Promise<Diary> => {
  const response = await axios.post<Diary>(API_URL, diary);
  return response.data;
};

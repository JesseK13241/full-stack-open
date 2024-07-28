import axios from "axios";

const API_URL = "http://localhost:3000/api/diaries";

export const getAll = async () => {
  const results = await axios.get(API_URL);
  return results.data;
};

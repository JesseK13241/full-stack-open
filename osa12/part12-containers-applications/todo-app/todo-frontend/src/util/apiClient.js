import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL || '/api';

const apiClient = axios.create({
  baseURL: baseURL,
})

export default apiClient
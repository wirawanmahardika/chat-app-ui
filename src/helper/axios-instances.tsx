import axios from "axios";

export const MyAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

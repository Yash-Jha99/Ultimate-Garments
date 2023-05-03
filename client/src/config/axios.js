import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "access-token": import.meta.env.VITE_API_KEY,
  },
  withCredentials: true
});

export default axiosInstance;

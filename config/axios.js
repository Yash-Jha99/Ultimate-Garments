import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "access-token": process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default axiosInstance;

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL ||  process.env.SERVER_URL;

const axiosInstance = axios.create({
  baseURL
})

export default axiosInstance;

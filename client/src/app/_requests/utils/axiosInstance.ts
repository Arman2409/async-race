import axios from "axios";

import { SERVER_URL } from "../../_configs/global";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
})

export default axiosInstance;

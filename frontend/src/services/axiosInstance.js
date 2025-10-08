import axios from "axios";
import { showToast } from "../utils/showToast";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    showToast("error", "ERR_NETWORK");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      showToast("error", "ERR_NETWORK");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

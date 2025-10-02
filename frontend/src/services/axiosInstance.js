import axios from "axios";
import { showToast } from "../utils/showToast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.url}`);
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
    const status = error.response?.status;
    
    if (error.response?.data?.messages) {
      const errorMessages = error.response.data.messages;
      if (errorMessages.length > 0) {
        const firstError = errorMessages[0];
        showToast(firstError.type, firstError.code);
      }
    } else {
      if (status >= 500) {
        showToast("error", "ERR_SERVER");
      } else if (status === 404) {
        showToast("error", "ERR_URL_CHECK_FAILED");
      } else if (status === 400) {
        showToast("error", "ERR_INVALID_URL");
      } else if (error.code === "NETWORK_ERROR" || error.code === "ECONNREFUSED") {
        showToast("error", "ERR_NETWORK");
      } else {
        showToast("error", "ERR_URL_CHECK_FAILED");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
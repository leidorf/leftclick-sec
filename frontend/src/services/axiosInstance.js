import axios from "axios";
import { showToast } from "../utils/showToast";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    showToast("error", "ERR_NETWORK");
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.detail || error.message;

    if (status >= 500) {
      showToast("error", "ERR_SERVER");
    } else if (status === 404) {
      showToast("error", "URL_CHECK_FAILED");
    } else if (status === 400) {
      showToast("error", "ERR_INVALID_URL");
    } else if (
      error.code === "NETWORK_ERROR" ||
      error.code === "ECONNREFUSED"
    ) {
      showToast("error", "ERR_NETWORK");
    } else {
      showToast("error", message || "ERR_URL_CHECK_FAILED");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

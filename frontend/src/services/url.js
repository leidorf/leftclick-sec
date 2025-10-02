import axiosInstance from "./axiosInstance";

export const urlService = {
  checkURL: async (url) => {
    try {
      const response = await axiosInstance.post("/check", { url });
      return response;
    } catch (error) {
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new Error("Network error - no response received");
      } else {
        throw new Error("Request setup error: " + error.message);
      }
    }
  },
};

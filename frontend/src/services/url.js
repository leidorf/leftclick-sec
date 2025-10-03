import axiosInstance from "./axiosInstance";

export const urlService = {
  checkURL: async (url) => {
    try {
      const response = await axiosInstance.post("/check", { url });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

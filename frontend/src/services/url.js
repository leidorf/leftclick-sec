import { endpoints } from "../config/config";
import axiosInstance from "./axiosInstance";

export const ctfService = {
  getCtfs: async () => {
    try {
      return await axiosInstance.get(endpoints.private.getCtfs);
    } catch (error) {
      throw error;
    }
  },
  getCtf: async (id) => {
    try {
      return await axiosInstance.get(`${endpoints.private.getCtf}/${id}`);
    } catch (error) {
      throw error;
    }
  },
  downloadCtf: async (id) => {
    try {
      return await axiosInstance.get(`${endpoints.private.downloadCtf}/${id}`, {
        responseType: "blob",
      });
    } catch (error) {
      throw error;
    }
  },
  checkFlag: async (flag, id) => {
    try {
      return await axiosInstance.post(`${endpoints.private.checkFlag}/${id}`, { flag });
    } catch (error) {
      throw error;
    }
  },
};

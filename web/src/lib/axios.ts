import config from "@/config/config";
import axios from "axios";
import { toast } from "sonner";

// Create instance
const api = axios.create({
  baseURL: config.api_url,
  withCredentials: true,
});

api.interceptors.request.use(
  (req) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
    return req;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      toast.error("Unauthorized");
    }
    return Promise.reject(err);
  }
);

export default api;

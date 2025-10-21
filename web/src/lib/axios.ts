import config from "@/config/config";
import axios from "axios";

const api = axios.create({
  baseURL: config.api_url,
  withCredentials: true,
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://crlk.onrender.com/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// No refresh handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "https://crmadmin-blush.vercel.app/";
    }
    return Promise.reject(error);
  }
);

export default api;

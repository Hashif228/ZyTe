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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");
        const res = await axios.post("https://crlk.onrender.com/api/token/refresh/", {
          refresh,
        });

        localStorage.setItem("access_token", res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        return api(originalRequest);
      } catch (err) {
        console.log(err);
    
        localStorage.clear();
        window.location.href = "https://crmadmin-blush.vercel.app/";

      }
    }
    return Promise.reject(error);
  }
);

export default api;

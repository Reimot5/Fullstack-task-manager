import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses by attempting refresh
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          "http://localhost:4000/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh also failed, logout user
        useAuthStore.getState().setAccessToken(null);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;

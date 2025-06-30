import { useAuthStore } from "../store/authStore";
import API from "../lib/api";

export const useAuth = () => {
  const { accessToken, setAccessToken } = useAuthStore();

  const login = async (email: string, password: string) => {
    const res = await API.post("/auth/login", { email, password });
    setAccessToken(res.data.accessToken);
  };

  const register = async (email: string, password: string) => {
    await API.post("/auth/register", { email, password });
  };

  const refresh = async () => {
    const res = await API.post("/auth/refresh-token");
    setAccessToken(res.data.accessToken);
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setAccessToken(null);
  };

  return { accessToken, login, register, refresh, logout };
};

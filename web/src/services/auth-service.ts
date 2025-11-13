import { LoginData, SignUpData } from "@/types/authTypes";
import api from "@/lib/axios";

export const setToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

export const isAuthenticated = () => !!getToken();
export const logout = () => {
    removeToken();
    window.location.href = "/";
};

export const signUp = async (data: SignUpData) => {
    const res = await api.post("/auth/register", data, {
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
};

export const login = async (data: LoginData) => {
    const res = await api.post("/auth/login", data, {
        headers: { "Content-Type": "application/json" },
    });

    return res.data;
};

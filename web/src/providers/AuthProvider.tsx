"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken, removeToken } from "@/services/auth-service";
import { User } from "@/types/authTypes.js";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = getToken();
        if (token) {
            try {
                const decoded = jwtDecode<User>(token);
                // check if token expired
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    removeToken();
                } else {
                    setUser(decoded);
                }
            } catch (err) {
                console.error("Invalid token", err);
                removeToken();
            }
        }
    }, []);

    const logout = () => {
        removeToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

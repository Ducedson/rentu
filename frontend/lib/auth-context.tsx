"use client";

import React, { createContext, useContext, useState } from "react";
import { getAdminToken, setAdminToken, clearAdminToken } from "./admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const token = getAdminToken();
  if (!token) {
    return null;
  }

  setAdminToken(token);

  try {
    const userStr = localStorage.getItem("admin_user");
    return userStr ? (JSON.parse(userStr) as User) : null;
  } catch {
    clearAdminToken();
    localStorage.removeItem("admin_user");
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const isLoading = false;

  const login = (userData: User, token: string) => {
    setAdminToken(token);
    localStorage.setItem("admin_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    clearAdminToken();
    localStorage.removeItem("admin_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

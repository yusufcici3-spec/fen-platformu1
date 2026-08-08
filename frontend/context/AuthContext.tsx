"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | "PARENT";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  classLevel: number | null;
  points?: number;
  currentStreak?: number;
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (user: AuthUser, accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "fen-platformu-oturum";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
        setAccessToken(parsed.accessToken);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  function login(nextUser: AuthUser, nextToken: string) {
    setUser(nextUser);
    setAccessToken(nextToken);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, accessToken: nextToken }));
  }

  function logout() {
    setUser(null);
    setAccessToken(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth, AuthProvider içinde kullanılmalı.");
  return ctx;
}

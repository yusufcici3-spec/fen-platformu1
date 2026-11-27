"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiFetch } from "@/lib/api";

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
    let active = true;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user ?? null);
        setAccessToken(parsed.accessToken ?? null);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    const handleTokenRefresh = (event: Event) => {
      const nextToken = (event as CustomEvent<{ accessToken: string }>).detail?.accessToken;
      if (nextToken) setAccessToken(nextToken);
    };
    window.addEventListener("fen-auth-token-refreshed", handleTokenRefresh);

    // Sayfa yeniden açıldığında oturum çerezinden yeni access token al.
    apiFetch<{ accessToken: string; user: AuthUser }>("/auth/yenile", { method: "POST" })
      .then((response) => {
        if (!active || !response.data) return;
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      })
      .catch(() => {
        // Refresh cookie yoksa mevcut access token süresi dolana kadar kullanılabilir.
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
      window.removeEventListener("fen-auth-token-refreshed", handleTokenRefresh);
    };
  }, []);

  function login(nextUser: AuthUser, nextToken: string) {
    setUser(nextUser);
    setAccessToken(nextToken);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, accessToken: nextToken }));
  }

  function logout() {
    // Sunucudaki HttpOnly oturum çerezlerini de temizle.
    void apiFetch("/auth/cikis", { method: "POST" }).catch(() => undefined);
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

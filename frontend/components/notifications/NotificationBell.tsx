"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { AppNotification } from "@/types/analysis";

export function NotificationBell() {
  const { accessToken } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  async function load() {
    if (!accessToken) return;
    const res = await apiFetch<{ notifications: AppNotification[]; unreadCount: number }>("/bildirimler", {
      token: accessToken,
    });
    setNotifications(res.data?.notifications ?? []);
    setUnreadCount(res.data?.unreadCount ?? 0);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000); // her 60 saniyede bir güncelle
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleOpen() {
    setIsOpen((v) => !v);
  }

  async function markAllRead() {
    if (!accessToken) return;
    await apiFetch("/bildirimler/tumunu-okundu-yap", { method: "POST", token: accessToken });
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }

  async function markOneRead(id: string) {
    if (!accessToken) return;
    await apiFetch(`/bildirimler/${id}/okundu`, { method: "POST", token: accessToken });
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
  }

  if (!accessToken) return null;

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={handleOpen}
        aria-label="Bildirimler"
        className="relative grid h-10 w-10 place-items-center rounded-full border border-lab-paperLine dark:border-white/10"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-reaction text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-card border border-lab-paperLine bg-white shadow-lg dark:border-white/10 dark:bg-lab-inkSoft">
          <div className="flex items-center justify-between border-b border-lab-paperLine/70 px-4 py-3 dark:border-white/10">
            <span className="text-sm font-semibold">Bildirimler</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs font-semibold text-beaker hover:underline">
                Tümünü okundu yap
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-sm text-lab-inkMuted dark:text-lab-paper/50">Henüz bildirim yok.</p>
            ) : (
              notifications.map((n) => {
                const content = (
                  <div
                    onClick={() => !n.isRead && markOneRead(n.id)}
                    className={`border-b border-lab-paperLine/50 px-4 py-3 text-sm last:border-0 dark:border-white/5 ${
                      !n.isRead ? "bg-beaker/5" : ""
                    }`}
                  >
                    <p className="font-medium">{n.title}</p>
                    <p className="mt-0.5 text-xs text-lab-inkMuted dark:text-lab-paper/60">{n.message}</p>
                    <p className="mt-1 text-[10px] text-lab-inkMuted dark:text-lab-paper/40">
                      {new Date(n.createdAt).toLocaleString("tr-TR")}
                    </p>
                  </div>
                );
                return n.relatedUrl ? (
                  <Link key={n.id} href={n.relatedUrl} onClick={() => setIsOpen(false)}>
                    {content}
                  </Link>
                ) : (
                  <div key={n.id}>{content}</div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

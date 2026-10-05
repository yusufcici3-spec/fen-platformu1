"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/sinif/5", label: "5. Sınıf" },
  { href: "/sinif/6", label: "6. Sınıf" },
  { href: "/sinif/7", label: "7. Sınıf" },
  { href: "/sinif/8", label: "8. Sınıf" },
  { href: "/denemeler", label: "Denemeler" },
  { href: "/oyunlar", label: "Oyunlar" },
  { href: "/#animasyonlar", label: "Animasyonlar" },
  { href: "/blog", label: "Blog" },
  { href: "/arama", label: "🔍 Ara" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-lab-paperLine/70 bg-lab-paper/90 backdrop-blur dark:border-white/10 dark:bg-lab-ink/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-display text-xs font-bold tracking-tight sm:text-base lg:text-lg"
        >
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663906411114/UjgJIopRxhqNxAZu.png"
            alt="Fen ve Bilim Kulübü logosu"
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-beaker/30"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="whitespace-nowrap text-xs sm:text-base lg:text-lg">
              Fen ve Bilim <span className="text-beaker">Kulübü</span>
            </span>
            <span className="whitespace-nowrap text-[9px] font-medium tracking-wide text-lab-inkMuted dark:text-lab-paper/55 sm:text-[10px]">
              Yusuf Cici
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link ) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
           

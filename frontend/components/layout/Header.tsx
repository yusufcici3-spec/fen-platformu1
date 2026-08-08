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
  { href: "/laboratuvar", label: "Laboratuvar" },
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
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-beaker text-white">🧪</span>
          <span>
            Fen<span className="text-beaker">Lab</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-beaker/10 text-beaker-dark dark:text-beaker-light"
                    : "text-lab-inkMuted hover:bg-lab-paperLine/60 dark:text-lab-paper/70 dark:hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {user && <NotificationBell />}
          {user ? (
            <UserMenu userName={user.firstName} role={user.role} onLogout={logout} />
          ) : (
            <>
              <Link
                href="/giris"
                className="rounded-full px-4 py-2 text-sm font-semibold text-lab-inkMuted hover:text-beaker dark:text-lab-paper/80"
              >
                Giriş Yap
              </Link>
              <Link
                href="/kayit"
                className="rounded-full bg-beaker px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-beaker/30 transition hover:bg-beaker-dark"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Menüyü aç/kapat"
          className="grid h-10 w-10 place-items-center rounded-full border border-lab-paperLine dark:border-white/10 lg:hidden"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-lab-paperLine/70 px-4 pb-4 pt-2 dark:border-white/10 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-lab-inkMuted hover:bg-lab-paperLine/60 dark:text-lab-paper/80 dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between border-t border-lab-paperLine/70 pt-3 dark:border-white/10">
            <ThemeToggle />
            {user ? (
              <button onClick={logout} className="text-sm font-semibold text-reaction-dark">
                Çıkış Yap
              </button>
            ) : (
              <div className="flex gap-2">
                <Link href="/giris" className="text-sm font-semibold text-lab-inkMuted dark:text-lab-paper/80">
                  Giriş
                </Link>
                <Link href="/kayit" className="rounded-full bg-beaker px-3 py-1.5 text-sm font-semibold text-white">
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function UserMenu({ userName, role, onLogout }: { userName: string; role: string; onLogout: () => void }) {
  const panelHref =
    role === "ADMIN" ? "/yonetici" : role === "TEACHER" ? "/ogretmen" : role === "PARENT" ? "/veli" : "/ogrenci";
  return (
    <div className="flex items-center gap-2">
      <Link
        href={panelHref}
        className="rounded-full bg-lab-paperLine/60 px-4 py-2 text-sm font-semibold text-lab-ink dark:bg-white/10 dark:text-lab-paper"
      >
        {userName} · Panelim
      </Link>
      <button
        onClick={onLogout}
        className="rounded-full px-3 py-2 text-sm font-semibold text-reaction-dark hover:bg-reaction/10"
      >
        Çıkış
      </button>
    </div>
  );
}

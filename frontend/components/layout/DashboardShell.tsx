"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export function DashboardShell({
  title,
  navItems,
  children,
}: {
  title: string;
  navItems: NavItem[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
      <aside className="h-fit rounded-card border border-lab-paperLine bg-white p-4 dark:border-white/10 dark:bg-lab-inkSoft lg:sticky lg:top-24">
        <div className="mb-4 px-2">
          <p className="font-display text-sm font-semibold">{title}</p>
          {user && (
            <p className="text-xs text-lab-inkMuted dark:text-lab-paper/50">
              {user.firstName} {user.lastName}
            </p>
          )}
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-beaker/10 text-beaker-dark dark:text-beaker-light"
                    : "text-lab-inkMuted hover:bg-lab-paperLine/60 dark:text-lab-paper/70 dark:hover:bg-white/5"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div>{children}</div>
    </div>
  );
}

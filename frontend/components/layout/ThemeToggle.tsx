"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Açık/koyu temayı değiştir"
      className="grid h-10 w-10 place-items-center rounded-full border border-lab-paperLine text-lg transition hover:bg-lab-paperLine/60 dark:border-white/10 dark:hover:bg-white/5"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

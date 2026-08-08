import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-card border border-lab-paperLine bg-white p-6 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft ${className}`}
    >
      {children}
    </div>
  );
}

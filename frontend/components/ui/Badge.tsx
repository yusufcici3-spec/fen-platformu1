export function Badge({ children, tone = "beaker" }: { children: React.ReactNode; tone?: "beaker" | "reaction" | "leaf" }) {
  const toneClasses = {
    beaker: "bg-beaker/10 text-beaker-dark dark:text-beaker-light",
    reaction: "bg-reaction/10 text-reaction-dark",
    leaf: "bg-leaf/10 text-leaf",
  } as const;

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}

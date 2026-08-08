export function ProgressBar({ percent, label }: { percent: number; label?: string }) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div>
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs font-mono text-lab-inkMuted dark:text-lab-paper/60">
          <span>{label}</span>
          <span>%{clamped}</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-lab-paperLine dark:bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-beaker to-leaf transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

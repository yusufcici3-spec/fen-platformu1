import { LearningOutcome } from "@/types/curriculum";

export function LearningOutcomesList({ outcomes }: { outcomes: LearningOutcome[] }) {
  if (outcomes.length === 0) return null;

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <span>🎯</span> Kazanımlar
      </h2>
      <ul className="mt-3 space-y-2">
        {outcomes.map((o) => (
          <li key={o.id} className="flex gap-2 text-sm text-lab-inkMuted dark:text-lab-paper/70">
            <span className="mt-0.5 text-leaf">✓</span>
            <span>
              {o.code && <span className="mr-1 font-mono text-xs text-beaker-dark dark:text-beaker-light">{o.code}</span>}
              {o.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

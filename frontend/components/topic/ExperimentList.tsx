import { Experiment } from "@/types/curriculum";

export function ExperimentList({ experiments }: { experiments: Experiment[] }) {
  if (experiments.length === 0) return null;

  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <span>🧫</span> Deneyler
      </h2>
      <div className="mt-3 space-y-4">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            className="rounded-card border border-beaker/30 bg-beaker/5 p-6"
          >
            <h3 className="font-display font-semibold">{exp.title}</h3>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-lab-inkMuted dark:text-lab-paper/60">
                  Malzemeler
                </p>
                <p className="mt-1 whitespace-pre-line text-sm text-lab-inkMuted dark:text-lab-paper/70">
                  {exp.materials}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-lab-inkMuted dark:text-lab-paper/60">
                  Adımlar
                </p>
                <p className="mt-1 whitespace-pre-line text-sm text-lab-inkMuted dark:text-lab-paper/70">
                  {exp.steps}
                </p>
              </div>
            </div>

            {exp.safetyNotes && (
              <div className="mt-3 rounded-lg border border-reaction/30 bg-reaction/10 px-3 py-2 text-xs text-reaction-dark">
                ⚠️ {exp.safetyNotes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

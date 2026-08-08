import { GlossaryTerm } from "@/types/curriculum";

export function GlossaryList({ terms }: { terms: GlossaryTerm[] }) {
  if (terms.length === 0) return null;

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <span>🔤</span> Kavramlar
      </h2>
      <dl className="mt-3 space-y-3">
        {terms.map((t) => (
          <div key={t.id}>
            <dt className="font-semibold text-beaker-dark dark:text-beaker-light">{t.term}</dt>
            <dd className="text-sm text-lab-inkMuted dark:text-lab-paper/70">{t.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="grid-paper-bg border-b border-lab-paperLine/70 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-lab-inkMuted dark:text-lab-paper/70">{description}</p>}
      </div>
    </div>
  );
}

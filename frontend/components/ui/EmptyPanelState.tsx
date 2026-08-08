export function EmptyPanelState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-card border border-dashed border-lab-paperLine bg-white/60 p-12 text-center dark:border-white/10 dark:bg-white/5">
      <div className="text-4xl">🧫</div>
      <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">{description}</p>
    </div>
  );
}

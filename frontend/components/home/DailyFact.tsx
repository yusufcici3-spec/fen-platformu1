export function DailyFact() {
  return (
    <div className="rounded-card border border-beaker/30 bg-beaker/5 p-6">
      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
        <span>💡</span> Günün Bilgisi
      </div>
      {/* İçerik yönetim panelinden eklenecek - şimdilik boş durum */}
      <p className="mt-4 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Bugünün bilgisi henüz eklenmedi. Yakında burada ilginç fen bilimleri bilgileri
        paylaşılacak.
      </p>
    </div>
  );
}

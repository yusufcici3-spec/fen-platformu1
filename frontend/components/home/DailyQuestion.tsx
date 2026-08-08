export function DailyQuestion() {
  return (
    <div className="rounded-card border border-reaction/30 bg-reaction/5 p-6">
      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-reaction-dark">
        <span>❓</span> Günün Sorusu
      </div>
      {/* İçerik yönetim panelinden eklenecek - şimdilik boş durum */}
      <p className="mt-4 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Bugünün sorusu henüz eklenmedi. Yönetim panelinden yeni bir soru ekleyerek burayı
        canlandırabilirsiniz.
      </p>
    </div>
  );
}

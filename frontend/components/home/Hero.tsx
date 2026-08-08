import Link from "next/link";

export function Hero() {
  return (
    <section className="grid-paper-bg relative overflow-hidden border-b border-lab-paperLine/70 dark:border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-beaker/30 bg-beaker/10 px-3 py-1 font-mono text-xs font-medium text-beaker-dark dark:text-beaker-light">
            5 · 6 · 7 · 8. SINIFLAR İÇİN
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Fen bilimlerini <span className="text-beaker">deneyerek</span>,{" "}
            <span className="text-reaction">merak ederek</span> öğren.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-lab-inkMuted dark:text-lab-paper/70">
            Konu anlatımları, alıştırma soruları, deneme sınavları ve eğitsel oyunlarla dolu; her
            öğrencinin kendi hızında ilerleyebildiği bir fen bilimleri laboratuvarı.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kayit"
              className="rounded-full bg-beaker px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-beaker/30 transition hover:bg-beaker-dark"
            >
              Ücretsiz Başla
            </Link>
            <Link
              href="/sinif/5"
              className="rounded-full border border-lab-ink/15 px-6 py-3 text-sm font-semibold transition hover:bg-lab-paperLine/60 dark:border-white/20 dark:hover:bg-white/5"
            >
              Konulara Göz At
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
          <div className="absolute inset-0 animate-[spin_28s_linear_infinite] rounded-full border-2 border-dashed border-beaker/30" />
          <div className="absolute inset-8 animate-[spin_20s_linear_infinite_reverse] rounded-full border-2 border-dashed border-reaction/30" />
          <div className="grid h-32 w-32 place-items-center rounded-full bg-white text-6xl shadow-xl dark:bg-lab-inkSoft">
            🧪
          </div>
          <span className="absolute -top-2 left-6 text-3xl">🔬</span>
          <span className="absolute bottom-2 right-2 text-3xl">🧬</span>
          <span className="absolute top-10 right-0 text-2xl">🌍</span>
          <span className="absolute bottom-10 left-0 text-2xl">⚛️</span>
        </div>
      </div>
    </section>
  );
}

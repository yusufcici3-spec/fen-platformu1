import Link from "next/link";

const CLASSES = [
  { level: 5, color: "bg-grade-5", desc: "Keşfe yeni başlayanlar için temel kavramlar." },
  { level: 6, color: "bg-grade-6", desc: "Gözlem ve deney becerilerini derinleştiriyoruz." },
  { level: 7, color: "bg-grade-7", desc: "Sistemleri ve ilişkileri anlamlandırıyoruz." },
  { level: 8, color: "bg-grade-8", desc: "LGS'ye hazırlık ve ileri düzey konular." },
];

export function ClassesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Sınıflar" title="Kendi sınıfını seç, öğrenmeye başla" />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CLASSES.map((c) => (
          <Link
            key={c.level}
            href={`/sinif/${c.level}`}
            className="group relative overflow-hidden rounded-card border border-lab-paperLine bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-lab-inkSoft"
          >
            <span className={`absolute right-0 top-0 h-20 w-20 rounded-bl-full ${c.color} opacity-10`} />
            <span className="font-mono text-4xl font-bold">{c.level}</span>
            <h3 className="mt-2 font-display text-lg font-semibold">{c.level}. Sınıf</h3>
            <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">{c.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-beaker">
              Konulara git
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{title}</h2>
    </div>
  );
}

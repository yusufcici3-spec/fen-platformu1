import Link from "next/link";
import { SectionHeading } from "./ClassesSection";

// Ana sayfadaki seçilmiş konular. Değiştirmek için bu listeyi düzenle.
const FEATURED_TOPICS = [
  { classLevel: 5, title: "Bitki ve Hayvan Hücreleri", href: "/sinif/5/canlilarin-yapisina-yolculuk/bitki-ve-hayvan-hucreleri" },
  { classLevel: 5, title: "Sürtünme Kuvveti", href: "/sinif/5/kuvveti-taniyalim/surtunme-kuvveti" },
  { classLevel: 6, title: "Kuvvet ve Bileşke Kuvvet", href: "/sinif/6/kuvvetin-etkisinde-hareket/kuvvet-ve-bileske-kuvvet" },
  { classLevel: 6, title: "Sinir Sistemi", href: "/sinif/6/canlilarda-sistemler/sinir-sistemi" },
  { classLevel: 7, title: "Sindirim Sistemi", href: "/sinif/7/vucudumuzdaki-sistemler/sindirim-sistemi" },
  { classLevel: 8, title: "Elektrik Yükleri ve Elektriklenme", href: "/sinif/8/elektrik-yukleri-ve-elektrik-enerjisi/elektrik-yukleri-ve-elektriklenme" },
];

export function PopularTopics() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Keşfet" title="Öne Çıkan Konular" />

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_TOPICS.map((topic, index) => (
          <li key={topic.href}>
            <Link
              href={topic.href}
              className="flex h-full items-center gap-4 rounded-card border border-lab-paperLine bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-beaker-light/15 font-display font-bold text-beaker-dark dark:text-beaker-light">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-lab-ink dark:text-lab-paper">{topic.title}</span>
                <span className="mt-1 block text-xs text-lab-inkMuted dark:text-lab-paper/60">{topic.classLevel}. Sınıf</span>
              </span>
              <span aria-hidden="true" className="text-beaker-dark dark:text-beaker-light">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

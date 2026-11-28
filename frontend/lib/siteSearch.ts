import { STATIC_UNITS } from "@/lib/maarifContent";
import { getFasikuller, FASIKUL_GRADES } from "@/lib/fasikuller";
import { ANIMATIONS_5, ANIMATIONS_6, ANIMATIONS_7, ANIMATIONS_8 } from "@/content/animations";
import { videos } from "@/content/videos";

export type SiteHit = { kind: "Konu" | "Ünite" | "Animasyon" | "Video" | "Fasikül"; title: string; label: string; href: string };

type Entry = SiteHit & { level: number; head: string; text: string };

/** Büyük/küçük harf ve Türkçe karakter farkını yok sayar (Boşaltım = bosaltim). */
function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}

function entry(hit: SiteHit, level: number, extra: string[] = []): Entry {
  const head = normalize(hit.title);
  return { ...hit, level, head, text: normalize([hit.title, ...extra].join(" ").replace(/<[^>]*>/g, " ")) };
}

function buildIndex(): Entry[] {
  const list: Entry[] = [];

  for (const u of STATIC_UNITS) {
    const unitHref = `/sinif/${u.classLevel}/${u.slug}`;
    list.push(entry({ kind: "Ünite", title: u.title, label: `${u.classLevel}. Sınıf`, href: unitHref }, u.classLevel, [u.description]));
    for (const t of u.topics) {
      list.push(
        entry({ kind: "Konu", title: t.title, label: `${u.classLevel}. Sınıf · ${u.title}`, href: `${unitHref}/${t.slug}` }, u.classLevel, [
          t.summary,
          t.outcome.code,
          t.outcome.description,
          ...(t.outcome.details ?? []),
          ...t.sections.flatMap((s) => [s.title, s.bodyHtml]),
          ...t.glossary.flatMap((g) => [g.term, g.definition]),
        ])
      );
    }
  }

  [ANIMATIONS_5, ANIMATIONS_6, ANIMATIONS_7, ANIMATIONS_8].forEach((items, i) => {
    const level = i + 5;
    for (const a of items as { title: string; href: string; category: string; description?: string }[]) {
      list.push(entry({ kind: "Animasyon", title: a.title, label: `${level}. Sınıf`, href: a.href }, level, [a.category, a.description ?? ""]));
    }
  });

  for (const v of videos) {
    const level = Number.parseInt(v.grade, 10);
    list.push(entry({ kind: "Video", title: v.title, label: v.grade, href: "/videolar" }, level, [v.description]));
  }

  for (const level of FASIKUL_GRADES) {
    for (const f of getFasikuller(level)) {
      list.push(entry({ kind: "Fasikül", title: f.title, label: `${level}. Sınıf`, href: f.url }, level));
    }
  }

  return list;
}

let index: Entry[] | null = null;

export function searchSite(query: string, classLevel?: number): SiteHit[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  index ??= buildIndex();

  const inTitle = (e: Entry) => (words.every((w) => e.head.includes(w)) ? 0 : 1);

  return index
    .filter((e) => (!classLevel || e.level === classLevel) && words.every((w) => e.text.includes(w)))
    .sort((a, b) => inTitle(a) - inTitle(b))
    .map(({ kind, title, label, href }) => ({ kind, title, label, href }));
}

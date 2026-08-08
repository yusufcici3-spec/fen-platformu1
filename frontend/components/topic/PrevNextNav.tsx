import Link from "next/link";
import { TopicNavRef } from "@/types/curriculum";

export function PrevNextNav({
  classLevel,
  unitSlug,
  previous,
  next,
}: {
  classLevel: number;
  unitSlug: string;
  previous: TopicNavRef | null;
  next: TopicNavRef | null;
}) {
  if (!previous && !next) return null;

  return (
    <div className="grid gap-3 border-t border-lab-paperLine/70 pt-6 dark:border-white/10 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/sinif/${classLevel}/${unitSlug}/${previous.slug}`}
          className="rounded-card border border-lab-paperLine bg-white p-4 transition hover:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
        >
          <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">← Önceki Konu</span>
          <p className="mt-1 font-semibold">{previous.title}</p>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/sinif/${classLevel}/${unitSlug}/${next.slug}`}
          className="rounded-card border border-lab-paperLine bg-white p-4 text-right transition hover:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
        >
          <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">Sonraki Konu →</span>
          <p className="mt-1 font-semibold">{next.title}</p>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { getStaticUnit } from "@/lib/maarifContent";
import { TopicDetail } from "@/types/curriculum";
import { MarkCompleteButton } from "@/components/topic/MarkCompleteButton";
import { LocalCompleteButton } from "@/components/topic/LocalCompleteButton";
import { StaticQuiz } from "@/components/topic/StaticQuiz";

const LEVEL = 5;
const UNIT_SLUG = "gokyuzundeki-komsularimiz-ve-biz";

const TYPE_TONE = {
  EXPLANATION: "border-beaker/30 bg-beaker/5",
  IMPORTANT_INFO: "border-reaction/30 bg-reaction/5",
  DAILY_LIFE: "border-leaf/30 bg-leaf/5",
} as const;

export function generateStaticParams() {
  return (getStaticUnit(LEVEL, UNIT_SLUG)?.topics ?? []).map((t) => ({ topicSlug: t.slug }));
}

export function generateMetadata({ params }: { params: { topicSlug: string } }) {
  const topic = getStaticUnit(LEVEL, UNIT_SLUG)?.topics.find((t) => t.slug === params.topicSlug);
  return { title: topic ? `${topic.title} | 5. Sınıf Fen Bilimleri` : "Konu" };
}

export default async function StaticTopicPage({ params }: { params: { topicSlug: string } }) {
  const unit = getStaticUnit(LEVEL, UNIT_SLUG);
  const index = unit?.topics.findIndex((t) => t.slug === params.topicSlug) ?? -1;
  if (!unit || index < 0) notFound();

  const topic = unit.topics[index];
  const previous = unit.topics[index - 1] ?? null;
  const next = unit.topics[index + 1] ?? null;

  // Konu veritabanında da varsa: sunucu tarafı ilerleme takibi ve "Bu Konudan Soru Çöz" bağlantısı.
  let dbTopicId: string | null = null;
  try {
    const res = await apiFetch<TopicDetail>(`/konular/${topic.slug}?unitSlug=${encodeURIComponent(UNIT_SLUG)}`);
    dbTopicId = res.data?.id ?? null;
  } catch {
    dbTopicId = null;
  }

  return (
    <>
      <div className="grid-paper-bg border-b border-lab-paperLine/70 dark:border-white/10">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-1 text-xs text-lab-inkMuted dark:text-lab-paper/50">
            <Link href={`/sinif/${LEVEL}`} className="hover:text-beaker">{LEVEL}. Sınıf</Link>
            <span>/</span>
            <Link href={`/sinif/${LEVEL}/${UNIT_SLUG}`} className="hover:text-beaker">{unit.title}</Link>
            <span>/</span>
            <span className="text-lab-ink dark:text-lab-paper">{topic.title}</span>
          </nav>

          <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
            Konu {index + 1} / {unit.topics.length} · {topic.outcome.code}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{topic.title}</h1>
          <p className="mt-3 max-w-2xl text-lab-inkMuted dark:text-lab-paper/70">{topic.summary}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            {dbTopicId ? <MarkCompleteButton topicId={dbTopicId} /> : <LocalCompleteButton progressKey={topic.slug} />}
            {dbTopicId && (
              <Link
                href={`/pratik?topicId=${dbTopicId}&title=${encodeURIComponent(topic.title + " - Soru Çöz")}`}
                className="inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
              >
                📝 Bu Konudan Soru Çöz
              </Link>
            )}
            {topic.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
              >
                🎬 {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold"><span>🎯</span> Bu konuda neler öğreneceksin?</h2>
          <p className="mt-3 text-sm text-lab-inkMuted dark:text-lab-paper/70">
            <span className="mr-1 font-mono text-xs text-beaker-dark dark:text-beaker-light">{topic.outcome.code}</span>
            {topic.outcome.description}
          </p>
          <p className="mt-3 text-sm text-lab-inkMuted dark:text-lab-paper/70">
            <strong>Becerilerin:</strong> {topic.skills.join(" · ")}
          </p>
        </div>

        <div className="space-y-5">
          {topic.sections.map((s, i) => (
            <div key={i} className={`rounded-card border p-6 ${TYPE_TONE[s.type]}`}>
              <h2 className="font-display text-lg font-semibold">{s.title}</h2>
              <div
                className="prose prose-sm mt-3 max-w-none text-lab-ink dark:prose-invert dark:text-lab-paper/90"
                dangerouslySetInnerHTML={{ __html: s.bodyHtml }}
              />
            </div>
          ))}
        </div>

        <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold"><span>🔤</span> Kavramlar</h2>
          <dl className="mt-3 space-y-3">
            {topic.glossary.map((g) => (
              <div key={g.term}>
                <dt className="font-semibold text-beaker-dark dark:text-beaker-light">{g.term}</dt>
                <dd className="text-sm text-lab-inkMuted dark:text-lab-paper/70">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-card border border-beaker/30 bg-beaker/5 p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold"><span>🧫</span> Etkinlik: {topic.activity.title}</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-lab-inkMuted dark:text-lab-paper/60">Malzemeler</p>
              <p className="mt-1 whitespace-pre-line text-sm text-lab-inkMuted dark:text-lab-paper/70">{topic.activity.materials}</p>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-lab-inkMuted dark:text-lab-paper/60">Adımlar</p>
              <p className="mt-1 whitespace-pre-line text-sm text-lab-inkMuted dark:text-lab-paper/70">{topic.activity.steps}</p>
            </div>
          </div>
          <p className="mt-4 rounded-lg bg-reaction/10 px-3 py-2 text-sm">
            <strong>⚠️ Güvenlik:</strong> {topic.activity.safetyNotes}
          </p>
        </div>

        <StaticQuiz questions={topic.quiz} />

        <div className="grid gap-3 border-t border-lab-paperLine/70 pt-6 dark:border-white/10 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/sinif/${LEVEL}/${UNIT_SLUG}/${previous.slug}`}
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
              href={`/sinif/${LEVEL}/${UNIT_SLUG}/${next.slug}`}
              className="rounded-card border border-lab-paperLine bg-white p-4 text-right transition hover:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
            >
              <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">Sonraki Konu →</span>
              <p className="mt-1 font-semibold">{next.title}</p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  );
}

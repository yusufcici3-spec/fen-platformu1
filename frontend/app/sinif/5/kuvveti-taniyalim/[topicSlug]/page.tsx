import { StaticTopicView } from "@/components/topic/StaticTopicView";
import { getStaticUnit } from "@/lib/maarifContent";

const LEVEL = 5;
const UNIT_SLUG = "kuvveti-taniyalim";

export function generateStaticParams() {
  return (getStaticUnit(LEVEL, UNIT_SLUG)?.topics ?? []).map((t) => ({ topicSlug: t.slug }));
}

export function generateMetadata({ params }: { params: { topicSlug: string } }) {
  const topic = getStaticUnit(LEVEL, UNIT_SLUG)?.topics.find((t) => t.slug === params.topicSlug);
  return { title: topic ? `${topic.title} | ${LEVEL}. Sınıf Fen Bilimleri` : "Konu" };
}

export default function Page({ params }: { params: { topicSlug: string } }) {
  return <StaticTopicView level={LEVEL} unitSlug={UNIT_SLUG} topicSlug={params.topicSlug} />;
}

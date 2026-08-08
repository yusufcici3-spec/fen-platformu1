import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { TopicDetail } from "@/types/curriculum";
import { ContentBlock } from "@/components/topic/ContentBlock";
import { LearningOutcomesList } from "@/components/topic/LearningOutcomesList";
import { GlossaryList } from "@/components/topic/GlossaryList";
import { ExperimentList } from "@/components/topic/ExperimentList";
import { ImageGallery } from "@/components/topic/ImageGallery";
import { VideoList } from "@/components/topic/VideoList";
import { PdfList } from "@/components/topic/PdfList";
import { PrevNextNav } from "@/components/topic/PrevNextNav";
import { MarkCompleteButton } from "@/components/topic/MarkCompleteButton";

interface Params {
  level: string;
  unitSlug: string;
  topicSlug: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  return { title: params.topicSlug.replace(/-/g, " ") };
}

export default async function TopicPage({ params }: { params: Params }) {
  const level = Number(params.level);

  let topic: TopicDetail | null = null;
  try {
    const res = await apiFetch<TopicDetail>(
      `/konular/${params.topicSlug}?unitSlug=${encodeURIComponent(params.unitSlug)}`
    );
    topic = res.data ?? null;
  } catch {
    topic = null;
  }

  if (!topic) notFound();

  return (
    <>
      <div className="grid-paper-bg border-b border-lab-paperLine/70 dark:border-white/10">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-1 text-xs text-lab-inkMuted dark:text-lab-paper/50">
            <Link href={`/sinif/${level}`} className="hover:text-beaker">
              {level}. Sınıf
            </Link>
            <span>/</span>
            <Link href={`/sinif/${level}/${params.unitSlug}`} className="hover:text-beaker">
              {topic.unit?.title ?? "Ünite"}
            </Link>
            <span>/</span>
            <span className="text-lab-ink dark:text-lab-paper">{topic.title}</span>
          </nav>

          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{topic.title}</h1>
          {topic.summary && (
            <p className="mt-3 max-w-2xl text-lab-inkMuted dark:text-lab-paper/70">{topic.summary}</p>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <MarkCompleteButton topicId={topic.id} />
            <Link
              href={`/pratik?topicId=${topic.id}&title=${encodeURIComponent(topic.title + " - Soru Çöz")}`}
              className="inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
            >
              📝 Bu Konudan Soru Çöz
            </Link>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Konu Anlatımı / Önemli Bilgiler / Günlük Yaşam Örnekleri */}
        {topic.contents.length > 0 ? (
          <div className="space-y-5">
            {topic.contents.map((block) => (
              <ContentBlock key={block.id} block={block} />
            ))}
          </div>
        ) : topic.content ? (
          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: topic.content }}
          />
        ) : null}

        <LearningOutcomesList outcomes={topic.learningOutcomes} />
        <GlossaryList terms={topic.glossaryTerms} />
        <ExperimentList experiments={topic.experiments} />
        <ImageGallery images={topic.images} />
        <VideoList videos={topic.videos} />
        <PdfList pdfs={topic.pdfs} />

        <PrevNextNav
          classLevel={level}
          unitSlug={params.unitSlug}
          previous={topic.previousTopic}
          next={topic.nextTopic}
        />
      </section>
    </>
  );
}

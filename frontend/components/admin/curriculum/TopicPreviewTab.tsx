import { TopicDetail } from "@/types/curriculum";
import { ContentBlock } from "@/components/topic/ContentBlock";
import { LearningOutcomesList } from "@/components/topic/LearningOutcomesList";
import { GlossaryList } from "@/components/topic/GlossaryList";
import { ExperimentList } from "@/components/topic/ExperimentList";
import { ImageGallery } from "@/components/topic/ImageGallery";
import { VideoList } from "@/components/topic/VideoList";
import { PdfList } from "@/components/topic/PdfList";

/** Öğrencinin göreceği konu sayfasının birebir önizlemesi. */
export function TopicPreviewTab({ topic }: { topic: TopicDetail }) {
  return (
    <div className="rounded-card border-2 border-dashed border-beaker/40 p-6">
      <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
        👁️ Öğrenci Önizlemesi
      </p>

      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold">{topic.title}</h1>
          {topic.summary && <p className="mt-2 text-lab-inkMuted dark:text-lab-paper/70">{topic.summary}</p>}
        </div>

        {topic.contents.map((block) => (
          <ContentBlock key={block.id} block={block} />
        ))}

        <LearningOutcomesList outcomes={topic.learningOutcomes} />
        <GlossaryList terms={topic.glossaryTerms} />
        <ExperimentList experiments={topic.experiments} />
        <ImageGallery images={topic.images} />
        <VideoList videos={topic.videos} />
        <PdfList pdfs={topic.pdfs} />
      </div>
    </div>
  );
}

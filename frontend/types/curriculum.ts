// ============================================================================
// AŞAMA 2: MEB müfredatı ile ilgili paylaşılan TypeScript tipleri
// ============================================================================

export interface ClassSummary {
  id: string;
  level: number;
  name: string;
  slug: string;
}

export interface UnitSummary {
  id: string;
  code: string | null;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  classId?: string;
  class?: ClassSummary;
  _count?: { topics: number };
}

export interface TopicSummary {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  coverImage: string | null;
  order: number;
  isPublished: boolean;
  unitId?: string;
  unit?: UnitSummary;
}

export type ContentBlockType = "EXPLANATION" | "IMPORTANT_INFO" | "DAILY_LIFE";

export interface TopicContentBlock {
  id: string;
  type: ContentBlockType;
  title: string | null;
  bodyHtml: string;
  order: number;
}

export interface LearningOutcome {
  id: string;
  code: string | null;
  description: string;
  order: number;
}

export interface TopicImage {
  id: string;
  url: string;
  caption: string | null;
  order: number;
}

export type VideoSource = "YOUTUBE" | "UPLOAD";

export interface TopicVideo {
  id: string;
  title: string;
  source: VideoSource;
  url: string;
  order: number;
}

export interface TopicPdf {
  id: string;
  title: string;
  url: string;
  order: number;
}

export interface Experiment {
  id: string;
  title: string;
  materials: string;
  steps: string;
  safetyNotes: string | null;
  videoUrl: string | null;
  order: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  order: number;
}

export interface TopicNavRef {
  id: string;
  slug: string;
  title: string;
  order: number;
}

export interface TopicDetail extends TopicSummary {
  content: string | null;
  learningOutcomes: LearningOutcome[];
  contents: TopicContentBlock[];
  images: TopicImage[];
  videos: TopicVideo[];
  pdfs: TopicPdf[];
  experiments: Experiment[];
  glossaryTerms: GlossaryTerm[];
  previousTopic: TopicNavRef | null;
  nextTopic: TopicNavRef | null;
}

export interface SearchResult {
  query: string;
  topics: (TopicSummary & { unit: UnitSummary & { class: ClassSummary } })[];
  units: (UnitSummary & { class: ClassSummary })[];
  learningOutcomes: (LearningOutcome & {
    topic: TopicSummary & { unit: UnitSummary & { class: ClassSummary } };
  })[];
}

import exam8 from "@/content/denemeler/8-sinif-yeni-nesil-1-2.json";
import examMevsimDna from "@/content/denemeler/8-sinif-yeni-nesil-mevsim-dna.json";
import examLgs2 from "@/content/denemeler/8-sinif-lgs-denemesi-2.json";
import examTumKazanımlar from "@/content/denemeler/8-sinif-1-2-unite-tum-kazanimlar-20.json";
import examIlkUcUnite from "@/content/denemeler/8-sinif-ilk-3-unite-genel-deneme-20.json";
import exam5Unit1 from "@/content/denemeler/5-sinif-1-unite-yeni-nesil-30.json";
import exam5Units23 from "@/content/denemeler/5-sinif-2-3-unite-yeni-nesil-30.json";

export interface StaticExamQuestion {
  no: number;
  unit: string;
  outcome: string;
  skill: string;
  scenario: string;
  image: string;
  imageAlt: string;
  stem: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface StaticExam {
  id: string;
  slug: string;
  title: string;
  description: string;
  classLevel: number;
  durationMin: number;
  units: string[];
  source: string;
  questions: StaticExamQuestion[];
}

// Hazır yeni nesil denemeler: kapsamlı 1. ve 2. ünite denemeleri de bu listede yayınlanır.
export const STATIC_EXAMS: StaticExam[] = [
  exam8 as unknown as StaticExam,
  examMevsimDna as unknown as StaticExam,
  examTumKazanımlar as unknown as StaticExam,
  examIlkUcUnite as unknown as StaticExam,
  examLgs2 as unknown as StaticExam,
  exam5Unit1 as unknown as StaticExam,
  exam5Units23 as unknown as StaticExam,
];

export function getStaticExam(slug: string): StaticExam | undefined {
  return STATIC_EXAMS.find((e) => e.slug === slug);
}

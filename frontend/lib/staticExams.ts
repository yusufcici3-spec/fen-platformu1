import examMevsimDna from "@/content/denemeler/8-sinif-yeni-nesil-mevsim-dna.json";
import examLgs2 from "@/content/denemeler/8-sinif-lgs-denemesi-2.json";
import examIlkUcUnite from "@/content/denemeler/8-sinif-ilk-3-unite-genel-deneme.json";
import examKatiBasinci1 from "@/content/denemeler/konu-tarama-kati-basinci-1.json";
import examFenBilimKulubu3 from "@/content/denemeler/8-sinif-fenvebilimkulubu-1-2-unite-deneme-3.json";

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
  /** "konu-tarama" ise Denemeler sayfasında "Konu Tarama Testleri" başlığı altında listelenir. */
  category?: string;
  /** Konu tarama testlerinde konu başlığı (ör. "Katı Basıncı"). */
  topic?: string;
  questions: StaticExamQuestion[];
}

// Yayındaki denemeler; başlıklar listede Deneme 1, Deneme 2... şeklinde gösterilir.
const ACTIVE_EXAMS: StaticExam[] = [
  examFenBilimKulubu3 as unknown as StaticExam,
  examKatiBasinci1 as unknown as StaticExam,
  examMevsimDna as unknown as StaticExam,
  examIlkUcUnite as unknown as StaticExam,
  examLgs2 as unknown as StaticExam,
];

export const STATIC_EXAMS: StaticExam[] = ACTIVE_EXAMS.map((exam, index) => ({
  ...exam,
  title: `Deneme ${index + 1}`,
}));

export function getStaticExam(slug: string): StaticExam | undefined {
  return STATIC_EXAMS.find((e) => e.slug === slug);
}

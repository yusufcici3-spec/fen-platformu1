import unit51 from "@/content/maarif/5-unite-1.json";
import unit52 from "@/content/maarif/5-unite-2.json";

export type StaticSection = {
  type: "EXPLANATION" | "IMPORTANT_INFO" | "DAILY_LIFE";
  title: string;
  bodyHtml: string;
};

export type StaticQuizQuestion = {
  body: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
};

export type StaticTopic = {
  slug: string;
  title: string;
  summary: string;
  outcome: { code: string; description: string; details?: string[] };
  skills: string[];
  sections: StaticSection[];
  glossary: { term: string; definition: string }[];
  activity: { title: string; materials: string; steps: string; safetyNotes: string };
  quiz: StaticQuizQuestion[];
  links: { label: string; href: string }[];
};

export type StaticUnit = {
  classLevel: number;
  code: string;
  hours: number;
  title: string;
  slug: string;
  description: string;
  source: string;
  topics: StaticTopic[];
};

/** Türkiye Yüzyılı Maarif Modeli'ne göre hazırlanmış, kodla yönetilen üniteler. */
export const STATIC_UNITS: StaticUnit[] = [unit51 as StaticUnit, unit52 as unknown as StaticUnit];

export function getStaticUnit(level: number, unitSlug: string): StaticUnit | undefined {
  return STATIC_UNITS.find((u) => u.classLevel === level && u.slug === unitSlug);
}

export function getStaticUnitsForLevel(level: number): StaticUnit[] {
  return STATIC_UNITS.filter((u) => u.classLevel === level);
}

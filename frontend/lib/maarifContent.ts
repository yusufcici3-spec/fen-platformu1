import unit51 from "@/content/maarif/5-unite-1.json";
import unit52 from "@/content/maarif/5-unite-2.json";
import unit53 from "@/content/maarif/5-unite-3.json";
import unit54 from "@/content/maarif/5-unite-4.json";
import unit55 from "@/content/maarif/5-unite-5.json";
import unit56 from "@/content/maarif/5-unite-6.json";
import unit57 from "@/content/maarif/5-unite-7.json";
import unit61 from "@/content/maarif/6-unite-1.json";
import unit62 from "@/content/maarif/6-unite-2.json";
import unit63 from "@/content/maarif/6-unite-3.json";
import unit64 from "@/content/maarif/6-unite-4.json";
import unit65 from "@/content/maarif/6-unite-5.json";
import unit66 from "@/content/maarif/6-unite-6.json";
import unit67 from "@/content/maarif/6-unite-7.json";
import unit71 from "@/content/maarif/7-unite-1.json";

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
  hours?: number;
  title: string;
  slug: string;
  description: string;
  source: string;
  topics: StaticTopic[];
};

/** Türkiye Yüzyılı Maarif Modeli'ne göre hazırlanmış, kodla yönetilen üniteler. */
export const STATIC_UNITS: StaticUnit[] = [unit51 as StaticUnit, unit52 as unknown as StaticUnit, unit53 as StaticUnit, unit54 as StaticUnit, unit55 as StaticUnit, unit56 as StaticUnit, unit57 as StaticUnit, unit61 as StaticUnit, unit62 as StaticUnit, unit63 as StaticUnit, unit64 as StaticUnit, unit65 as StaticUnit, unit66 as StaticUnit, unit67 as StaticUnit, unit71 as StaticUnit];

export function getStaticUnit(level: number, unitSlug: string): StaticUnit | undefined {
  return STATIC_UNITS.find((u) => u.classLevel === level && u.slug === unitSlug);
}

export function getStaticUnitsForLevel(level: number): StaticUnit[] {
  return STATIC_UNITS.filter((u) => u.classLevel === level);
}

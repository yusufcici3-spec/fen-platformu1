import manifest from "@/content/yazililar.generated.json";

export type YaziliItem = {
  id: string;
  title: string;
  kind: "pdf" | "image" | "set";
  url: string;
  pages?: string[];
};

export const YAZILI_GRADES = [5, 6, 7, 8] as const;

export function getYazililar(grade: number): YaziliItem[] {
  return ((manifest as Record<string, YaziliItem[]>)[String(grade)] ?? []) as YaziliItem[];
}

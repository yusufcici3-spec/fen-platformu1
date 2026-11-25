export type Fasikul = { title: string; file: string };
export const FASIKUL_GRADES = [5, 6, 7, 8] as const;
const data: Record<number, Fasikul[]> = {
  5: [{ title: "Güneş ve Ay Çalışma Kâğıdı", file: "Güneş ve Ay Çalışma Kâğıdı.pdf" }],
  6: [{ title: "Güneş Sistemi Çalışma Kâğıdı", file: "Güneş Sistemi Çalışma Kâğıdı.pdf" }],
  7: [{ title: "Uzay Araştırmaları ve Teknolojiler Çalışma Kâğıdı", file: "Uzay Araştırmaları ve Teknolojiler Çalışma Kâğıdı.pdf" }],
  8: [{ title: "Mevsimler ve İklim Fasikülü", file: "Mevsimler ve İklim Fasikülü.pdf" }],
};
export function getFasikuller(grade: number) {
  return (data[grade] ?? []).map((f) => ({ ...f, url: `/fasikuller/${grade}/${encodeURIComponent(f.file)}` }));
}

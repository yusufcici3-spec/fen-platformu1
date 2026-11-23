export type Fasikul = { title: string; file: string };
export const FASIKUL_GRADES = [5, 6, 7, 8] as const;
const data: Record<number, Fasikul[]> = {
  5: [{ title: "Güneş ve Ay Çalışma Kâğıdı", file: "Güneş ve Ay Çalışma Kâğıdı.pdf" }],
  6: [],
  7: [],
  8: [],
};
export function getFasikuller(grade: number) {
  return (data[grade] ?? []).map((f) => ({ ...f, url: `/fasikuller/${grade}/${encodeURIComponent(f.file)}` }));
}

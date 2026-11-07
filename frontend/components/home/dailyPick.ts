// Türkiye saatiyle bugünün gün numarasına göre havuzdan öğe seçer (her gün otomatik değişir).
export function todayIndex(length: number): number {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
  const day = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  return ((day % length) + length) % length;
}

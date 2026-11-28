// Yeni içerik eklediğinde bu listenin BAŞINA bir satır ekle (en yeni üstte).
// Ana sayfadaki "Son Eklenenler" bölümü bunu otomatik gösterir.
export type SonEklenen = {
  id: string;
  title: string;
  type: "Konu" | "Soru" | "Oyun" | "PDF" | "Video" | "Deneme";
  label: string;
  createdAt: string; // YYYY-MM-DD
  href: string;
  classLevel?: number;
};

export const SON_EKLENENLER: SonEklenen[] = [
  { id: "fas-8-basinc", title: "Basınç Fasikülü", type: "PDF", label: "Fasikül", createdAt: "2026-11-28", href: "/fasikuller", classLevel: 8 },
  { id: "fas-8-dna", title: "DNA - Gen - Kromozom - Nükleotid Fasikülü", type: "PDF", label: "Fasikül", createdAt: "2026-11-26", href: "/fasikuller", classLevel: 8 },
  { id: "vid-8-6", title: "Enerji Dönüşümleri ve Çevre Bilimi Konu Anlatım Videosu", type: "Video", label: "Konu anlatımı", createdAt: "2026-11-26", href: "/videolar", classLevel: 8 },
  { id: "konu-6-3", title: "6. Sınıf 3. Ünite: Detaylı Görselli Konu Anlatımı", type: "Konu", label: "Üreme, büyüme ve denetleyici sistemler", createdAt: "2026-11-25", href: "/sinif/6", classLevel: 6 },
  { id: "oyun-passa", title: "Passafenola: Ünite Seçimli 8. Sınıf Oyunu", type: "Oyun", label: "Birden çok ünite seçilebilir", createdAt: "2026-11-24", href: "/animasyonlar/8/passafenola", classLevel: 8 },
  { id: "vid-8-5", title: "Basit Makineler Konu Anlatım Videosu", type: "Video", label: "Konu anlatımı", createdAt: "2026-11-23", href: "/videolar", classLevel: 8 },
  { id: "fas-5-7", title: "5, 6 ve 7. Sınıf Çalışma Kâğıtları", type: "PDF", label: "Fasikül", createdAt: "2026-11-22", href: "/fasikuller" },
  { id: "soru-8-400", title: "400 Görselli Yeni Nesil Soru (8.1–8.5)", type: "Soru", label: "Soru Çöz", createdAt: "2026-11-21", href: "/sinif/8", classLevel: 8 },
];

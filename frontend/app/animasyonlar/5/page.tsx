import AnimationDirectory from "@/components/animations/AnimationDirectory";

export const metadata = { title: "5. Sınıf Animasyonları | Fen Bilimleri" };

const items = [
  { title: "Ay'ın Evreleri Simülatörü", href: "/animasyonlar/5/ay-evreleri", icon: "🌙", description: "Ay'ın evrelerini hareketli simülasyonla incele.", category: "GÖKYÜZÜ" },
  { title: "Ay Yüzeyini Keşfet", href: "/animasyonlar/5/ay-yuzeyi", icon: "🚀", description: "Astronotla Ay yüzeyini ve kraterleri keşfet.", category: "UZAY" },
  { title: "Dinamometre Simülatörü", href: "/animasyonlar/5/dinamometre", icon: "⚖️", description: "Kuvveti dinamometre ile ölçmeyi dene.", category: "KUVVET" },
  { title: "Dinamometreni Ölçeklendir", href: "/animasyonlar/5/dinamometre-olcekle", icon: "📏", description: "Dinamometre ölçeğini oluştur ve ölçüm yap.", category: "KUVVET" },
  { title: "Mikroskop Masası", href: "/animasyonlar/5/mikroskop", icon: "🔬", description: "Mikroskop parçalarını ve örnek incelemeyi keşfet.", category: "CANLILAR" },
  { title: "İskelet Sistemi Animasyonu", href: "/laboratuvar/destek-hareket", icon: "🦴", description: "Destek ve hareket sistemini incele.", category: "VÜCUDUMUZ" },
  { title: "Fen Koşusu 5", href: "/animasyonlar/5/fen-kosusu5", icon: "🏃", description: "Fen sorularını çözerek parkuru tamamla.", category: "EĞİTİCİ OYUN" },
  { title: "Fen Yarışı 5", href: "/animasyonlar/5/fen-yarisi5", icon: "🏎️", description: "Soruları yanıtla ve yarışta ilerle.", category: "EĞİTİCİ OYUN" },
  { title: "MilyonerFen 5", href: "/animasyonlar/5/milyoner", icon: "🏆", description: "Fen bilgini çoktan seçmeli sorularla dene.", category: "EĞİTİCİ OYUN" },
];

export default function FifthGradeAnimationsPage() {
  return <AnimationDirectory grade={5} items={items} />;
}

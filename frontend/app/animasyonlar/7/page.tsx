import AnimationDirectory from "@/components/animations/AnimationDirectory";

export const metadata = { title: "7. Sınıf Animasyonları | Fen Bilimleri" };

const items = [
  { title: "Uzay Teknolojileri ve Yıldızların Yaşamı", href: "/animasyonlar/7/uzay-teknolojileri", icon: "🛰️", description: "Uzay araçlarını ve yıldızların yaşam aşamalarını keşfet.", category: "UZAY" },
  { title: "Ağırlık ve Enlem", href: "/animasyonlar/7/agirlik-enlem", icon: "🌍", category: "KUVVET VE ENERJİ" },
  { title: "Kuvvet ve Enerji", href: "/animasyonlar/7/kuvvet-enerji", icon: "💪", category: "KUVVET VE ENERJİ" },
  { title: "Kinetik ve Potansiyel Enerji", href: "/animasyonlar/7/kinetik-potansiyel", icon: "⚡", category: "ENERJİ" },
  { title: "Sindirim Sistemi", href: "/animasyonlar/7/sindirim-sistemi", icon: "🥗", category: "VÜCUDUMUZ" },
  { title: "Dolaşım Sistemi", href: "/animasyonlar/7/dolasim-sistemi", icon: "❤️", category: "VÜCUDUMUZ" },
  { title: "Solunum Sistemi", href: "/animasyonlar/7/solunum-sistemi", icon: "🫁", category: "VÜCUDUMUZ" },
  { title: "Boşaltım Sistemi", href: "/animasyonlar/7/bosaltim-sistemi", icon: "🫘", category: "VÜCUDUMUZ" },
  { title: "Passafenola 7", href: "/animasyonlar/7/passafenola7", icon: "🎯", category: "EĞİTİCİ OYUN" },
  { title: "Fen Futbolu 7", href: "/animasyonlar/7/fen-futbolu", icon: "⚽", category: "EĞİTİCİ OYUN" },
  { title: "MilyonerFen 7", href: "/animasyonlar/7/milyoner", icon: "🏆", category: "EĞİTİCİ OYUN" },
];

export default function SeventhGradeAnimationsPage() {
  return <AnimationDirectory grade={7} items={items} />;
}

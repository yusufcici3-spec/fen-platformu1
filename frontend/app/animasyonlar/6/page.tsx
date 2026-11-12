import AnimationDirectory from "@/components/animations/AnimationDirectory";

export const metadata = { title: "6. Sınıf Animasyonları | Fen Bilimleri" };

const items = [
  { title: "Güneş Sistemi ve Tutulmalar", href: "/animasyonlar/6/gunes-sistemi", icon: "🪐", description: "Gezegenleri incele; Güneş ve Ay tutulmalarını keşfet.", category: "GÜNEŞ SİSTEMİ" },
  { title: "Merkezi Sinir Sistemi", href: "/animasyonlar/6/merkezi-sinir-sistemi", icon: "🧠", description: "Beyin, beyincik, omurilik ve refleksleri etkileşimli incele.", category: "VÜCUDUMUZ" },
  { title: "Sinir Sistemi ve Hormonlar", href: "/animasyonlar/6/sinir-sistemi-ve-hormonlar", icon: "🧠", description: "Sinir sistemi yapılarını ve iç salgı bezlerini seç; isimlerini bul ve mini testi çöz.", category: "VÜCUDUMUZ" },
  { title: "Bileşke Kuvvet Simülatörü", href: "/animasyonlar/6/bileske-kuvvet", icon: "🧲", description: "Kuvvetlerin yönünü ve büyüklüğünü değiştir.", category: "KUVVET" },
  { title: "Sürat ve Hız Animasyonu", href: "/animasyonlar/6/surat-ve-hiz", icon: "🚗", description: "Aracı hareket ettir; alınan yol ve yer değiştirmeyi karşılaştır.", category: "HAREKET" },
  { title: "İp Çekme Etkinliği", href: "/animasyonlar/6/ip-cekme", icon: "🪢", description: "Kuvvetlerin etkisini takım çalışması etkinliğiyle gözlemle.", category: "KUVVET" },
  { title: "Çiçekli Bitkilerin Yaşam Döngüsü", href: "/animasyonlar/6/cicekli-bitkiler-yasam-dongusu", icon: "🌼", category: "BİTKİLER" },
  { title: "Çiçeğin Kısımları ve Görevleri", href: "/animasyonlar/6/cicegin-kisimlari", icon: "🌺", description: "Çiçeğin bölümlerine dokunarak görevlerini öğren.", category: "BİTKİLER" },
  { title: "Eşeysiz Üreme Çeşitleri", href: "/animasyonlar/6/esesiz-ureme", icon: "🧫", category: "ÜREME" },
  { title: "MilyonerFen 6", href: "/animasyonlar/6/milyoner", icon: "🏆", category: "EĞİTİCİ OYUN" },
  { title: "Fen Futbolu 6", href: "/animasyonlar/6/fen-futbolu6", icon: "⚽", category: "EĞİTİCİ OYUN" },
];

export default function SixthGradeAnimationsPage() {
  return <AnimationDirectory grade={6} items={items} />;
}

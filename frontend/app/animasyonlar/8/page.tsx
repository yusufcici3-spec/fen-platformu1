import AnimationDirectory from "@/components/animations/AnimationDirectory";

export const metadata = { title: "8. Sınıf Animasyonları | Fen Bilimleri" };

const items = [
  { title: "Mevsimler ve İklim Simülatörü", href: "/animasyonlar/8/mevsimler", icon: "🌎", description: "Güneş ışınlarının geliş açısını ve mevsimleri keşfet.", category: "MEVSİMLER VE İKLİM" },
  { title: "Fotosentez Laboratuvarı", href: "/animasyonlar/8/fotosentez", icon: "🌿", description: "Işık, su ve karbondioksit miktarını değiştirerek fotosentezi gözlemle.", category: "ENERJİ DÖNÜŞÜMLERİ VE ÇEVRE BİLİMİ" },
  { title: "Deniz ve Kara Meltemleri", href: "/animasyonlar/8/deniz-kara-meltemi", icon: "🌊", description: "Gündüz ve geceyi değiştir; sıcaklık, basınç ve rüzgâr yönü ilişkisini keşfet.", category: "MEVSİMLER VE İKLİM" },
  { title: "Sıvı Basıncı Laboratuvarı", href: "/animasyonlar/8/sivi-basinci", icon: "💧", description: "Derinliği, yoğunluğu ve kabın şeklini değiştirerek basıncı gözlemle.", category: "BASINÇ" },
  { title: "Açık Hava Basıncı Laboratuvarı", href: "/animasyonlar/8/acik-hava-basinci", icon: "🌬️", description: "Torricelli deneyinde rakımı, tüp eğimini ve sıvıyı değiştirerek açık hava basıncını gözlemle.", category: "BASINÇ" },
  { title: "Katı Basıncı Simülatörü", href: "/animasyonlar/8/katı-basıncı", icon: "⚖️", description: "Ağırlık ve temas yüzey alanını değiştir.", category: "BASINÇ" },
  { title: "Kaldıraç Laboratuvarı", href: "/animasyonlar/8/kaldiraclar", icon: "⚖️", description: "Üç kaldıraç türünde destek noktasını, kuvvet ve yük kollarını değiştir; kuvvet ve yol kazancını incele.", category: "BASİT MAKİNELER" },
  { title: "Makara ve Palanga Laboratuvarı", href: "/animasyonlar/8/makaralar", icon: "⚙️", description: "Sabit, hareketli makara ve palanga düzeneklerinde yükü, kuvveti ve ip miktarını değiştirerek deney yap.", category: "BASİT MAKİNELER" },
  { title: "Bezelyelerde Kalıtım", href: "/animasyonlar/8/kalitim", icon: "🌱", description: "Çaprazlamaları yap ve yavru özelliklerini incele.", category: "DNA VE GENETİK KOD" },
  { title: "DNA Baz Eşleşmeleri", href: "/animasyonlar/8/dna-eslesmesi", icon: "🧬", description: "DNA zincirini tamamlayarak baz eşleşmelerini öğren.", category: "DNA VE GENETİK KOD" },
  { title: "Asit-Baz Ayraç Laboratuvarı", href: "/animasyonlar/8/asit-baz-ayraclari", icon: "🧪", description: "Turnusol, mor lahana ve diğer ayıraçlarla maddeleri test et.", category: "MADDE VE ENDÜSTRİ" },
  { title: "118 Elementli Periyodik Cetvel", href: "/animasyonlar/8/periyodik-cetvel", icon: "⚛️", description: "118 elementin tamamını incele; seçtiğin elementin özelliklerini keşfet.", category: "MADDE VE ENDÜSTRİ" },
  { title: "Elektroskop Laboratuvarı", href: "/animasyonlar/8/elektroskop", icon: "⚡", description: "Yükleri yaklaştır, dokundur ve etki ile elektriklenme basamaklarını uygula.", category: "ELEKTRİKLENME" },
  { title: "Elektriklenme ve Yük Geçişi Laboratuvarı", href: "/animasyonlar/8/elektriklenme", icon: "⚡", description: "İki cismi yaklaştır, dokundur veya sürt; elektron geçişini ve son yükleri gözlemle.", category: "ELEKTRİKLENME" },
  { title: "Passafenola", href: "/animasyonlar/8/passafenola", icon: "🎯", description: "Fen sorularıyla kelime turunu tamamla.", category: "EĞİTİCİ OYUN" },
  { title: "MilyonerFen 8", href: "/animasyonlar/8/milyoner", icon: "🏆", description: "Ünitelerini seç; her üniteden 30 soruluk havuzla bilgi yarışmasına katıl.", category: "EĞİTİCİ OYUN" },
];

export default function EighthGradeAnimationsPage() {
  return <AnimationDirectory grade={8} items={items} />;
}

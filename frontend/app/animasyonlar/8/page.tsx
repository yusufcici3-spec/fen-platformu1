import AnimationDirectory from "@/components/animations/AnimationDirectory";

export const metadata = { title: "8. Sınıf Animasyonları | Fen Bilimleri" };

const items = [
  { title: "Mevsimler ve İklim Simülatörü", href: "/animasyonlar/8/mevsimler", icon: "🌎", description: "Güneş ışınlarının geliş açısını ve mevsimleri keşfet.", category: "MEVSİMLER VE İKLİM" },
  { title: "Sıvı Basıncı Laboratuvarı", href: "/animasyonlar/8/sivi-basinci", icon: "💧", description: "Derinliği, yoğunluğu ve kabın şeklini değiştirerek basıncı gözlemle.", category: "BASINÇ" },
  { title: "Katı Basıncı Simülatörü", href: "/animasyonlar/8/katı-basıncı", icon: "⚖️", description: "Ağırlık ve temas yüzey alanını değiştir.", category: "BASINÇ" },
  { title: "Bezelyelerde Kalıtım", href: "/animasyonlar/8/kalitim", icon: "🌱", description: "Çaprazlamaları yap ve yavru özelliklerini incele.", category: "DNA VE GENETİK KOD" },
  { title: "DNA Baz Eşleşmeleri", href: "/animasyonlar/8/dna-eslesmesi", icon: "🧬", description: "DNA zincirini tamamlayarak baz eşleşmelerini öğren.", category: "DNA VE GENETİK KOD" },
  { title: "Passafenola", href: "/animasyonlar/8/passafenola", icon: "🎯", description: "Fen sorularıyla kelime turunu tamamla.", category: "EĞİTİCİ OYUN" },
];

export default function EighthGradeAnimationsPage() {
  return <AnimationDirectory grade={8} items={items} />;
}

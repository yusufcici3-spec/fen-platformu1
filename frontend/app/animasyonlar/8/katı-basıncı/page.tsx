import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";

export const metadata = {
  title: "Katı Basıncı Simülasyonu | 8. Sınıf Fen Bilimleri",
  description: "Ağırlığı ve temas yüzey alanını değiştirerek katı basıncını etkileşimli keşfet.",
};

export default function SolidPressurePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm text-lab-inkMuted">
        <Link href="/#animasyonlar" className="hover:underline">Animasyonlar</Link><span>/</span>
        <Link href="/animasyonlar/8" className="hover:underline">8. Sınıf</Link><span>/</span>
        <span aria-current="page">Katı Basıncı</span>
      </nav>
      <header className="mb-7">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark">8. SINIF · BASINÇ</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Katı Basıncını Kendin Değiştir!</h1>
        <p className="mt-3 max-w-3xl text-lab-inkMuted">Cismin ağırlığını ve temas yüzey alanını kaydırıcılarla değiştir. Basınç değerinin nasıl değiştiğini anında gözlemle ve değişkenler arasındaki ilişkiyi keşfet.</p>
      </header>
      <HtmlAnimationFrame src="/animasyonlar/katı-basıncı.html" title="Kontrol edilebilir katı basıncı simülasyonu" minHeight={760} />
      <div className="mt-8 rounded-xl border border-lab-line bg-white p-4 text-sm text-lab-inkMuted">
        <strong className="text-lab-ink">Bilimsel not:</strong> Katı basıncı, yüzeye dik kuvvetin temas alanına bölünmesiyle hesaplanır. Bu etkinlikte ağırlık kuvveti kullanılır; 1 cm² = 0,0001 m² dönüşümüyle sonuç Pascal (Pa) cinsinden gösterilir.
      </div>
      <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-semibold text-beaker">
        <Link href="/animasyonlar/8">← 8. sınıf animasyonlarına dön</Link>
        <Link href="/sinif/8/basinc">Basınç ünitesine git →</Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";

export const metadata = {
  title: "Sıvı Basıncı Laboratuvarı | 8. Sınıf Fen Bilimleri",
  description: "Derinlik, sıvı yoğunluğu ve kap yönünün sıvı basıncına etkisini etkileşimli simülasyonla keşfet.",
};

export default function LiquidPressurePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm text-lab-inkMuted">
        <Link href="/#animasyonlar" className="hover:underline">Animasyonlar</Link><span>/</span>
        <Link href="/animasyonlar/8" className="hover:underline">8. Sınıf</Link><span>/</span>
        <span aria-current="page">Sıvı Basıncı</span>
      </nav>
      <header className="mb-7">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark">8. SINIF · BASINÇ</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Sıvı Basıncı Laboratuvarı</h1>
        <p className="mt-3 max-w-3xl text-lab-inkMuted">Derinliği ve sıvının yoğunluğunu değiştir; kabı ters çevirerek ölçüm noktasının konumunu incele. Basıncın hangi değişkenlere bağlı olduğunu deneyerek keşfet.</p>
      </header>
      <HtmlAnimationFrame src="/animasyonlar/sivi-basinci.html" title="Etkileşimli sıvı basıncı laboratuvarı" minHeight={940} />
      <div className="mt-8 rounded-xl border border-lab-line bg-white p-4 text-sm leading-7 text-lab-inkMuted">
        <strong className="text-lab-ink">Bilimsel not:</strong> Sıvı basıncı, sıvının yoğunluğu ve serbest yüzeyden olan dikey derinliğe bağlıdır. Aynı sıvıda aynı derinlikte basınç aynıdır; kabın şekli veya yönü tek başına basıncı değiştirmez. Kaba sabit bir noktanın derinliği değişirse o noktadaki basınç da değişebilir.
      </div>
      <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-semibold text-beaker">
        <Link href="/animasyonlar/8">← 8. sınıf animasyonlarına dön</Link>
        <Link href="/sinif/8/basinc">Basınç ünitesine git →</Link>
      </div>
    </main>
  );
}

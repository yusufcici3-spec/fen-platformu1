import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";

export const metadata = {
  title: "Açık Hava Basıncı Laboratuvarı | 8. Sınıf Fen Bilimleri",
  description: "Torricelli deneyinde rakımı, tüp eğimini ve sıvı türünü değiştirerek açık hava basıncını etkileşimli simülasyonla keşfet.",
};

export default function AtmosphericPressurePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm text-lab-inkMuted">
        <Link href="/#animasyonlar" className="hover:underline">Animasyonlar</Link><span>/</span>
        <Link href="/animasyonlar/8" className="hover:underline">8. Sınıf</Link><span>/</span>
        <span aria-current="page">Açık Hava Basıncı</span>
      </nav>
      <header className="mb-7">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark">8. SINIF · BASINÇ</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Açık Hava Basıncı Laboratuvarı</h1>
        <p className="mt-3 max-w-3xl text-lab-inkMuted">Torricelli deneyini sanal olarak yap. Rakımı değiştirerek açık hava basıncının azalmasını izle; tüpü eğ, kalınlığını ve sıvıyı değiştir, sıvı sütununun yüksekliğini nelerin belirlediğini keşfet.</p>
      </header>
      <HtmlAnimationFrame src="/animasyonlar/acik-hava-basinci.html" title="Kontrol edilebilir açık hava basıncı (Torricelli) simülasyonu" minHeight={1000} />
      <div className="mt-8 rounded-xl border border-lab-line bg-white p-4 text-sm leading-7 text-lab-inkMuted">
        <strong className="text-lab-ink">Bilimsel not:</strong> Açık hava basıncı, atmosferdeki hava moleküllerinin ağırlığından kaynaklanır ve her yöne etki eder. Deniz seviyesinde yaklaşık 76 cmHg (≈ 101 325 Pa) değerindedir; yükseldikçe azalır. Torricelli deneyinde sıvı sütununun dikey yüksekliği, tüpün eğimine ve kalınlığına bağlı değildir.
      </div>
      <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-semibold text-beaker">
        <Link href="/animasyonlar/8">← 8. sınıf animasyonlarına dön</Link>
        <Link href="/sinif/8/basinc">Basınç ünitesine git →</Link>
      </div>
    </main>
  );
}

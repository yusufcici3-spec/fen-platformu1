import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";

export const metadata = {
  title: "Eşeysiz Üreme Çeşitleri | 6. Sınıf Fen Bilimleri",
  description: "Bölünme, tomurcuklanma, rejenerasyon ve vejetatif üremeyi kendin kontrol ederek incele.",
};

export default function AsexualReproductionPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm text-lab-inkMuted">
        <Link href="/#animasyonlar" className="hover:underline">Animasyonlar</Link><span>/</span>
        <Link href="/animasyonlar/6" className="hover:underline">6. Sınıf</Link><span>/</span>
        <span aria-current="page">Eşeysiz Üreme</span>
      </nav>
      <header className="mb-7">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark">6. SINIF · CANLILARDA SİSTEMLER · FB.6.3.1</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Eşeysiz Üreme Çeşitleri</h1>
        <p className="mt-3 max-w-3xl text-lab-inkMuted">Bölünme, tomurcuklanma, rejenerasyon ve vejetatif üremeyi sen kontrol et: canlıyı seç, ilerleme çubuğunu sürükle, deniz yıldızının kolunu ya da planaryayı kes ve sonunda kendini dene.</p>
      </header>
      <HtmlAnimationFrame src="/animasyonlar/esesiz-ureme.html" title="Kontrol edilebilir eşeysiz üreme animasyonu" minHeight={860} />
      <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-semibold text-beaker">
        <Link href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link>
        <Link href="/sinif/6/canlilarda-sistemler">Canlılarda Sistemler ünitesine git →</Link>
      </div>
    </main>
  );
}

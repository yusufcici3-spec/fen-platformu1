import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";

export const metadata = {
  title: "MilyonerFen 8 | 8. Sınıf Fen Bilimleri",
  description: "Ünitelerini seç, her üniteden 30 soruluk havuzla MilyonerFen 8 yarışmasına katıl.",
};

export default function MilyonerFen8Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm text-lab-inkMuted">
        <Link href="/#animasyonlar" className="hover:underline">Animasyonlar</Link><span>/</span>
        <Link href="/animasyonlar/8" className="hover:underline">8. Sınıf</Link><span>/</span>
        <span aria-current="page">MilyonerFen 8</span>
      </nav>
      <header className="mb-7">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark">8. SINIF · TÜM ÜNİTELER</span>
        <h1 className="mt-2 font-display text-3xl font-bold">MilyonerFen 8</h1>
        <p className="mt-3 max-w-3xl text-lab-inkMuted">Ünitelerini seç, 15 soruluk yarışmaya başla. Her ünitede 30 soruluk soru havuzu, dört seçenek ve üç joker seni bekliyor.</p>
      </header>
      <HtmlAnimationFrame src="/animasyonlar/milyoner-8.html" title="8. sınıf MilyonerFen bilgi yarışması" minHeight={900} />
      <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-semibold text-beaker">
        <Link href="/animasyonlar/8">← 8. sınıf animasyonlarına dön</Link>
        <Link href="/sinif/8">8. sınıf ünitelerine git →</Link>
      </div>
    </main>
  );
}

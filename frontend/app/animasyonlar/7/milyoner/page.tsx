import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";

export const metadata = {
  title: "Milyonerden | 7. Sınıf Fen Bilimleri",
  description: "Uzay araştırmaları, kuvvet ve enerji konularından 15 soruluk Kim Milyoner Olmak İster tarzı bilgi yarışması; jokerler ve ödüller seninle.",
};

export default function MilyonerPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm text-lab-inkMuted">
        <Link href="/#animasyonlar" className="hover:underline">Animasyonlar</Link><span>/</span>
        <Link href="/animasyonlar/7" className="hover:underline">7. Sınıf</Link><span>/</span>
        <span aria-current="page">Milyonerden</span>
      </nav>
      <header className="mb-7">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark">7. SINIF · 1. VE 2. ÜNİTE</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Milyonerden</h1>
        <p className="mt-3 max-w-3xl text-lab-inkMuted">15 soruyu doğru bil, oyun parasıyla 1.000.000 ₺&apos;ye ulaş! Yarı yarıya, seyirciye sor ve telefon jokerlerini akıllıca kullan. 5. ve 10. sorular güvenli basamaktır.</p>
      </header>
      <HtmlAnimationFrame src="/animasyonlar/milyoner-7.html" title="7. sınıf Milyonerden bilgi yarışması" minHeight={640} />
      <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-semibold text-beaker">
        <Link href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link>
        <Link href="/sinif/7">7. sınıf ünitelerine git →</Link>
      </div>
    </main>
  );
}

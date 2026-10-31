import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";

export const metadata = {
  title: "Sindirim Sistemi Animasyonu | 7. Sınıf Fen Bilimleri",
  description: "Besinin ağızdan anüse kadar sindirim kanalındaki yolculuğunu kontrol edilebilir animasyonla keşfet.",
};

export default function DigestiveSystemPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm text-lab-inkMuted">
        <Link href="/#animasyonlar" className="hover:underline">Animasyonlar</Link><span>/</span>
        <Link href="/animasyonlar/7" className="hover:underline">7. Sınıf</Link><span>/</span>
        <span aria-current="page">Sindirim Sistemi</span>
      </nav>
      <header className="mb-7">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark">7. SINIF · VÜCUDUMUZDAKİ SİSTEMLER</span>
        <h1 className="mt-2 font-display text-3xl font-bold">Sindirim Sistemini Keşfet</h1>
        <p className="mt-3 max-w-3xl text-lab-inkMuted">Besin taneciğini ağızdan başlayarak sindirim kanalında ilerlet. Organları seç, görevlerini oku ve animasyonu oynatıp duraklatarak sindirimin aşamalarını gözlemle.</p>
      </header>
      <HtmlAnimationFrame src="/animasyonlar/sindirim-sistemi.html" title="Kontrol edilebilir sindirim sistemi animasyonu" minHeight={780} />
      <div className="mt-8 flex flex-wrap justify-between gap-4 text-sm font-semibold text-beaker">
        <Link href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link>
        <Link href="/sinif/7/vucudumuzdaki-sistemler">Vücudumuzdaki Sistemler ünitesine git →</Link>
      </div>
    </main>
  );
}

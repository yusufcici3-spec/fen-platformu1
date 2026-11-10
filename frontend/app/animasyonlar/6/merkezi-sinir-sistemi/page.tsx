import Link from "next/link";
import CentralNervousSystemSimulator from "@/components/animations/CentralNervousSystemSimulator/CentralNervousSystemSimulator";

export const metadata = {
  title: "Merkezi Sinir Sistemi Animasyonu | 6. Sınıf Fen Bilimleri",
  description: "Beyin, beyincik, omurilik soğanı ve omuriliği etkileşimli simülasyonla keşfet.",
};

export default function CentralNervousSystemPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/#animasyonlar" className="hover:text-indigo-600">Animasyonlar</Link>
          <span>/</span>
          <Link href="/animasyonlar/6" className="hover:text-indigo-600">6. Sınıf</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Merkezi Sinir Sistemi</span>
        </nav>
        <header className="rounded-3xl bg-gradient-to-r from-indigo-950 to-sky-950 px-5 py-7 text-white sm:px-8">
          <span className="text-xs font-black tracking-[.2em] text-cyan-300">6. SINIF · CANLILARDA SİSTEMLER</span>
          <h1 className="mt-2 text-3xl font-black">Merkezi Sinir Sistemini Keşfet</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Bölümleri kendin seç, görevlerini incele ve refleks ile istemli hareket arasındaki farkı deneyerek öğren.</p>
        </header>
        <CentralNervousSystemSimulator />
        <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 py-5 text-sm font-semibold dark:border-slate-800">
          <Link href="/animasyonlar/6" className="text-indigo-600 hover:underline">← 6. sınıf animasyonlarına dön</Link>
          <Link href="/sinif/6/canlilarda-sistemler" className="text-indigo-600 hover:underline">Canlılarda Sistemler ünitesine git →</Link>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import SpaceTechnologySimulator from "@/components/animations/SpaceTechnologySimulator/SpaceTechnologySimulator";
import StellarEvolutionSimulator from "@/components/animations/StellarEvolutionSimulator/StellarEvolutionSimulator";

export const metadata = { title: "Uzay Teknolojileri ve Yıldızlar | 7. Sınıf Fen Bilimleri" };

export default function SpaceAndStarsPage() {
  return <main className="mx-auto min-h-screen max-w-6xl px-4 py-8"><Link href="/animasyonlar/7" className="text-sm font-bold text-blue-600">← 7. Sınıf animasyon listesi</Link><header className="my-6 rounded-3xl bg-slate-900 p-6 text-white sm:p-9"><span className="text-xs font-black tracking-widest text-cyan-300">7. SINIF · UZAYI KEŞFET</span><h1 className="mt-3 text-3xl font-black">Uzay araçları ve yıldızların yaşamı</h1><p className="mt-3 text-sm leading-6 text-slate-300">Uzay teknolojilerini incele; yıldızların yaşam aşamalarını karşılaştır.</p></header><h2 className="mb-4 text-2xl font-extrabold">Uzay teknolojileri</h2><SpaceTechnologySimulator /><h2 className="mb-4 mt-10 text-2xl font-extrabold">Yıldızların yaşam döngüsü</h2><StellarEvolutionSimulator /></main>;
}

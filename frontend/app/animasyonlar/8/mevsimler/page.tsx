import Link from "next/link";
import SeasonsSimulator from "@/components/animations/SeasonsSimulator/SeasonsSimulator";

export const metadata = { title: "Mevsimler ve İklim | 8. Sınıf Fen Bilimleri" };

export default function SeasonsPage() {
  return <main className="mx-auto min-h-screen max-w-6xl px-4 py-8"><Link href="/animasyonlar/8" className="text-sm font-bold text-blue-600">← 8. Sınıf animasyon listesi</Link><header className="my-6 rounded-3xl bg-slate-900 p-6 text-white sm:p-9"><span className="text-xs font-black tracking-widest text-cyan-300">8. SINIF · MEVSİMLER VE İKLİM</span><h1 className="mt-3 text-3xl font-black">Güneş açısı ve mevsimler</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Tarihi, enlemi ve Güneş saatini değiştirerek mevsimleri ve gölge boyunu keşfet.</p></header><SeasonsSimulator /></main>;
}

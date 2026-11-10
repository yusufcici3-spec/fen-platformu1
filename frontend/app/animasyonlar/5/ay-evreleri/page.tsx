import Link from "next/link";
import MoonPhasesSimulator from "@/components/animations/MoonPhasesSimulator/MoonPhasesSimulator";

export const metadata = { title: "Ay'ın Evreleri | 5. Sınıf Fen Bilimleri" };

export default function MoonPhasesPage() {
  return <main className="mx-auto min-h-screen max-w-6xl px-4 py-8"><Link href="/animasyonlar/5" className="text-sm font-bold text-blue-600">← 5. Sınıf animasyon listesi</Link><header className="my-6 rounded-3xl bg-slate-900 p-6 text-white sm:p-9"><span className="text-xs font-black tracking-widest text-cyan-300">5. SINIF · GÖKYÜZÜNÜ KEŞFET</span><h1 className="mt-3 text-3xl font-black">Ay'ın evrelerini keşfet</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Güneş ışığı, Dünya ve Ay'ın hareketlerini takip ederek Ay'ın evrelerini incele.</p></header><MoonPhasesSimulator /></main>;
}

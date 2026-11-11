import Link from "next/link";
import SolarSystemSimulator from "@/components/animations/SolarSystemSimulator/SolarSystemSimulator";

export const metadata = { title: "Güneş Sistemi ve Tutulmalar | 6. Sınıf Fen Bilimleri" };

export default function SolarSystemPage() {
  return <main className="mx-auto min-h-screen max-w-6xl px-4 py-8"><Link href="/animasyonlar/6" className="text-sm font-bold text-blue-600">← 6. Sınıf animasyon listesi</Link><header className="my-6 rounded-3xl bg-slate-900 p-6 text-white sm:p-9"><span className="text-xs font-black tracking-widest text-cyan-300">6. SINIF · GÜNEŞ SİSTEMİ</span><h1 className="mt-3 text-3xl font-black">Gezegenleri keşfet</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Güneş çevresindeki sekiz gezegeni seç, incele ve özelliklerini karşılaştır.</p></header><SolarSystemSimulator /><section className="mt-8 overflow-hidden rounded-3xl bg-slate-950 text-white"><div className="p-6"><h2 className="text-2xl font-bold">Tutulma simülatörü</h2><p className="mt-2 text-sm text-slate-300">Ay&#39;ı yörüngesinde hareket ettirerek Güneş ve Ay tutulmalarını gözlemle.</p></div><iframe title="Güneş ve Ay tutulması simülatörü" src="/tutulmalar/interaktif.html" className="h-[720px] w-full border-0" loading="lazy" allowFullScreen /></section></main>;
}

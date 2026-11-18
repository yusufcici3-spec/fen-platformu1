import Link from "next/link";
import PhotosynthesisLab from "@/components/animations/PhotosynthesisLab";

export const metadata = { title: "Fotosentez Laboratuvarı | 8. Sınıf Fen Bilimleri" };

export default function PhotosynthesisPage() {
  return <main className="mx-auto min-h-screen max-w-6xl px-4 py-8"><Link href="/animasyonlar/8" className="text-sm font-bold text-blue-600">← 8. Sınıf animasyon listesi</Link><header className="my-6 rounded-3xl bg-slate-900 p-6 text-white sm:p-9"><span className="text-xs font-black tracking-widest text-emerald-300">8. SINIF · ENERJİ DÖNÜŞÜMLERİ VE ÇEVRE BİLİMİ</span><h1 className="mt-3 text-3xl font-black">Fotosentez Laboratuvarı</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Işık, karbondioksit ve su miktarını değiştirerek fotosentez hızını, glikoz ve oksijen üretimini keşfet.</p></header><PhotosynthesisLab /></main>;
}

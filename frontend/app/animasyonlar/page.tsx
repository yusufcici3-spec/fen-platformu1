import Link from "next/link";

export const metadata = {
  title: "Fen Bilimleri Animasyonları | Sınıfını Seç",
  description: "5, 6, 7 ve 8. sınıf fen bilimleri etkileşimli animasyonlarını sınıfına göre keşfet.",
};

const grades = [
  { grade: 5, image: "/animasyonlar/kapak/5-sinif.jpg", subtitle: "Ay, dinamometre, mikroskop ve daha fazlası", color: "from-cyan-500 to-blue-700" },
  { grade: 6, image: "/animasyonlar/kapak/6-sinif.jpg", subtitle: "Sinir sistemi, kuvvet, bitkiler ve uzay", color: "from-violet-500 to-indigo-700" },
  { grade: 7, image: "/animasyonlar/kapak/7-sinif.jpg", subtitle: "Vücudumuz, enerji, uzay ve yıldızlar", color: "from-emerald-500 to-teal-700" },
  { grade: 8, image: "/animasyonlar/kapak/8-sinif.jpg", subtitle: "Mevsimler, basınç, DNA ve kalıtım", color: "from-amber-500 to-orange-700" },
] as const;

export default function AnimationsPage() {
  return (
    <main className="min-h-[75vh] bg-gradient-to-b from-slate-50 to-white px-4 py-10 dark:from-slate-950 dark:to-slate-900 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <span className="text-xs font-black tracking-[.2em] text-blue-600 dark:text-blue-300">FEN VE BİLİM KULÜBÜ</span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">Animasyonlar</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">Önce sınıfını seç, ardından konuya ait animasyonu listeden aç ve keşfetmeye başla.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {grades.map(({ grade, image, subtitle, color }) => (
            <Link key={grade} href={`/animasyonlar/${grade}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 dark:border-slate-700 dark:bg-slate-900">
              <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${color}`}>
                <img src={image} alt={`${grade}. sınıf fen bilimleri animasyonları`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-black tracking-[.18em] text-white/75">FEN BİLİMLERİ</span>
                  <h2 className="mt-1 text-3xl font-black">{grade}. Sınıf</h2>
                  <p className="mt-2 text-xs leading-5 text-white/85">{subtitle}</p>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-extrabold text-slate-800 dark:text-white">Animasyonları gör</span>
                <span className="text-xl text-blue-600 transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

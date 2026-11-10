import Link from "next/link";

type AnimationItem = { title: string; href: string; description?: string; icon?: string; category?: string };
type Props = { grade: 5 | 6 | 7 | 8; items: AnimationItem[] };

export default function AnimationDirectory({ grade, items }: Props) {
  return (
    <main className="min-h-[70vh] bg-gradient-to-b from-slate-50 to-white px-4 py-8 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-white sm:py-12">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/animasyonlar" className="font-semibold hover:text-blue-600">Animasyonlar</Link>
          <span className="mx-2">/</span><span>{grade}. Sınıf</span>
        </nav>
        <header className="mb-7 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-violet-50 p-6 dark:border-slate-700 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950 sm:p-9">
          <span className="text-xs font-black tracking-[.18em] text-blue-700 dark:text-blue-300">FEN VE BİLİM KULÜBÜ · ETKİLEŞİMLİ ÖĞRENME</span>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{grade}. Sınıf Animasyonları</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">İncelemek istediğin animasyonu listeden seç. Her başlık kendi etkileşimli etkinliğini açar.</p>
        </header>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Animasyon ve etkinlik listesi</h2>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-200">{items.length} içerik</span>
        </div>
        <ol className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          {items.map((item, index) => (
            <li key={item.href} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <Link href={item.href} className="group flex items-center gap-4 px-4 py-4 transition hover:bg-blue-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 dark:hover:bg-slate-800 sm:px-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-lg dark:bg-slate-800">{item.icon || "🔬"}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-300">{item.category || "ETKİLEŞİMLİ ANİMASYON"} · {String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block font-bold text-slate-800 group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-300">{item.title}</span>
                  {item.description && <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{item.description}</span>}
                </span>
                <span aria-hidden="true" className="text-xl font-semibold text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">›</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/animasyonlar" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">← Sınıf seçimine dön</Link>
          <Link href={`/sinif/${grade}`} className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800">{grade}. sınıf ünitelerine git →</Link>
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function SurtunmeKuvvetiPage() {
  const [roughness, setRoughness] = useState(55);
  const [weight, setWeight] = useState(5);
  const [push, setPush] = useState(25);
  const [surface, setSurface] = useState("wood");
  const [showHint, setShowHint] = useState(false);

  const surfaceInfo = ({
    ice: { name: "Buz", emoji: "🧊", color: "#c8efff", accent: "#69bde8", base: 12 },
    tile: { name: "Fayans", emoji: "🧱", color: "#dbeafe", accent: "#8ba8c7", base: 35 },
    wood: { name: "Ahşap", emoji: "🪵", color: "#d8a46b", accent: "#9a6237", base: 55 },
    carpet: { name: "Halı", emoji: "🟫", color: "#b68b79", accent: "#754b43", base: 82 },
  } as Record<string, { name: string; emoji: string; color: string; accent: string; base: number }>)[surface];

  const maxFriction = Math.round(weight * (roughness / 100) * 10);
  const moving = push > maxFriction;
  const friction = moving ? Math.round(maxFriction * 0.8) : push;
  const difference = Math.max(0, push - maxFriction);
  const blockX = moving ? clamp(22 + difference * 2.3, 22, 245) : 22;
  const result = push === 0
    ? "Henüz itme kuvveti uygulamadın. Kuvveti artırıp deneyi başlat."
    : moving
      ? "Cisim hareket ediyor! Uygulanan kuvvet, cismin harekete başlaması için gereken en büyük sürtünmeyi aştı."
      : "Cisim yerinde duruyor. Sürtünme kuvveti, uyguladığın itme kuvvetini dengeleyerek hareketi engelliyor.";

  const preset = (key: string) => {
    setSurface(key);
    const values: Record<string, number> = { ice: 15, tile: 38, wood: 58, carpet: 88 };
    setRoughness(values[key] ?? 55);
  };

  const reset = () => {
    setRoughness(55); setWeight(5); setPush(25); setSurface("wood"); setShowHint(false);
  };

  const texture = useMemo(() => {
    if (roughness < 25) return "M0 16 H340";
    if (roughness < 50) return "M0 16 l10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5 10 -5 10 5";
    return "M0 16 l5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10 5 -10 5 10";
  }, [roughness]);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,#e0f2fe,transparent_55%),linear-gradient(180deg,#f8fafc,#eef2ff)] px-3 py-6 text-slate-800 dark:bg-[radial-gradient(ellipse_at_top,#12314b,transparent_55%),linear-gradient(180deg,#0f172a,#111827)] dark:text-slate-100 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600">Ana sayfa</Link><span>›</span>
          <Link href="/animasyonlar/5" className="hover:text-blue-600">5. sınıf animasyonları</Link><span>›</span><span className="font-semibold text-slate-700 dark:text-slate-200">Sürtünme kuvveti</span>
        </nav>

        <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-600 p-6 text-white shadow-xl sm:p-9">
          <div className="absolute -right-8 -top-12 h-56 w-56 rounded-full border-[28px] border-white/10" />
          <div className="absolute -bottom-24 right-28 h-64 w-64 rounded-full bg-cyan-300/10 blur-2xl" />
          <div className="relative max-w-3xl">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold tracking-wider">5. SINIF FEN BİLİMLERİ · KUVVET</span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Sürtünme Kuvveti Laboratuvarı 🧪</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50 sm:text-base">Zemini değiştir, cismin ağırlığını ayarla ve ne kadar kuvvet uygulayacağını seç. Sürtünmenin hareketi nasıl etkilediğini kendi deneyinle keşfet!</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded-full bg-white/15 px-3 py-2">🎚️ Ayarlanabilir deney</span><span className="rounded-full bg-white/15 px-3 py-2">📦 Hareketli cisim</span><span className="rounded-full bg-white/15 px-3 py-2">📊 Anlık sonuç</span></div>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[.88fr_1.12fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-black tracking-widest text-blue-600 dark:text-cyan-300">DENEY KONTROL PANELİ</p><h2 className="mt-1 text-xl font-black">Değişkenleri ayarla</h2></div><span className="text-3xl">🎛️</span></div>

            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between"><label className="font-bold">1. Zemin türü</label><span className="text-sm font-semibold text-slate-500">{surfaceInfo.emoji} {surfaceInfo.name}</span></div>
                <div className="grid grid-cols-4 gap-2">
                  {([["ice","🧊","Buz"],["tile","🧱","Fayans"],["wood","🪵","Ahşap"],["carpet","🟫","Halı"]] as const).map(([key,emoji,label]) => <button key={key} onClick={()=>preset(key)} className={`rounded-2xl border px-2 py-3 text-center transition ${surface===key?"border-blue-500 bg-blue-50 ring-2 ring-blue-200 dark:bg-blue-950":"border-slate-200 bg-slate-50 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800"}`}><span className="block text-2xl">{emoji}</span><span className="mt-1 block text-xs font-bold">{label}</span></button>)}
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between gap-3"><label htmlFor="rough" className="font-bold">2. Pürüzlülük</label><strong className="text-blue-600 dark:text-cyan-300">%{roughness}</strong></div>
                <input id="rough" type="range" min="0" max="100" step="5" value={roughness} onChange={e=>setRoughness(Number(e.target.value))} className="w-full accent-blue-600"/>
                <div className="flex justify-between text-xs text-slate-500"><span>Çok kaygan</span><span>Çok pürüzlü</span></div>
              </div>

              <div>
                <div className="mb-2 flex justify-between"><label htmlFor="weight" className="font-bold">3. Cismin ağırlığı</label><strong className="text-blue-600 dark:text-cyan-300">{weight} birim</strong></div>
                <input id="weight" type="range" min="1" max="10" value={weight} onChange={e=>setWeight(Number(e.target.value))} className="w-full accent-blue-600"/>
                <div className="flex justify-between text-xs text-slate-500"><span>Hafif</span><span>Ağır</span></div>
              </div>

              <div>
                <div className="mb-2 flex justify-between"><label htmlFor="push" className="font-bold">4. Uygulanan itme kuvveti</label><strong className="text-emerald-600 dark:text-emerald-400">{push} birim</strong></div>
                <input id="push" type="range" min="0" max="100" step="5" value={push} onChange={e=>setPush(Number(e.target.value))} className="w-full accent-emerald-600"/>
                <div className="flex justify-between text-xs text-slate-500"><span>İtmiyorum</span><span>Güçlü itme</span></div>
              </div>
            </div>

            <div className="mt-6 flex gap-2"><button onClick={()=>setPush(v=>clamp(v+10,0,100))} className="flex-1 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-extrabold text-white shadow hover:bg-emerald-700">＋ Kuvveti artır</button><button onClick={reset} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">↻ Sıfırla</button></div>
          </section>

          <section className="space-y-5">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800"><div><p className="text-xs font-black tracking-widest text-blue-600 dark:text-cyan-300">CANLI DENEY</p><h2 className="text-xl font-black">Cisim ve zemin</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800">{surfaceInfo.emoji} {surfaceInfo.name}</span></div>
              <div className="bg-gradient-to-b from-sky-50 to-white p-3 dark:from-slate-800 dark:to-slate-900 sm:p-5">
                <svg viewBox="0 0 360 220" role="img" aria-label="Zemin üzerinde itilen kutu ve kuvvet okları" className="w-full">
                  <defs><linearGradient id="boxGradient" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#60a5fa"/><stop offset="1" stopColor="#1d4ed8"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="3"/></filter><marker id="pushArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6Z" fill="#059669"/></marker><marker id="frictionArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6Z" fill="#ea580c"/></marker></defs>
                  <circle cx="300" cy="38" r="18" fill="#fde68a"/><path d="M300 10v-7 M300 66v-7 M272 38h-7 M335 38h-7" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
                  <ellipse cx={blockX+48} cy="169" rx="48" ry="8" fill="#0f172a" opacity=".15" filter="url(#shadow)"/>
                  <g style={{transform:`translateX(${moving?Math.min(135,difference*2.3):0}px)`,transition:"transform .55s ease-out"}}>
                    <rect x="22" y="102" width="76" height="62" rx="12" fill="url(#boxGradient)" stroke="#1e40af" strokeWidth="2"/>
                    <path d="M34 115h52M34 124h52" stroke="#bfdbfe" strokeWidth="2" opacity=".7"/>
                    <text x="60" y="147" textAnchor="middle" fill="white" fontSize="23">📦</text>
                    <text x="60" y="94" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">{weight} birim</text>
                  </g>
                  {push>0&&<g><path d={`M112 127 H${Math.min(245,112+push*1.1)}`}  stroke="#059669" strokeWidth="4" markerEnd="url(#pushArrow)" strokeLinecap="round"/><text x="180" y="115" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">İtme →</text></g>}
                  <path d="M20 171 H340" stroke="#475569" strokeWidth="3"/>
                  <rect x="20" y="174" width="320" height="30" rx="3" fill={surfaceInfo.color}/>
                  {Array.from({length:33},(_,i)=><path key={i} d={`M${20+i*10} 178 l${roughness/18} ${-Math.max(1,roughness/12)}`} stroke={surfaceInfo.accent} strokeWidth="2" opacity={roughness/100+.15}/>)}
                  <path d={`M${Math.max(40,blockX+45)} 185 h-35`} stroke="#ea580c" strokeWidth="3" markerEnd="url(#frictionArrow)"/>
                  <text x="180" y="218" textAnchor="middle" fill="currentColor" fontSize="10" opacity=".7">Zeminin pürüzlülüğü: %{roughness}</text>
                </svg>
                <div className={`mt-2 rounded-2xl px-4 py-3 text-center text-sm font-extrabold ${moving?"bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300":"bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"}`}>{moving?"🚀 Cisim hareket ediyor!":"🛑 Cisim henüz hareket etmiyor"}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950/40"><p className="text-xs font-bold text-orange-700 dark:text-orange-300">SÜRTÜNME KUVVETİ</p><p className="mt-1 text-3xl font-black text-orange-700 dark:text-orange-300">{friction}<span className="ml-1 text-sm">birim</span></p><div className="mt-3 h-2 overflow-hidden rounded-full bg-orange-200 dark:bg-orange-900"><div className="h-full rounded-full bg-orange-500 transition-all" style={{width:`${friction}%`}}/></div></div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40"><p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">İTME KUVVETİ</p><p className="mt-1 text-3xl font-black text-emerald-700 dark:text-emerald-300">{push}<span className="ml-1 text-sm">birim</span></p><div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-200 dark:bg-emerald-900"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{width:`${push}%`}}/></div></div>
            </div>
            <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40"><div className="flex items-center gap-2 font-black text-blue-900 dark:text-blue-200"><span className="text-xl">🔍</span> Deneyin sonucu</div><p className="mt-2 text-sm leading-6 text-blue-900 dark:text-blue-100">{result}</p><button onClick={()=>setShowHint(v=>!v)} className="mt-3 text-sm font-extrabold text-blue-700 underline underline-offset-4 dark:text-cyan-300">{showHint?"İpucunu gizle":"Neden böyle oldu?"}</button>{showHint&&<p className="mt-2 rounded-xl bg-white/70 p-3 text-sm leading-6 text-blue-900 dark:bg-slate-900/60 dark:text-blue-100">Pürüzlülük ve ağırlık arttıkça bu modelde en büyük statik sürtünme artar. Cisim dururken sürtünme, uygulanan kuvvete uyum sağlar; cisim kaymaya başladığında sürtünme modeli biraz azalır.</p>}</div>
          </section>
        </div>

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-7">
          <p className="text-xs font-black tracking-widest text-violet-600 dark:text-violet-300">KEŞFET · KARŞILAŞTIR · YORUMLA</p><h2 className="mt-1 text-2xl font-black">Küçük bilim insanının görevleri 🧑‍🔬</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <article className="rounded-2xl bg-sky-50 p-4 dark:bg-sky-950/40"><span className="text-2xl">🧊</span><h3 className="mt-2 font-extrabold">Kaygan zemini dene</h3><p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">Buz seç. Cismi hareket ettirmek için gereken kuvveti gözlemle.</p></article>
            <article className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-950/40"><span className="text-2xl">🪵</span><h3 className="mt-2 font-extrabold">Pürüzlülüğü artır</h3><p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">Aynı ağırlıkta kal. Pürüzlülüğü artırınca ne değişiyor?</p></article>
            <article className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/40"><span className="text-2xl">📦</span><h3 className="mt-2 font-extrabold">Ağırlığı artır</h3><p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">Zemini değiştirmeden ağırlığı artır ve sonucu karşılaştır.</p></article>
          </div>
          <div className="mt-5 rounded-2xl bg-violet-50 p-4 text-sm leading-6 text-violet-950 dark:bg-violet-950/40 dark:text-violet-100"><b>Hatırla:</b> Sürtünme kuvveti hareketi zorlaştırabilir; yürümemizi ve araçların fren yapmasını da sağlar. Bu ekrandaki sayılar gerçek ölçüm değil, ilişkileri keşfetmek için hazırlanmış basitleştirilmiş bir modeldir.</div>
        </section>

        <footer className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm dark:border-slate-700 dark:bg-slate-900/80"><Link href="/animasyonlar/5" className="font-bold text-blue-700 hover:underline dark:text-cyan-300">← 5. sınıf animasyonlarına dön</Link><span className="text-slate-500">Fen ve Bilim Kulübü · Etkileşimli öğrenme</span></footer>
      </div>
    </main>
  );
}

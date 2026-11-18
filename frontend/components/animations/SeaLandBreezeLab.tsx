"use client";

import { useMemo, useState } from "react";

type Phase = "day" | "night";

export default function SeaLandBreezeLab() {
  const [phase, setPhase] = useState<Phase>("day");
  const [playing, setPlaying] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [answer, setAnswer] = useState<number | null>(null);

  const data = useMemo(() => phase === "day" ? {
    sea: 22, land: 34, name: "Deniz meltemi", from: "Denizden karaya",
    explanation: "Gündüz kara, denize göre daha hızlı ısınır. Karada yükselen sıcak hava alçak basınç oluşturur. Daha serin ve yüksek basınçlı deniz havası karaya doğru hareket eder.",
    seaPressure: "Yüksek", landPressure: "Alçak", direction: "Mavi oklar: denizden karaya"
  } : {
    sea: 25, land: 17, name: "Kara meltemi", from: "Karadan denize",
    explanation: "Gece kara, denize göre daha hızlı soğur. Deniz daha sıcak kalır ve üzerindeki hava yükselir. Daha serin ve yüksek basınçlı kara havası denize doğru hareket eder.",
    seaPressure: "Alçak", landPressure: "Yüksek", direction: "Mavi oklar: karadan denize"
  }, [phase]);

  const correct = phase === "day" ? 0 : 1;
  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
          <div><div className="text-xs font-black tracking-widest text-cyan-300">ETKİLEŞİMLİ KIYI SİMÜLATÖRÜ</div><h2 className="mt-1 text-xl font-black">Rüzgârın yönünü sen değiştir</h2></div>
          <div className="flex gap-2">
            <button onClick={() => {setPhase("day"); setAnswer(null);}} className={`rounded-full px-4 py-2 text-sm font-bold ${phase === "day" ? "bg-amber-300 text-slate-950" : "bg-white/10 text-white"}`}>☀️ Gündüz</button>
            <button onClick={() => {setPhase("night"); setAnswer(null);}} className={`rounded-full px-4 py-2 text-sm font-bold ${phase === "night" ? "bg-indigo-300 text-slate-950" : "bg-white/10 text-white"}`}>🌙 Gece</button>
          </div>
        </div>
        <div className="relative">
          <svg viewBox="0 0 900 470" role="img" aria-label={phase === "day" ? "Gündüz deniz meltemi: denizden karaya esen rüzgâr" : "Gece kara meltemi: karadan denize esen rüzgâr"} className="block h-auto w-full">
            <defs>
              <linearGradient id="skyBreeze" x2="0" y2="1"><stop stopColor={phase === "day" ? "#60b9e8" : "#111b42"}/><stop offset="1" stopColor={phase === "day" ? "#d5efff" : "#34436d"}/></linearGradient>
              <linearGradient id="seaBreeze" x2="0" y2="1"><stop stopColor="#2496c5"/><stop offset="1" stopColor="#075078"/></linearGradient>
              <linearGradient id="landBreeze" x2="0" y2="1"><stop stopColor="#7ac66b"/><stop offset="1" stopColor="#28634b"/></linearGradient>
              <marker id="windHead" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#e7fbff"/></marker>
            </defs>
            <rect width="900" height="470" fill="url(#skyBreeze)"/>
            {phase === "day" ? <><circle cx="720" cy="90" r="42" fill="#ffe58a"/><g fill="#fff" opacity=".65"><ellipse cx="150" cy="100" rx="55" ry="15"/><ellipse cx="185" cy="92" rx="34" ry="22"/><ellipse cx="530" cy="135" rx="48" ry="13"/></g></> : <><circle cx="720" cy="90" r="34" fill="#f3f1d6"/><circle cx="735" cy="78" r="31" fill="#26365e"/>{Array.from({length:24},(_,i)=><circle key={i} cx={(i*83+27)%880} cy={(i*47+24)%250} r="2" fill="#fff" opacity=".7"/>)}</>}
            <path d="M0 285 Q180 275 350 292 L470 300 L470 470 L0 470Z" fill="url(#seaBreeze)"/>
            <path d="M470 300 Q560 290 650 278 Q760 260 900 275 L900 470 L470 470Z" fill="url(#landBreeze)"/>
            <path d="M470 300 Q560 290 650 278 Q760 260 900 275" fill="none" stroke="#f1d59c" strokeWidth="9"/>
            <g fill="#f7e5bd" stroke="#61452f" strokeWidth="3"><path d="M655 245 l42 -32 42 32 v48 h-84Z"/><path d="M760 255 l35 -27 37 27 v38 h-72Z"/></g>
            <g fill="#5d91ba"><rect x="674" y="257" width="14" height="18"/><rect x="715" y="257" width="14" height="18"/><rect x="783" y="264" width="13" height="17"/></g>
            <g fill="#20533b"><path d="M610 290 l-18 -42 36 0Z"/><path d="M610 270 l-22 -30 44 0Z"/><rect x="606" y="286" width="8" height="20"/><path d="M850 290 l-22 -50 44 0Z"/><path d="M850 267 l-25 -33 50 0Z"/><rect x="846" y="285" width="8" height="20"/></g>
            <g fill="#fff" fontSize="22" fontWeight="800"><text x="105" y="340">DENİZ</text><text x="690" y="340">KARA</text></g>
            {showLabels && <g fontSize="18" fontWeight="800"><rect x="38" y="365" width="190" height="48" rx="18" fill="#082f49" opacity=".9"/><text x="58" y="396" fill="#fff">Deniz {data.sea} °C</text><rect x="672" y="365" width="190" height="48" rx="18" fill="#17452f" opacity=".95"/><text x="692" y="396" fill="#fff">Kara {data.land} °C</text></g>}
            <g fill="none" stroke="#e7fbff" strokeWidth="6" strokeLinecap="round" markerEnd="url(#windHead)">
              {phase === "day" ? <><path d="M130 245 Q300 210 455 245" strokeDasharray="15 13" className={playing ? "breeze-flow" : ""}/><path d="M760 160 Q590 120 470 175" strokeDasharray="12 12" opacity=".45"/></> : <><path d="M760 245 Q590 210 455 245" strokeDasharray="15 13" className={playing ? "breeze-flow" : ""}/><path d="M130 160 Q300 120 470 175" strokeDasharray="12 12" opacity=".45"/></>}
            </g>
            <g fontSize="17" fontWeight="900" fill="#fff"><text x="340" y="205">YÜZEY RÜZGÂRI</text><text x="355" y="80">ÜST SEVİYEDE DÖNÜŞ</text></g>
            <g stroke="#fff" strokeWidth="4" fill="none" opacity=".8"><path d={phase === "day" ? "M760 195 Q700 120 600 150" : "M130 195 Q220 120 310 150"} strokeDasharray="8 9"/><path d={phase === "day" ? "M600 150 l20 -2 l-8 18" : "M310 150 l-20 -2 l8 18"}/></g>
            <rect x="20" y="18" width="240" height="42" rx="20" fill="#06172c" opacity=".75"/><text x="42" y="46" fill="#fff" fontSize="19" fontWeight="800">{phase === "day" ? "☀️ GÜNDÜZ" : "🌙 GECE"}</text>
          </svg>
          <style>{`.breeze-flow{animation:breezeDash 2.4s linear infinite}@keyframes breezeDash{to{stroke-dashoffset:-112}}@media(prefers-reduced-motion:reduce){.breeze-flow{animation:none}}`}</style>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-900 p-4">
          <div><div className="text-xs text-slate-400">GÖZLEMLENEN RÜZGÂR</div><div className="text-lg font-black text-cyan-200">{data.name} · {data.from}</div></div>
          <div className="flex gap-2"><button onClick={() => setPlaying(!playing)} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">{playing ? "⏸ Animasyonu durdur" : "▶ Animasyonu oynat"}</button><button onClick={() => setShowLabels(!showLabels)} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">{showLabels ? "Etiketleri gizle" : "Etiketleri göster"}</button></div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-slate-900"><div className="text-xs font-black tracking-wider text-sky-700">DENİZ ÜZERİNDE</div><div className="mt-2 text-2xl font-black">{data.seaPressure} basınç</div><p className="mt-1 text-sm">Sıcaklık: {data.sea} °C</p></div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-slate-900"><div className="text-xs font-black tracking-wider text-emerald-700">KARA ÜZERİNDE</div><div className="mt-2 text-2xl font-black">{data.landPressure} basınç</div><p className="mt-1 text-sm">Sıcaklık: {data.land} °C</p></div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm"><h3 className="text-lg font-black">🔎 Neden böyle esiyor?</h3><p className="mt-2 leading-7">{data.explanation}</p><div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-950">Unutma: Rüzgâr, genel olarak yüksek basınç alanından alçak basınç alanına doğru eser.</div></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm"><div className="text-xs font-black tracking-widest text-indigo-600">KENDİNİ DENE</div><h3 className="mt-2 text-lg font-black">{phase === "day" ? "Gündüz deniz meltemi hangi yönde eser?" : "Gece kara meltemi hangi yönde eser?"}</h3><div className="mt-3 grid gap-2 sm:grid-cols-2">{["Denizden karaya","Karadan denize"].map((v,i)=><button key={v} onClick={()=>setAnswer(i)} className={`rounded-xl border p-3 text-left font-bold ${answer===i ? (i===correct ? "border-emerald-500 bg-emerald-50" : "border-rose-400 bg-rose-50") : "border-slate-200 bg-slate-50"}`}>{v}</button>)}</div>{answer!==null&&<p className={`mt-3 font-bold ${answer===correct?"text-emerald-700":"text-rose-700"}`}>{answer===correct?"Harika! Doğru cevap.":"Tekrar düşün: Hangi taraf daha serin ve yüksek basınçlı?"}</p>}</section>
    </div>
  );
}

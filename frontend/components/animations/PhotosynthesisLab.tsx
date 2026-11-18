"use client";

import { useMemo, useState } from "react";

type Level = "Az" | "Orta" | "Fazla";
const levels: Level[] = ["Az", "Orta", "Fazla"];

export default function PhotosynthesisLab() {
  const [light, setLight] = useState<Level>("Orta");
  const [co2, setCo2] = useState<Level>("Orta");
  const [water, setWater] = useState<Level>("Orta");
  const [running, setRunning] = useState(true);
  const [showEquation, setShowEquation] = useState(true);

  const result = useMemo(() => {
    const values = [1, 2, 3];
    const min = Math.min(values[levels.indexOf(light)], values[levels.indexOf(co2)], values[levels.indexOf(water)]);
    const rate = min === 1 ? "Yavaş" : min === 2 ? "Orta" : "Hızlı";
    const factor = [
      ["Işık", light, values[levels.indexOf(light)]],
      ["Karbondioksit", co2, values[levels.indexOf(co2)]],
      ["Su", water, values[levels.indexOf(water)]],
    ].filter(x => x[2] === min).map(x => x[0]).join(", ");
    return { rate, factor, oxygen: min === 1 ? "Az" : min === 2 ? "Orta" : "Fazla", glucose: min === 1 ? "Az" : min === 2 ? "Orta" : "Fazla", min };
  }, [light, co2, water]);

  const controls = [
    { title: "Işık miktarı", value: light, set: setLight, icon: "☀️", note: "Işık enerjisi fotosentez için gereklidir." },
    { title: "Karbondioksit miktarı", value: co2, set: setCo2, icon: "💨", note: "CO₂ yapraklardaki gözeneklerden alınır." },
    { title: "Su miktarı", value: water, set: setWater, icon: "💧", note: "Su köklerden alınarak yapraklara taşınır." },
  ];

  return <div className="space-y-5">
    <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-slate-950 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <div><div className="text-xs font-black tracking-widest text-emerald-300">ETKİLEŞİMLİ FOTOSENTEZ LABORATUVARI</div><h2 className="mt-1 text-xl font-black">Bitki besinini nasıl üretir?</h2><p className="mt-1 text-sm text-slate-300">Girdileri değiştir ve fotosentez hızındaki değişimi gözlemle.</p></div>
        <button onClick={()=>setRunning(!running)} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">{running ? "⏸ Animasyonu durdur" : "▶ Animasyonu başlat"}</button>
      </div>
      <div className="bg-gradient-to-b from-sky-800 via-sky-500 to-emerald-900 p-2 sm:p-4">
        <svg viewBox="0 0 900 470" role="img" aria-label="Güneş ışığı alan, kökleriyle su alan ve karbondioksit kullanarak oksijen çıkaran yeşil bitki fotosentez modeli" className="block h-auto w-full rounded-2xl">
          <defs>
            <linearGradient id="photoSky" x2="0" y2="1"><stop stopColor="#123c69"/><stop offset="1" stopColor="#7dd3fc"/></linearGradient>
            <linearGradient id="photoSoil" x2="0" y2="1"><stop stopColor="#8b5e3c"/><stop offset="1" stopColor="#3d2b24"/></linearGradient>
            <marker id="photoArrow" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#fff"/></marker>
          </defs>
          <rect width="900" height="470" fill="url(#photoSky)"/>
          <circle cx="130" cy="90" r={light==="Az"?30:light==="Orta"?43:56} fill="#ffe58a" opacity=".95"/>
          {Array.from({length:7},(_,i)=><path key={i} d={`M${130+i*10-30} 145 L${380+i*16} 290`} stroke="#fff3b0" strokeWidth={light==="Fazla"?7:light==="Orta"?5:2} opacity={light==="Az"?.25:light==="Orta"?.55:.8} strokeDasharray="12 15" className={running?"photo-ray":""}/>)}
          <rect y="330" width="900" height="140" fill="url(#photoSoil)"/>
          <path d="M0 330 Q220 318 450 330 T900 330" stroke="#65a30d" strokeWidth="12" fill="none"/>
          <path d="M450 333 C448 280 452 225 450 160" stroke="#166534" strokeWidth="17" strokeLinecap="round" fill="none"/>
          <path d="M450 250 C395 210 360 200 325 190 M451 225 C510 190 545 175 585 165 M450 290 C390 270 360 260 335 255" stroke="#166534" strokeWidth="9" fill="none" strokeLinecap="round"/>
          <g fill="#22c55e" stroke="#14532d" strokeWidth="4">
            <path d="M435 205 C350 105 245 130 280 195 C320 250 390 245 435 205Z"/>
            <path d="M465 185 C520 85 640 95 625 165 C610 225 530 230 465 185Z"/>
            <path d="M430 270 C345 215 275 245 310 295 C345 330 400 310 430 270Z"/>
            <path d="M465 260 C530 205 610 225 585 285 C555 325 500 305 465 260Z"/>
          </g>
          <g stroke="#bbf7d0" strokeWidth="3" fill="none"><path d="M300 183 Q365 180 435 205 M610 155 Q535 160 465 185 M325 282 Q380 265 430 270 M570 270 Q510 260 465 260"/></g>
          <g stroke="#d6b58b" strokeWidth="6" fill="none" strokeLinecap="round"><path d="M450 330 C425 370 400 395 390 445 M450 335 C470 380 500 400 510 450 M445 350 C430 390 435 420 430 455 M460 350 C485 385 475 420 480 450"/></g>
          {Array.from({length:Math.max(2,water==="Az"?3:water==="Orta"?7:12)},(_,i)=><circle key={i} cx={390+(i*37)%120} cy={440-(i*19)%90} r="6" fill="#7dd3fc" className={running?"photo-water":""}/>)}
          {Array.from({length:co2==="Az"?2:co2==="Orta"?5:9},(_,i)=><g key={i}><circle cx={700+(i%3)*45} cy={180+Math.floor(i/3)*42} r="15" fill="#64748b" opacity=".9"/><text x={700+(i%3)*45} y={185+Math.floor(i/3)*42} textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">CO₂</text></g>)}
          {Array.from({length:result.min===1?3:result.min===2?6:10},(_,i)=><g key={i}><circle cx={225+(i%3)*40} cy={235-Math.floor(i/3)*40} r="12" fill="#dbeafe" opacity=".95" className={running?"photo-bubble":""}/><text x={225+(i%3)*40} y={239-Math.floor(i/3)*40} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#075985">O₂</text></g>)}
          <g fill="none" stroke="#fff" strokeWidth="5" markerEnd="url(#photoArrow)"><path d="M680 230 Q620 220 575 200"/><path d="M360 420 Q380 380 420 350"/><path d="M480 180 Q540 130 650 115"/></g>
          <g fill="#fff" fontSize="19" fontWeight="900"><text x="55" y="40">GÜNEŞ IŞIĞI</text><text x="675" y="75">KARBONDİOKSİT</text><text x="65" y="270">OKSİJEN ÇIKIŞI</text><text x="70" y="420">TOPRAKTA SU</text></g>
          <rect x="315" y="20" width="270" height="42" rx="20" fill="#052e16" opacity=".85"/><text x="450" y="48" fill="#fff" textAnchor="middle" fontSize="19" fontWeight="900">YAPRAK · KLOROPLAST</text>
        </svg>
        <style>{`.photo-ray{animation:rayMove 2.5s linear infinite}.photo-water{animation:waterRise 2.8s ease-in-out infinite}.photo-bubble{animation:bubbleRise 3s ease-in infinite}@keyframes rayMove{to{stroke-dashoffset:-54}}@keyframes waterRise{50%{transform:translateY(-15px)}}@keyframes bubbleRise{to{transform:translateY(-32px);opacity:.15}}@media(prefers-reduced-motion:reduce){.photo-ray,.photo-water,.photo-bubble{animation:none}}`}</style>
      </div>
      <div className="grid gap-2 bg-slate-900 p-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white/5 p-3"><div className="text-xs text-slate-400">FOTOSENTEZ HIZI</div><div className="mt-1 text-xl font-black text-emerald-300">{result.rate}</div></div>
        <div className="rounded-xl bg-white/5 p-3"><div className="text-xs text-slate-400">OKSİJEN ÜRETİMİ</div><div className="mt-1 text-xl font-black text-sky-300">{result.oxygen}</div></div>
        <div className="rounded-xl bg-white/5 p-3"><div className="text-xs text-slate-400">GLİKOZ ÜRETİMİ</div><div className="mt-1 text-xl font-black text-amber-300">{result.glucose}</div></div>
      </div>
    </section>

    <section className="grid gap-3 md:grid-cols-3">
      {controls.map(c=><div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm"><div className="font-black">{c.icon} {c.title}</div><p className="mt-1 text-xs text-slate-500">{c.note}</p><div className="mt-3 grid grid-cols-3 gap-2">{levels.map(level=><button key={level} onClick={()=>c.set(level)} className={`rounded-xl border px-2 py-2 text-sm font-bold ${c.value===level?"border-emerald-600 bg-emerald-100 text-emerald-900":"border-slate-200 bg-slate-50"}`}>{level}</button>)}</div></div>)}
    </section>

    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950"><div className="text-xs font-black tracking-widest text-emerald-700">SONUÇ VE YORUM</div><h3 className="mt-2 text-xl font-black">Fotosentez hızı: {result.rate}</h3><p className="mt-2 leading-7">Bu ayarlarda fotosentezi sınırlayan etmen: <b>{result.factor}</b>. Fotosentez hızı, gerekli girdilerden en az bulunanın miktarıyla sınırlanır. Diğer girdileri artırmak, sınırlayıcı etmen değişmedikçe hızı artırmayabilir.</p></section>

    <section className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm"><button onClick={()=>setShowEquation(!showEquation)} className="font-black text-indigo-700">{showEquation?"−":"+"} Fotosentez denklemini {showEquation?"gizle":"göster"}</button>{showEquation&&<><div className="my-4 rounded-xl bg-slate-900 p-4 text-center text-lg font-black text-white sm:text-2xl">Karbondioksit + Su <span className="text-amber-300">— Işık enerjisi →</span> Glikoz + Oksijen</div><p className="text-sm leading-6 text-slate-600">Bitkiler ışık enerjisini kullanarak karbondioksit ve sudan besin (glikoz) üretir; oksijen açığa çıkar. Fotosentez kloroplastlarda gerçekleşir.</p></>}</section>
  </div>;
}

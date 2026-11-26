"use client";

import { useMemo, useState } from "react";

type Side = "left" | "right";
const choices = [10, 20, 50, 100];

export default function EqualArmBalance() {
  const [left, setLeft] = useState<number[]>([]);
  const [right, setRight] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");
  const leftTotal = useMemo(() => left.reduce((a, b) => a + b, 0), [left]);
  const rightTotal = useMemo(() => right.reduce((a, b) => a + b, 0), [right]);
  const difference = leftTotal - rightTotal;
  const angle = Math.max(-17, Math.min(17, difference * 0.12));

  function add(side: Side, mass: number) {
    const setter = side === "left" ? setLeft : setRight;
    setter((items) => items.length >= 12 ? items : [...items, mass]);
  }
  function remove(side: Side) {
    const setter = side === "left" ? setLeft : setRight;
    setter((items) => items.slice(0, -1));
  }
  function reset() {
    setLeft([]);
    setRight([]);
    setFeedback("");
  }

  const renderWeights = (items: number[], side: Side) => items.map((mass, i) => {
    const x = (side === "left" ? 110 : 390) + ((i % 4) - 1.5) * 21;
    const y = 178 - Math.floor(i / 4) * 18;
    return <g key={i}><rect x={x - 9} y={y - 17} width="18" height="15" rx="3" fill="#e9a43b" stroke="#95601f" /><text x={x} y={y - 6} textAnchor="middle" fontSize="8" fill="#38230b">{mass}</text></g>;
  });

  return (
    <main className="mx-auto w-full max-w-4xl space-y-5 rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 shadow-sm sm:p-6">
      <style jsx>{`
        .balance-beam { transform-origin: 250px 88px; transition: transform .55s cubic-bezier(.2,.8,.2,1); }
        .pan { transition: transform .55s cubic-bezier(.2,.8,.2,1); transform-box: fill-box; transform-origin: center top; }
        .mass-button { border:1px solid #cbd5e1; border-radius:10px; padding:9px 5px; background:#eff6ff; color:#1e3a8a; font-weight:700; }
        .action-button { border:1px solid #cbd5e1; border-radius:10px; padding:9px 10px; font-weight:600; }
      `}</style>
      <header className="text-center">
        <div className="text-sm font-bold tracking-widest text-blue-700">5. SINIF • KUVVETİ TANIYALIM</div>
        <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">⚖️ Eşit Kollu Terazi</h1>
        <p className="mt-2 text-sm text-slate-600">Kefelere kütleler ekle, dengeyi gözlemle ve kütleleri karşılaştır.</p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-2 sm:p-4">
        <svg viewBox="0 0 500 270" role="img" aria-label="İki kefeli eşit kollu terazi" className="mx-auto w-full max-w-2xl">
          <defs><linearGradient id="balanceGold" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#f5ca76"/><stop offset="1" stopColor="#b97827"/></linearGradient></defs>
          <path d="M250 25 V190" stroke="#64748b" strokeWidth="9" strokeLinecap="round"/>
          <path d="M205 205 H295 L250 157 Z" fill="url(#balanceGold)" stroke="#98621e" strokeWidth="2"/>
          <circle cx="250" cy="88" r="10" fill="#d28b32" stroke="#98621c" strokeWidth="2"/>
          <g className="balance-beam" style={{ transform: `rotate(${angle}deg)` }}>
            <line x1="82" y1="88" x2="418" y2="88" stroke="#c88732" strokeWidth="11" strokeLinecap="round"/>
            <path d="M110 94 V183 M390 94 V183" stroke="#64748b" strokeWidth="3" fill="none"/>
          </g>
          <g className="pan" style={{ transform: `translateY(${difference > 0 ? 0 : difference < 0 ? 0 : 0}px) rotate(${-angle}deg)` }}>
            <path d="M58 183 Q110 220 162 183 Z" fill="#dbeafe" stroke="#3978aa" strokeWidth="3"/>
            {renderWeights(left, "left")}
          </g>
          <g className="pan" style={{ transform: `rotate(${-angle}deg)` }}>
            <path d="M338 183 Q390 220 442 183 Z" fill="#dbeafe" stroke="#3978aa" strokeWidth="3"/>
            {renderWeights(right, "right")}
          </g>
          <text x="110" y="248" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="bold">SOL KEFE</text>
          <text x="390" y="248" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="bold">SAĞ KEFE</text>
        </svg>
        <div className={`mt-2 rounded-xl px-3 py-3 text-center font-bold ${difference === 0 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`} aria-live="polite">
          {difference === 0 ? "Terazi dengede ⚖️" : difference > 0 ? "Sol kefe aşağıda ⬇️" : "Sağ kefe aşağıda ⬇️"}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(["left", "right"] as Side[]).map((side) => {
          const items = side === "left" ? left : right;
          const total = side === "left" ? leftTotal : rightTotal;
          return <div key={side} className="rounded-xl border border-slate-200 p-4">
            <h2 className="text-center font-bold">{side === "left" ? "Sol kefe" : "Sağ kefe"}</h2>
            <div className="my-2 text-center text-3xl font-extrabold text-blue-800">{total} g</div>
            <div className="grid grid-cols-4 gap-2">{choices.map((mass) => <button key={mass} className="mass-button" onClick={() => add(side, mass)} disabled={items.length >= 12}>+{mass} g</button>)}</div>
            <div className="mt-3 flex items-center justify-between gap-2 text-sm text-slate-600">
              <span>{items.length ? items.join(" + ") + " g" : "Henüz kütle eklenmedi"}</span>
              <button className="action-button" onClick={() => remove(side)} disabled={!items.length}>Sonuncuyu çıkar</button>
            </div>
          </div>;
        })}
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="font-bold">Kütleleri karşılaştır</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg bg-blue-50 p-3"><div className="text-xs text-slate-600">Sol kefe</div><strong className="text-xl">{leftTotal} g</strong></div>
          <div className="rounded-lg bg-blue-50 p-3"><div className="text-xs text-slate-600">Sağ kefe</div><strong className="text-xl">{rightTotal} g</strong></div>
        </div>
        <p className="mt-3 text-center text-sm font-semibold">{difference === 0 ? "İki kefenin kütlesi eşittir." : `Kütle farkı ${Math.abs(difference)} gramdır.`}</p>
        <button onClick={reset} className="mt-3 w-full rounded-xl bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800">↻ Teraziyi sıfırla</button>
      </section>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h2 className="font-bold text-amber-950">🎯 Mini etkinlik</h2>
        <p className="mt-1 text-sm text-amber-900">Sol kefede 50 g, sağ kefede 20 g olsaydı hangi taraf aşağı inerdi?</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="action-button bg-white" onClick={() => setFeedback("Doğru! 50 gram daha büyük olduğu için sol kefe aşağı iner.")}>Sol taraf</button>
          <button className="action-button bg-white" onClick={() => setFeedback("Tekrar düşün! 50 g mı, 20 g mı daha büyüktür?")}>Sağ taraf</button>
        </div>
        {feedback && <p className="mt-3 text-sm font-semibold" aria-live="polite">{feedback}</p>}
      </section>
      <p className="text-center text-xs text-slate-500">Bilgi: Eşit kollu terazide kütleleri eşit olan cisimler denge oluşturur.</p>
    </main>
  );
}

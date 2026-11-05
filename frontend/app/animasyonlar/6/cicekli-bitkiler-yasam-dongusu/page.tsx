"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const stages = [
  {
    title: "Tozlaşma",
    tag: "1. AŞAMA",
    description: "Arılar ve diğer tozlaştırıcılar, çiçeğin erkek organındaki polenleri dişi organın tepeciğine taşır. Polenlerin tepeciğe ulaşmasına tozlaşma denir.",
    detail: "Polenlerin taşınması rüzgârla da gerçekleşebilir.",
    icon: "🐝",
  },
  {
    title: "Döllenme",
    tag: "2. AŞAMA",
    description: "Polen, dişicik borusunda polen tüpünü oluşturur. Erkek üreme hücresi yumurtalığa ilerleyerek tohum taslağındaki yumurta hücresiyle birleşir.",
    detail: "Erkek üreme hücresi ile yumurta hücresinin birleşmesine döllenme denir.",
    icon: "🌼",
  },
  {
    title: "Tohum ve meyve oluşumu",
    tag: "3. AŞAMA",
    description: "Döllenmeden sonra tohum taslağı tohuma, yumurtalık ise meyveye dönüşür. Tohumun içinde yeni bitkiyi oluşturabilecek embriyo bulunur.",
    detail: "Tohum, uygun koşulları bulduğunda çimlenebilir.",
    icon: "🍎",
  },
  {
    title: "Çimlenme",
    tag: "4. AŞAMA",
    description: "Yeterli su, uygun sıcaklık ve oksijen bulunduğunda tohum çimlenir. Önce kök, ardından gövde ve yapraklar gelişmeye başlar.",
    detail: "Çimlenme için ışık her bitkide zorunlu değildir.",
    icon: "🌱",
  },
  {
    title: "Genç bitki",
    tag: "5. AŞAMA",
    description: "Tohumdan çıkan bitki büyümeye devam eder. Kökleri su ve mineral alır; yaprakları fotosentez yaparak besin üretir.",
    detail: "Bitki büyüdükçe yeni yapraklar ve dallar oluşturur.",
    icon: "🌿",
  },
  {
    title: "Büyüme ve gelişme",
    tag: "6. AŞAMA",
    description: "Bitki olgunlaşır, çiçek açar ve yeniden üreme sürecine katılır. Böylece bitkinin yaşam döngüsü devam eder.",
    detail: "Olgun bitkinin çiçekleri yeni tohumların oluşmasını sağlar.",
    icon: "🌳",
  },
];

function PlantScene({ stage }: { stage: number }) {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={stages[stage].title + " aşamasını gösteren bitki yaşam döngüsü çizimi"} className="scene-svg">
      <defs>
        <linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#8bdc62"/><stop offset="1" stopColor="#248b43"/></linearGradient>
        <linearGradient id="petal" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#ffd0df"/><stop offset="1" stopColor="#f2769d"/></linearGradient>
      </defs>
      <path d="M35 310 Q320 294 605 310" stroke="#b6d7a8" strokeWidth="5" fill="none" strokeLinecap="round"/>
      {stage === 0 && <>
        <path d="M320 310 V165" stroke="#278747" strokeWidth="13" strokeLinecap="round"/>
        {[-1,1].map((n)=><ellipse key={n} cx={320+n*52} cy="230" rx="48" ry="20" transform={`rotate(${n*28} ${320+n*52} 230)`} fill="url(#leaf)"/>)}
        {[0,1,2,3,4].map((n)=><ellipse key={n} cx={320+Math.cos(n*1.256)*62} cy={116+Math.sin(n*1.256)*45} rx="34" ry="21" transform={`rotate(${n*72} ${320+Math.cos(n*1.256)*62} ${116+Math.sin(n*1.256)*45})`} fill="url(#petal)" stroke="#e45e89" strokeWidth="2"/>)}
        <circle cx="320" cy="116" r="27" fill="#f7c943" stroke="#d99c1b" strokeWidth="3"/>
        <g transform="translate(470 85)"><ellipse cx="0" cy="0" rx="20" ry="14" fill="#f3b52d"/><ellipse cx="-19" cy="-17" rx="17" ry="12" fill="#fff" opacity=".9"/><ellipse cx="19" cy="-17" rx="17" ry="12" fill="#fff" opacity=".9"/><path d="M-18 0 Q0 -12 18 0" stroke="#3a3025" strokeWidth="8" fill="none"/><path d="M-9 9 L-14 21 M8 9 L14 21" stroke="#3a3025" strokeWidth="3"/><circle cx="8" cy="-4" r="3" fill="#222"/></g>
        <path d="M446 112 Q411 95 378 112" stroke="#d6a21d" strokeWidth="3" strokeDasharray="5 7" fill="none"/>
        <text x="320" y="345" textAnchor="middle" fontSize="18" fill="#27643a" fontWeight="700">Polenler tepeciğe taşınır</text>
      </>}
      {stage === 1 && <>
        <path d="M320 310 V145" stroke="#278747" strokeWidth="13" strokeLinecap="round"/>
        {[0,1,2,3,4].map((n)=><ellipse key={n} cx={320+Math.cos(n*1.256)*65} cy={85+Math.sin(n*1.256)*42} rx="33" ry="20" transform={`rotate(${n*72} ${320+Math.cos(n*1.256)*65} ${85+Math.sin(n*1.256)*42})`} fill="url(#petal)" stroke="#e45e89" strokeWidth="2"/>)}
        <path d="M320 45 V175 Q320 205 320 238" stroke="#238c46" strokeWidth="8" fill="none"/>
        <path d="M320 45 Q338 95 320 145" stroke="#f1bd26" strokeWidth="5" strokeDasharray="7 6" fill="none"/>
        <ellipse cx="320" cy="244" rx="48" ry="55" fill="#b4df52" stroke="#5d9f35" strokeWidth="4"/>
        <circle cx="320" cy="238" r="17" fill="#f4cf48" stroke="#d39b20" strokeWidth="3"/>
        <path d="M320 176 L320 218" stroke="#d79a18" strokeWidth="4" strokeDasharray="5 5"/>
        <text x="390" y="195" fontSize="17" fill="#27643a" fontWeight="700">Polen tüpü</text><path d="M380 190 L333 190" stroke="#27643a" strokeWidth="2"/>
        <text x="320" y="345" textAnchor="middle" fontSize="18" fill="#27643a" fontWeight="700">Üreme hücreleri birleşir</text>
      </>}
      {stage === 2 && <>
        <path d="M320 310 V200" stroke="#278747" strokeWidth="12" strokeLinecap="round"/>
        <path d="M320 220 Q255 150 235 205 Q260 246 320 238 Q380 246 405 205 Q385 150 320 220" fill="#8fbd3b" stroke="#548b2b" strokeWidth="4"/>
        <path d="M320 219 Q275 170 265 215 Q285 240 320 235 Q355 240 375 215 Q365 170 320 219" fill="#c5e85a"/>
        {[0,1,2].map(n=><ellipse key={n} cx={295+n*25} cy={218+(n%2)*9} rx="8" ry="13" fill="#7b4a25" transform={`rotate(25 ${295+n*25} ${218+(n%2)*9})`}/>)}
        <path d="M320 200 Q290 170 275 155" stroke="#5b9c34" strokeWidth="7" fill="none"/>
        <ellipse cx="260" cy="150" rx="42" ry="17" transform="rotate(25 260 150)" fill="url(#leaf)"/>
        <text x="320" y="345" textAnchor="middle" fontSize="18" fill="#27643a" fontWeight="700">Yumurtalık meyveye, taslak tohuma dönüşür</text>
      </>}
      {stage === 3 && <>
        <path d="M320 292 Q305 320 292 330 M320 292 Q330 320 344 331 M320 292 V340" stroke="#d6b47b" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <ellipse cx="320" cy="250" rx="35" ry="49" transform="rotate(35 320 250)" fill="#9b572a" stroke="#74401f" strokeWidth="3"/>
        <path d="M320 222 Q319 175 346 151" stroke="#2d9149" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M344 153 Q390 130 394 165 Q373 185 344 153" fill="url(#leaf)"/>
        <path d="M320 292 Q300 276 288 262" stroke="#d6b47b" strokeWidth="4" fill="none"/>
        <text x="320" y="345" textAnchor="middle" fontSize="18" fill="#27643a" fontWeight="700">Kök önce gelişmeye başlar</text>
      </>}
      {stage === 4 && <>
        <path d="M320 305 V165" stroke="#278747" strokeWidth="10" strokeLinecap="round"/>
        <path d="M320 305 Q290 330 275 340 M320 305 Q345 330 365 340 M320 305 V347" stroke="#b58b54" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {[[275,220,-30],[365,195,30],[285,165,-30],[355,140,30]].map(([x,y,r],i)=><ellipse key={i} cx={x} cy={y} rx="42" ry="18" transform={`rotate(${r} ${x} ${y})`} fill="url(#leaf)"/>)}
        <text x="320" y="345" textAnchor="middle" fontSize="18" fill="#27643a" fontWeight="700">Kök, gövde ve yapraklar gelişir</text>
      </>}
      {stage === 5 && <>
        <path d="M320 310 V95" stroke="#278747" strokeWidth="15" strokeLinecap="round"/>
        {[-1,1].map((n)=><g key={n}><path d={`M320 ${190+n*35} Q${320+n*55} ${155+n*20} ${320+n*90} ${155+n*15}`} stroke="#278747" strokeWidth="8" fill="none"/><ellipse cx={320+n*85} cy={155+n*15} rx="48" ry="22" transform={`rotate(${n*25} ${320+n*85} ${155+n*15})`} fill="url(#leaf)"/></g>)}
        {[0,1,2,3,4].map(n=><ellipse key={n} cx={320+Math.cos(n*1.256)*55} cy={65+Math.sin(n*1.256)*37} rx="30" ry="18" transform={`rotate(${n*72} ${320+Math.cos(n*1.256)*55} ${65+Math.sin(n*1.256)*37})`} fill="url(#petal)" stroke="#e45e89" strokeWidth="2"/>)}
        <circle cx="320" cy="65" r="23" fill="#f7c943" stroke="#d99c1b" strokeWidth="3"/>
        <path d="M320 310 Q280 330 250 340 M320 310 Q360 330 390 340" stroke="#b58b54" strokeWidth="6" fill="none"/>
        <text x="320" y="345" textAnchor="middle" fontSize="18" fill="#27643a" fontWeight="700">Olgun bitki yeniden çiçek açar</text>
      </>}
    </svg>
  );
}

export default function CicekliBitkilerYasamDongusuPage() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % stages.length), 3200);
    return () => window.clearInterval(timer);
  }, [playing]);

  const go = (next: number) => {
    setActive((next + stages.length) % stages.length);
    setPlaying(false);
  };

  return (
    <main className="life-page">
      <div className="life-wrap">
        <nav className="life-crumb"><Link href="/#animasyonlar">Animasyonlar</Link><span>/</span><Link href="/animasyonlar/6">6. Sınıf</Link><span>/</span><span>Bitkilerde yaşam döngüsü</span></nav>
        <header className="life-hero">
          <span className="life-kicker">6. SINIF FEN BİLİMLERİ · BİTKİLERDE ÜREME</span>
          <h1>Çiçekli Bitkilerin Yaşam Döngüsü</h1>
          <p>Bir çiçekten yeni bir bitkiye uzanan yolculuğu adım adım keşfet!</p>
        </header>

        <section className="life-panel" aria-label="Etkileşimli yaşam döngüsü animasyonu">
          <div className="life-topline"><span>{stages[active].tag}</span><span>{active + 1} / {stages.length}</span></div>
          <div className="life-progress"><span style={{ width: ((active + 1) / stages.length) * 100 + "%" }} /></div>
          <div className="life-scene"><PlantScene stage={active} /></div>
          <div className="life-copy">
            <div className="life-icon">{stages[active].icon}</div>
            <div><h2>{stages[active].title}</h2><p>{stages[active].description}</p><div className="life-detail">💡 {stages[active].detail}</div></div>
          </div>
          <div className="life-controls">
            <button type="button" className="life-secondary" onClick={() => go(active - 1)}>← Önceki</button>
            <button type="button" className="life-play" onClick={() => setPlaying(!playing)}>{playing ? "Ⅱ Duraklat" : "▶ Otomatik oynat"}</button>
            <button type="button" className="life-secondary" onClick={() => go(active + 1)}>Sonraki →</button>
          </div>
          <div className="life-steps">{stages.map((item, index) => <button type="button" key={item.title} onClick={() => go(index)} className={index === active ? "life-step active" : "life-step"} aria-current={index === active ? "step" : undefined}><span>{index + 1}</span>{item.title}</button>)}</div>
        </section>

        <aside className="life-note"><strong>Unutma:</strong> Çimlenme için su, oksijen ve uygun sıcaklık gerekir. Tohumların çimlenmesi için ışık her zaman zorunlu değildir.</aside>
        <div className="life-bottom"><Link href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link><button type="button" onClick={() => { setActive(0); setPlaying(false); }}>↻ Baştan başlat</button></div>
      </div>
      <style jsx>{`
        .life-page{min-height:100vh;background:linear-gradient(180deg,#f0f9ee 0,#f7fafc 360px,#f8fafc 100%);padding:28px 16px 56px;color:#173522}
        .life-wrap{max-width:1000px;margin:0 auto}.life-crumb{display:flex;gap:10px;flex-wrap:wrap;font-size:13px;color:#64748b;margin-bottom:24px}.life-crumb a{color:#287443;text-decoration:none;font-weight:700}
        .life-hero{text-align:center;padding:18px 8px 26px}.life-kicker{font-size:12px;letter-spacing:.13em;font-weight:900;color:#278047}.life-hero h1{font-size:clamp(28px,5vw,44px);line-height:1.12;margin:12px 0;color:#174b2b;font-weight:900}.life-hero p{font-size:17px;color:#587064;margin:0}
        .life-panel{background:white;border:1px solid #dcebdd;border-radius:26px;padding:22px;box-shadow:0 18px 50px #234c2412}.life-topline{display:flex;justify-content:space-between;color:#287443;font-size:12px;font-weight:900;letter-spacing:.08em}.life-progress{height:7px;background:#e8f2e8;border-radius:9px;margin:12px 0 18px;overflow:hidden}.life-progress span{display:block;height:100%;background:linear-gradient(90deg,#84c94f,#248747);border-radius:9px;transition:width .3s}
        .life-scene{background:linear-gradient(180deg,#f8fff5,#eff8e9);border:1px solid #e2f0dc;border-radius:20px;overflow:hidden}.scene-svg{width:100%;height:auto;max-height:360px;display:block}.life-copy{display:flex;gap:16px;align-items:flex-start;padding:22px 4px 14px}.life-icon{width:54px;height:54px;flex:none;border-radius:16px;background:#eff8e9;display:grid;place-items:center;font-size:29px}.life-copy h2{font-size:25px;font-weight:900;color:#1c6034;margin:0 0 7px}.life-copy p{font-size:15px;line-height:1.7;color:#465b4d;margin:0}.life-detail{margin-top:10px;padding:10px 13px;background:#fff8e4;border-radius:12px;color:#76591c;font-size:13px;font-weight:650}
        .life-controls{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:10px 0 20px}.life-controls button,.life-bottom button{border:0;border-radius:12px;padding:12px 18px;font-weight:800;cursor:pointer;font-size:14px}.life-secondary{background:#edf4ee;color:#28633a}.life-play{background:#238044;color:white;min-width:170px}.life-controls button:hover,.life-bottom button:hover{filter:brightness(.96)}
        .life-steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.life-step{border:1px solid #e1ebe1;background:#fbfdfb;border-radius:12px;padding:10px 5px;color:#55705c;font-size:11px;font-weight:750;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px}.life-step span{width:25px;height:25px;border-radius:50%;display:grid;place-items:center;background:#e9f2e8;color:#287443;font-size:12px}.life-step.active{border-color:#3b9855;background:#eff9ed;color:#1d6b36}.life-step.active span{background:#278047;color:white}
        .life-note{margin:18px 0 0;padding:16px 18px;background:#fff8e6;border:1px solid #f3e5b9;border-radius:14px;color:#6e5a2b;font-size:14px;line-height:1.6}.life-bottom{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-top:22px;flex-wrap:wrap}.life-bottom a{color:#287443;text-decoration:none;font-weight:800;font-size:14px}.life-bottom button{background:#e7f2e5;color:#24633a}
        @media(max-width:650px){.life-page{padding:18px 10px 40px}.life-panel{padding:13px;border-radius:19px}.life-copy{gap:11px;padding-top:16px}.life-copy h2{font-size:21px}.life-copy p{font-size:14px}.life-steps{grid-template-columns:repeat(3,minmax(0,1fr))}.life-step{font-size:10px}.life-controls button{flex:1;padding:11px 9px;font-size:12px}.life-scene .scene-svg{min-height:210px}}
        @media(prefers-reduced-motion:reduce){.life-progress span{transition:none}}
      `}</style>
    </main>
  );
}

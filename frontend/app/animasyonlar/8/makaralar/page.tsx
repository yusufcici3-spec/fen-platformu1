"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Mode = "fixed" | "movable" | "compound";
const fmt=(n:number)=>Number.isInteger(n)?String(n):n.toFixed(1).replace(".",",");
export default function MakaraLaboratuvariPage(){
 const [mode,setMode]=useState<Mode>("fixed");
 const [weight,setWeight]=useState(100);
 const [strands,setStrands]=useState(2);
 const [lift,setLift]=useState(1);
 const [showAnswer,setShowAnswer]=useState(false);\n const [quizAnswer,setQuizAnswer]=useState<number|null>(null);
 const support=mode==="fixed"?1:mode==="movable"?2:strands;
 const effort=weight/support;
 const rope=lift*support;
 const title=mode==="fixed"?"Sabit makara":mode==="movable"?"Hareketli makara":"Palanga";
 const info=mode==="fixed"?"Makaranın gövdesi tavana bağlıdır. Yükle birlikte hareket etmez; kuvvetin yönünü değiştirir, kuvvetten kazanç sağlamaz.":"Yükü taşıyan ip parçası sayısı arttıkça ideal düzende gerekli kuvvet azalır. Bunun karşılığında yükü aynı yüksekliğe çıkarmak için daha fazla ip çekilir.";
 const answer=useMemo(()=>mode==="fixed"?"Kuvvetten kazanç yoktur. Kuvvetin yönü değişir.":`İdeal düzende kuvvet kazancı ${support} kattır. Yükü 1 m yükseltmek için ${support} m ip çekilir.`,[mode,support]);
 return <main className="pulley-page"><style jsx global>{`
 .pulley-page{min-height:100vh;background:#f1f5f9;color:#172033;padding:14px 12px 45px}.pulley-wrap{max-width:1100px;margin:auto}.pulley-crumb{font-size:13px;color:#64748b;margin:5px 0 16px}.pulley-crumb a,.pulley-back{color:#2563eb;text-decoration:none;font-weight:800}.pulley-hero{border-radius:22px;padding:24px;background:linear-gradient(120deg,#172554,#075985);color:white}.pulley-hero small{color:#bae6fd;font-weight:900;letter-spacing:1.3px}.pulley-hero h1{font-size:clamp(27px,4vw,38px);font-weight:900;margin:8px 0}.pulley-hero p{color:#e0f2fe;line-height:1.6;margin:0}.pulley-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:15px 0}.pulley-btn{border:1px solid #cbd5e1;background:white;border-radius:10px;padding:10px 13px;font-size:13px;font-weight:850;color:#334155;cursor:pointer}.pulley-btn.active{background:#dbeafe;border-color:#2563eb;color:#1d4ed8}.pulley-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;align-items:start}.pulley-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px}.pulley-card h2{font-size:19px;font-weight:900;margin:0 0 6px}.pulley-muted{font-size:13px;color:#64748b;line-height:1.55;margin:0 0 12px}.pulley-svg{width:100%;height:auto;display:block;border-radius:14px;background:linear-gradient(#f8fafc,#eef6ff);border:1px solid #e2e8f0}.pulley-controls{display:grid;gap:15px;margin-top:15px}.pulley-control label{display:flex;justify-content:space-between;font-size:13px;font-weight:800;margin-bottom:6px}.pulley-control input{width:100%;accent-color:#2563eb}.pulley-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.pulley-metric{background:#f8fafc;border:1px solid #e2e8f0;border-radius:11px;padding:11px}.pulley-metric small{display:block;color:#64748b;font-size:11px;font-weight:800}.pulley-metric b{font-size:21px;font-weight:950}.pulley-callout{background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;border-radius:12px;padding:12px;font-size:13px;line-height:1.55;margin-top:12px}.pulley-quiz button{display:block;width:100%;text-align:left;border:1px solid #cbd5e1;border-radius:9px;padding:10px;background:white;margin-top:7px;color:#334155;font-size:13px}.pulley-quiz .right{background:#dcfce7;border-color:#16a34a}.pulley-quiz .wrong{background:#fee2e2;border-color:#dc2626}.pulley-legend{font-size:11px;color:#64748b;line-height:1.5;margin-top:10px}
 @media(max-width:800px){.pulley-grid{grid-template-columns:1fr}.pulley-hero{padding:20px 17px}.pulley-card{padding:13px}}
 `}</style>
 <div className="pulley-wrap">
  <nav className="pulley-crumb"><Link href="/animasyonlar">Animasyonlar</Link> / <Link href="/animasyonlar/8">8. Sınıf</Link> / Makara Laboratuvarı</nav>
  <header className="pulley-hero"><small>8. SINIF · BASİT MAKİNELER</small><h1>Makara ve Palanga Laboratuvarı</h1><p>Sabit ve hareketli makaraları, ardından palanga düzeneklerini incele. Yükü ve yükselme miktarını değiştir; gereken kuvveti ve çekmen gereken ip miktarını anında gözlemle.</p></header>
  <div className="pulley-tabs">
   <button className={"pulley-btn "+(mode==="fixed"?"active":"")} onClick={()=>{setMode("fixed");setShowAnswer(false);setQuizAnswer(null)}}>📍 Sabit makara</button>
   <button className={"pulley-btn "+(mode==="movable"?"active":"")} onClick={()=>{setMode("movable");setShowAnswer(false);setQuizAnswer(null)}}>⬆️ Hareketli makara</button>
   <button className={"pulley-btn "+(mode==="compound"?"active":"")} onClick={()=>{setMode("compound");setShowAnswer(false);setQuizAnswer(null)}}>⚙️ Palanga</button>
  </div>
  <div className="pulley-grid">
   <section className="pulley-card"><h2>{title} düzeneği</h2><p className="pulley-muted">Kontrolleri değiştirerek düzeneğin nasıl çalıştığını gözlemle.</p>
    <svg className="pulley-svg" viewBox="0 0 620 390" role="img" aria-label={title+" düzeneği çizimi"}>
     <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#2563eb"/></marker></defs>
     <rect x="28" y="24" width="564" height="22" rx="7" fill="#64748b"/><path d="M48 46V58 M572 46V58" stroke="#475569" strokeWidth="5"/>
     <text x="310" y="17" fontSize="12" fill="#475569" textAnchor="middle">TAVAN / DESTEK</text>
     {mode==="fixed"&&<><path d="M280 46V87" stroke="#475569" strokeWidth="8"/><circle cx="310" cy="112" r="37" fill="#cbd5e1" stroke="#475569" strokeWidth="8"/><circle cx="310" cy="112" r="8" fill="#475569"/><path d="M273 112V290 Q273 300 285 300 H360 V112 A37 37 0 0 1 347 81" fill="none" stroke="#d97706" strokeWidth="6" strokeLinecap="round"/><path d="M273 170V270" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arr)"/><path d="M370 210V115" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arr)"/><rect x="245" y="300" width="75" height="48" rx="7" fill="#f59e0b" stroke="#92400e" strokeWidth="3"/><text x="282" y="329" textAnchor="middle" fontWeight="bold" fill="#422006">YÜK</text><text x="415" y="208" fill="#1d4ed8" fontSize="13">Çekme yönü ↓</text></>}
     {mode==="movable"&&<><path d="M220 46V82" stroke="#475569" strokeWidth="8"/><path d="M220 82V180 Q220 195 235 195 H375 V120 A37 37 0 0 0 301 120 V195" fill="none" stroke="#d97706" strokeWidth="6" strokeLinecap="round"/><circle cx="310" cy="195" r="37" fill="#cbd5e1" stroke="#475569" strokeWidth="8"/><circle cx="310" cy="195" r="8" fill="#475569"/><path d="M273 195V280 M347 195V280" stroke="#d97706" strokeWidth="6"/><rect x="260" y="280" width="100" height="49" rx="7" fill="#f59e0b" stroke="#92400e" strokeWidth="3"/><text x="310" y="310" textAnchor="middle" fontWeight="bold" fill="#422006">YÜK</text><path d="M375 125V75" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arr)"/><text x="405" y="90" fill="#1d4ed8" fontSize="13">İpi yukarı çek</text><text x="180" y="245" fill="#0f766e" fontSize="13">Yükle birlikte</text><text x="180" y="262" fill="#0f766e" fontSize="13">makara hareket eder</text></>}
     {mode==="compound"&&<><path d="M190 46V82 M430 46V82" stroke="#475569" strokeWidth="8"/>{Array.from({length:Math.max(1,Math.ceil(support/2))},(_,i)=><g key={i}><circle cx={235+i*110} cy="104" r="25" fill="#cbd5e1" stroke="#475569" strokeWidth="6"/><circle cx={235+i*110} cy="104" r="5" fill="#475569"/></g>)}<rect x="210" y="255" width="220" height="25" rx="6" fill="#94a3b8" stroke="#475569" strokeWidth="3"/>{Array.from({length:support},(_,i)=><path key={i} d={`M${210+i*(220/Math.max(1,support-1))} 255 V${i%2===0?129:230}`} stroke="#d97706" strokeWidth="5" fill="none"/>)}<rect x="270" y="280" width="100" height="50" rx="7" fill="#f59e0b" stroke="#92400e" strokeWidth="3"/><text x="320" y="310" textAnchor="middle" fontWeight="bold" fill="#422006">YÜK</text><text x="450" y="180" fill="#1d4ed8" fontSize="13">Palanga ipi</text><text x="450" y="198" fill="#1d4ed8" fontSize="13">çekilir</text></>}
     <text x="310" y="370" textAnchor="middle" fontSize="12" fill="#64748b">Basitleştirilmiş şematik düzenek • Sürtünme ihmal edilmiştir</text>
    </svg>
    <div className="pulley-controls">
     <div className="pulley-control"><label><span>Yükün ağırlığı</span><b>{weight} N</b></label><input type="range" min="20" max="200" step="10" value={weight} onChange={e=>setWeight(+e.target.value)}/></div>
     {mode==="compound"&&<div className="pulley-control"><label><span>Yükü taşıyan ip sayısı</span><b>{strands}</b></label><input type="range" min="2" max="6" step="1" value={strands} onChange={e=>setStrands(+e.target.value)}/></div>}
     <div className="pulley-control"><label><span>Yükün yükselme miktarı</span><b>{fmt(lift)} m</b></label><input type="range" min="0.5" max="3" step="0.5" value={lift} onChange={e=>setLift(+e.target.value)}/></div>
    </div>
   </section>
   <aside className="pulley-card"><h2>📊 Deney sonuçları</h2><p className="pulley-muted">İdeal düzenek için hesaplanan değerler.</p>
    <div className="pulley-metrics"><div className="pulley-metric"><small>Uygulanması gereken kuvvet</small><b>{fmt(effort)} N</b></div><div className="pulley-metric"><small>Kuvvet kazancı</small><b>{fmt(weight/effort)} kat</b></div><div className="pulley-metric"><small>Çekilecek ip</small><b>{fmt(rope)} m</b></div><div className="pulley-metric"><small>Yükün yükselmesi</small><b>{fmt(lift)} m</b></div></div>
    <div className="pulley-callout"><b>{title} ne işe yarar?</b><br/>{info}</div>
    <div className="pulley-callout"><b>Bu deneyde:</b><br/>{mode==="fixed"?"Sabit makara yükü taşımaya destek olmaz; ipi aşağı çekerek yükü yukarı çıkarırsın.":`Yükü taşıyan ${support} ip parçası bulunduğu kabul edilmiştir. İdeal kuvvet kazancı ${support} kattır.`}</div>
    <button className="pulley-btn active" style={{width:"100%",marginTop:10}} onClick={()=>setShowAnswer(v=>!v)}>{showAnswer?"Açıklamayı gizle":"Sonucu açıkla"}</button>
    {showAnswer&&<div className="pulley-callout">{answer}<br/>Gerçek düzeneklerde sürtünme nedeniyle uygulanması gereken kuvvet daha büyük olabilir.</div>}
   </aside>
  </div>
  <section className="pulley-card pulley-quiz" style={{marginTop:14}}><h2>🎯 Öğrendiklerini kontrol et</h2><p className="pulley-muted">Sabit makara ile ilgili doğru ifade hangisidir?</p>
   {["Kuvvetten kazanç sağlar.","Kuvvetin yönünü değiştirebilir, kuvvetten kazanç sağlamaz.","Yükü taşıyan ip sayısı daima ikidir.","Yükü yükseltmek için ip çekmeye gerek yoktur."].map((v,i)=><button key={v} className={quizAnswer===i?(i===1?"right":"wrong"):""} onClick={()=>setQuizAnswer(i)}>{v}</button>)}
   {quizAnswer!==null&&<p style={{fontWeight:800,color:quizAnswer===1?"#15803d":"#b91c1c",fontSize:13,marginTop:10}}>{quizAnswer===1?"Doğru! Sabit makara kuvvetin yönünü değiştirir; ideal durumda kuvvet kazancı sağlamaz.":"Tekrar dene. Sabit makarada uyguladığın kuvvet yükün ağırlığına eşittir."}</p>}
  </section>
  <p className="pulley-legend">Not: Hesaplamalar ideal makaralar içindir; makara ve ip ağırlığı ile sürtünme ihmal edilmiştir. Palanga modelinde yükü taşıyan ip parçası sayısı seçilebilir ve ideal kuvvet kazancını belirler.</p>
  <div style={{marginTop:15}}><Link className="pulley-back" href="/animasyonlar/8">← 8. sınıf animasyonlarına dön</Link></div>
 </div></main>;
}

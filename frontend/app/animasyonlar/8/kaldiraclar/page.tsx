"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type LeverType = "first" | "second" | "third";
const fmt=(n:number)=>Number.isInteger(n)?String(n):n.toFixed(2).replace(".",",");
const descriptions:Record<LeverType,string>={
 first:"Destek noktası yük ile kuvvetin arasındadır. Kuvvet kolu yük kolundan uzunsa kuvvet kazancı; kısa ise kuvvetten kayıp olabilir.",
 second:"Yük, destek noktası ile kuvvetin arasındadır. Kuvvet kolu her zaman yük kolundan uzundur; kuvvetten kazanç, yoldan kayıp vardır.",
 third:"Kuvvet, destek noktası ile yükün arasındadır. Kuvvet kolu yük kolundan kısa olduğu için kuvvetten kayıp, yoldan kazanç vardır."
};
export default function KaldiracLaboratuvariPage(){
 const [type,setType]=useState<LeverType>("first");
 const [load,setLoad]=useState(120);
 const [loadArm,setLoadArm]=useState(2);
 const [effortArm,setEffortArm]=useState(4);
 const [lift,setLift]=useState(10);
 const [show,setShow]=useState(false);
 const [answer,setAnswer]=useState<number|null>(null);
 const actualLoadArm=type==="third"?loadArm+effortArm:loadArm;
 const actualEffortArm=type==="second"?loadArm+effortArm:effortArm;
 const force=load*actualLoadArm/actualEffortArm;
 const forceGain=load/force;
 const pathRatio=actualEffortArm/actualLoadArm;
 const pivot=type==="first"?310:85;
 const loadX=type==="first"?pivot-loadArm*45:type==="second"?pivot+loadArm*45:pivot+(effortArm+loadArm)*45;
 const effortX=type==="first"?pivot+effortArm*45:type==="second"?pivot+(loadArm+effortArm)*45:pivot+effortArm*45;
 const endX=type==="third"?pivot+(loadArm+effortArm)*55: type==="second"?pivot+(loadArm+effortArm)*35:pivot+effortArm*55;
 
 const result=useMemo(()=>`Denge için kuvvet × kuvvet kolu = yük × yük kolu. Gerekli kuvvet: ${fmt(force)} N. Kuvvet kazancı: ${fmt(forceGain)} kat.`,[force,forceGain]);
 const choose=(t:LeverType)=>{setType(t);setShow(false);setAnswer(null);if(t==="first"){setLoadArm(2);setEffortArm(4)}if(t==="second"){setLoadArm(2);setEffortArm(4)}if(t==="third"){setLoadArm(4);setEffortArm(2)}};
 return <main className="lever-page"><style jsx global>{`
 .lever-page{min-height:100vh;background:#f1f5f9;color:#172033;padding:14px 12px 45px}.lever-wrap{max-width:1100px;margin:auto}.lever-crumb{font-size:13px;color:#64748b;margin:5px 0 16px}.lever-crumb a,.lever-back{color:#2563eb;text-decoration:none;font-weight:800}.lever-hero{border-radius:22px;padding:24px;background:linear-gradient(120deg,#172554,#075985);color:white}.lever-hero small{color:#bae6fd;font-weight:900;letter-spacing:1.3px}.lever-hero h1{font-size:clamp(27px,4vw,38px);font-weight:900;margin:8px 0}.lever-hero p{color:#e0f2fe;line-height:1.6;margin:0}.lever-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:15px 0}.lever-btn{border:1px solid #cbd5e1;background:white;border-radius:10px;padding:10px 13px;font-size:13px;font-weight:850;color:#334155;cursor:pointer}.lever-btn.active{background:#dbeafe;border-color:#2563eb;color:#1d4ed8}.lever-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;align-items:start}.lever-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px}.lever-card h2{font-size:19px;font-weight:900;margin:0 0 6px}.lever-muted{font-size:13px;color:#64748b;line-height:1.55;margin:0 0 12px}.lever-svg{width:100%;height:auto;display:block;border-radius:14px;background:linear-gradient(#f8fafc,#eef6ff);border:1px solid #e2e8f0}.lever-controls{display:grid;gap:15px;margin-top:15px}.lever-control label{display:flex;justify-content:space-between;font-size:13px;font-weight:800;margin-bottom:6px}.lever-control input{width:100%;accent-color:#2563eb}.lever-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.lever-metric{background:#f8fafc;border:1px solid #e2e8f0;border-radius:11px;padding:11px}.lever-metric small{display:block;color:#64748b;font-size:11px;font-weight:800}.lever-metric b{font-size:21px;font-weight:950}.lever-callout{background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;border-radius:12px;padding:12px;font-size:13px;line-height:1.55;margin-top:12px}.lever-quiz button{display:block;width:100%;text-align:left;border:1px solid #cbd5e1;border-radius:9px;padding:10px;background:white;margin-top:7px;color:#334155;font-size:13px}.lever-quiz .right{background:#dcfce7;border-color:#16a34a}.lever-quiz .wrong{background:#fee2e2;border-color:#dc2626}.lever-note{font-size:11px;color:#64748b;line-height:1.5;margin-top:10px}@media(max-width:800px){.lever-grid{grid-template-columns:1fr}.lever-hero{padding:20px 17px}.lever-card{padding:13px}}
 `}</style>
 <div className="lever-wrap">
  <nav className="lever-crumb"><Link href="/animasyonlar">Animasyonlar</Link> / <Link href="/animasyonlar/8">8. Sınıf</Link> / Kaldıraç Laboratuvarı</nav>
  <header className="lever-hero"><small>8. SINIF · BASİT MAKİNELER</small><h1>Kaldıraç Laboratuvarı</h1><p>Destek noktasını, yükü ve kuvvetin uygulandığı yeri incele. Kol uzunluklarını ve yükü değiştirerek kuvvet kazancı ile yol kazancının nasıl değiştiğini keşfet.</p></header>
  <div className="lever-tabs">
   <button className={"lever-btn "+(type==="first"?"active":"")} onClick={()=>choose("first")}>⚖️ 1. tür kaldıraç</button>
   <button className={"lever-btn "+(type==="second"?"active":"")} onClick={()=>choose("second")}>🛒 2. tür kaldıraç</button>
   <button className={"lever-btn "+(type==="third"?"active":"")} onClick={()=>choose("third")}>🗜️ 3. tür kaldıraç</button>
  </div>
  <div className="lever-grid">
   <section className="lever-card"><h2>{type==="first"?"Birinci tür":type==="second"?"İkinci tür":"Üçüncü tür"} kaldıraç</h2><p className="lever-muted">Sürgüleri değiştir; kaldıraç kollarını ve sonuçları gözlemle.</p>
    <svg className="lever-svg" viewBox="0 0 620 360" role="img" aria-label="Kontrol edilebilir kaldıraç şeması">
     <defs><marker id="leverArrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#2563eb"/></marker></defs>
     <text x="310" y="25" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="bold">KALDIRAÇ DÜZENEĞİ</text>
     <path d={`M${type==="first"?85:75} 205 L${type==="first"?535:545} 205`} stroke="#64748b" strokeWidth="15" strokeLinecap="round"/>
     <path d={`M${pivot-32} 250 L${pivot} 205 L${pivot+32} 250 Z`} fill="#94a3b8" stroke="#475569" strokeWidth="3"/>
     <circle cx={pivot} cy="205" r="8" fill="#1e293b"/>
     <path d={`M${loadX} 198 V105`} stroke="#d97706" strokeWidth="5" markerEnd="url(#leverArrow)"/>
     <rect x={loadX-27} y="58" width="54" height="42" rx="7" fill="#f59e0b" stroke="#92400e" strokeWidth="3"/><text x={loadX} y="84" textAnchor="middle" fill="#422006" fontWeight="bold">YÜK</text>
     <path d={`M${effortX} 198 V115`} stroke="#2563eb" strokeWidth="5" markerEnd="url(#leverArrow)"/>
     <rect x={effortX-25} y="118" width="50" height="31" rx="6" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2"/><text x={effortX} y="138" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">KUVVET</text>
     <path d={`M${type==="first"?loadX: pivot} 278 V292 H${type==="first"?pivot:loadX}`} stroke="#0f766e" strokeWidth="2" fill="none"/>
     <text x={type==="first"?(loadX+pivot)/2: (pivot+loadX)/2} y="315" textAnchor="middle" fill="#0f766e" fontSize="12">Yük kolu</text>
     <path d={`M${pivot} 265 V278 H${effortX}`} stroke="#2563eb" strokeWidth="2" fill="none"/><text x={(pivot+effortX)/2} y="337" textAnchor="middle" fill="#1d4ed8" fontSize="12">Kuvvet kolu</text>
     <text x={pivot} y="270" textAnchor="middle" fill="#334155" fontSize="11">DESTEK</text>
     <text x="310" y="350" textAnchor="middle" fill="#64748b" fontSize="11">Şematik gösterim • Sürtünme ve kaldıraç ağırlığı ihmal edilmiştir</text>
    </svg>
    <div className="lever-controls">
     <div className="lever-control"><label><span>Yükün ağırlığı</span><b>{load} N</b></label><input type="range" min="20" max="200" step="10" value={load} onChange={e=>setLoad(+e.target.value)}/></div>
     <div className="lever-control"><label><span>Yük kolu</span><b>{loadArm} birim</b></label><input type="range" min="1" max="4" step="1" value={loadArm} onChange={e=>setLoadArm(+e.target.value)}/></div>
     <div className="lever-control"><label><span>Kuvvet kolu</span><b>{effortArm} birim</b></label><input type="range" min="1" max="4" step="1" value={effortArm} onChange={e=>setEffortArm(+e.target.value)}/></div>
     <div className="lever-control"><label><span>Kuvvet uygulama noktasının hareketi</span><b>{lift} cm</b></label><input type="range" min="5" max="30" step="5" value={lift} onChange={e=>setLift(+e.target.value)}/></div>
    </div>
   </section>
   <aside className="lever-card"><h2>📊 Deney sonuçları</h2><p className="lever-muted">İdeal kaldıraç için hesaplanan değerler.</p>
    <div className="lever-metrics">
     <div className="lever-metric"><small>Uygulanması gereken kuvvet</small><b>{fmt(force)} N</b></div>
     <div className="lever-metric"><small>Kuvvet kazancı</small><b>{fmt(forceGain)} kat</b></div>
     <div className="lever-metric"><small>Yol oranı (kuvvet/yük)</small><b>{fmt(pathRatio)} kat</b></div>
     <div className="lever-metric"><small>Yükün hareketi</small><b>{fmt(lift/pathRatio)} cm</b></div>
    </div>
    <div className="lever-callout"><b>Bu kaldıraçta:</b><br/>{descriptions[type]}</div>
    <div className="lever-callout"><b>Nasıl hesaplanır?</b><br/>Kuvvet × kuvvet kolu = Yük × yük kolu.<br/>Kuvvet kazancı = Yük / Kuvvet = Kuvvet kolu / Yük kolu.<br/>Yol oranı (kuvvetin aldığı yol / yükün aldığı yol) = Kuvvet kolu / Yük kolu.</div>
    <button className="lever-btn active" style={{width:"100%",marginTop:10}} onClick={()=>setShow(v=>!v)}>{show?"Açıklamayı gizle":"Sonucu açıkla"}</button>
    {show&&<div className="lever-callout">{result}<br/>Kuvvet kolu uzadıkça aynı yükü dengelemek için gereken kuvvet azalır. Kuvvetten kazanç varsa yoldan kayıp vardır.</div>}
   </aside>
  </div>
  <section className="lever-card lever-quiz" style={{marginTop:14}}><h2>🎯 Öğrendiklerini kontrol et</h2><p className="lever-muted">Hangi kaldıraç türünde kuvvetten kesinlikle kazanç, yoldan kayıp vardır?</p>
   {["Birinci tür kaldıraç","İkinci tür kaldıraç","Üçüncü tür kaldıraç","Bütün kaldıraç türleri"].map((v,i)=><button key={v} className={answer===i?(i===1?"right":"wrong"):""} onClick={()=>setAnswer(i)}>{v}</button>)}
   {answer!==null&&<p style={{fontWeight:800,color:answer===1?"#15803d":"#b91c1c",fontSize:13,marginTop:10}}>{answer===1?"Doğru! İkinci tür kaldıraçta yük destek ile kuvvet arasındadır; kuvvet kolu daha uzundur.":"Tekrar düşün: İkinci tür kaldıraçta kuvvet kolu daima yük kolundan uzundur."}</p>}
  </section>
  <p className="lever-note">Not: Hesaplamalar ideal kaldıraç içindir. Gerçek sistemlerde sürtünme ve kaldıraç çubuğunun ağırlığı sonuçları etkileyebilir. Yol kazancı ve kuvvet kazancı birbirinin tersidir.</p>
  <div style={{marginTop:15}}><Link className="lever-back" href="/animasyonlar/8">← 8. sınıf animasyonlarına dön</Link></div>
 </div></main>;
}

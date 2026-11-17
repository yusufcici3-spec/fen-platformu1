"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Charge = "negative" | "positive";
type Stage = "neutral" | "near" | "contact" | "induction-near" | "grounded" | "ground-removed" | "induction-done";
const labels: Record<Stage,string> = {
  neutral:"Nötr elektroskop", near:"Yüklü cisim yaklaştırıldı", contact:"Temas ile yükleme", "induction-near":"Etki ile elektriklenme: cisim yakında", grounded:"Topraklama yapıldı", "ground-removed":"Toprak bağlantısı kesildi", "induction-done":"Etki ile elektriklenme tamamlandı"
};
export default function ElectroscopeLab({ grade }: { grade: 7 | 8 }) {
  const [charge,setCharge] = useState<Charge>("negative");
  const [stage,setStage] = useState<Stage>("neutral");
  const [showParticles,setShowParticles] = useState(true);
  const induced = stage === "induction-done" ? (charge === "negative" ? "positive" : "negative") : null;
  const deflection = stage === "neutral" ? 0 : stage === "near" || stage === "induction-near" || stage === "grounded" || stage === "ground-removed" ? 18 : stage === "contact" || stage === "induction-done" ? 34 : 0;
  const leafCharge = stage === "contact" ? charge : induced;
  const explanation = useMemo(() => {
    switch(stage) {
      case "neutral": return "Elektroskop başlangıçta nötrdür. Yapraklar birbirini itmediği için kapalı durur.";
      case "near": return "Yüklü cisim dokunmadan yaklaştırıldı. Etki (indüksiyon) nedeniyle elektroskoptaki yükler yer değiştirir; yapraklarda aynı tür yük biriktiği için yapraklar açılır. Cisim uzaklaştırılırsa elektroskop yeniden nötr olur.";
      case "contact": return "Yüklü cisim metal başlığa dokundu. Elektron alışverişi gerçekleşir ve elektroskop temas ettiği cisimle aynı işaretli yükle yüklenir. Yapraklar aynı işaretli oldukları için açık kalır.";
      case "induction-near": return "Yüklü cisim dokunmadan yakında. Elektroskop içindeki yükler ayrışır. Şimdi cisim yakındayken başlığa dokunarak topraklama adımına geç.";
      case "grounded": return charge === "negative" ? "Negatif cisim elektronları iter. Topraklama sırasında elektronlar elektroskoptan toprağa geçer. Cisim hâlâ yakında olmalı." : "Pozitif cisim elektronları çeker. Topraklama sırasında elektronlar topraktan elektroskoba geçer. Cisim hâlâ yakında olmalı.";
      case "ground-removed": return "Önce toprak bağlantısı kesildi. Şimdi yüklü cismi uzaklaştır. Elektroskopta zıt işaretli net yük kalacak.";
      case "induction-done": return "Etki ile elektriklenme tamamlandı. Elektroskop, yaklaştırılan cismin zıt işaretiyle yüklenir. Yapraklar aynı işaretli yük taşıdığı için açık kalır.";
    }
  },[stage,charge]);
  const reset=()=>setStage("neutral");
  const next=()=>{
    if(stage==="neutral") setStage("near");
    else if(stage==="near") setStage("neutral");
    else if(stage==="induction-near") setStage("grounded");
    else if(stage==="grounded") setStage("ground-removed");
    else if(stage==="ground-removed") setStage("induction-done");
  };
  const sign=charge==="negative"?"−":"+";
  return <main className="el-page"><style jsx global>{`
    .el-page{min-height:100vh;background:#f1f5f9;color:#172033;padding:14px 12px 44px}.el-wrap{max-width:1050px;margin:auto}.el-crumb{font-size:13px;color:#64748b;margin:5px 0 16px}.el-crumb a,.el-back{color:#2563eb;text-decoration:none;font-weight:800}.el-hero{border-radius:22px;padding:24px;background:linear-gradient(120deg,#0f172a,#075985);color:#fff}.el-hero small{color:#bae6fd;font-weight:900;letter-spacing:1.2px}.el-hero h1{font-size:clamp(27px,4vw,38px);font-weight:900;margin:8px 0}.el-hero p{color:#e0f2fe;line-height:1.6;margin:0}.el-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;align-items:start;margin-top:15px}.el-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:16px}.el-card h2{font-size:19px;font-weight:900;margin:0 0 7px}.el-muted{font-size:13px;color:#64748b;line-height:1.55;margin:0 0 12px}.el-stage{background:radial-gradient(circle at 50% 20%,#334155,#0f172a);border-radius:14px;border:1px solid #475569;overflow:hidden}.el-stage svg{width:100%;height:auto;display:block}.el-controls{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.el-controls label{font-size:13px;font-weight:850;display:block;margin-bottom:6px}.el-controls select{width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:white;color:#172033}.el-btn{border:1px solid #cbd5e1;background:#fff;border-radius:10px;padding:10px 12px;font-size:13px;font-weight:850;color:#334155;cursor:pointer}.el-btn.primary{background:#e0f2fe;border-color:#38bdf8;color:#075985}.el-btn:disabled{opacity:.45;cursor:not-allowed}.el-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.el-result{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:13px;font-size:13px;line-height:1.65;color:#334155}.el-tag{display:inline-block;padding:5px 9px;border-radius:999px;background:#e0f2fe;color:#075985;font-size:12px;font-weight:900;margin-bottom:8px}.el-steps{display:grid;gap:7px;margin-top:12px}.el-step{padding:9px;border:1px solid #e2e8f0;border-radius:10px;font-size:12px;color:#475569}.el-step.active{border-color:#0ea5e9;background:#f0f9ff;color:#075985;font-weight:850}.el-note{font-size:12px;color:#64748b;line-height:1.55;margin-top:12px}@media(max-width:780px){.el-grid{grid-template-columns:1fr}.el-controls{grid-template-columns:1fr}.el-card{padding:13px}.el-hero{padding:20px 17px}}
  `}</style>
  <div className="el-wrap">
   <nav className="el-crumb"><Link href="/animasyonlar">Animasyonlar</Link> / <Link href={`/animasyonlar/${grade}`}>{grade}. Sınıf</Link> / Elektroskop</nav>
   <header className="el-hero"><small>{grade}. SINIF · ELEKTRİKLENME</small><h1>Elektroskop Laboratuvarı</h1><p>Yüklü cismi yaklaştır, elektroskoba dokundur veya etki ile elektriklenme basamaklarını uygula. Yaprakların hareketini ve yüklerin dağılımını gözlemle.</p></header>
   <div className="el-grid">
    <section className="el-card"><h2>⚡ Kontrol edilebilir elektroskop</h2><p className="el-muted">Önce cismin yükünü seç. Ardından deney türünü seçerek adımları uygula.</p>
     <div className="el-stage"><svg viewBox="0 0 620 440" role="img" aria-label="Yapraklı elektroskop ve yüklü cisim çizimi">
      <rect x="175" y="38" width="270" height="355" rx="18" fill="#cbd5e1" opacity=".13" stroke="#cbd5e1" strokeWidth="3"/>
      <rect x="195" y="55" width="230" height="320" rx="12" fill="#e0f2fe" opacity=".06" stroke="#94a3b8" strokeWidth="2"/>
      <rect x="255" y="385" width="110" height="20" rx="8" fill="#94a3b8"/>
      <path d="M310 386 L310 130" stroke="#fbbf24" strokeWidth="10" strokeLinecap="round"/>
      <ellipse cx="310" cy="113" rx="43" ry="13" fill="#fbbf24" stroke="#fef3c7" strokeWidth="3"/>
      <path d={`M310 130 L${310-deflection} ${265+deflection*.35}`} stroke="#fde68a" strokeWidth="7" strokeLinecap="round"/>
      <path d={`M310 130 L${310+deflection} ${265+deflection*.35}`} stroke="#fde68a" strokeWidth="7" strokeLinecap="round"/>
      {showParticles && leafCharge && <g fill={leafCharge==="negative"?"#60a5fa":"#fb7185"} fontSize="19" fontWeight="900" textAnchor="middle"><text x={310-deflection-7} y={250+deflection*.35}>{leafCharge==="negative"?"−":"+"}</text><text x={310+deflection+7} y={250+deflection*.35}>{leafCharge==="negative"?"−":"+"}</text><text x="310" y="155">{leafCharge==="negative"?"−":"+"}</text></g>}
      {stage==="near"||stage==="induction-near"||stage==="grounded"||stage==="ground-removed" ? <g><rect x="40" y="95" width="115" height="24" rx="12" fill={charge==="negative"?"#60a5fa":"#fb7185"} transform="rotate(-28 98 107)"/><text x="95" y="82" fill="white" fontSize="23" fontWeight="900" textAnchor="middle">{sign}{sign}{sign}</text><text x="95" y="145" fill="#e2e8f0" fontSize="13" textAnchor="middle">Yüklü çubuk</text></g>:null}
      {stage==="contact" && <g><rect x="40" y="95" width="115" height="24" rx="12" fill={charge==="negative"?"#60a5fa":"#fb7185"} transform="rotate(-28 98 107)"/><text x="95" y="82" fill="white" fontSize="23" fontWeight="900" textAnchor="middle">{sign}{sign}{sign}</text><path d="M150 116 L268 112" stroke={charge==="negative"?"#60a5fa":"#fb7185"} strokeWidth="4" strokeDasharray="7 6"/></g>}
      {stage==="grounded" && <g><path d="M310 112 L310 330 L465 330" fill="none" stroke="#4ade80" strokeWidth="4" strokeDasharray="7 6"/><path d="M450 315 L480 315 M455 325 L475 325 M460 335 L470 335" stroke="#4ade80" strokeWidth="3"/><text x="465" y="300" fill="#86efac" fontSize="14" textAnchor="middle">Toprak</text><text x="390" y="355" fill="#86efac" fontSize="16">e⁻ ⇢</text></g>}
      <text x="310" y="25" fill="#f8fafc" fontSize="17" textAnchor="middle" fontWeight="900">METAL BAŞLIK</text>
      <text x="310" y="425" fill="#cbd5e1" fontSize="13" textAnchor="middle">Yaprakların açılma miktarı şematiktir.</text>
      <text x="500" y="205" fill="#e2e8f0" fontSize="13" textAnchor="middle">Yapraklar</text>
      <path d="M465 210 L350 245" stroke="#cbd5e1" strokeWidth="1.5"/>
     </svg></div>
     <div className="el-controls"><div><label htmlFor="el-charge">Yüklü cismin türü</label><select id="el-charge" value={charge} onChange={e=>{setCharge(e.target.value as Charge);reset();}}><option value="negative">Negatif yüklü (−)</option><option value="positive">Pozitif yüklü (+)</option></select></div><div><label htmlFor="el-particles">Yük gösterimi</label><select id="el-particles" value={showParticles?"yes":"no"} onChange={e=>setShowParticles(e.target.value==="yes")}><option value="yes">Yükleri göster</option><option value="no">Yükleri gizle</option></select></div></div>
     <div className="el-actions"><button className="el-btn primary" onClick={()=>setStage("near")}>Cismi yaklaştır</button><button className="el-btn primary" onClick={()=>setStage("contact")}>Dokundur (temas)</button><button className="el-btn" onClick={()=>setStage("induction-near")}>Etki ile elektriklenmeyi başlat</button><button className="el-btn" onClick={reset}>↺ Sıfırla</button></div>
     {stage==="induction-near" && <div className="el-actions"><button className="el-btn primary" onClick={()=>setStage("grounded")}>1. Toprakla</button></div>}
     {stage==="grounded" && <div className="el-actions"><button className="el-btn primary" onClick={()=>setStage("ground-removed")}>2. Toprak bağlantısını kes</button></div>}
     {stage==="ground-removed" && <div className="el-actions"><button className="el-btn primary" onClick={()=>setStage("induction-done")}>3. Yüklü cismi uzaklaştır</button></div>}
     <div className="el-note">Not: Yaklaştırma deneyinde cisim elektroskoba dokunmaz. Etki ile elektriklenmede sıralama önemlidir: cisim yakındayken topraklama yapılır, önce toprak bağlantısı kesilir, en son yüklü cisim uzaklaştırılır.</div>
    </section>
    <aside className="el-card"><h2>🔎 Deney sonucu</h2><div className="el-tag">{labels[stage]}</div><div className="el-result">{explanation}<br/><br/><b>Elektroskobun son yükü:</b> {stage==="neutral"||stage==="near"||stage==="induction-near"||stage==="grounded"||stage==="ground-removed"?"Net yük yok / işlem tamamlanmadı":stage==="contact"?(charge==="negative"?"Negatif (−)":"Pozitif (+)"):(induced==="positive"?"Pozitif (+)":"Negatif (−)")}</div>
     <div className="el-steps"><div className={stage==="neutral"?"el-step active":"el-step"}>1. Başlangıç: nötr elektroskop</div><div className={stage==="near"?"el-step active":"el-step"}>2. Yaklaştırma: dokunma yok</div><div className={stage==="contact"?"el-step active":"el-step"}>3. Temas: aynı işaretle yüklenme</div><div className={["induction-near","grounded","ground-removed","induction-done"].includes(stage)?"el-step active":"el-step"}>4. Etki: topraklama ve sıralı işlem</div></div>
     <div className="el-note"><b>Hatırla:</b> Temasla elektriklenmede elektroskop, dokunan cismin yüküyle aynı işaretli olur. Topraklama kullanılarak yapılan etki ile elektriklenmede ise zıt işaretli olur.</div>
    </aside>
   </div>
   <section className="el-card" style={{marginTop:14}}><h2>🎯 Hızlı kontrol</h2><p className="el-muted">Negatif yüklü bir cisim, nötr elektroskoba dokundurulursa elektroskop hangi yükle yüklenir?</p><QuickCheck/></section>
   <p className="el-note"><Link className="el-back" href={`/animasyonlar/${grade}`}>← {grade}. sınıf animasyonlarına dön</Link></p>
  </div></main>;
}
function QuickCheck(){const [answer,setAnswer]=useState("");return <div style={{display:"grid",gap:7}}>{["Pozitif","Negatif","Nötr kalır"].map(v=><button key={v} className="el-btn" style={{textAlign:"left",background:answer===v?"#e0f2fe":"white"}} onClick={()=>setAnswer(v)}>{v}</button>)}{answer&&<p style={{fontSize:13,fontWeight:800,color:answer==="Negatif"?"#15803d":"#b91c1c"}}>{answer==="Negatif"?"Doğru! Temasla elektriklenmede aynı işaretli yük kazanır.":"Tekrar düşün: temas sırasında yük alışverişi olur ve elektroskop aynı işaretli yükle yüklenir."}</p>}</div>}

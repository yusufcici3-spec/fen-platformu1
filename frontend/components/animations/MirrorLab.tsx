"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

type Mirror = "concave" | "convex";
const W=780, axis=270, mirrorX=520, scale=1.25, focal=90, objectHeight=62;
export default function MirrorLab(){
 const [mirror,setMirror]=useState<Mirror>("concave");
 const [distance,setDistance]=useState(210);
 const [rays,setRays]=useState(true);
 const [labels,setLabels]=useState(true);
 const [quiz,setQuiz]=useState("");
 const isConcave=mirror==="concave";
 const image=useMemo(()=>{
  const f=isConcave?focal:-focal;
  if(isConcave && Math.abs(distance-f)<2) return {atInfinity:true,q:Infinity,m:Infinity,x:30,h:0,virtual:false,kind:"Odak noktasında"};
  const q=(f*distance)/(distance-f);
  const m=-q/distance;
  const x=mirrorX-q*scale;
  return {atInfinity:false,q,m,x:Math.max(24,Math.min(750,x)),h:objectHeight*m,virtual:q<0,kind:q<0?"Sanal":"Gerçek"};
 },[distance,isConcave]);
 const imageTop=axis-image.h;
 const imageVisible=!image.atInfinity && Math.abs(image.h)<180 && image.x>22 && image.x<755;
 const objectX=mirrorX-distance*scale;
 const objectTop=axis-objectHeight;
 const status = !isConcave ? "Sanal, düz ve cisimden küçük" :
  distance>2*focal ? "Gerçek, ters ve küçük" :
  Math.abs(distance-2*focal)<2 ? "Gerçek, ters ve cisimle aynı boyda" :
  distance>focal ? "Gerçek, ters ve büyük" :
  distance<focal ? "Sanal, düz ve büyük" : "Görüntü çok uzakta oluşur";
 const reset=()=>{setMirror("concave");setDistance(210);setRays(true);setLabels(true);setQuiz("");};
 return <main className="mir-page"><style jsx global>{`
 .mir-page{min-height:100vh;background:#f1f5f9;color:#172033;padding:14px 12px 45px}.mir-wrap{max-width:1080px;margin:auto}.mir-crumb{font-size:13px;color:#64748b;margin:5px 0 16px}.mir-crumb a,.mir-back{color:#2563eb;text-decoration:none;font-weight:800}.mir-hero{border-radius:22px;padding:24px;background:linear-gradient(120deg,#172554,#0e7490);color:#fff}.mir-hero small{color:#bae6fd;font-weight:900;letter-spacing:1.2px}.mir-hero h1{font-size:clamp(27px,4vw,38px);font-weight:900;margin:8px 0}.mir-hero p{color:#e0f2fe;line-height:1.6;margin:0}.mir-grid{display:grid;grid-template-columns:minmax(0,1fr) 285px;gap:14px;margin-top:15px;align-items:start}.mir-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:16px}.mir-card h2{font-size:19px;font-weight:900;margin:0 0 7px}.mir-muted{font-size:13px;color:#64748b;line-height:1.55;margin:0 0 12px}.mir-stage{overflow:hidden;border:1px solid #cbd5e1;border-radius:13px;background:#f8fcff}.mir-stage svg{width:100%;height:auto;display:block}.mir-controls{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:13px}.mir-controls label{display:block;font-size:13px;font-weight:850;margin-bottom:8px}.mir-controls input[type=range]{width:100%;accent-color:#0e7490}.mir-controls select{width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:10px;background:white;color:#172033}.mir-btn{border:1px solid #cbd5e1;background:#fff;border-radius:10px;padding:10px 12px;font-size:13px;font-weight:850;color:#334155;cursor:pointer}.mir-btn.active{background:#0e7490;color:#fff;border-color:#0e7490}.mir-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.mir-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.mir-metric{padding:11px;background:#f0f9ff;border:1px solid #dbeafe;border-radius:11px}.mir-metric small{display:block;color:#64748b;font-size:11px}.mir-metric b{display:block;margin-top:4px;font-size:14px;color:#075985}.mir-explain{padding:13px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;line-height:1.65;color:#334155}.mir-note{font-size:12px;color:#64748b;line-height:1.55;margin-top:12px}.mir-choice{display:block;width:100%;text-align:left;margin-top:7px}.mir-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.mir-mini{padding:12px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;font-size:13px;line-height:1.5}.mir-mini b{display:block;margin-bottom:5px}@media(max-width:780px){.mir-grid{grid-template-columns:1fr}.mir-controls,.mir-cards{grid-template-columns:1fr}.mir-card{padding:13px}.mir-hero{padding:20px 17px}}
 `}</style>
 <div className="mir-wrap">
  <nav className="mir-crumb"><Link href="/animasyonlar">Animasyonlar</Link> / <Link href="/animasyonlar/6">6. Sınıf</Link> / Çukur ve Tümsek Aynalar</nav>
  <header className="mir-hero"><small>6. SINIF · IŞIĞIN YANSIMASI</small><h1>Çukur ve Tümsek Ayna Laboratuvarı</h1><p>Cismi aynaya yaklaştırıp uzaklaştır. Işınların yansımasını, görüntünün yerini, yönünü ve büyüklüğünü birlikte gözlemle.</p></header>
  <div className="mir-grid">
   <section className="mir-card"><h2>🔭 Görüntü oluşumunu dene</h2><p className="mir-muted">Ayna türünü seç ve cisim uzaklığını kaydır. Yeşil ok cismi, kırmızı/mor ok görüntüyü gösterir.</p>
    <div className="mir-stage"><svg viewBox="0 0 780 430" role="img" aria-label="Çukur veya tümsek aynada cisim ve görüntü ışın çizimi">
     <defs><marker id="mirObj" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6Z" fill="#16a34a"/></marker><marker id="mirImg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6Z" fill="#dc2626"/></marker></defs>
     <rect width="780" height="430" fill="#f8fcff"/>
     <g stroke="#e2e8f0" strokeWidth="1">{Array.from({length:15},(_,i)=><line key={"v"+i} x1={i*55} y1="20" x2={i*55} y2="410"/>)}{Array.from({length:8},(_,i)=><line key={"h"+i} x1="20" y1={35+i*50} x2="760" y2={35+i*50}/>)}</g>
     <line x1="24" y1={axis} x2="755" y2={axis} stroke="#475569" strokeWidth="2"/><text x="746" y={axis-9} textAnchor="end" fill="#475569" fontSize="12">Ana eksen</text>
     <line x1={mirrorX-focal*scale} y1="55" x2={mirrorX-focal*scale} y2="390" stroke="#94a3b8" strokeDasharray="5 5"/><line x1={mirrorX-2*focal*scale} y1="55" x2={mirrorX-2*focal*scale} y2="390" stroke="#cbd5e1" strokeDasharray="5 5"/>
     <text x={mirrorX-focal*scale} y="45" textAnchor="middle" fill="#64748b" fontSize="13">F</text><text x={mirrorX-2*focal*scale} y="45" textAnchor="middle" fill="#64748b" fontSize="13">2F</text>
     {isConcave?<path d="M520 72 Q455 270 520 398" fill="none" stroke="#0e7490" strokeWidth="12" strokeLinecap="round"/>:<path d="M520 72 Q585 270 520 398" fill="none" stroke="#7c3aed" strokeWidth="12" strokeLinecap="round"/>}
     <path d="M530 72 Q545 270 530 398" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 5"/>
     <line x1={objectX} y1={axis} x2={objectX} y2={objectTop} stroke="#16a34a" strokeWidth="5" markerEnd="url(#mirObj)"/>
     <text x={objectX} y={axis+23} fill="#15803d" textAnchor="middle" fontSize="13" fontWeight="bold">Cisim</text>
     {rays && !image.atInfinity && <>
      <line x1={objectX} y1={objectTop} x2={mirrorX} y2={objectTop} stroke="#2563eb" strokeWidth="2.5"/>
      <line x1={mirrorX} y1={objectTop} x2={isConcave?image.x:Math.max(35,mirrorX-310)} y2={isConcave?imageTop:axis+((objectTop-axis)*.65)} stroke="#2563eb" strokeWidth="2.5"/>
      {!isConcave && <line x1={mirrorX} y1={objectTop} x2={image.x} y2={imageTop} stroke="#2563eb" strokeWidth="2" strokeDasharray="6 5"/>}
      <line x1={objectX} y1={objectTop} x2={mirrorX} y2={axis} stroke="#ea580c" strokeWidth="2.5"/>
      <line x1={mirrorX} y1={axis} x2={isConcave?image.x:Math.max(35,mirrorX-310)} y2={isConcave?imageTop:axis+((objectTop-axis)*.65)} stroke="#ea580c" strokeWidth="2.5"/>
      {!isConcave && <line x1={mirrorX} y1={axis} x2={image.x} y2={imageTop} stroke="#ea580c" strokeWidth="2" strokeDasharray="6 5"/>}
     </>}
     {imageVisible && <g><line x1={image.x} y1={axis} x2={image.x} y2={imageTop} stroke={image.virtual?"#9333ea":"#dc2626"} strokeWidth="5" strokeDasharray={image.virtual?"7 5":"none"} markerEnd="url(#mirImg)"/><text x={image.x} y={axis+24} textAnchor="middle" fill={image.virtual?"#7e22ce":"#b91c1c"} fontSize="13" fontWeight="bold">Görüntü</text></g>}
     {image.atInfinity&&<text x="690" y="105" fill="#b91c1c" fontSize="14" textAnchor="middle" fontWeight="bold">Görüntü çok uzakta</text>}
     {labels&&<g fill="#475569" fontSize="12"><text x="30" y="415">Şematik ışın çizimi · Görüntü konumu ölçekli gösterilir</text><text x="750" y="415" textAnchor="end">{isConcave?"Çukur ayna":"Tümsek ayna"}</text></g>}
    </svg></div>
    <div className="mir-controls">
     <div><label>Ayna türü</label><div style={{display:"flex",gap:7,flexWrap:"wrap"}}><button className={"mir-btn "+(isConcave?"active":"")} onClick={()=>{setMirror("concave");setDistance(210);}}>Çukur ayna</button><button className={"mir-btn "+(!isConcave?"active":"")} onClick={()=>{setMirror("convex");setDistance(210);}}>Tümsek ayna</button></div></div>
     <div><label htmlFor="mir-distance">Cismin aynaya uzaklığı: {distance} birim</label><input id="mir-distance" type="range" min="45" max="300" step="5" value={distance} onChange={e=>setDistance(Number(e.target.value))}/><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#64748b"}}><span>Yakın</span><span>Uzak</span></div></div>
    </div>
    <div className="mir-actions"><button className="mir-btn" onClick={()=>setRays(v=>!v)}>{rays?"Işınları gizle":"Işınları göster"}</button><button className="mir-btn" onClick={()=>setLabels(v=>!v)}>{labels?"Etiketleri gizle":"Etiketleri göster"}</button><button className="mir-btn active" onClick={reset}>↺ Sıfırla</button></div>
    <div className="mir-metrics"><div className="mir-metric"><small>Görüntü türü</small><b>{image.kind}</b></div><div className="mir-metric"><small>Görüntü yönü</small><b>{image.atInfinity?"Belirlenemez":image.h>0?"Düz":"Ters"}</b></div><div className="mir-metric"><small>Görüntü boyutu</small><b>{image.atInfinity?"Çok büyük":Math.abs(image.m)>1.05?"Büyük":Math.abs(image.m)<.95?"Küçük":"Cisimle aynı"}</b></div><div className="mir-metric"><small>Görüntü konumu</small><b>{image.atInfinity?"Çok uzakta":image.virtual?"Aynanın arkasında":"Aynanın önünde"}</b></div></div>
   </section>
   <aside className="mir-card"><h2>👁️ Gözlem sonucu</h2><div className="mir-explain"><b>{status}</b><br/>{!isConcave?"Tümsek aynada görüntü her zaman aynanın arkasında oluşur; düz ve cisimden küçüktür.":distance>2*focal?"Cisim 2F'nin dışındadır. Görüntü F ile 2F arasında oluşur.":Math.abs(distance-2*focal)<2?"Cisim 2F noktasındadır. Görüntü de 2F'de ve cisimle aynı boydadır.":distance>focal?"Cisim F ile 2F arasındadır. Görüntü 2F'nin dışında, ters ve büyüktür.":distance<focal?"Cisim ayna ile F arasındadır. Görüntü aynanın arkasında, düz ve büyüktür.":"Cisim odak noktasındadır; yansıyan ışınlar birbirine paralel ilerler."}</div>
    <div className="mir-note">Çukur aynada cismin konumu değiştikçe görüntünün yeri, yönü ve boyutu değişir. Tümsek aynada ise görüntü daima sanal, düz ve küçüktür.</div>
    <div className="mir-cards"><div className="mir-mini"><b>Çukur ayna</b>Işınları bir noktada toplayabilir. Tıraş ve makyaj aynalarında, araç farlarında kullanılır.</div><div className="mir-mini"><b>Tümsek ayna</b>Işınları dağıtır, geniş alanı gösterir. Araç yan aynalarında ve güvenlik aynalarında kullanılır.</div></div>
   </aside>
  </div>
  <section className="mir-card" style={{marginTop:14}}><h2>🎯 Kendini dene</h2><p className="mir-muted">Tümsek aynada cisim nerede olursa olsun görüntü nasıldır?</p>{["Gerçek, ters ve büyük","Sanal, düz ve küçük","Gerçek, düz ve aynı boyda"].map(v=><button key={v} className="mir-btn mir-choice" style={{background:quiz===v?"#e0f2fe":"white"}} onClick={()=>setQuiz(v)}>{v}</button>)}{quiz&&<p style={{fontSize:13,fontWeight:850,color:quiz==="Sanal, düz ve küçük"?"#15803d":"#b91c1c",marginTop:10}}>{quiz==="Sanal, düz ve küçük"?"Doğru! Tümsek aynada görüntü her zaman sanal, düz ve küçüktür.":"Tekrar dene. Tümsek aynada görüntü aynanın arkasında oluşur."}</p>}</section>
  <p className="mir-note"><Link className="mir-back" href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link></p>
 </div></main>;
}

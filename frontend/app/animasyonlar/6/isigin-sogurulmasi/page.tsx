"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ColorKey="white"|"black"|"red"|"green"|"blue"|"yellow"|"cyan"|"magenta";
type LightKey="white"|"red"|"green"|"blue"|"yellow"|"cyan"|"magenta";
const surfaces:Record<ColorKey,{name:string;rgb:[number,number,number];hex:string}>={white:{name:"Beyaz",rgb:[255,255,255],hex:"#ffffff"},black:{name:"Siyah",rgb:[12,12,12],hex:"#0c0c0c"},red:{name:"Kırmızı",rgb:[235,25,25],hex:"#eb1919"},green:{name:"Yeşil",rgb:[20,170,55],hex:"#14aa37"},blue:{name:"Mavi",rgb:[30,75,225],hex:"#1e4be1"},yellow:{name:"Sarı",rgb:[245,220,20],hex:"#f5dc14"},cyan:{name:"Camgöbeği",rgb:[20,210,210],hex:"#14d2d2"},magenta:{name:"Eflatun",rgb:[210,30,190],hex:"#d21ebe"}};
const lights:Record<LightKey,{name:string;rgb:[number,number,number];hex:string}>={white:{name:"Beyaz ışık",rgb:[255,255,255],hex:"#ffffff"},red:{name:"Kırmızı ışık",rgb:[255,0,0],hex:"#ff2525"},green:{name:"Yeşil ışık",rgb:[0,255,0],hex:"#22df55"},blue:{name:"Mavi ışık",rgb:[0,0,255],hex:"#3477ff"},yellow:{name:"Sarı ışık",rgb:[255,255,0],hex:"#fff02b"},cyan:{name:"Camgöbeği ışık",rgb:[0,255,255],hex:"#24e6e6"},magenta:{name:"Eflatun ışık",rgb:[255,0,255],hex:"#ed35e8"}};
const mix=(s:ColorKey,l:LightKey)=>{const a=surfaces[s].rgb,b=lights[l].rgb;return a.map((v,i)=>Math.round(v*b[i]/255)) as [number,number,number]};
const hex=(c:[number,number,number])=>"#"+c.map(v=>v.toString(16).padStart(2,"0")).join("");
const fmt=(c:[number,number,number])=>c.map(v=>Math.round(v/255*100)+"%").join(" / ");
export default function IsiginSogurulmasiPage(){
 const [surface,setSurface]=useState<ColorKey>("red");
 const [light,setLight]=useState<LightKey>("white");
 const [running,setRunning]=useState(true);
 const reflected=mix(surface,light);
 const appearance=hex(reflected);
 const brightness=Math.max(...reflected);
 const explanation=useMemo(()=>{if(surface==="black")return "Siyah zemin, üzerine gelen ışığın renklerini büyük ölçüde soğurur. Bu nedenle hangi renk ışık gelirse gelsin koyu görünür.";if(light==="white")return "Beyaz ışık tüm ana renkleri içerir. Zemin, kendi rengini oluşturan ışığı yansıtır; diğer renkleri daha çok soğurur.";if(light==="red"&&surface==="red"||light==="green"&&surface==="green"||light==="blue"&&surface==="blue")return "Zeminin rengi ile ışığın rengi eşleşiyor. Zemin bu ışığı yansıttığı için parlak görünür.";if(brightness<45)return "Zemin, kendi rengini yansıtabilecek ışığı bulamadığı için ışığın büyük bölümünü soğurur ve koyu görünür.";return "Zemin yalnızca kendi rengini oluşturan ışık bileşenlerini yansıtır. Gelen ışıkta bulunmayan renk bileşenleri yansıtılamaz; zemin daha koyu veya farklı renkte görünür."},[surface,light,brightness]);
 const options=(obj:Record<string,{name:string}>)=>Object.entries(obj).map(([value,v])=><option key={value} value={value}>{v.name}</option>);
 return <main className="abs-page"><style jsx global>{`
 .abs-page{min-height:100vh;background:#f1f5f9;color:#172033;padding:14px 12px 45px}.abs-wrap{max-width:1050px;margin:auto}.abs-crumb{font-size:13px;color:#64748b;margin:5px 0 16px}.abs-crumb a,.abs-back{color:#2563eb;text-decoration:none;font-weight:800}.abs-hero{border-radius:22px;padding:24px;background:linear-gradient(120deg,#172554,#5b21b6);color:white}.abs-hero small{color:#ddd6fe;font-weight:900;letter-spacing:1.3px}.abs-hero h1{font-size:clamp(27px,4vw,38px);font-weight:900;margin:8px 0}.abs-hero p{color:#ede9fe;line-height:1.6;margin:0}.abs-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;align-items:start;margin-top:15px}.abs-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px}.abs-card h2{font-size:19px;font-weight:900;margin:0 0 6px}.abs-muted{font-size:13px;color:#64748b;line-height:1.55;margin:0 0 12px}.abs-stage{position:relative;overflow:hidden;border-radius:14px;border:1px solid #cbd5e1;background:radial-gradient(circle at 50% 30%,#334155,#0f172a);min-height:330px;display:flex;align-items:center;justify-content:center}.abs-stage svg{width:100%;height:auto;max-height:390px}.abs-beam{stroke-dasharray:13 10;animation:abs-flow 1.2s linear infinite}.abs-still .abs-beam{animation-play-state:paused}@keyframes abs-flow{to{stroke-dashoffset:-46}}.abs-controls{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}.abs-controls label{display:block;font-size:13px;font-weight:850;margin-bottom:6px}.abs-controls select{width:100%;padding:11px;border:1px solid #cbd5e1;border-radius:10px;background:white;color:#172033}.abs-result{border-radius:14px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0}.abs-swatch{height:125px;border-radius:12px;border:1px solid #94a3b8;margin:10px 0}.abs-stat{font-size:13px;line-height:1.6;color:#475569}.abs-btn{border:1px solid #cbd5e1;background:#fff;border-radius:10px;padding:10px 13px;font-size:13px;font-weight:850;color:#334155;cursor:pointer}.abs-btn.primary{background:#ede9fe;border-color:#8b5cf6;color:#5b21b6}.abs-note{font-size:12px;color:#64748b;line-height:1.55;margin-top:12px}.abs-examples{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}.abs-example{border:1px solid #e2e8f0;background:#f8fafc;border-radius:10px;padding:10px;font-size:12px;text-align:center}.abs-example b{display:block;margin-bottom:4px}@media(max-width:780px){.abs-grid{grid-template-columns:1fr}.abs-controls{grid-template-columns:1fr}.abs-hero{padding:20px 17px}.abs-card{padding:13px}.abs-examples{grid-template-columns:1fr}}
 `}</style>
 <div className="abs-wrap">
  <nav className="abs-crumb"><Link href="/animasyonlar">Animasyonlar</Link> / <Link href="/animasyonlar/6">6. Sınıf</Link> / Işığın Soğurulması</nav>
  <header className="abs-hero"><small>6. SINIF · IŞIK VE RENKLER</small><h1>Işığın Soğurulması Laboratuvarı</h1><p>Farklı renkteki ışıkları farklı renklerdeki zeminlere gönder. Zeminin hangi renkte göründüğünü değiştirerek keşfet!</p></header>
  <div className="abs-grid">
   <section className="abs-card"><h2>🔦 Işık ve zemin deney alanı</h2><p className="abs-muted">Işık kaynağını ve zemini seç. Işık ışınlarının zemine ulaştığını ve yansıyan rengin nasıl değiştiğini gözlemle.</p>
    <div className={"abs-stage "+(!running?"abs-still":"")}>
     <svg viewBox="0 0 620 350" role="img" aria-label="Seçilen renkteki ışığın renkli zemine düşmesi">
      <defs><marker id="beamEnd" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6" fill={lights[light].hex}/></marker><marker id="reflectEnd" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6" fill="#f8fafc"/></marker></defs>
      <rect x="35" y="26" width="130" height="54" rx="12" fill="#334155" stroke="#94a3b8" strokeWidth="3"/><circle cx="165" cy="53" r="17" fill={lights[light].hex} stroke="#fff" strokeWidth="3"/><text x="98" y="58" fill="white" fontSize="15" textAnchor="middle" fontWeight="bold">IŞIK KAYNAĞI</text>
      <path className="abs-beam" d="M180 55 L315 235" stroke={lights[light].hex} strokeWidth="13" opacity=".95" markerEnd="url(#beamEnd)" fill="none"/>
      <path d="M315 235 L440 90" stroke={brightness>35?"#f8fafc":"#64748b"} strokeWidth="7" strokeDasharray="10 8" opacity=".9" markerEnd="url(#reflectEnd)" fill="none"/>
      <path d="M170 55 L315 235" stroke={lights[light].hex} strokeWidth="32" opacity=".12" fill="none"/>
      <path d="M110 270 L510 270 L565 315 L55 315 Z" fill={appearance} stroke="#fff" strokeWidth="3"/>
      <path d="M110 270 L510 270" stroke="#fff" strokeWidth="3"/>
      <text x="310" y="340" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">{surfaces[surface].name.toLocaleUpperCase("tr-TR")} ZEMİN</text>
      <text x="435" y="76" fill="white" fontSize="13" textAnchor="middle">Yansıyan ışık</text>
      <text x="240" y="135" fill={lights[light].hex} fontSize="13" fontWeight="bold">Gelen ışık</text>
      <text x="310" y="205" fill="white" fontSize="12" textAnchor="middle">Işığın bir kısmı soğurulur</text>
     </svg>
    </div>
    <div className="abs-controls">
     <div><label htmlFor="abs-light">Gelen ışığın rengi</label><select id="abs-light" value={light} onChange={e=>setLight(e.target.value as LightKey)}>{options(lights)}</select></div>
     <div><label htmlFor="abs-surface">Zeminin rengi</label><select id="abs-surface" value={surface} onChange={e=>setSurface(e.target.value as ColorKey)}>{options(surfaces)}</select></div>
    </div>
    <button className="abs-btn primary" style={{marginTop:12}} onClick={()=>setRunning(v=>!v)}>{running?"⏸ Işık hareketini durdur":"▶ Işık hareketini başlat"}</button>
   </section>
   <aside className="abs-card"><h2>👁️ Nasıl görünür?</h2><p className="abs-muted">Seçimlerine göre zeminin yaklaşık görünümü:</p>
    <div className="abs-result"><div className="abs-stat"><b>Gelen ışık:</b> {lights[light].name}<br/><b>Zemin:</b> {surfaces[surface].name}</div><div className="abs-swatch" style={{background:appearance}}/><div className="abs-stat"><b>Gözlenen renk:</b> {brightness<45?"Çok koyu / siyaha yakın":surfaces[surface].name+" tonlarında"}<br/><b>Yansıyan RGB:</b> {fmt(reflected)}</div></div>
    <div className="abs-note">{explanation}</div>
   </aside>
  </div>
  <section className="abs-card" style={{marginTop:14}}><h2>💡 Hızlı örnekler</h2><div className="abs-examples"><div className="abs-example"><b>Kırmızı zemin + yeşil ışık</b>Koyu görünür; kırmızı zemin yeşil ışığı yansıtamaz.</div><div className="abs-example"><b>Beyaz zemin + mavi ışık</b>Mavi görünür; beyaz zemin gelen ışığın rengini yansıtır.</div><div className="abs-example"><b>Siyah zemin + beyaz ışık</b>Siyaha yakın görünür; ışığın çoğunu soğurur.</div></div><p className="abs-note">Bilimsel not: Bu model, renkli yüzeylerin ideal RGB yansımasını yaklaşık olarak gösterir. Gerçek yüzeylerde renk tonları, ışık şiddeti ve ortam koşulları görünümü etkileyebilir.</p></section>
  <section className="abs-card" style={{marginTop:14}}><h2>🎯 Kendini dene</h2><p className="abs-muted">Mavi bir zemine yalnızca kırmızı ışık gönderilirse zemin nasıl görünür?</p>
   <Quiz/>
  </section>
  <div style={{marginTop:15}}><Link className="abs-back" href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link></div>
 </div></main>;
}
function Quiz(){const [selected,setSelected]=useState<number|null>(null);const choices=["Parlak mavi","Kırmızı","Koyu / siyaha yakın","Beyaz"];return <div>{choices.map((v,i)=><button key={v} className={"abs-btn "+(selected===i?(i===2?"primary":""):"")} style={{display:"block",width:"100%",textAlign:"left",marginTop:7,background:selected===i?(i===2?"#dcfce7":"#fee2e2"):undefined,borderColor:selected===i?(i===2?"#16a34a":"#dc2626"):undefined}} onClick={()=>setSelected(i)}>{v}</button>)}{selected!==null&&<p style={{fontWeight:800,color:selected===2?"#15803d":"#b91c1c",fontSize:13,marginTop:10}}>{selected===2?"Doğru! Mavi zemin kırmızı ışığı yansıtamaz; ışığın büyük bölümünü soğurur.":"Tekrar dene. Mavi zemin, kırmızı ışıkta yansıtacak mavi ışık bulamaz."}</p>}</div>}

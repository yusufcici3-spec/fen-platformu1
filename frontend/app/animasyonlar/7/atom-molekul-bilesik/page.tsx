"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Atom = { symbol:string; name:string; color:string };
const atomTypes:Atom[] = [
 {symbol:"H",name:"Hidrojen",color:"#93c5fd"},
 {symbol:"O",name:"Oksijen",color:"#fca5a5"},
 {symbol:"C",name:"Karbon",color:"#64748b"},
 {symbol:"N",name:"Azot",color:"#a5b4fc"},
 {symbol:"Cl",name:"Klor",color:"#86efac"},
 {symbol:"Na",name:"Sodyum",color:"#fcd34d"},
];
const presets = [
 {name:"Helyum atomu",atoms:["He"],kind:"atom",formula:"He",explain:"Helyum tek bir atom hâlinde bulunur. Tek atomdan oluştuğu için molekül değildir."},
 {name:"Hidrojen molekülü",atoms:["H","H"],kind:"element-molecule",formula:"H₂",explain:"İki hidrojen atomu birleşmiştir. Aynı cins atomlardan oluşan bir moleküldür; bileşik değildir."},
 {name:"Oksijen molekülü",atoms:["O","O"],kind:"element-molecule",formula:"O₂",explain:"İki oksijen atomu bir araya gelmiştir. Moleküldür ancak tek cins atom içerdiği için bileşik değildir."},
 {name:"Su molekülü",atoms:["H","H","O"],kind:"compound-molecule",formula:"H₂O",explain:"İki hidrojen ve bir oksijen atomu kimyasal bağla birleşmiştir. Farklı cins atomlar içerdiği için bileşik moleküldür."},
 {name:"Karbondioksit",atoms:["O","C","O"],kind:"compound-molecule",formula:"CO₂",explain:"Bir karbon ve iki oksijen atomundan oluşur. Farklı cins atomlar içerdiğinden bileşiktir; yapısı moleküldür."},
 {name:"Amonyak",atoms:["N","H","H","H"],kind:"compound-molecule",formula:"NH₃",explain:"Bir azot ve üç hidrojen atomundan oluşan bileşik moleküldür."},
 {name:"Sofra tuzu",atoms:["Na","Cl"],kind:"ionic-compound",formula:"NaCl",explain:"Sodyum ve klor farklı elementlerdir; bu nedenle bileşiktir. İyonik yapılıdır, ayrı moleküller hâlinde bulunmaz."},
];
const palette:Record<string,string> = {H:"#93c5fd",O:"#fca5a5",C:"#64748b",N:"#a5b4fc",Cl:"#86efac",Na:"#fcd34d",He:"#f9a8d4"};
const names:Record<string,string> = {H:"Hidrojen",O:"Oksijen",C:"Karbon",N:"Azot",Cl:"Klor",Na:"Sodyum",He:"Helyum"};
function MoleculeView({atoms}:{atoms:string[]}) {
 const positions = atoms.length===1?[[150,105]]:atoms.length===2?[[105,105],[195,105]]:atoms.length===3?[[75,115],[150,75],[225,115]]:atoms.length===4?[[75,115],[150,65],[225,115],[150,165]]:[[45,105],[105,65],[165,105],[225,65],[285,105],[345,65]];
 return <svg viewBox="0 0 390 220" className="mol-svg" role="img" aria-label="Seçilen atomların şematik modeli">
  <defs><filter id="shadow"><feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity=".16"/></filter></defs>
  {atoms.length>1&&atoms.map((a,i)=>atoms.slice(i+1).map((b,j)=>{const p=positions[i]||[150,105],q=positions[i+j+1]||[195,105];return <line key={i+"-"+j} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="#64748b" strokeWidth="7" strokeLinecap="round" opacity=".7"/>}))}
  {atoms.map((a,i)=>{const p=positions[i]||[150,105];return <g key={i} filter="url(#shadow)"><circle cx={p[0]} cy={p[1]} r={a==="Cl"||a==="Na"?31:27} fill={palette[a]||"#ddd"} stroke="#fff" strokeWidth="3"/><text x={p[0]} y={p[1]+6} textAnchor="middle" fontSize="19" fontWeight="900" fill="#172033">{a}</text></g>})}
  <text x="195" y="207" textAnchor="middle" fontSize="10" fill="#64748b">Şematik model • Atom boyutları ve bağ uzunlukları ölçekli değildir</text>
 </svg>;
}
export default function AtomMolekulBilesikPage(){
 const [atoms,setAtoms]=useState<string[]>(["H","H","O"]);
 const [activePreset,setActivePreset]=useState("Su molekülü");
 const [checked,setChecked]=useState(false);
 const [quiz,setQuiz]=useState<number|null>(null);
 const preset=presets.find(p=>p.name===activePreset);
 const formula=useMemo(()=>{const counts:Record<string,number>={};atoms.forEach(a=>counts[a]=(counts[a]||0)+1);return Object.entries(counts).map(([s,n])=>s+(n>1?String(n).replace(/[0-9]/g,d=>"₀₁₂₃₄₅₆₇₈₉"[+d]):"")).join("")||"—";},[atoms]);
 const allSame=atoms.length>0&&atoms.every(a=>a===atoms[0]);
 const classification=atoms.length===0?"Henüz atom yok":atoms.length===1?"Tek atom":activePreset==="Sofra tuzu"?"Bileşik (iyonik yapı)":allSame?"Molekül (element molekülü)":"Molekül (bileşik molekülü)";
 const detail=atoms.length===0?"Önce atom ekle.":atoms.length===1?"Modelde yalnızca bir atom var. Bu yapı molekül değildir.":activePreset==="Sofra tuzu"?"NaCl farklı elementlerden oluşan iyonik bileşiktir; molekül olarak adlandırılmaz.":allSame?"Birden fazla atom birleşmiş ve hepsi aynı elemente ait. Molekül var, bileşik yok.":"Birden fazla atom birleşmiş ve en az iki farklı element içeriyor. Bu nedenle bileşik moleküldür.";
 function load(p:typeof presets[number]){setAtoms(p.atoms);setActivePreset(p.name);setChecked(false);}
 function add(a:string){setAtoms(old=>[...old,a]);setActivePreset("Kendi modelim");setChecked(false);}
 return <main className="chem-page"><style jsx global>{`
 .chem-page{min-height:100vh;background:#f1f5f9;color:#172033;padding:14px 12px 45px}.chem-wrap{max-width:1100px;margin:auto}.chem-crumb{font-size:13px;color:#64748b;margin:5px 0 16px}.chem-crumb a,.chem-back{color:#2563eb;text-decoration:none;font-weight:800}.chem-hero{border-radius:22px;padding:24px;background:linear-gradient(120deg,#172554,#075985);color:white}.chem-hero small{color:#bae6fd;font-weight:900;letter-spacing:1.3px}.chem-hero h1{font-size:clamp(27px,4vw,38px);font-weight:900;margin:8px 0}.chem-hero p{color:#e0f2fe;line-height:1.6;margin:0}.chem-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;margin-top:15px;align-items:start}.chem-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px}.chem-card h2{font-size:19px;font-weight:900;margin:0 0 5px}.chem-muted{font-size:13px;color:#64748b;line-height:1.5;margin:0 0 12px}.chem-presets{display:flex;gap:7px;flex-wrap:wrap}.chem-btn{border:1px solid #cbd5e1;background:#fff;border-radius:10px;padding:9px 11px;font-size:12px;font-weight:800;color:#334155;cursor:pointer}.chem-btn.active{background:#dbeafe;border-color:#2563eb;color:#1d4ed8}.chem-palette{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.chem-atom{border:1px solid #cbd5e1;border-radius:10px;padding:8px 12px;font-weight:900;cursor:pointer;color:#172033}.mol-svg{width:100%;height:auto;display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;margin:12px 0}.chem-formula{font-size:26px;font-weight:950;text-align:center;color:#0f172a}.chem-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.chem-result{border-radius:13px;padding:13px;background:#f8fafc;border:1px solid #e2e8f0;margin-top:12px}.chem-result b{display:block;font-size:16px}.chem-result p{font-size:13px;line-height:1.55;color:#475569;margin:6px 0 0}.chem-type{display:inline-block;padding:5px 9px;border-radius:99px;background:#dbeafe;color:#1e40af;font-size:11px;font-weight:900;margin:8px 0}.chem-fact{padding:11px;border-radius:10px;background:#f8fafc;border:1px solid #e2e8f0;margin-top:8px;font-size:13px;line-height:1.5}.chem-fact b{color:#0f172a}.chem-quiz button{display:block;width:100%;text-align:left;border:1px solid #cbd5e1;border-radius:9px;padding:10px;background:white;margin-top:7px;color:#334155;font-size:13px}.chem-quiz .right{background:#dcfce7;border-color:#16a34a}.chem-quiz .wrong{background:#fee2e2;border-color:#dc2626}
 @media(max-width:800px){.chem-grid{grid-template-columns:1fr}.chem-hero{padding:20px 17px}.chem-card{padding:13px}}
 `}</style>
 <div className="chem-wrap">
  <nav className="chem-crumb"><Link href="/animasyonlar">Animasyonlar</Link> / <Link href="/animasyonlar/7">7. Sınıf</Link> / Atom, Molekül ve Bileşik</nav>
  <header className="chem-hero"><small>7. SINIF · FB.7.5.3 – FB.7.5.4</small><h1>Atom mu, Molekül mü, Bileşik mi?</h1><p>Atomları bir araya getirerek modeller oluştur. Aynı ve farklı tür atomların nasıl birleştiğini keşfet; modelini sınıflandır ve öğrendiklerini kontrol et.</p></header>
  <div className="chem-grid">
   <section className="chem-card"><h2>🧪 Hazır modelleri incele</h2><p className="chem-muted">Bir örnek seçerek atomların nasıl bir araya geldiğini gözlemle.</p>
    <div className="chem-presets">{presets.map(p=><button key={p.name} className={"chem-btn "+(activePreset===p.name?"active":"")} onClick={()=>load(p)}>{p.name}</button>)}</div>
    <h2 style={{marginTop:18}}>⚛️ Kendi modelini oluştur</h2><p className="chem-muted">Aşağıdaki element atomlarına dokunarak modele ekle. Yanlışlıkla eklediğin son atomu geri alabilir veya modeli temizleyebilirsin.</p>
    <div className="chem-palette">{atomTypes.map(a=><button key={a.symbol} className="chem-atom" style={{background:a.color}} onClick={()=>add(a.symbol)}>{a.symbol} · {a.name} +</button>)}</div>
    <MoleculeView atoms={atoms}/><div className="chem-formula">{formula}</div>
    <div className="chem-actions"><button className="chem-btn" onClick={()=>{setAtoms(old=>old.slice(0,-1));setActivePreset("Kendi modelim");setChecked(false)}} disabled={!atoms.length}>↶ Son atomu çıkar</button><button className="chem-btn" onClick={()=>{setAtoms([]);setActivePreset("Kendi modelim");setChecked(false)}}>Modeli temizle</button><button className="chem-btn active" onClick={()=>setChecked(true)}>Modelimi kontrol et</button></div>
    {checked&&<div className="chem-result"><b>{classification}</b><p>{detail}</p></div>}
   </section>
   <aside className="chem-card"><h2>🔍 Modelin özellikleri</h2><p className="chem-muted">Seçtiğin modele göre sınıflandırma burada görünür.</p><span className="chem-type">{classification}</span>
    <div className="chem-fact"><b>Atom sayısı:</b> {atoms.length}</div><div className="chem-fact"><b>Atom türleri:</b> {Array.from(new Set(atoms)).map(a=>names[a]||a).join(", ")||"Henüz seçilmedi"}</div><div className="chem-fact"><b>Formül:</b> {formula}</div>
    <div className="chem-fact"><b>Hatırla:</b><br/>• Atom: Elementin özelliklerini taşıyan en küçük tanecik.<br/>• Molekül: İki veya daha fazla atomun bağlanmasıyla oluşur.<br/>• Bileşik: Farklı element atomlarının belirli oranlarda birleşmesiyle oluşan saf madde.</div>
    <div className="chem-fact"><b>Önemli ayrım:</b><br/>O₂ moleküldür ama bileşik değildir. H₂O hem molekül hem bileşiktir. NaCl bileşiktir ancak molekül yapılı değildir.</div>
   </aside>
  </div>
  <section className="chem-card chem-quiz" style={{marginTop:14}}><h2>🎯 Kendini dene</h2><p className="chem-muted">İki oksijen atomunun birleşmesiyle oluşan O₂ için hangisi doğrudur?</p>
   {["Tek atomdur, molekül değildir.","Moleküldür ama bileşik değildir.","Hem molekül hem bileşiktir.","İyonik bileşiktir."].map((v,i)=><button key={v} className={quiz===i?(i===1?"right":"wrong"):""} onClick={()=>setQuiz(i)}>{v}</button>)}
   {quiz!==null&&<p style={{fontWeight:800,color:quiz===1?"#15803d":"#b91c1c",fontSize:13,marginTop:10}}>{quiz===1?"Doğru! O₂ iki aynı tür oksijen atomundan oluşan moleküldür; farklı element içermediği için bileşik değildir.":"Tekrar dene: O₂ iki atom içerir, ancak iki atom da oksijendir."}</p>}
  </section>
  <p style={{fontSize:11,color:"#64748b",marginTop:13}}>Not: Bu animasyondaki tanecik çizimleri öğretim amaçlı şematik modellerdir; atomların gerçek boyutlarını ve bağ geometrilerini ölçekli göstermez.</p>
  <div style={{marginTop:15}}><Link className="chem-back" href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link></div>
 </div></main>;
}

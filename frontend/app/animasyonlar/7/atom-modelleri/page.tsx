"use client";

import { useState } from "react";
import Link from "next/link";

const models = [
  { year:"MÖ 400'ler", name:"Demokritos", title:"Bölünemeyen tanecik düşüncesi", description:"Maddenin çok küçük ve daha fazla bölünemeyen taneciklerden oluştuğunu düşündü. Bu tanecikleri atom olarak adlandırdı.", detail:"Bu bir deneysel atom modeli değil, felsefi bir düşünceydi.", visual:"solid", color:"#64748b", takeaway:"Atom fikrini ortaya atan düşünürlerden biridir." },
  { year:"1803", name:"John Dalton", title:" içi dolu küre modeli", description:"Atomları içi dolu, bölünemez küreler olarak düşündü. Her elementin atomlarının kendine özgü olduğunu savundu.", detail:"Atomu basit, katı bir küre şeklinde gösterdi.", visual:"dalton", color:"#0f766e", takeaway:"Atom, içi dolu bir küre gibi düşünülüyordu." },
  { year:"1897–1904", name:"J. J. Thomson", title:"Üzümlü kek modeli", description:"Atomun pozitif yüklü bir küre olduğunu, negatif yüklü elektronların bu kürenin içine dağıldığını öne sürdü.", detail:"Elektronun keşfi, atomun bölünemez olmadığını gösterdi.", visual:"thomson", color:"#b45309", takeaway:"Atomun içinde elektronlar bulunduğu fikri ortaya çıktı." },
  { year:"1911", name:"Ernest Rutherford", title:"Çekirdekli atom modeli", description:"Atomun merkezinde pozitif yüklü ve çok küçük bir çekirdek bulunduğunu; atomun büyük bölümünün boşluk olduğunu açıkladı.", detail:"Altın levha deneyi, çekirdek fikrinin gelişmesini sağladı.", visual:"rutherford", color:"#be123c", takeaway:"Pozitif yük ve kütlenin büyük kısmı çekirdekte toplanır." },
  { year:"1913", name:"Niels Bohr", title:"Katmanlı atom modeli", description:"Elektronların çekirdek çevresinde belirli enerji düzeylerine karşılık gelen katmanlarda bulunduğunu açıkladı.", detail:"Elektronlar her yerde değil, belirli enerji düzeylerinde bulunur.", visual:"bohr", color:"#1d4ed8", takeaway:"Elektronların belirli enerji katmanları vardır." },
  { year:"Günümüz", name:"Modern atom teorisi", title:"Elektron bulutu modeli", description:"Elektronların kesin yörüngeler izlediği söylenemez. Elektronların bulunma olasılığının yüksek olduğu bölgeler elektron bulutu olarak gösterilir.", detail:"Atom modelleri bilimsel çalışmalar ve yeni kanıtlarla gelişmeye devam eder.", visual:"modern", color:"#6d28d9", takeaway:"Elektronların bulunabileceği bölgeler olasılıkla ifade edilir." },
];

function AtomDrawing({ model }: { model: typeof models[number] }) {
  return <svg viewBox="0 0 440 300" role="img" aria-label={model.name + " atom modeli"} className="atom-svg">
    <defs>
      <radialGradient id="nucleus"><stop stopColor="#fb7185"/><stop offset="1" stopColor="#be123c"/></radialGradient>
      <radialGradient id="electron"><stop stopColor="#bfdbfe"/><stop offset="1" stopColor="#2563eb"/></radialGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="440" height="300" rx="18" fill="#f8fafc"/>
    {model.visual === "solid" && <><circle cx="220" cy="145" r="75" fill="#94a3b8" stroke="#475569" strokeWidth="4"/><text x="220" y="155" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">ATOM</text></>}
    {model.visual === "dalton" && <><circle cx="220" cy="145" r="83" fill="#14b8a6" stroke="#0f766e" strokeWidth="5"/><ellipse cx="190" cy="110" rx="22" ry="12" fill="#99f6e4" opacity=".55"/></>}
    {model.visual === "thomson" && <><circle cx="220" cy="145" r="105" fill="#fde68a" stroke="#b45309" strokeWidth="4"/>{[[175,95],[245,88],[285,145],[230,195],[155,170],[205,140],[260,115]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="11" fill="#2563eb"/><text x={x} y={y+4} textAnchor="middle" fill="white" fontSize="12">−</text></g>)}</>}
    {model.visual === "rutherford" && <><circle cx="220" cy="145" r="8" fill="url(#nucleus)"/><ellipse cx="220" cy="145" rx="130" ry="47" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 6"/><ellipse cx="220" cy="145" rx="130" ry="47" transform="rotate(60 220 145)" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 6"/><ellipse cx="220" cy="145" rx="130" ry="47" transform="rotate(-60 220 145)" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 6"/>{[[350,145],[155,32],[155,258]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="9" fill="#2563eb" stroke="white" strokeWidth="2"/> )}</>}
    {model.visual === "bohr" && <><circle cx="220" cy="145" r="19" fill="url(#nucleus)"/><circle cx="220" cy="145" r="62" fill="none" stroke="#60a5fa" strokeWidth="3"/><circle cx="220" cy="145" r="105" fill="none" stroke="#60a5fa" strokeWidth="3"/>{[[282,145],[115,145],[220,40],[220,250]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="10" fill="url(#electron)" stroke="white" strokeWidth="2"/> )}</>}
    {model.visual === "modern" && <><circle cx="220" cy="145" r="18" fill="url(#nucleus)"/><g fill="#8b5cf6" filter="url(#glow)">{Array.from({length:95},(_,i)=>{const a=i*2.399;const r=28+((i*37)%105);return <circle key={i} cx={220+Math.cos(a)*r} cy={145+Math.sin(a)*r*.72} r={2+(i%3)} opacity={.18+(i%5)*.1}/>})}</g><ellipse cx="220" cy="145" rx="120" ry="85" fill="none" stroke="#a78bfa" strokeDasharray="3 8" opacity=".7"/></>}
    <text x="220" y="285" textAnchor="middle" fill="#475569" fontSize="12">Şematik gösterim • Ölçekli değildir</text>
  </svg>;
}

export default function AtomModelleriPage() {
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [quiz, setQuiz] = useState<number | null>(null);
  const active = models[index];
  const go = (next:number) => { setIndex(Math.max(0,Math.min(models.length-1,next))); setShowHint(false); };
  return <main className="atom-page"><style jsx global>{`
    .atom-page{min-height:100vh;background:#f3f6fb;color:#17243a;padding:16px 13px 48px}.atom-wrap{max-width:1050px;margin:auto}
    .atom-crumb{display:flex;gap:9px;flex-wrap:wrap;color:#64748b;font-size:13px;margin:4px 0 19px}.atom-crumb a,.atom-link{color:#2563eb;text-decoration:none;font-weight:700}
    .atom-hero{padding:26px;border-radius:22px;background:linear-gradient(120deg,#172554,#5b21b6);color:white}.atom-hero small{font-weight:900;letter-spacing:1.5px;color:#ddd6fe}.atom-hero h1{font-size:clamp(27px,4vw,39px);font-weight:900;margin:10px 0}.atom-hero p{color:#ede9fe;line-height:1.6;margin:0;max-width:760px}
    .atom-panel{background:white;border:1px solid #e2e8f0;border-radius:18px;padding:18px;margin-top:17px;box-shadow:0 8px 25px #0f172a08}.atom-panel h2{font-size:20px;font-weight:850;margin:0 0 6px}.atom-muted{font-size:13px;color:#64748b;line-height:1.55;margin:0 0 15px}
    .atom-timeline{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:7px}.atom-step{border:1px solid #dbe3ef;border-radius:12px;background:#f8fafc;padding:10px 5px;cursor:pointer;text-align:center;min-width:0}.atom-step.active{background:#ede9fe;border:2px solid #7c3aed;color:#5b21b6}.atom-step b{display:block;font-size:12px}.atom-step span{display:block;font-size:10px;margin-top:4px;color:#64748b}
    .atom-content{display:grid;grid-template-columns:1.1fr .9fr;gap:16px;align-items:stretch}.atom-svg{display:block;width:100%;height:auto}.atom-info{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:17px}.atom-info h3{font-size:22px;font-weight:900;margin:4px 0 3px}.atom-year{font-size:12px;font-weight:900;letter-spacing:1px;color:#6d28d9}.atom-info p{font-size:14px;line-height:1.65;color:#475569}.atom-note{background:#ede9fe;color:#4c1d95;padding:12px;border-radius:11px;font-size:13px;line-height:1.5}
    .atom-actions{display:flex;gap:8px;justify-content:space-between;flex-wrap:wrap;margin-top:14px}.atom-btn{border:1px solid #cbd5e1;border-radius:10px;padding:10px 14px;background:white;color:#334155;font-weight:800;font-size:13px;cursor:pointer}.atom-btn.primary{background:#5b21b6;color:white;border-color:#5b21b6}.atom-btn:disabled{opacity:.35;cursor:not-allowed}
    .atom-quiz{border:1px solid #e2e8f0;border-radius:13px;padding:14px;margin-top:12px}.atom-quiz button{display:block;width:100%;text-align:left;border:1px solid #dbe3ef;border-radius:9px;padding:10px;margin-top:7px;background:white;color:#334155;font-size:13px}.atom-correct{background:#dcfce7!important;border-color:#16a34a!important}.atom-wrong{background:#fee2e2!important;border-color:#dc2626!important}
    @media(max-width:700px){.atom-page{padding:11px 9px 35px}.atom-hero{padding:20px 17px}.atom-panel{padding:13px}.atom-timeline{grid-template-columns:repeat(3,minmax(0,1fr))}.atom-content{grid-template-columns:1fr}}
  `}</style>
  <div className="atom-wrap">
    <nav className="atom-crumb"><Link href="/animasyonlar">Animasyonlar</Link><span>/</span><Link href="/animasyonlar/7">7. Sınıf</Link><span>/</span><span>Atom Modelleri</span></nav>
    <header className="atom-hero"><small>7. SINIF · ATOMUN YAPISI</small><h1>Atom modellerinin tarihsel yolculuğu</h1><p>Bilim insanları atomu zaman içinde nasıl açıkladı? Yıllara göre modelleri seç, görselleri incele ve bilimsel düşüncenin nasıl geliştiğini keşfet.</p></header>
    <section className="atom-panel"><h2>⏳ Zaman çizelgesi</h2><p className="atom-muted">Bir bilim insanına dokunarak o dönemin atom modeline geçiş yap.</p>
      <div className="atom-timeline">{models.map((m,i)=><button key={m.name} className={index===i?"atom-step active":"atom-step"} onClick={()=>go(i)}><b>{m.name}</b><span>{m.year}</span></button>)}</div>
    </section>
    <section className="atom-panel"><div className="atom-content">
      <div><AtomDrawing model={active}/></div>
      <article className="atom-info"><span className="atom-year">{active.year}</span><h3>{active.name}</h3><b>{active.title}</b><p>{active.description}</p><div className="atom-note">🔎 {active.detail}</div><p style={{fontWeight:800,color:"#5b21b6",marginBottom:0}}>Özet: {active.takeaway}</p></article>
    </div>
    <div className="atom-actions"><button className="atom-btn" onClick={()=>go(index-1)} disabled={index===0}>← Önceki model</button><button className="atom-btn" onClick={()=>go(0)}>Başa dön</button><button className="atom-btn primary" onClick={()=>go(index+1)} disabled={index===models.length-1}>Sonraki model →</button></div>
    </section>
    <section className="atom-panel"><h2>🧠 Öğrendiklerini kontrol et</h2><p className="atom-muted">Aşağıdaki soruyu cevapla.</p><div className="atom-quiz"><b>Elektronların belirli enerji katmanlarında bulunduğunu açıklayan atom modeli hangisidir?</b>
      {["Dalton modeli","Thomson modeli","Bohr modeli","Modern atom teorisi"].map((choice,i)=><button key={choice} className={quiz===i?(i===2?"atom-correct":"atom-wrong"):""} onClick={()=>setQuiz(i)}>{choice}</button>)}
      {quiz!==null&&<p style={{fontSize:13,fontWeight:800,color:quiz===2?"#15803d":"#b91c1c",marginTop:10}}>{quiz===2?"Doğru cevap! Bohr modelinde elektronlar belirli enerji katmanlarında bulunur.":"Tekrar dene. İpucu: 1913 yılında geliştirilen katmanlı modeli hatırla."}</p>}
    </div></section>
    <div style={{marginTop:18}}><Link className="atom-link" href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link></div>
  </div></main>;
}

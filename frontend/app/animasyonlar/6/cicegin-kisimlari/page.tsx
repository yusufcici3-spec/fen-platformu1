"use client";

import Link from "next/link";
import { useState } from "react";

const parts = [
  { id:"tepe", name:"Dişicik tepesi", group:"Dişi organ", color:"#84b91c", x:320, y:35, description:"Polenlerin çiçeğe ulaştığında tutunup yapışmasını sağlayan dişicik bölümüdür.", role:"Tozlaşma sırasında polenler dişicik tepesine bırakılır." },
  { id:"boru", name:"Dişicik borusu", group:"Dişi organ", color:"#84b91c", x:320, y:142, description:"Dişicik tepesini yumurtalığa bağlayan ince kanaldır.", role:"Polen tüpü bu bölüm boyunca ilerleyerek erkek üreme hücrelerinin tohum taslağına ulaşmasını sağlar." },
  { id:"yumurtalik", name:"Yumurtalık", group:"Dişi organ", color:"#84b91c", x:320, y:264, description:"Dişi organın alt bölümünde bulunur ve tohum taslaklarını içerir.", role:"Döllenmeden sonra tohum taslakları tohuma, yumurtalık ise meyveye dönüşür." },
  { id:"bascik", name:"Başçık", group:"Erkek organ", color:"#e6ae22", x:490, y:156, description:"Erkek organın polen üreten bölümüdür.", role:"Polenler başçıkta oluşur ve olgunlaştığında çevreye yayılabilir." },
  { id:"sapcik", name:"Sapçık", group:"Erkek organ", color:"#e6ae22", x:432, y:207, description:"Başçığı taşıyan ince, ipliksi yapıdır.", role:"Başçığı destekler ve polenlerin taşınabileceği konumda durmasını sağlar." },
  { id:"tac", name:"Taç yaprak", group:"Çiçek örtüsü", color:"#d64b9b", x:535, y:91, description:"Çiçeğin renkli ve dikkat çekici yapraklarıdır.", role:"Renkleri ve kokularıyla böcek gibi tozlaştırıcıları çiçeğe çekmeye yardımcı olur." },
  { id:"canak", name:"Çanak yaprak", group:"Çiçek örtüsü", color:"#31934d", x:155, y:330, description:"Genellikle yeşil renkli, çiçeğin en dış kısmında bulunan yapraklardır.", role:"Tomurcuk hâlindeki çiçeği gelişme sürecinde dış etkilerden korur." },
  { id:"sap", name:"Çiçek sapı", group:"Destek yapı", color:"#31934d", x:320, y:390, description:"Çiçeği bitkinin gövdesine bağlayan bölümdür.", role:"Çiçeği taşır ve bitkinin diğer kısımlarına bağlanmasını sağlar." },
];

function FlowerDiagram({ active, onSelect }: { active:string; onSelect:(id:string)=>void }) {
  const pin = (id:string, x:number, y:number, label:string, color:string) => (
    <g key={id} onClick={() => onSelect(id)} role="button" tabIndex={0} aria-label={label + " bölümünü seç"} onKeyDown={(e) => { if(e.key==="Enter" || e.key===" ") onSelect(id); }} style={{cursor:"pointer"}}>
      <circle cx={x} cy={y} r={active===id?17:12} fill={color} stroke={active===id?"#172554":"white"} strokeWidth={active===id?5:3}/>
      <circle cx={x} cy={y} r="4" fill="white"/>
    </g>
  );
  return (
    <svg viewBox="0 0 640 455" className="flower-svg" role="img" aria-label="Çiçeğin kısımlarını seçmek için işaretli bilimsel çizim">
      <defs>
        <linearGradient id="petalFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f7a4d1"/><stop offset="1" stopColor="#b82f85"/></linearGradient>
        <linearGradient id="leafFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a5d33c"/><stop offset="1" stopColor="#398b37"/></linearGradient>
      </defs>
      <path d="M320 418 C316 355 321 300 320 236" stroke="#398b37" strokeWidth="23" fill="none" strokeLinecap="round"/>
      <path d="M320 355 C246 306 188 327 178 370 C220 394 272 384 320 355Z" fill="url(#leafFill)" stroke="#347b31" strokeWidth="3"/>
      <path d="M320 355 C394 306 452 327 462 370 C420 394 368 384 320 355Z" fill="url(#leafFill)" stroke="#347b31" strokeWidth="3"/>
      <g fill="url(#petalFill)" stroke="#a92c79" strokeWidth="3">
        <path d="M320 220 C236 198 125 160 92 96 C78 35 153 34 206 82 C251 25 295 55 320 123 C345 55 389 25 434 82 C487 34 562 35 548 96 C515 160 404 198 320 220Z"/>
        <path d="M320 210 C244 177 197 118 222 65 C251 26 290 58 320 121 C350 58 389 26 418 65 C443 118 396 177 320 210Z" opacity=".8"/>
      </g>
      <path d="M320 48 C310 112 312 176 320 250" stroke="#a6ce20" strokeWidth="17" fill="none" strokeLinecap="round"/>
      <path d="M320 42 C306 18 297 22 299 38 C301 52 315 56 320 48 C325 56 339 52 341 38 C343 22 334 18 320 42Z" fill="#a6ce20" stroke="#6f9d18" strokeWidth="3"/>
      <path d="M320 244 C282 230 269 264 276 296 C285 328 355 328 364 296 C371 264 358 230 320 244Z" fill="#b5d64b" stroke="#6e9d24" strokeWidth="4"/>
      {[0,1,2].map(i=><g key={i}><ellipse cx={296+i*24} cy={270+(i%2)*23} rx="8" ry="12" fill="#f4a0b2" stroke="#e06b8b" strokeWidth="2"/><circle cx={296+i*24} cy={270+(i%2)*23} r="4" fill="#f4d65c"/></g>)}
      {[-1,0,1].map((n)=><g key={n}><path d={`M${320+n*85} 220 Q${320+n*88} 155 ${320+n*75} 112`} stroke="#e8cf3e" strokeWidth="5" fill="none"/><ellipse cx={320+n*75} cy="108" rx="11" ry="20" transform={`rotate(${n*14} ${320+n*75} 108)`} fill="#f1c928" stroke="#c69b17" strokeWidth="2"/></g>)}
      <path d="M245 215 Q210 190 180 206 Q197 242 258 245Z" fill="#6fae2c" stroke="#4c8b25" strokeWidth="3"/>
      <path d="M395 215 Q430 190 460 206 Q443 242 382 245Z" fill="#6fae2c" stroke="#4c8b25" strokeWidth="3"/>
      {pin("tepe",320,43,"Dişicik tepesi","#84b91c")}
      {pin("boru",320,145,"Dişicik borusu","#84b91c")}
      {pin("yumurtalik",320,278,"Yumurtalık","#84b91c")}
      {pin("bascik",395,109,"Başçık","#e6ae22")}
      {pin("sapcik",405,193,"Sapçık","#e6ae22")}
      {pin("tac",535,95,"Taç yaprak","#d64b9b")}
      {pin("canak",190,220,"Çanak yaprak","#31934d")}
      {pin("sap",320,390,"Çiçek sapı","#31934d")}
    </svg>
  );
}

export default function CiceginKisimlariPage() {
  const [active,setActive] = useState("tepe");
  const selected = parts.find(p=>p.id===active) || parts[0];
  return (
    <main className="flower-page" data-animation="cicegin-kisimlari">
      <div className="flower-wrap">
        <nav className="flower-crumb"><Link href="/#animasyonlar">Animasyonlar</Link><span>/</span><Link href="/animasyonlar/6">6. Sınıf</Link><span>/</span><span>Çiçeğin kısımları</span></nav>
        <header className="flower-hero"><span>6. SINIF FEN BİLİMLERİ · BİTKİLERDE ÜREME</span><h1>Çiçeğin Kısımları ve Görevleri</h1><p>Çizimdeki renkli işaretlere veya aşağıdaki bölüm adlarına dokun. Seçtiğin kısmın görevini öğren!</p></header>
        <section className="flower-layout">
          <div className="flower-art"><div className="art-hint">Çiçeğin üzerindeki işaretlere dokun</div><FlowerDiagram active={active} onSelect={setActive}/></div>
          <article className="flower-info" aria-live="polite">
            <div className="info-tag" style={{background:selected.color}}>{selected.group}</div>
            <div className="info-number">SEÇİLEN BÖLÜM</div>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="role-box"><strong>Görevi nedir?</strong><p>{selected.role}</p></div>
            <div className="info-nav"><button onClick={()=>setActive(parts[(parts.findIndex(p=>p.id===active)+parts.length-1)%parts.length].id)}>← Önceki</button><button onClick={()=>setActive(parts[(parts.findIndex(p=>p.id===active)+1)%parts.length].id)}>Sonraki →</button></div>
          </article>
        </section>
        <section className="part-list"><h2>Bölümleri keşfet</h2><div className="part-grid">{parts.map(p=><button key={p.id} onClick={()=>setActive(p.id)} className={active===p.id?"part-card chosen":"part-card"}><span style={{background:p.color}}/>{p.name}<small>{p.group}</small></button>)}</div></section>
        <aside className="flower-note"><strong>Hatırla:</strong> Dişi organ; dişicik tepesi, dişicik borusu ve yumurtalıktan oluşur. Erkek organ ise başçık ve sapçıktan oluşur.</aside>
        <div className="flower-footer"><Link href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link><button onClick={()=>setActive("tepe")}>↻ Baştan başla</button></div>
      </div>
      <style jsx>{`
        .flower-page{min-height:100vh;background:linear-gradient(180deg,#f0f8ed,#f8fafc 360px);padding:24px 15px 55px;color:#183526}.flower-wrap{max-width:1080px;margin:auto}.flower-crumb{display:flex;gap:9px;flex-wrap:wrap;font-size:13px;color:#64748b;margin-bottom:22px}.flower-crumb a{color:#287443;font-weight:800;text-decoration:none}
        .flower-hero{text-align:center;padding:18px 5px 28px}.flower-hero>span{font-size:12px;font-weight:900;letter-spacing:.12em;color:#287443}.flower-hero h1{font-size:clamp(28px,5vw,43px);line-height:1.1;margin:12px 0;color:#174b2b;font-weight:950}.flower-hero p{color:#587064;font-size:16px;margin:0}
        .flower-layout{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(280px,.8fr);gap:18px;align-items:stretch}.flower-art,.flower-info,.part-list{background:white;border:1px solid #dcebdd;border-radius:22px;box-shadow:0 12px 36px #234c2410}.flower-art{padding:14px;background:linear-gradient(180deg,#fafff7,#eff8e9);display:flex;flex-direction:column}.art-hint{text-align:center;font-size:12px;color:#52745a;font-weight:800;padding:4px}.flower-svg{width:100%;height:auto;max-height:490px;display:block}
        .flower-info{padding:25px;display:flex;flex-direction:column;justify-content:center}.info-tag{align-self:flex-start;color:white;border-radius:30px;padding:7px 13px;font-size:12px;font-weight:900}.info-number{font-size:10px;letter-spacing:.15em;color:#91a398;font-weight:900;margin-top:22px}.flower-info h2{font-size:30px;line-height:1.1;color:#1b6135;font-weight:950;margin:8px 0 13px}.flower-info>p{font-size:15px;line-height:1.7;color:#526459;margin:0}.role-box{margin-top:20px;background:#f0f8ed;border:1px solid #dcebd7;border-radius:15px;padding:16px}.role-box strong{color:#236b39;font-size:14px}.role-box p{color:#465e4b;line-height:1.65;font-size:14px;margin:7px 0 0}.info-nav{display:flex;gap:9px;margin-top:22px}.info-nav button,.flower-footer button{border:0;border-radius:11px;background:#e9f3e7;color:#24643a;padding:11px 15px;font-weight:850;cursor:pointer}.info-nav button:last-child{background:#267d43;color:white;flex:1}
        .part-list{margin-top:20px;padding:20px}.part-list h2{font-size:19px;color:#1b6034;font-weight:900;margin:0 0 14px}.part-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.part-card{border:1px solid #e1ebe1;border-radius:12px;background:#fbfdfb;padding:12px 10px;text-align:left;font-size:13px;font-weight:850;color:#3e5945;cursor:pointer}.part-card>span{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px}.part-card small{display:block;color:#8a9b8e;font-size:10px;margin:6px 0 0 16px}.part-card.chosen{border-color:#389454;background:#f0f9ed;box-shadow:0 0 0 2px #d9efd8}
        .flower-note{margin-top:17px;padding:15px 18px;border-radius:14px;background:#fff8e5;border:1px solid #f1e5bd;color:#6d5b2b;font-size:14px;line-height:1.6}.flower-footer{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:20px}.flower-footer a{color:#287443;text-decoration:none;font-size:14px;font-weight:850}
        @media(max-width:760px){.flower-layout{grid-template-columns:1fr}.flower-info{padding:20px}.flower-svg{max-height:360px}.part-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.flower-hero p{font-size:14px}}
      `}</style>
    </main>
  );
}

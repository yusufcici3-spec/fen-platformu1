"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

export default function PilAmpulLaboratuvari() {
  const [bulbs, setBulbs] = useState(1);
  const [batteries, setBatteries] = useState(1);
  const brightness = useMemo(() => Math.min(100, Math.round((batteries / bulbs) * 48)), [batteries, bulbs]);
  const level = brightness >= 80 ? "Çok parlak" : brightness >= 48 ? "Parlak" : brightness >= 28 ? "Orta parlaklıkta" : "Sönük";
  const reset = () => { setBulbs(1); setBatteries(1); };
  return (
    <main style={{minHeight:"100vh",background:"linear-gradient(160deg,#071b36,#102e53 55%,#164b65)",color:"#f7fbff",padding:"24px 16px 56px"}}>
      <div style={{maxWidth:1050,margin:"0 auto"}}>
        <nav style={{display:"flex",gap:9,flexWrap:"wrap",fontSize:14,color:"#b9d5ee",marginBottom:22}}>
          <Link href="/#animasyonlar" style={{color:"inherit"}}>Animasyonlar</Link><span>/</span>
          <Link href="/animasyonlar/5" style={{color:"inherit"}}>5. Sınıf</Link><span>/</span><span>Pil ve Ampul</span>
        </nav>
        <header style={{display:"flex",justifyContent:"space-between",gap:20,alignItems:"center",flexWrap:"wrap",marginBottom:24}}>
          <div style={{maxWidth:680}}>
            <div style={{color:"#78e4d1",fontWeight:800,letterSpacing:1.5,fontSize:13}}>5. SINIF · ELEKTRİK DEVRELERİ</div>
            <h1 style={{fontSize:"clamp(30px,5vw,48px)",lineHeight:1.08,margin:"10px 0"}}>Pil ve Ampul Sayısı Laboratuvarı</h1>
            <p style={{fontSize:17,lineHeight:1.6,color:"#d3e5f5",margin:0}}>Devredeki pil ve ampul sayılarını değiştir. Ampul parlaklığındaki değişimi gözlemle ve tahminlerini dene.</p>
          </div>
          <div style={{fontSize:58,background:"#ffffff12",border:"1px solid #ffffff24",borderRadius:24,padding:"16px 24px"}} aria-hidden="true">💡</div>
        </header>

        <section style={{background:"#ffffff0d",border:"1px solid #ffffff24",borderRadius:24,padding:20,boxShadow:"0 18px 50px #0003"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:14}}>
            <h2 style={{fontSize:22,margin:0}}>Devreni oluştur</h2>
            <button onClick={reset} style={buttonStyle("#294766")}>↺ Sıfırla</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
            <Control title="Ampul sayısı" value={bulbs} min={1} max={4} onChange={setBulbs} emoji="💡" />
            <Control title="Pil sayısı" value={batteries} min={1} max={3} onChange={setBatteries} emoji="🔋" />
          </div>

          <div style={{marginTop:20,background:"#06162b",borderRadius:20,padding:"18px 12px",border:"1px solid #33516f"}}>
            <div style={{textAlign:"center",color:"#a9c8e5",fontSize:13,fontWeight:700,letterSpacing:1,marginBottom:10}}>BASİT ELEKTRİK DEVRESİ</div>
            <svg viewBox="0 0 700 260" role="img" aria-label={`${batteries} pil ve ${bulbs} ampulden oluşan devre; ampuller ${level.toLowerCase()} yanıyor`} style={{width:"100%",height:"auto",display:"block"}}>
              <path d="M90 55 H610 V205 H90 V55" fill="none" stroke="#8eb8d8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M90 55 H610 V205 H90 V55" fill="none" stroke="#e2f5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".6"/>
              {Array.from({length:batteries}).map((_,i)=>{const x=130+i*48;return <g key={i}><line x1={x} y1="183" x2={x} y2="227" stroke="#ffcf69" strokeWidth="6" strokeLinecap="round"/><line x1={x+13} y1="174" x2={x+13} y2="236" stroke="#ffcf69" strokeWidth="3" strokeLinecap="round"/></g>})}
              {Array.from({length:bulbs}).map((_,i)=>{const x=160+i*(380/Math.max(1,bulbs-1));const y=55;return <g key={i}>
                <circle cx={x} cy={y} r="33" fill={`rgba(255,213,92,${0.13+brightness/150})`} stroke="#ffdb78" strokeWidth="3"/>
                <circle cx={x} cy={y} r="23" fill={`rgba(255,219,120,${brightness/100})`} stroke="#fff0b0" strokeWidth="2"/>
                <path d={`M${x-10} ${y-10} L${x+10} ${y+10} M${x+10} ${y-10} L${x-10} ${y+10}`} stroke="#8b5a19" strokeWidth="3" strokeLinecap="round"/>
                <path d={`M${x-9} ${y+26} V${y+35} H${x+9} V${y+26}`} fill="none" stroke="#c9d9e8" strokeWidth="3"/>
              </g>})}
              <text x="350" y="252" fill="#a9c8e5" fontSize="12" textAnchor="middle">Şematik devre gösterimi</text>
            </svg>
            <div style={{display:"flex",justifyContent:"center",gap:18,flexWrap:"wrap",marginTop:4}}>
              <span style={{color:"#ffdc82"}}>🔋 {batteries} pil</span><span style={{color:"#ffdc82"}}>💡 {bulbs} ampul</span>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:14,marginTop:16}}>
            <div style={{background:"#0c2946",borderRadius:16,padding:16}}>
              <div style={{color:"#a9c8e5",fontSize:13}}>AMPUL PARLAKLIĞI</div>
              <div style={{fontSize:25,fontWeight:800,margin:"5px 0"}}>{level}</div>
              <div style={{height:13,background:"#294766",borderRadius:20,overflow:"hidden"}}><div style={{height:"100%",width:brightness+"%",background:"linear-gradient(90deg,#ffb84d,#fff0a6)",borderRadius:20,transition:"width .25s"}}/></div>
              <div style={{fontSize:12,color:"#a9c8e5",marginTop:7}}>Model parlaklık göstergesi: %{brightness}</div>
            </div>
            <div style={{background:"#0c2946",borderRadius:16,padding:16}}>
              <div style={{color:"#a9c8e5",fontSize:13}}>GÖZLEM</div>
              <p style={{fontSize:15,lineHeight:1.5,margin:"7px 0 0"}}>{bulbs>1 && batteries===1 ? "Pil sayısı sabitken ampul sayısını artırdın. Ampuller daha sönük yanıyor." : batteries>1 && bulbs===1 ? "Ampul sayısı sabitken pil sayısını artırdın. Ampul daha parlak yanıyor." : batteries>1 && bulbs>1 ? "Hem pil hem ampul sayısını değiştirdin. Her seferinde yalnızca birini değiştirerek karşılaştırma yap." : "Başlangıç devresini görüyorsun. Şimdi pil veya ampul sayısını değiştirerek deneye başla."}</p>
            </div>
          </div>
        </section>

        <section style={{marginTop:22,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
          <article style={infoStyle}><div style={{fontSize:28}}>💡</div><h3 style={h3Style}>Ampul sayısı artarsa</h3><p style={pStyle}>Pil sayısı aynı kalırken seri devrede ampul sayısı arttıkça ampullerin parlaklığı azalır.</p></article>
          <article style={infoStyle}><div style={{fontSize:28}}>🔋</div><h3 style={h3Style}>Pil sayısı artarsa</h3><p style={pStyle}>Ampul sayısı aynı kalırken pil sayısı arttıkça ampullerin parlaklığı artar.</p></article>
          <article style={infoStyle}><div style={{fontSize:28}}>🔬</div><h3 style={h3Style}>Bilimsel deney yap</h3><p style={pStyle}>Bir denemede yalnızca pil ya da ampul sayısını değiştir. Böylece değişimin nedenini daha iyi anlarsın.</p></article>
        </section>
        <p style={{color:"#aac6de",fontSize:13,lineHeight:1.6,marginTop:18}}>Not: Bu animasyon, özdeş ampul ve pillerden oluşan ideal seri devre için hazırlanmış basitleştirilmiş bir eğitim modelidir. Gerçek devrelerde parlaklık; pilin ve ampulün özelliklerine de bağlıdır.</p>
        <div style={{marginTop:24}}><Link href="/animasyonlar/5" style={{color:"#8fe7d7",fontWeight:700}}>← 5. sınıf animasyonlarına dön</Link></div>
      </div>
    </main>
  );
}

function Control({title,value,min,max,onChange,emoji}:{title:string;value:number;min:number;max:number;onChange:(v:number)=>void;emoji:string}) {
  return <div style={{background:"#0c2946",borderRadius:16,padding:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><strong>{emoji} {title}</strong><strong style={{fontSize:24,color:"#ffdc82"}}>{value}</strong></div>
    <div style={{display:"flex",gap:10,marginTop:12}}>
      <button onClick={()=>onChange(Math.max(min,value-1))} disabled={value===min} style={buttonStyle(value===min?"#25394c":"#176b78")}>−</button>
      <button onClick={()=>onChange(Math.min(max,value+1))} disabled={value===max} style={buttonStyle(value===max?"#25394c":"#176b78")}>+</button>
    </div>
    <div style={{fontSize:12,color:"#a9c8e5",marginTop:9}}>En az {min}, en çok {max}</div>
  </div>;
}
const buttonStyle=(background:string): CSSProperties => ({border:0,borderRadius:12,padding:"10px 18px",background,color:"#fff",fontSize:20,fontWeight:800,cursor:"pointer",minWidth:52,opacity:1});
const infoStyle: CSSProperties = {background:"#ffffff10",border:"1px solid #ffffff20",borderRadius:18,padding:18};
const h3Style: CSSProperties = {fontSize:18,margin:"8px 0"};
const pStyle: CSSProperties = {color:"#d0e2f1",lineHeight:1.6,margin:0};

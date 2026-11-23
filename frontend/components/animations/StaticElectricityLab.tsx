"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

type Obj={name:string;q:number;material:string};
type Mode="idle"|"near"|"touch"|"rub";
const materials=["Metal küre","Plastik çubuk","Cam çubuk","Ebonit çubuk","İpek kumaş","Yün kumaş"];
const sign=(q:number)=>q>0?"+":q<0?"−":"0";
const color=(q:number)=>q>0?"#fb7185":q<0?"#60a5fa":"#cbd5e1";
export default function StaticElectricityLab(){
 const [a,setA]=useState<Obj>({name:"Metal küre A",q:0,material:"Metal küre"});
 const [b,setB]=useState<Obj>({name:"Metal küre B",q:0,material:"Metal küre"});
 const [mode,setMode]=useState<Mode>("idle");
 const [note,setNote]=useState("İki cisim de başlangıçta nötr. Bir işlem seçerek yüklerin nasıl davrandığını incele.");
 const [electrons,setElectrons]=useState(0);
 const total=a.q+b.q;
 const reset=()=>{setA({...a,q:0});setB({...b,q:0});setMode("idle");setElectrons(0);setNote("Cisimler nötr hâle getirildi. Yeni bir deney seçebilirsin.")};
 const approach=()=>{setMode("near");setNote("Cisimler birbirine dokunmadan yaklaştırıldı. Yüklü cisim, diğer cisimde yük ayrışmasına (kutuplaşma) neden olabilir. Toplam yük geçişi olmaz; net yükler değişmez.")};
 const touch=()=>{if(a.material!=="Metal küre"||b.material!=="Metal küre"){setNote("Bu basit temas modeli iletken metal küreler içindir. İki cismi de Metal küre olarak seç.");return;}const each=Math.round((a.q+b.q)/2);setA({...a,q:each});setB({...b,q:total-each});setMode("touch");setElectrons(Math.abs(a.q-each));setNote("Temas edildi: iletken küreler arasında elektronlar hareket eder. Özdeş küreler ayrıldığında toplam yük korunur ve yük eşit paylaşılır. Elektronlar negatif yüklü cisimden pozitif yüklü cisme doğru hareket eder.")};
 const rub=()=>{const pair=[a.material,b.material].sort().join("|");let qa=a.q,qb=b.q,desc="";
 if(pair==="Cam çubuk|İpek kumaş"){qa=+4;qb=-4;desc="Cam çubuk ipekle sürtüldüğünde elektronlar camdan ipeğe geçer. Cam pozitif, ipek negatif yüklenir."}
 else if(pair==="Ebonit çubuk|Yün kumaş"){qa=-4;qb=+4;desc="Ebonit çubuk yünle sürtüldüğünde elektronlar yünden ebonite geçer. Ebonit negatif, yün pozitif yüklenir."}
 else if(pair==="Plastik çubuk|Yün kumaş"){qa=-4;qb=+4;desc="Plastik çubuk yünle sürtüldüğünde elektronlar yünden plastiğe geçebilir. Plastik negatif, yün pozitif yüklenir."}
 else {setNote("Bu eşleşme için burada kesin yük işareti modeli tanımlı değil. Cam–ipek veya ebonit–yün çiftlerinden birini seç.");return;}
 setA({...a,q:qa});setB({...b,q:qb});setMode("rub");setElectrons(4);setNote(desc+" Yük miktarları şematik gösterimdir; toplam yük korunur.");
 };
 const particleA=useMemo(()=>Array.from({length:Math.abs(a.q)},(_,i)=>i),[a.q]);
 const particleB=useMemo(()=>Array.from({length:Math.abs(b.q)},(_,i)=>i),[b.q]);
 return <main style={{minHeight:"100vh",background:"#f1f5f9",color:"#172033",padding:"16px 12px 42px"}}><div style={{maxWidth:1050,margin:"auto"}}>
 <nav style={{fontSize:13,margin:"4px 0 16px",color:"#64748b"}}><Link href="/animasyonlar/8" style={{color:"#2563eb"}}>8. Sınıf animasyonları</Link> / Elektriklenme laboratuvarı</nav>
 <header style={{borderRadius:20,padding:22,background:"linear-gradient(120deg,#0f172a,#075985)",color:"white"}}><small style={{color:"#bae6fd",fontWeight:900,letterSpacing:1}}>8. SINIF · ELEKTRİKLENME</small><h1 style={{fontSize:32,fontWeight:900,margin:"8px 0"}}>Elektriklenme ve Yük Geçişi Laboratuvarı</h1><p style={{lineHeight:1.6,margin:0,color:"#e0f2fe"}}>Cisimleri yaklaştır, dokundur veya sürt. Elektronların hangi yönde hareket ettiğini ve cisimlerin son yüklerini gözlemle.</p></header>
 <section style={{background:"white",border:"1px solid #e2e8f0",borderRadius:16,padding:16,marginTop:14}}>
 <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>
 {[{v:a,set:setA,title:"CİSİM A",parts:particleA},{v:b,set:setB,title:"CİSİM B",parts:particleB}].map((x,i)=><div key={i} style={{border:"1px solid #e2e8f0",borderRadius:13,padding:13}}><b>{x.title}</b><label style={{display:"block",fontSize:13,fontWeight:800,marginTop:9}}>Cisim türü</label><select value={x.v.material} onChange={e=>{x.set({...x.v,material:e.target.value});setMode("idle")}} style={{width:"100%",padding:10,borderRadius:9,border:"1px solid #cbd5e1",marginTop:5}}>{materials.map(m=><option key={m}>{m}</option>)}</select><div style={{height:145,display:"grid",placeItems:"center",marginTop:10,background:"#f8fafc",borderRadius:12}}><div style={{width:150,height:75,borderRadius:x.v.material.includes("kumaş")?10:14,transform:x.v.material.includes("çubuk")?"rotate(-8deg)":"none",background:x.v.material.includes("kumaş")?"#a78bfa":x.v.material.includes("Cam")?"#7dd3fc":x.v.material.includes("Ebonit")?"#64748b":x.v.material.includes("Plastik")?"#fbbf24":"#94a3b8",border:"3px solid #475569",display:"flex",alignItems:"center",justifyContent:"center",gap:8,flexWrap:"wrap",padding:8}}>{x.parts.map(n=><span key={n} style={{fontWeight:900,fontSize:18,color:x.v.q>0?"#881337":x.v.q<0?"#172554":"#334155"}}>{sign(x.v.q)}</span>)}</div></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:13,color:"#64748b"}}>Net yük</span><b style={{fontSize:22,color:color(x.v.q)}}>{sign(x.v.q)} {Math.abs(x.v.q)} birim</b></div></div>)}
 </div>
 <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:16}}><button onClick={approach} style={btn}>↔ Yaklaştır</button><button onClick={touch} style={btn}>✋ Dokundur ve ayır</button><button onClick={rub} style={btn}>〰 Sürt</button><button onClick={reset} style={{...btn,background:"#f1f5f9"}}>↺ Sıfırla</button></div>
 <div style={{marginTop:14,padding:14,borderRadius:12,background:"#eff6ff",border:"1px solid #bfdbfe",lineHeight:1.65}}><b>Deney sonucu</b><p style={{margin:"6px 0"}}>{note}</p><div style={{display:"flex",gap:20,flexWrap:"wrap",fontSize:13}}><span>Toplam yük: <b>{sign(total)} {Math.abs(total)} birim</b></span><span>Elektron geçişi: <b>{mode==="touch"||mode==="rub"?"İşlem gerçekleşti":"Yok / net geçiş yok"}</b></span></div></div>
 </section>
 <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginTop:14}}>
 <article style={card}><h2 style={h2}>Yaklaştırma</h2><p style={p}>Yüklü bir cisim nötr iletkene dokunmadan yaklaştırılırsa iletken içindeki yükler ayrışır. Cisimlerin toplam yükü değişmez; elektronlar cisimler arasında geçmez.</p></article>
 <article style={card}><h2 style={h2}>Dokunma</h2><p style={p}>İletken cisimler temas ettiğinde elektron alışverişi olabilir. Özdeş metal küreler ayrıldığında toplam yük eşit paylaşılır. Elektronlar negatiften pozitife doğru hareket eder.</p></article>
 <article style={card}><h2 style={h2}>Sürtünme</h2><p style={p}>Sürtünmede elektronlar bir maddeden diğerine geçer. Cam–ipek örneğinde cam elektron verir; ebonit–yün örneğinde ebonit elektron alır. Protonlar yer değiştirmez.</p></article>
 </section>
 <p style={{fontSize:12,color:"#64748b",marginTop:12}}>Not: Yük birimleri ve tanecik çizimleri öğretim amaçlı şematiktir. Temasla yük paylaşımı, aynı büyüklükte özdeş iletken küreler için modellenmiştir.</p>
 </div></main>;
}
const btn={padding:"11px 14px",borderRadius:10,border:"1px solid #7dd3fc",background:"#e0f2fe",color:"#075985",fontWeight:900,cursor:"pointer"};
const card={background:"white",border:"1px solid #e2e8f0",borderRadius:14,padding:15};
const h2={fontWeight:900,fontSize:18,margin:"0 0 7px"};
const p={fontSize:13,color:"#475569",lineHeight:1.65,margin:0};

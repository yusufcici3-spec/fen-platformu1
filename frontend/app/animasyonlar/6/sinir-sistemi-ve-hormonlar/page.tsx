"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Part = { id:string; name:string; group:"Sinir sistemi"|"İç salgı bezleri"; x:number; y:number; color:string; role:string; hormone?:string };
const parts:Part[] = [
 {id:"beyin",name:"Beyin",group:"Sinir sistemi",x:160,y:75,color:"#4f8edb",role:"Duyu organlarından gelen bilgileri değerlendirir; düşünme, öğrenme, hafıza ve istemli hareketleri yönetir."},
 {id:"beyincik",name:"Beyincik",group:"Sinir sistemi",x:205,y:112,color:"#4f8edb",role:"Kasların uyumlu çalışmasını sağlar. Denge ve hareketlerin koordinasyonunda görevlidir."},
 {id:"omurilik-sogani",name:"Omurilik soğanı",group:"Sinir sistemi",x:172,y:139,color:"#4f8edb",role:"Solunum, dolaşım ve sindirim gibi yaşamsal faaliyetleri düzenler."},
 {id:"omurilik",name:"Omurilik",group:"Sinir sistemi",x:166,y:220,color:"#4f8edb",role:"Beyin ile vücut arasındaki sinirsel iletimi sağlar ve reflekslerin yönetiminde görevlidir."},
 {id:"sinirler",name:"Çevresel sinirler",group:"Sinir sistemi",x:94,y:310,color:"#4f8edb",role:"Merkezi sinir sistemi ile organlar arasında bilgi taşır. Uyarıları merkeze, cevapları ilgili yapılara iletir."},
 {id:"hipofiz",name:"Hipofiz bezi",group:"İç salgı bezleri",x:160,y:91,color:"#db72a8",role:"Büyüme başta olmak üzere başka iç salgı bezlerinin çalışmasını düzenleyen hormonlar salgılar.",hormone:"Büyüme hormonu"},
 {id:"tiroit",name:"Tiroit bezi",group:"İç salgı bezleri",x:165,y:165,color:"#db72a8",role:"Vücudun enerji kullanımını ve metabolizma hızını düzenlemeye yardımcı olur.",hormone:"Tiroksin"},
 {id:"bobrek-ustu",name:"Böbrek üstü bezleri",group:"İç salgı bezleri",x:245,y:265,color:"#db72a8",role:"Heyecan ve korku gibi durumlarda vücudun hızlı tepki vermesine yardımcı olur.",hormone:"Adrenalin"},
 {id:"pankreas",name:"Pankreas",group:"İç salgı bezleri",x:165,y:315,color:"#db72a8",role:"Kandaki glikoz miktarının düzenlenmesine yardımcı olur.",hormone:"İnsülin ve glukagon"},
 {id:"esey-bezleri",name:"Eşey bezleri",group:"İç salgı bezleri",x:165,y:390,color:"#db72a8",role:"Ergenlik dönemindeki değişimlerde etkili olan eşey hormonlarını salgılar.",hormone:"Testosteron, östrojen"}
];
const nervous = parts.filter(p=>p.group==="Sinir sistemi");
const endocrine = parts.filter(p=>p.group==="İç salgı bezleri");
const questions = [
 {q:"Denge ve hareketlerin uyumundan sorumlu yapı hangisidir?",a:"Beyincik",opts:["Beyincik","Omurilik","Hipofiz bezi"]},
 {q:"Solunum ve dolaşım gibi yaşamsal olayları hangi yapı düzenler?",a:"Omurilik soğanı",opts:["Beyin","Omurilik soğanı","Tiroit bezi"]},
 {q:"Büyüme hormonu salgılayan bez hangisidir?",a:"Hipofiz bezi",opts:["Pankreas","Hipofiz bezi","Böbrek üstü bezleri"]},
 {q:"Kandaki şeker miktarının düzenlenmesinde görevli hormon hangisidir?",a:"İnsülin",opts:["Adrenalin","Tiroksin","İnsülin"]},
 {q:"Reflekslerin yönetiminde görev alan merkezi sinir sistemi yapısı hangisidir?",a:"Omurilik",opts:["Beyincik","Omurilik","Hipofiz bezi"]}
];

function BodyMap({items,active,onPick}:{items:Part[];active:string;onPick:(id:string)=>void}) {
 const isN=items[0]?.group==="Sinir sistemi";
 return <svg viewBox="0 0 330 455" className="body-svg" role="img" aria-label="Seçilebilir sinir sistemi ve iç salgı bezleri şeması">
  <defs><linearGradient id="bodySkin" x2="0" y2="1"><stop stopColor="#f6d9c4"/><stop offset="1" stopColor="#e8bfa7"/></linearGradient></defs>
  <circle cx="165" cy="53" r="36" fill="url(#bodySkin)" stroke="#bd9b88" strokeWidth="2"/>
  <path d="M140 91 Q165 82 190 91 L214 112 L204 220 L195 282 L210 420 L177 420 L165 292 L153 420 L120 420 L135 282 L126 220 L116 112Z" fill="url(#bodySkin)" stroke="#bd9b88" strokeWidth="2"/>
  <path d="M120 111 L82 130 L52 230 L66 238 L105 158 L128 145 M210 111 L248 130 L278 230 L264 238 L225 158 L202 145" fill="none" stroke="#e8bfa7" strokeWidth="17" strokeLinecap="round"/>
  {isN ? <>
   <path d="M165 82 L165 274" stroke="#3b82c9" strokeWidth="9" strokeLinecap="round" opacity=".8"/>
   <path d="M165 190 L125 252 L95 309 M165 190 L205 252 L235 309 M165 270 L135 345 M165 270 L195 345" stroke="#3b82c9" strokeWidth="4" fill="none" strokeLinecap="round"/>
   <path d="M139 47 Q145 23 169 26 Q192 31 190 53 Q185 69 165 66 Q145 67 139 47Z" fill="#78a9eb" stroke="#376eae" strokeWidth="2"/>
   <ellipse cx="188" cy="69" rx="15" ry="12" fill="#78a9eb" stroke="#376eae" strokeWidth="2"/>
   <path d="M162 72 L162 90" stroke="#376eae" strokeWidth="7" strokeLinecap="round"/>
  </> : <>
   <path d="M164 90 L164 120" stroke="#d76da4" strokeWidth="7" strokeLinecap="round"/>
   <path d="M151 144 Q165 136 179 144 L180 164 Q165 172 150 164Z" fill="#d76da4" stroke="#a8497d" strokeWidth="2"/>
   <path d="M145 250 Q130 235 119 255 Q128 275 145 270 M185 250 Q200 235 211 255 Q202 275 185 270" fill="#d76da4" stroke="#a8497d" strokeWidth="2"/>
   <path d="M143 300 Q165 286 187 300 Q182 320 165 322 Q148 320 143 300Z" fill="#e69a60" stroke="#b76b3c" strokeWidth="2"/>
   <ellipse cx="165" cy="380" rx="20" ry="9" fill="#d76da4" stroke="#a8497d" strokeWidth="2"/>
  </>}
  {items.map(p=><g key={p.id} onClick={()=>onPick(p.id)} role="button" tabIndex={0} aria-label={p.name+" seç"} onKeyDown={e=>{if(e.key==="Enter"||e.key===" ")onPick(p.id)}} style={{cursor:"pointer"}}>
    <circle cx={p.x} cy={p.y} r={active===p.id?13:9} fill={p.color} stroke={active===p.id?"#172554":"white"} strokeWidth={active===p.id?4:2}/>
    <circle cx={p.x} cy={p.y} r="3" fill="white"/>
   </g>)}
  <text x="165" y="447" textAnchor="middle" fontSize="10" fill="#64748b">{isN?"SİNİR SİSTEMİ":"İÇ SALGI BEZLERİ"}</text>
 </svg>
}

export default function SinirVeHormonPage(){
 const [tab,setTab]=useState<"nervous"|"hormone">("nervous");
 const [active,setActive]=useState("beyin");
 const [mode,setMode]=useState<"kesfet"|"etiketle"|"test">("kesfet");
 const [answers,setAnswers]=useState<Record<number,string>>({});
 const [checked,setChecked]=useState(false);
 const list=tab==="nervous"?nervous:endocrine;
 const selected=list.find(p=>p.id===active)||list[0];
 const [typed,setTyped]=useState("");
 const [revealed,setRevealed]=useState(false);
 const quizScore=useMemo(()=>questions.filter((q,i)=>answers[i]===q.a).length,[answers]);
 const changeTab=(t:"nervous"|"hormone")=>{setTab(t);setActive(t==="nervous"?"beyin":"hipofiz");setMode("kesfet");setTyped("");setRevealed(false)};
 return <main className="lesson">
  <div className="wrap">
   <nav className="crumb"><Link href="/animasyonlar">Animasyonlar</Link> / <Link href="/animasyonlar/6">6. Sınıf</Link> / Sinir Sistemi ve Hormonlar</nav>
   <header className="hero"><span>6. SINIF FEN BİLİMLERİ · VÜCUDUMUZDAKİ SİSTEMLER</span><h1>Sinir Sistemi ve Hormonlar</h1><p>Vücudumuzdaki yapıları seç, görevlerini keşfet; sonra isimlerini kendin bul ve mini testi çöz.</p></header>
   <div className="tabs"><button className={tab==="nervous"?"on":""} onClick={()=>changeTab("nervous")}>🧠 Sinir Sistemi</button><button className={tab==="hormone"?"on":""} onClick={()=>changeTab("hormone")}>🧪 İç Salgı Bezleri ve Hormonlar</button></div>
   <div className="modes"><button className={mode==="kesfet"?"chosen":""} onClick={()=>setMode("kesfet")}>Keşfet</button><button className={mode==="etiketle"?"chosen":""} onClick={()=>{setMode("etiketle");setRevealed(false);setTyped("")}}>İsmini Bul</button><button className={mode==="test"?"chosen":""} onClick={()=>setMode("test")}>Mini Test</button></div>
   {mode==="test" ? <section className="quiz"><div className="quiz-head"><div><small>KENDİNİ DENE</small><h2>Bilgini kontrol et</h2></div><span>{Object.keys(answers).length}/{questions.length} cevaplandı</span></div>{questions.map((q,i)=><article className="question" key={i}><b>{i+1}. {q.q}</b><div className="options">{q.opts.map(o=><button key={o} className={answers[i]===o?"selected":""} onClick={()=>{setAnswers(v=>({...v,[i]:o}));setChecked(false)}}>{o}</button>)}</div>{checked&&<p className={answers[i]===q.a?"correct":"wrong"}>{answers[i]===q.a?"Doğru!":"Doğru cevap: "+q.a}</p>}</article>)}<button className="primary" onClick={()=>setChecked(true)}>Cevaplarımı kontrol et</button>{checked&&<strong className="score">Sonuç: {quizScore} / {questions.length} doğru</strong>}<button className="reset" onClick={()=>{setAnswers({});setChecked(false)}}>Testi sıfırla</button></section> :
   <section className="work">
    <div className="map-card"><div className="map-title"><span>ETKİLEŞİMLİ VÜCUT ŞEMASI</span><small>İşaretlere dokunarak seç</small></div><BodyMap items={list} active={active} onPick={id=>{setActive(id);setRevealed(false);setTyped("")}}/><div className="key"><span className="blue"/>Sinir sistemi <span className="pink"/>İç salgı bezleri</div></div>
    <article className="detail" aria-live="polite">
     <div className="detail-top"><span>{selected.group}</span><small>{list.findIndex(p=>p.id===selected.id)+1} / {list.length}</small></div>
     {mode==="kesfet"?<><h2>{selected.name}</h2><p>{selected.role}</p>{selected.hormone&&<div className="hormone"><b>Örnek hormonlar</b><span>{selected.hormone}</span></div>}<div className="tip">💡 <b>İpucu:</b> Şemadaki farklı noktalara dokunarak diğer yapıları da inceleyebilirsin.</div></>:
     <><h2>Bu yapının adı ne?</h2><p>Şemada seçili olan yapının adını aşağıya yaz.</p><input value={typed} onChange={e=>{setTyped(e.target.value);setRevealed(false)}} placeholder="Yapının adını yaz..." onKeyDown={e=>{if(e.key==="Enter")setRevealed(true)}}/><button className="primary" onClick={()=>setRevealed(true)}>Cevabı kontrol et</button>{revealed&&<div className="answer"><b>{typed.trim().toLocaleLowerCase("tr")===selected.name.toLocaleLowerCase("tr")?"Tebrikler, doğru!":"Doğru cevap: "+selected.name}</b><p>{selected.role}</p>{selected.hormone&&<small>Hormon: {selected.hormone}</small>}</div>}</>}
     <div className="nav-buttons"><button onClick={()=>{const i=list.findIndex(p=>p.id===active);setActive(list[(i+list.length-1)%list.length].id);setRevealed(false);setTyped("")}}>← Önceki</button><button onClick={()=>{const i=list.findIndex(p=>p.id===active);setActive(list[(i+1)%list.length].id);setRevealed(false);setTyped("")}}>Sonraki →</button></div>
    </article>
   </section>}
   {mode!=="test"&&<section className="structure-list"><h3>Yapıları seç</h3><div>{list.map(p=><button key={p.id} className={active===p.id?"active":""} onClick={()=>{setActive(p.id);setRevealed(false);setTyped("")}}><i style={{background:p.color}}/>{p.name}</button>)}</div></section>}
   <aside className="note"><b>Unutma:</b> Sinir sistemi uyarılara hızlı yanıt verilmesini sağlar. İç salgı bezleri ise hormonları kana salgılayarak büyüme, gelişme ve vücudun düzenlenmesinde görev alır.</aside>
   <footer><Link href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link><button onClick={()=>{changeTab("nervous");setAnswers({});setChecked(false)}}>↻ Baştan başla</button></footer>
  </div>
  <style jsx>{`
  .lesson{min-height:100vh;background:linear-gradient(180deg,#edf5ff,#f8fafc 360px);padding:22px 14px 55px;color:#172b45}.wrap{max-width:1050px;margin:auto}.crumb{font-size:13px;color:#718096;margin-bottom:18px}.crumb a{color:#2563a5;font-weight:800;text-decoration:none}.hero{text-align:center;padding:15px 5px 25px}.hero>span{font-size:11px;letter-spacing:.13em;font-weight:950;color:#3475b7}.hero h1{font-size:clamp(27px,5vw,42px);font-weight:950;color:#173b63;margin:10px 0}.hero p{color:#62748a;line-height:1.6;margin:0}.tabs,.modes{display:flex;gap:9px;justify-content:center;flex-wrap:wrap}.tabs button,.modes button{border:1px solid #d6e2ef;border-radius:13px;padding:12px 17px;font-weight:850;background:white;color:#47627d;cursor:pointer}.tabs button.on{background:#1f5e9c;color:white;border-color:#1f5e9c}.modes{margin:15px 0 17px}.modes button{padding:9px 15px;font-size:13px}.modes button.chosen{background:#dcecff;color:#174f85;border-color:#8dbbe8}.work{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.85fr);gap:16px}.map-card,.detail,.structure-list,.quiz{background:white;border:1px solid #dce6f0;border-radius:21px;box-shadow:0 10px 30px #193b5b0b}.map-card{padding:15px;background:linear-gradient(180deg,#f8fcff,#edf5fc)}.map-title{display:flex;justify-content:space-between;gap:8px;align-items:center}.map-title span{font-size:10px;letter-spacing:.12em;font-weight:950;color:#3573ad}.map-title small{font-size:11px;color:#8393a5}.body-svg{width:100%;height:auto;max-height:470px;display:block;margin:5px auto}.key{display:flex;align-items:center;justify-content:center;gap:7px;color:#64748b;font-size:11px}.key span{width:9px;height:9px;border-radius:50%;display:inline-block;margin-left:8px}.blue{background:#4f8edb}.pink{background:#db72a8}.detail{padding:24px;display:flex;flex-direction:column;justify-content:center}.detail-top{display:flex;justify-content:space-between;align-items:center}.detail-top span{background:#e9f3ff;color:#28639b;border-radius:30px;padding:7px 12px;font-size:11px;font-weight:900}.detail-top small{color:#96a5b5}.detail h2{font-size:27px;font-weight:950;color:#194d7b;margin:20px 0 10px}.detail>p{font-size:15px;line-height:1.75;color:#586b7e}.hormone,.answer{background:#f1f8ff;border:1px solid #d9eafa;border-radius:13px;padding:14px;margin-top:14px}.hormone b{display:block;font-size:12px;color:#53718d}.hormone span{display:block;font-weight:900;color:#245f94;margin-top:5px}.tip{background:#fff8e8;border-radius:12px;padding:13px;margin-top:18px;font-size:12px;line-height:1.6;color:#78602b}.detail input{border:1px solid #cbd9e7;border-radius:12px;padding:13px;margin:9px 0 12px;font:inherit;outline-color:#428bd0}.primary{background:#2166a5;color:white;border:0;border-radius:11px;padding:12px 17px;font-weight:900;cursor:pointer}.answer b{color:#245f94}.answer p{font-size:13px;line-height:1.6;color:#526b82}.answer small{font-weight:800;color:#28669f}.nav-buttons{display:flex;gap:9px;margin-top:22px}.nav-buttons button{border:0;border-radius:10px;padding:11px 14px;background:#e8f1fa;color:#245d91;font-weight:850;cursor:pointer}.nav-buttons button:last-child{background:#2166a5;color:white;flex:1}.structure-list{padding:18px;margin-top:16px}.structure-list h3{margin:0 0 12px;font-size:16px;font-weight:950;color:#214e78}.structure-list>div{display:flex;gap:8px;flex-wrap:wrap}.structure-list button{display:flex;align-items:center;gap:7px;border:1px solid #e1e9f1;border-radius:10px;padding:9px 11px;background:#fbfdff;color:#47627a;font-size:12px;font-weight:800;cursor:pointer}.structure-list button.active{border-color:#4b91cf;background:#edf6ff;color:#1c5a92}.structure-list i{width:8px;height:8px;border-radius:50%}.note{margin-top:16px;background:#fff8e8;border:1px solid #f0e3bf;border-radius:13px;padding:14px 17px;font-size:13px;line-height:1.7;color:#6d5b31}.quiz{padding:22px}.quiz-head{display:flex;justify-content:space-between;align-items:center;gap:10px}.quiz-head small{font-size:10px;letter-spacing:.15em;color:#4280b8;font-weight:950}.quiz-head h2{margin:5px 0 15px;font-size:25px;color:#194d7b}.quiz-head>span{font-size:12px;color:#71869a}.question{padding:15px 0;border-top:1px solid #e8eef4}.question>b{font-size:14px;line-height:1.6}.options{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.options button{border:1px solid #dce6f0;border-radius:10px;background:#fbfdff;padding:9px 12px;color:#49637c;font-size:12px;font-weight:750;cursor:pointer}.options button.selected{background:#e5f1ff;border-color:#6da4d8;color:#1c5d97}.correct{color:#16804b;font-size:12px;font-weight:850}.wrong{color:#b45353;font-size:12px;font-weight:850}.score{display:inline-block;margin:12px;color:#1d6d47}.reset{margin:10px;border:0;background:transparent;color:#53718d;font-weight:800;cursor:pointer}footer{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:20px}footer a{color:#28669f;text-decoration:none;font-weight:850;font-size:13px}footer button{border:0;background:#e5eff9;color:#245d91;border-radius:10px;padding:10px 14px;font-weight:850;cursor:pointer}@media(max-width:720px){.work{grid-template-columns:1fr}.body-svg{max-height:390px}.detail{padding:20px}.hero p{font-size:14px}.quiz{padding:16px}}`}</style>
 </main>
}

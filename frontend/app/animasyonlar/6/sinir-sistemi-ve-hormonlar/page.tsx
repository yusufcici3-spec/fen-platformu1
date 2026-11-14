"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Part = { id:string; name:string; group:"Sinir sistemi"|"İç salgı bezleri"; x:number; y:number; color:string; role:string; hormone?:string };
const parts:Part[] = [
 {id:"beyin",name:"Beyin",group:"Sinir sistemi",x:164,y:32,color:"#4f8edb",role:"Duyu organlarından gelen bilgileri değerlendirir; düşünme, öğrenme, hafıza ve istemli hareketleri yönetir."},
 {id:"beyincik",name:"Beyincik",group:"Sinir sistemi",x:181,y:60,color:"#4f8edb",role:"Kasların uyumlu çalışmasını sağlar. Denge ve hareketlerin koordinasyonunda görevlidir."},
 {id:"omurilik-sogani",name:"Omurilik soğanı",group:"Sinir sistemi",x:165,y:86,color:"#4f8edb",role:"Solunum, dolaşım ve sindirim gibi yaşamsal faaliyetleri düzenler."},
 {id:"omurilik",name:"Omurilik",group:"Sinir sistemi",x:165,y:198,color:"#4f8edb",role:"Beyin ile vücut arasındaki sinirsel iletimi sağlar ve reflekslerin yönetiminde görevlidir."},
 {id:"sinirler",name:"Çevresel sinirler",group:"Sinir sistemi",x:91,y:277,color:"#4f8edb",role:"Merkezi sinir sistemi ile organlar arasında bilgi taşır. Uyarıları merkeze, cevapları ilgili yapılara iletir."},
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
 return <svg viewBox="0 0 330 455" className="body-svg" role="img" aria-label="İnsan vücudunda beyin, beyincik, omurilik soğanı, omurilik ve çevresel sinirlerin ayrıntılı şeması">
  <defs>
   <linearGradient id="skinReal" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f8dfcf"/><stop offset=".48" stopColor="#e9bda7"/><stop offset="1" stopColor="#c98f7c"/></linearGradient>
   <linearGradient id="brainReal" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#ffb3b0"/><stop offset=".55" stopColor="#f27682"/><stop offset="1" stopColor="#bd536c"/></linearGradient>
   <linearGradient id="nerveReal" x1="0" x2="1"><stop stopColor="#fff29a"/><stop offset=".5" stopColor="#f5c842"/><stop offset="1" stopColor="#d68a16"/></linearGradient>
   <radialGradient id="bodyGlow"><stop stopColor="#d9efff" stopOpacity=".55"/><stop offset="1" stopColor="#8bbbe8" stopOpacity="0"/></radialGradient>
   <filter id="softGlow"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <ellipse cx="165" cy="235" rx="145" ry="205" fill="url(#bodyGlow)"/>
  {isN ? <>
   {/* İnsan vücudu: önden görünüm */}
   <path d="M143 88 Q127 91 111 102 L88 113 Q73 120 68 140 L43 224 Q39 238 51 243 Q62 247 68 234 L99 161 L116 151 L108 224 Q104 245 111 270 L105 318 L91 416 Q89 430 103 432 L119 432 L139 319 L151 276 L165 284 L179 276 L191 319 L211 432 L228 432 Q241 430 238 416 L225 318 L219 270 Q226 245 222 224 L214 151 L231 161 L262 234 Q268 247 279 243 Q291 238 287 224 L262 140 Q257 120 242 113 L219 102 Q203 91 187 88Z" fill="url(#skinReal)" stroke="#bd8e7e" strokeWidth="2.2"/>
   <path d="M143 86 Q165 78 187 86 L191 103 Q181 116 165 116 Q149 116 139 103Z" fill="url(#skinReal)" stroke="#bd8e7e" strokeWidth="1.5"/>
   <path d="M145 104 Q165 116 185 104 L202 124 L195 218 Q165 235 135 218 L128 124Z" fill="#e9bda7" opacity=".42"/>
   <path d="M165 117 L165 272" stroke="#a86e65" strokeWidth="1.5" opacity=".35"/>
   {/* Boyun ve beyin */}
   <path d="M145 24 Q147 8 165 8 Q183 8 185 24 L183 61 Q179 76 165 77 Q151 76 147 61Z" fill="url(#skinReal)" stroke="#bd8e7e" strokeWidth="2"/>
   <path d="M147 32 Q143 15 160 13 Q177 9 184 25 Q190 39 179 52 Q169 61 151 51 Q143 45 147 32Z" fill="url(#brainReal)" stroke="#a94d64" strokeWidth="1.6" filter="url(#softGlow)"/>
   <path d="M153 21 Q158 15 161 24 Q166 31 158 35 M169 17 Q178 20 173 28 Q168 34 177 39 M149 39 Q158 34 162 43 Q165 50 157 52 M168 42 Q177 35 181 45" fill="none" stroke="#a94761" strokeWidth="2" strokeLinecap="round"/>
   <path d="M174 49 Q188 47 188 59 Q185 70 174 68 Q164 65 166 57Z" fill="#d9657a" stroke="#9f425a" strokeWidth="1.5"/>
   <path d="M163 60 Q159 68 163 81 L167 92" fill="none" stroke="#d98b43" strokeWidth="8" strokeLinecap="round"/>
   {/* Omurilik ve sinir ağı */}
   <g fill="none" stroke="url(#nerveReal)" strokeLinecap="round" strokeLinejoin="round" filter="url(#softGlow)">
    <path d="M165 83 C162 112 168 137 165 164 S166 218 165 268" strokeWidth="7"/>
    <path d="M163 113 C145 125 132 139 117 155 S91 177 78 199 M167 113 C185 125 198 139 213 155 S239 177 252 199" strokeWidth="3.5"/>
    <path d="M164 142 C143 150 128 168 111 184 S88 214 76 245 M166 142 C187 150 202 168 219 184 S242 214 254 245" strokeWidth="3"/>
    <path d="M164 171 C145 178 132 194 119 212 S99 245 91 277 M166 171 C185 178 198 194 211 212 S231 245 239 277" strokeWidth="3"/>
    <path d="M164 198 C145 209 135 228 125 249 S111 278 108 310 M166 198 C185 209 195 228 205 249 S219 278 222 310" strokeWidth="3"/>
    <path d="M163 226 C145 239 137 257 131 280 S123 318 119 350 M167 226 C185 239 193 257 199 280 S207 318 211 350" strokeWidth="2.8"/>
    <path d="M163 252 C151 268 146 288 144 310 L137 359 M167 252 C179 268 184 288 186 310 L193 359" strokeWidth="2.8"/>
    <path d="M111 184 L96 171 L83 164 M219 184 L234 171 L247 164 M91 277 L72 292 L59 317 M239 277 L258 292 L271 317" strokeWidth="2.2"/>
    <path d="M119 350 L112 379 L104 405 M211 350 L218 379 L226 405 M137 359 L132 390 L127 414 M193 359 L198 390 L203 414" strokeWidth="2.2"/>
    <path d="M78 199 L66 214 L60 230 M252 199 L264 214 L270 230 M108 310 L95 328 L88 348 M222 310 L235 328 L242 348" strokeWidth="2"/>
   </g>
   {/* Kollar ve bacaklarda sinir uçları */}
   <g fill="none" stroke="#f7d96a" strokeWidth="1.8" strokeLinecap="round">
    <path d="M77 202 L65 225 L57 241 M83 210 L73 236 L69 254 M253 202 L265 225 L273 241 M247 210 L257 236 L261 254"/>
    <path d="M107 310 L101 346 L98 378 L104 411 M116 318 L111 356 L110 390 M223 310 L229 346 L232 378 L226 411 M214 318 L219 356 L220 390"/>
   </g>
   {/* İç hatlarla kas ve gövde derinliği */}
   <path d="M132 130 Q165 146 198 130 M126 178 Q165 195 204 178 M121 220 Q165 238 209 220 M119 266 Q165 280 211 266" fill="none" stroke="#c58f7d" strokeWidth="1.2" opacity=".45"/>
  </> : <>
   <path d="M143 88 Q127 91 111 102 L88 113 Q73 120 68 140 L43 224 Q39 238 51 243 Q62 247 68 234 L99 161 L116 151 L108 224 Q104 245 111 270 L105 318 L91 416 Q89 430 103 432 L119 432 L139 319 L151 276 L165 284 L179 276 L191 319 L211 432 L228 432 Q241 430 238 416 L225 318 L219 270 Q226 245 222 224 L214 151 L231 161 L262 234 Q268 247 279 243 Q291 238 287 224 L262 140 Q257 120 242 113 L219 102 Q203 91 187 88Z" fill="url(#skinReal)" stroke="#bd8e7e" strokeWidth="2"/>
   <path d="M145 104 Q165 116 185 104 L202 124 L195 218 Q165 235 135 218 L128 124Z" fill="#e9bda7" opacity=".42"/>
   <path d="M145 24 Q147 8 165 8 Q183 8 185 24 L183 61 Q179 76 165 77 Q151 76 147 61Z" fill="url(#skinReal)" stroke="#bd8e7e" strokeWidth="2"/>
   <g fill="#d96fa5" stroke="#a8487c" strokeWidth="1.8">
    <path d="M158 64 Q165 56 172 64 L176 88 Q165 96 154 88Z"/>
    <path d="M151 125 Q165 116 179 125 L185 146 Q165 157 145 146Z"/>
    <path d="M127 241 Q111 230 105 248 Q111 269 132 266 M203 241 Q219 230 225 248 Q219 269 198 266Z"/>
    <path d="M143 296 Q165 281 187 296 Q184 316 165 320 Q146 316 143 296Z"/>
    <ellipse cx="165" cy="380" rx="22" ry="10"/>
   </g>
  </>}
  {items.map(p=><g key={p.id} onClick={()=>onPick(p.id)} role="button" tabIndex={0} aria-label={p.name+" seç"} onKeyDown={e=>{if(e.key==="Enter"||e.key===" ")onPick(p.id)}} style={{cursor:"pointer"}}>
    <circle cx={p.x} cy={p.y} r={active===p.id?12:8} fill={p.color} stroke={active===p.id?"#172554":"white"} strokeWidth={active===p.id?3.5:2}/>
    <circle cx={p.x} cy={p.y} r="2.5" fill="white"/>
   </g>)}
  <text x="165" y="449" textAnchor="middle" fontSize="10" fill="#64748b">{isN?"SİNİR SİSTEMİ":"İÇ SALGI BEZLERİ"}</text>
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
     <div className="nav-buttons"><button onClick={()=>{const i=list.findIndex(p=>p.id===active);setActive(list[(i+list.length-1)%list.length].id);setRevealed(false);setTyped("")}}>← Önceki</button><button onClick={()=>{const i=list.findIndex(p=>p.id===active);setActive(list[(i+1)%list.length].id);se
"use client";

import { useState } from "react";

type Bone = { id:string; name:string; group:string; role:string; type:string; location:string; fact:string; x:number; y:number };
const bones:Bone[]=[
{id:"kafatasi",name:"Kafatası",group:"Baş kemikleri",role:"Beyni korur; başın şeklini oluşturur.",type:"Yassı kemik",location:"Baş",fact:"Kafatası kemikleri büyük ölçüde birbirine sıkı eklemlerle bağlıdır.",x:150,y:48},
{id:"omurga",name:"Omurga",group:"Gövde kemikleri",role:"Vücudu dik tutmaya yardım eder, omuriliği korur ve gövdenin esnekliğini sağlar.",type:"Düzensiz kemikler (omurlar)",location:"Boyundan kuyruk sokumuna uzanır",fact:"Omurga tek bir kemik değil, üst üste dizilmiş omurlardan oluşur.",x:150,y:155},
{id:"kaburga",name:"Kaburgalar",group:"Gövde kemikleri",role:"Göğüs kafesini oluşturur; kalp ve akciğerler gibi organları korumaya yardımcı olur.",type:"Yassı kemikler",location:"Göğüs bölgesi",fact:"Kaburgalar göğüs kemiği ve omurlar ile birlikte göğüs kafesini oluşturur.",x:177,y:112},
{id:"gogus",name:"Göğüs kemiği",group:"Gövde kemikleri",role:"Kaburgaların bir bölümü önde göğüs kemiğine bağlanır.",type:"Yassı kemik",location:"Göğsün ön orta kısmı",fact:"Göğüs kafesi, solunum sırasında hareket edebilecek biçimde düzenlenmiştir.",x:150,y:115},
{id:"pelvis",name:"Leğen kemiği",group:"Gövde kemikleri",role:"Gövdeyi alt uzuvlara bağlar ve bazı iç organları korumaya yardımcı olur.",type:"Düzensiz kemikler",location:"Kalça bölgesi",fact:"Leğen bölgesi vücut ağırlığının bacaklara aktarılmasına katkı sağlar.",x:150,y:195},
{id:"humerus",name:"Üst kol kemiği",group:"Kol kemikleri",role:"Omuz ve dirsek eklemleri arasında bulunur; kol hareketlerine katılır.",type:"Uzun kemik",location:"Omuz ile dirsek arası",fact:"Üst kol bölgesinde bir uzun kemik bulunur.",x:101,y:113},
{id:"radius",name:"Ön kol kemikleri",group:"Kol kemikleri",role:"El bileği ve dirsek hareketlerine katılır; ön kolun dönmesini sağlar.",type:"Uzun kemikler",location:"Dirsek ile el bileği arası",fact:"Ön kolda radius ve ulna adı verilen iki kemik bulunur.",x:83,y:151},
{id:"el",name:"El kemikleri",group:"El kemikleri",role:"Kavrama, tutma ve ince hareketlerin yapılmasını sağlar.",type:"Kısa ve uzun kemikler",location:"El bileği ve parmaklar",fact:"El; bilek, tarak ve parmak kemiklerinden oluşur.",x:68,y:177},
{id:"femur",name:"Uyluk kemiği",group:"Bacak kemikleri",role:"Vücudun ağırlığını taşımaya ve yürüme, koşma gibi hareketlere yardım eder.",type:"Uzun kemik",location:"Kalça ile diz arası",fact:"Uyluk kemiği insan vücudundaki en uzun kemiktir.",x:132,y:244},
{id:"diz",name:"Diz kapağı",group:"Bacak kemikleri",role:"Diz ekleminin ön kısmını korur ve uyluk kaslarının hareketine yardımcı olur.",type:"Susamsı kemik",location:"Dizin ön kısmı",fact:"Diz kapağı, dizin bükülüp açılması sırasında kasların etkili çalışmasına yardım eder.",x:132,y:281},
{id:"tibia",name:"Alt bacak kemikleri",group:"Bacak kemikleri",role:"Ayakta durma ve yürüme sırasında vücut ağırlığının taşınmasına yardım eder.",type:"Uzun kemikler",location:"Diz ile ayak bileği arası",fact:"Alt bacakta kaval kemiği (tibia) ve kamış kemiği (fibula) bulunur.",x:133,y:316},
{id:"ayak",name:"Ayak kemikleri",group:"Ayak kemikleri",role:"Vücut ağırlığını taşımaya, dengeye ve yürümeye katkı sağlar.",type:"Kısa ve uzun kemikler",location:"Ayak bileği ve parmaklar",fact:"Ayak kemikleri vücut ağırlığını dağıtır ve adım atarken itiş sağlar.",x:133,y:353}
];
export default function SkeletonExplorer(){
 const [selected,setSelected]=useState("kafatasi");
 const [filter,setFilter]=useState("Tümü");
 const active=bones.find(b=>b.id===selected)??bones[0];
 const groups=["Tümü",...Array.from(new Set(bones.map(b=>b.group)))];
 const visible=bones.filter(b=>filter==="Tümü"||b.group===filter);
 return <div className="space-y-6">
  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)]">
   <section className="rounded-2xl border border-lab-paperLine bg-white p-4 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-beaker">Etkileşimli model</p><h2 className="mt-1 text-xl font-bold">İskeleti keşfet</h2></div><span className="rounded-full bg-beaker/10 px-3 py-1 text-xs font-semibold text-beaker-dark dark:text-beaker-light">Bir kemiğe dokun</span></div>
    <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">İskelet üzerindeki renkli noktaları veya aşağıdaki kemik adlarını seç. Sağda görevi ve özellikleri görüntülenecek.</p>
    <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-b from-sky-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
    <svg viewBox="0 0 300 390" role="img" aria-label="Anatomik insan iskeleti; kemik bölgeleri seçilebilir" className="mx-auto block w-full max-w-[390px]">
      <defs>
        <linearGradient id="bonefill" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fffdf5"/><stop offset="48%" stopColor="#f0e3c7"/><stop offset="100%" stopColor="#cbb995"/></linearGradient>
        <linearGradient id="boneShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fffaf0"/><stop offset="100%" stopColor="#d8c7a5"/></linearGradient>
      </defs>
      <text x="150" y="15" textAnchor="middle" fontSize="9" fill="#94a3b8">Önden görünüm • Anatomik şematik model</text>
      <g stroke="#9b8969" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" fill="url(#bonefill)">
        {/* Skull */}
        <path d="M132 31 Q135 20 150 20 Q165 20 168 31 L170 48 Q170 61 161 69 L158 77 L142 77 L139 69 Q130 61 130 48Z" strokeWidth="1.8"/>
        <path d="M137 39 Q142 33 147 39 L145 48 Q140 52 136 47Z M153 39 Q158 33 163 39 L164 47 Q160 52 155 48Z" fill="#8c8068"/>
        <path d="M148 48 L150 56 L152 48Z" fill="#8c8068"/>
        <path d="M140 59 Q150 64 160 59 L157 69 Q150 74 143 69Z" fill="#e7d8b9"/>
        <path d="M143 62 L143 68 M147 63 L147 70 M151 63 L151 70 M155 62 L155 68" fill="none" strokeWidth=".8"/>
        {/* Neck vertebrae */}
        <path d="M144 77 L156 77 L157 91 L143 91Z"/>
        <path d="M145 81 L155 81 M145 86 L155 86" fill="none"/>
        {/* Clavicles and shoulder blades */}
        <path d="M147 94 Q130 87 112 94 Q105 97 99 103 Q118 101 135 108 L149 103Z"/>
        <path d="M153 94 Q170 87 188 94 Q195 97 201 103 Q182 101 165 108 L151 103Z"/>
        <path d="M111 105 Q100 116 106 140 L119 153 L128 137 L124 111Z" fill="url(#boneShade)"/>
        <path d="M189 105 Q200 116 194 140 L181 153 L172 137 L176 111Z" fill="url(#boneShade)"/>
        {/* Rib cage */}
        <path d="M148 103 L152 103 L154 176 L146 176Z"/>
        <g fill="none" stroke="url(#bonefill)" strokeWidth="5.3">
          <path d="M148 108 Q128 103 116 111 Q110 116 116 123 Q127 131 147 130"/>
          <path d="M152 108 Q172 103 184 111 Q190 116 184 123 Q173 131 153 130"/>
          <path d="M147 119 Q125 115 113 126 Q108 133 116 140 Q128 147 147 142"/>
          <path d="M153 119 Q175 115 187 126 Q192 133 184 140 Q172 147 153 142"/>
          <path d="M147 132 Q127 129 118 141 Q113 148 121 155 Q132 161 147 154"/>
          <path d="M153 132 Q173 129 182 141 Q187 148 179 155 Q168 161 153 154"/>
          <path d="M147 145 Q132 143 124 154 Q120 161 128 167 Q137 172 147 165"/>
          <path d="M153 145 Q168 143 176 154 Q180 161 172 167 Q163 172 153 165"/>
          <path d="M147 158 Q136 157 132 166 Q130 172 138 176 L147 172"/>
          <path d="M153 158 Q164 157 168 166 Q170 172 162 176 L153 172"/>
        </g>
        {/* Sternum and spine */}
        <path d="M147 108 Q150 104 153 108 L154 168 Q150 174 146 168Z" fill="#e8d8b8"/>
        <g fill="url(#boneShade)" strokeWidth=".9">
          <rect x="145" y="94" width="10" height="7" rx="3"/>
          <rect x="145" y="103" width="10" height="7" rx="3"/>
          <rect x="145" y="113" width="10" height="7" rx="3"/>
          <rect x="145" y="123" width="10" height="7" rx="3"/>
          <rect x="145" y="133" width="10" height="7" rx="3"/>
          <rect x="145" y="143" width="10" height="7" rx="3"/>
          <rect x="145" y="153" width="10" height="7" rx="3"/>
          <rect x="145" y="163" width="10" height="7" rx="3"/>
          <rect x="145" y="173" width="10" height="7" rx="3"/>
          <rect x="145" y="183" width="10" height="7" rx="3"/>
          <rect x="145" y="193" width="10" height="7" rx="3"/>
        </g>
        {/* Pelvis */}
        <path d="M132 178 Q119 174 113 184 Q108 198 120 213 L139 226 L148 216 L145 195 Q139 187 132 178Z"/>
        <path d="M168 178 Q181 174 187 184 Q192 198 180 213 L161 226 L152 216 L155 195 Q161 187 168 178Z"/>
        <path d="M139 194 Q150 187 161 194 L166 211 Q160 224 150 225 Q140 224 134 211Z" fill="#d9c8a6"/>
        <path d="M143 194 Q150 190 157 194 L159 207 Q150 216 141 207Z" fill="#243449" stroke="none"/>
        {/* Arms: humerus */}
        <path d="M105 106 Q99 105 97 112 L84 154 Q82 160 87 163 Q93 165 96 158 L112 119Z" strokeWidth="1.4"/>
        <path d="M195 106 Q201 105 203 112 L216 154 Q218 160 213 163 Q207 165 204 158 L188 119Z" strokeWidth="1.4"/>
        <circle cx="89" cy="162" r="6" fill="url(#boneShade)"/><circle cx="211" cy="162" r="6" fill="url(#boneShade)"/>
        {/* Forearm radius and ulna */}
        <path d="M86 166 Q81 169 82 175 L75 211 Q74 217 79 218 Q84 219 86 212 L94 176Z"/>
        <path d="M92 166 Q97 168 97 175 L91 211 Q90 217 85 216 Q81 214 84 207 L86 176Z"/>
        <path d="M214 166 Q219 169 218 175 L225 211 Q226 217 221 218 Q216 219 214 212 L206 176Z"/>
        <path d="M208 166 Q203 168 203 175 L209 211 Q210 217 215 216 Q219 214 216 207 L214 176Z"/>
        {/* Hands and fingers */}
        <path d="M76 216 L89 217 L91 229 L83 235 L73 228Z M224 216 L211 217 L209 229 L217 235 L227 228Z"/>
        <g fill="none" stroke="url(#bonefill)" strokeWidth="2.8">
          <path d="M76 226 L67 239 L62 250 M80 230 L75 245 L73 257 M84 231 L82 247 L82 260 M88 229 L89 244 L92 255 M73 226 L61 230 L55 239"/>
          <path d="M224 226 L233 239 L238 250 M220 230 L225 245 L227 257 M216 231 L218 247 L218 260 M212 229 L211 244 L208 255 M227 226 L239 230 L245 239"/>
        </g>
        {/* Femurs */}
        <path d="M137 219 Q131 219 130 227 L134 274 Q135 281 142 281 Q148 280 146 273 L145 229 Q145 220 137 219Z" strokeWidth="1.5"/>
        <path d="M163 219 Q169 219 170 227 L166 274 Q165 281 158 281 Q152 280 154 273 L155 229 Q155 220 163 219Z" strokeWidth="1.5"/>
        {/* Kneecaps */}
        <ellipse cx="140" cy="282" rx="7" ry="8"/><ellipse cx="160" cy="282" rx="7" ry="8"/>
        {/* Tibia and fibula */}
        <path d="M136 290 Q132 289 133 296 L136 342 Q137 349 142 348 L144 342 L142 296Z"/>
        <path d="M145 291 L148 296 L146 341 L143 345 L141 340 L140 297Z"/>
        <path d="M164 290 Q168 289 167 296 L164 342 Q163 349 158 348 L156 342 L158 296Z"/>
        <path d="M155 291 L152 296 L154 341 L157 345 L159 340 L160 297Z"/>
        {/* Feet: tarsals, metatarsals and toes */}
        <path d="M136 346 Q130 345 128 351 L119 358 Q116 363 123 365 L147 364 L148 356 L143 347Z"/>
        <path d="M164 346 Q170 345 172 351 L181 358 Q184 363 177 365 L153 364 L152 356 L157 347Z"/>
        <g fill="none" stroke="url(#bonefill)" strokeWidth="3.2">
          <path d="M128 356 L113 365 L104 367 M132 358 L121 370 L116 375 M137 359 L130 372 L128 379 M141 359 L138 373 L139 380 M172 356 L187 365 L196 367 M168 358 L179 370 L184 375 M163 359 L170 372 L172 379 M159 359 L162 373 L161 380"/>
        </g>
      </g>
      {/* Selectable bone markers */}
      {bones.map((b,i)=>{
        const coords:Record<string,[number,number]>={kafatasi:[150,48],omurga:[150,155],kaburga:[177,127],gogus:[150,132],pelvis:[150,207],humerus:[91,137],radius:[82,188],el:[72,245],femur:[140,250],diz:[140,282],tibia:[140,319],ayak:[130,367]};
        const [x,y]=coords[b.id]; const chosen=selected===b.id;
        return <g key={b.id} onClick={()=>setSelected(b.id)} role="button" tabIndex={0} aria-label={b.name} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelected(b.id)}}} className="cursor-pointer">
          <circle cx={x} cy={y} r={chosen?9:6.5} fill={chosen?"#0f766e":"#f59e0b"} stroke="white" strokeWidth="2"/>
          <text x={x} y={y+3} textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">{i+1}</text>
        </g>
      })}
    </svg></div>
    <div className="mt-4 flex flex-wrap gap-2">{groups.map(g=><button key={g} onClick={()=>setFilter(g)} className={`rounded-full border px-3 py-2 text-xs font-semibold ${filter===g?"border-beaker bg-beaker text-white":"border-lab-paperLine bg-white text-lab-inkMuted dark:bg-lab-inkSoft dark:text-lab-paper"}`}>{g}</button>)}</div>
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{visible.map((b)=><button key={b.id} onClick={()=>setSelected(b.id)} className={`rounded-xl border p-3 text-left text-sm transition ${selected===b.id?"border-beaker bg-beaker/10 ring-1 ring-beaker":"border-lab-paperLine hover:border-beaker/50 dark:border-white/10"}`}><span className="block text-xs text-lab-inkMuted dark:text-lab-paper/50">{b.group}</span><span className="mt-1 block font-semibold">{b.name}</span></button>)}</div>
   </section>
   <aside className="space-y-4">
    <section className="rounded-2xl border border-beaker/30 bg-beaker/5 p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-wider text-beaker">Seçili kemik</p><h2 className="mt-2 text-2xl font-bold">{active.name}</h2><p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">{active.group}</p><div className="mt-5 space-y-4"><div><p className="text-xs font-bold uppercase tracking-wide text-lab-inkMuted dark:text-lab-paper/60">Görevi</p><p className="mt-1 leading-relaxed">{active.role}</p></div><div><p className="text-xs font-bold uppercase tracking-wide text-lab-inkMuted dark:text-lab-paper/60">Kemik türü</p><p className="mt-1 font-semibold">{active.type}</p></div><div><p className="text-xs font-bold uppercase tracking-wide text-lab-inkMuted dark:text-lab-paper/60">Vücuttaki yeri</p><p className="mt-1">{active.location}</p></div><div className="rounded-xl bg-white/80 p-4 dark:bg-black/10"><p className="text-sm font-bold">💡 Biliyor muydun?</p><p className="mt-1 text-sm leading-relaxed">{active.fact}</p></div></div></section>
    <section className="rounded-2xl border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft"><h3 className="font-bold">🦴 Kemik türlerini tanı</h3><div className="mt-3 space-y-3 text-sm"><p><b>Uzun kemik:</b> Kol ve bacaklarda, uzunluğu diğer boyutlarından fazla olan kemikler.</p><p><b>Kısa kemik:</b> El ve ayak bileği gibi bölgelerde bulunan, boyutları birbirine yakın kemikler.</p><p><b>Yassı kemik:</b> Kafatası ve kaburgalar gibi korumaya katkı sağlayan kemikler.</p><p><b>Düzensiz kemik:</b> Omurlar gibi belirli bir şekil grubuna kolayca uymayan kemikler.</p></div></section>
    <section className="rounded-2xl border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft"><h3 className="font-bold">🔎 Kendini dene</h3><p className="mt-2 text-sm">Vücudun en uzun kemiği hangisidir?</p><div className="mt-3 grid gap-2">{["Kafatası","Uyluk kemiği","Kaburga"].map((o,i)=><button key={o} onClick={()=>setSelected(i===1?"femur":i===0?"kafatasi":"kaburga")} className="rounded-lg border border-lab-paperLine px-3 py-2 text-left text-sm hover:border-beaker">{o}</button>)}</div><p className="mt-3 text-xs text-lab-inkMuted dark:text-lab-paper/55">Seçeneklerden birine dokunarak modelde ilgili kemiği inceleyebilirsin.</p></section>
   </aside>
  </div>
  <p className="text-xs text-lab-inkMuted dark:text-lab-paper/50">Eğitim amaçlı şematik modeldir; kemiklerin gerçek boyutları ve biçimleri birebir ölçekte gösterilmemiştir.</p>
 </div>
}

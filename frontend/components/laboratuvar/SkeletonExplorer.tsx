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
    <svg viewBox="0 0 300 390" role="img" aria-label="Seçilebilir temel kemikleri gösteren şematik insan iskeleti" className="mx-auto block w-full max-w-[390px]">
      <defs><linearGradient id="bonefill" x1="0" x2="1"><stop offset="0%" stopColor="#fffaf0"/><stop offset="100%" stopColor="#e8d8b8"/></linearGradient></defs>
      <g stroke="#8b9ab0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="url(#bonefill)">
       <path d="M132 34 Q150 21 168 34 Q179 48 169 64 L164 76 L136 76 L131 63 Q121 47 132 34Z" strokeWidth="2.5"/>
       <path d="M139 76 L139 87 L161 87 L161 76 M137 88 Q120 94 115 113 L120 142 L180 142 L185 113 Q180 94 163 88Z"/>
       <path d="M120 100 Q150 91 180 100 M117 108 Q150 100 183 108 M118 116 Q150 108 182 116 M120 124 Q150 116 180 124 M122 132 Q150 124 178 132" fill="none" strokeWidth="3"/>
       <path d="M147 88 L147 169 M153 88 L153 169" strokeWidth="3"/>
       <path d="M120 142 Q107 151 117 174 L132 202 L143 197 L131 164 L138 145 M180 142 Q193 151 183 174 L168 202 L157 197 L169 164 L162 145"/>
       <path d="M117 174 L108 197 L116 201 L129 180 M183 174 L192 197 L184 201 L171 180"/>
       <path d="M129 193 Q150 184 171 193 L179 207 Q150 220 121 207Z" strokeWidth="2.5"/>
       <path d="M133 211 L142 211 L145 264 L136 264Z M155 211 L164 211 L161 264 L152 264Z" strokeWidth="2.5"/>
       <path d="M136 264 L145 264 L143 277 L135 277Z M152 264 L161 264 L165 277 L157 277Z"/>
       <path d="M135 277 L143 277 L141 333 L134 333Z M157 277 L165 277 L169 333 L162 333Z" strokeWidth="2.5"/>
       <path d="M134 333 L141 333 L146 345 L126 347 L119 342Z M162 333 L169 333 L180 342 L174 347 L154 345Z"/>
       <path d="M125 346 L130 348 M133 345 L137 349 M159 345 L164 349 M168 346 L173 349" fill="none"/>
       <path d="M135 103 L117 111 L103 145 L96 168 L103 171 L114 151 L130 123 M165 103 L183 111 L197 145 L204 168 L197 171 L186 151 L170 123" strokeWidth="7"/>
       <path d="M95 168 L91 181 L98 184 L104 171 M205 168 L209 181 L202 184 L196 171" strokeWidth="4"/>
       <path d="M142 34 Q150 27 158 34 M141 49 L146 50 M154 50 L159 49 M145 59 Q150 62 155 59" fill="none" strokeWidth="1.4"/>
      </g>
      {bones.map((b,i)=>{
       const coords:Record<string,[number,number]>={kafatasi:[150,48],omurga:[150,154],kaburga:[174,119],gogus:[150,116],pelvis:[150,202],humerus:[111,126],radius:[98,158],el:[94,178],femur:[139,239],diz:[140,274],tibia:[140,309],ayak:[132,343]};
       const [x,y]=coords[b.id]; const chosen=selected===b.id;
       return <g key={b.id} onClick={()=>setSelected(b.id)} role="button" tabIndex={0} aria-label={b.name} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelected(b.id)}}} className="cursor-pointer">
        <circle cx={x} cy={y} r={chosen?10:7} fill={chosen?"#0f766e":"#f59e0b"} stroke="white" strokeWidth="2"/>
        <text x={x} y={y+3.2} textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">{i+1}</text>
       </g>
      })}
      <text x="12" y="20" fontSize="9" fill="#64748b">Önden görünüm • Şematik model</text>
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

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ElementData = { z:number; s:string; n:string; mass:string; g:number; p:number; t:string; state:string; };
const raw = `
1|H|Hidrojen|1,008|1|1|Ametal|Gaz
2|He|Helyum|4,003|18|1|Soy gaz|Gaz
3|Li|Lityum|6,94|1|2|Alkali metal|Katı
4|Be|Berilyum|9,012|2|2|Toprak alkali metal|Katı
5|B|Bor|10,81|13|2|Yarı metal|Katı
6|C|Karbon|12,011|14|2|Ametal|Katı
7|N|Azot|14,007|15|2|Ametal|Gaz
8|O|Oksijen|15,999|16|2|Ametal|Gaz
9|F|Flor|18,998|17|2|Halojen|Gaz
10|Ne|Neon|20,180|18|2|Soy gaz|Gaz
11|Na|Sodyum|22,990|1|3|Alkali metal|Katı
12|Mg|Magnezyum|24,305|2|3|Toprak alkali metal|Katı
13|Al|Alüminyum|26,982|13|3|Metal|Katı
14|Si|Silisyum|28,085|14|3|Yarı metal|Katı
15|P|Fosfor|30,974|15|3|Ametal|Katı
16|S|Kükürt|32,06|16|3|Ametal|Katı
17|Cl|Klor|35,45|17|3|Halojen|Gaz
18|Ar|Argon|39,948|18|3|Soy gaz|Gaz
19|K|Potasyum|39,098|1|4|Alkali metal|Katı
20|Ca|Kalsiyum|40,078|2|4|Toprak alkali metal|Katı
21|Sc|Skandiyum|44,956|3|4|Geçiş metali|Katı
22|Ti|Titanyum|47,867|4|4|Geçiş metali|Katı
23|V|Vanadyum|50,942|5|4|Geçiş metali|Katı
24|Cr|Krom|51,996|6|4|Geçiş metali|Katı
25|Mn|Manganez|54,938|7|4|Geçiş metali|Katı
26|Fe|Demir|55,845|8|4|Geçiş metali|Katı
27|Co|Kobalt|58,933|9|4|Geçiş metali|Katı
28|Ni|Nikel|58,693|10|4|Geçiş metali|Katı
29|Cu|Bakır|63,546|11|4|Geçiş metali|Katı
30|Zn|Çinko|65,38|12|4|Geçiş metali|Katı
31|Ga|Galyum|69,723|13|4|Metal|Katı
32|Ge|Germanyum|72,630|14|4|Yarı metal|Katı
33|As|Arsenik|74,922|15|4|Yarı metal|Katı
34|Se|Selenyum|78,971|16|4|Ametal|Katı
35|Br|Brom|79,904|17|4|Halojen|Sıvı
36|Kr|Kripton|83,798|18|4|Soy gaz|Gaz
37|Rb|Rubidyum|85,468|1|5|Alkali metal|Katı
38|Sr|Stronsiyum|87,62|2|5|Toprak alkali metal|Katı
39|Y|İtriyum|88,906|3|5|Geçiş metali|Katı
40|Zr|Zirkonyum|91,224|4|5|Geçiş metali|Katı
41|Nb|Niyobyum|92,906|5|5|Geçiş metali|Katı
42|Mo|Molibden|95,95|6|5|Geçiş metali|Katı
43|Tc|Teknesyum|98|7|5|Geçiş metali|Katı
44|Ru|Rutenyum|101,07|8|5|Geçiş metali|Katı
45|Rh|Rodyum|102,906|9|5|Geçiş metali|Katı
46|Pd|Paladyum|106,42|10|5|Geçiş metali|Katı
47|Ag|Gümüş|107,868|11|5|Geçiş metali|Katı
48|Cd|Kadmiyum|112,414|12|5|Geçiş metali|Katı
49|In|İndiyum|114,818|13|5|Metal|Katı
50|Sn|Kalay|118,710|14|5|Metal|Katı
51|Sb|Antimon|121,760|15|5|Yarı metal|Katı
52|Te|Tellür|127,60|16|5|Yarı metal|Katı
53|I|İyot|126,904|17|5|Halojen|Katı
54|Xe|Ksenon|131,293|18|5|Soy gaz|Gaz
55|Cs|Sezyum|132,905|1|6|Alkali metal|Katı
56|Ba|Baryum|137,327|2|6|Toprak alkali metal|Katı
57|La|Lantan|138,905|3|6|Lantanit|Katı
58|Ce|Seryum|140,116|3|6|Lantanit|Katı
59|Pr|Praseodim|140,908|3|6|Lantanit|Katı
60|Nd|Neodimyum|144,242|3|6|Lantanit|Katı
61|Pm|Prometyum|145|3|6|Lantanit|Katı
62|Sm|Samaryum|150,36|3|6|Lantanit|Katı
63|Eu|Evropiyum|151,964|3|6|Lantanit|Katı
64|Gd|Gadolinyum|157,25|3|6|Lantanit|Katı
65|Tb|Terbiyum|158,925|3|6|Lantanit|Katı
66|Dy|Disprozyum|162,500|3|6|Lantanit|Katı
67|Ho|Holmiyum|164,930|3|6|Lantanit|Katı
68|Er|Erbiyum|167,259|3|6|Lantanit|Katı
69|Tm|Tulyum|168,934|3|6|Lantanit|Katı
70|Yb|İterbiyum|173,045|3|6|Lantanit|Katı
71|Lu|Lutesyum|174,967|3|6|Lantanit|Katı
72|Hf|Hafniyum|178,49|4|6|Geçiş metali|Katı
73|Ta|Tantal|180,948|5|6|Geçiş metali|Katı
74|W|Tungsten|183,84|6|6|Geçiş metali|Katı
75|Re|Ren­yum|186,207|7|6|Geçiş metali|Katı
76|Os|Osmiyum|190,23|8|6|Geçiş metali|Katı
77|Ir|İridyum|192,217|9|6|Geçiş metali|Katı
78|Pt|Platin|195,084|10|6|Geçiş metali|Katı
79|Au|Altın|196,967|11|6|Geçiş metali|Katı
80|Hg|Cıva|200,592|12|6|Geçiş metali|Sıvı
81|Tl|Talyum|204,38|13|6|Metal|Katı
82|Pb|Kurşun|207,2|14|6|Metal|Katı
83|Bi|Bizmut|208,980|15|6|Metal|Katı
84|Po|Polonyum|209|16|6|Yarı metal|Katı
85|At|Astatin|210|17|6|Halojen|Katı
86|Rn|Radon|222|18|6|Soy gaz|Gaz
87|Fr|Fransiyum|223|1|7|Alkali metal|Katı
88|Ra|Radyum|226|2|7|Toprak alkali metal|Katı
89|Ac|Aktinyum|227|3|7|Aktinit|Katı
90|Th|Toryum|232,038|3|7|Aktinit|Katı
91|Pa|Protaktinyum|231,036|3|7|Aktinit|Katı
92|U|Uranyum|238,029|3|7|Aktinit|Katı
93|Np|Neptünyum|237|3|7|Aktinit|Katı
94|Pu|Plütonyum|244|3|7|Aktinit|Katı
95|Am|Amerikyum|243|3|7|Aktinit|Katı
96|Cm|Küriyum|247|3|7|Aktinit|Katı
97|Bk|Berkelyum|247|3|7|Aktinit|Katı
98|Cf|Kaliforniyum|251|3|7|Aktinit|Katı
99|Es|Aynştaynyum|252|3|7|Aktinit|Katı
100|Fm|Fermiyum|257|3|7|Aktinit|Katı
101|Md|Mendelevyum|258|3|7|Aktinit|Katı
102|No|Nobelyum|259|3|7|Aktinit|Katı
103|Lr|Lavrensiyum|266|3|7|Aktinit|Katı
104|Rf|Rutherfordiyum|267|4|7|Geçiş metali|Katı
105|Db|Dubniyum|268|5|7|Geçiş metali|Katı
106|Sg|Seaborgiyum|269|6|7|Geçiş metali|Katı
107|Bh|Bohriyum|270|7|7|Geçiş metali|Katı
108|Hs|Hassiyum|277|8|7|Geçiş metali|Katı
109|Mt|Meitneriyum|278|9|7|Geçiş metali|Katı
110|Ds|Darmstadtiyum|281|10|7|Geçiş metali|Katı
111|Rg|Röntgenyum|282|11|7|Geçiş metali|Katı
112|Cn|Kopernikyum|285|12|7|Geçiş metali|Katı
113|Nh|Nihonyum|286|13|7|Metal|Katı
114|Fl|Flerovyum|289|14|7|Metal|Katı
115|Mc|Moskovyum|290|15|7|Metal|Katı
116|Lv|Livermoryum|293|16|7|Metal|Katı
117|Ts|Tennessin|294|17|7|Halojen|Katı
118|Og|Oganesson|294|18|7|Soy gaz|Gaz
`.trim();

const elements:ElementData[] = raw.split("\n").map(line=>{const [z,s,n,mass,g,p,t,state]=line.split("|");return {z:+z,s,n,mass,g:+g,p:+p,t,state};});
const colors:Record<string,string> = {"Alkali metal":"#fca5a5","Toprak alkali metal":"#fdba74","Geçiş metali":"#fcd34d","Metal":"#fde68a","Yarı metal":"#86efac","Ametal":"#93c5fd","Halojen":"#c4b5fd","Soy gaz":"#f9a8d4","Lantanit":"#67e8f9","Aktinit":"#a5b4fc"};
const filters=["Tümü","Metal","Ametal","Yarı metal","Soy gaz","Halojen","Lantanit","Aktinit","Alkali metal","Toprak alkali metal","Geçiş metali"];

export default function PeriyodikCetvelPage(){
 const [selected,setSelected]=useState<ElementData>(elements[5]);
 const [query,setQuery]=useState("");
 const [filter,setFilter]=useState("Tümü");
 const [showAll,setShowAll]=useState(true);
 const filtered=useMemo(()=>elements.filter(e=>(filter==="Tümü"||e.t===filter)&&(!query||e.n.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))||e.s.toLowerCase().includes(query.toLowerCase())||String(e.z)===query)),[filter,query]);
 const visible=new Set(filtered.map(e=>e.z));
 const cell=(e:ElementData,extra="")=><button key={e.z} className={"el "+(selected.z===e.z?"chosen ":"")+extra} style={{background:colors[e.t]||"#e2e8f0",opacity:visible.has(e.z)?1:.18}} onClick={()=>setSelected(e)} aria-label={e.n+" elementini seç"} title={e.n}><span className="num">{e.z}</span><b className="sym">{e.s}</b><span className="ename">{e.n}</span></button>;
 return <main className="ptable-page"><style jsx global>{`
 .ptable-page{min-height:100vh;background:#f1f5f9;color:#172033;padding:14px 12px 48px}.ptable-wrap{max-width:1440px;margin:auto}.ptable-crumb{font-size:13px;color:#64748b;margin:5px 0 16px}.ptable-crumb a{color:#2563eb;text-decoration:none;font-weight:700}
 .ptable-hero{border-radius:22px;padding:25px;background:linear-gradient(120deg,#0f172a,#164e63);color:white}.ptable-hero small{letter-spacing:1.4px;color:#a5f3fc;font-weight:900}.ptable-hero h1{font-size:clamp(27px,4vw,39px);font-weight:900;margin:8px 0}.ptable-hero p{color:#dbeafe;margin:0;line-height:1.6;max-width:850px}
 .ptable-tools{display:flex;gap:10px;flex-wrap:wrap;margin:16px 0}.ptable-search{flex:1;min-width:190px;border:1px solid #cbd5e1;border-radius:11px;padding:11px 13px;background:white;color:#172033}.ptable-filter{border:1px solid #cbd5e1;border-radius:10px;padding:10px;background:white;color:#172033;max-width:100%}
 .ptable-layout{display:grid;grid-template-columns:minmax(0,1fr) 285px;gap:14px;align-items:start}.ptable-board{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:12px;overflow-x:auto}.ptable-grid{display:grid;grid-template-columns:repeat(18,minmax(43px,1fr));gap:4px;min-width:850px}.el{position:relative;min-width:0;aspect-ratio:1/1.12;border:1px solid #ffffffaa;border-radius:6px;padding:3px 2px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#172033;cursor:pointer;transition:transform .12s,box-shadow .12s}.el:hover{transform:translateY(-2px);box-shadow:0 4px 12px #0f172a22;z-index:2}.el.chosen{outline:3px solid #0f172a;outline-offset:1px;z-index:3}.num{position:absolute;top:3px;left:4px;font-size:9px;font-weight:700}.sym{font-size:clamp(15px,1.5vw,21px);font-weight:900;line-height:1.2;margin-top:6px}.ename{font-size:clamp(7px,.75vw,10px);font-weight:700;text-align:center;line-height:1.05;overflow-wrap:anywhere}
 .ptable-gap{min-width:0;aspect-ratio:1/1.12}.ptable-series{margin-top:12px;min-width:850px}.series-label{font-size:11px;font-weight:900;color:#64748b;margin:7px 0 5px}.series-grid{display:grid;grid-template-columns:repeat(15,minmax(43px,1fr));gap:4px;margin-left:calc((100% - 15 * (100% - 56px)/18)/18 * 3 + 12px)}
 .ptable-side{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px;position:sticky;top:12px}.ptable-side h2{font-size:20px;font-weight:900;margin:4px 0 2px}.ptable-side .big-symbol{font-size:48px;font-weight:950;line-height:1.1;margin:15px 0 4px}.ptable-side .el-name{font-size:21px;font-weight:900}.ptable-side .type{display:inline-block;padding:5px 9px;border-radius:99px;font-size:11px;font-weight:900;margin:10px 0}.ptable-facts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}.fact{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:9px}.fact small{display:block;color:#64748b;font-size:10px;font-weight:800}.fact b{font-size:14px}.ptable-note{font-size:12px;color:#64748b;line-height:1.5;margin-top:14px}
 .ptable-legend{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px}.legend{font-size:10px;font-weight:800;padding:5px 8px;border-radius:7px;border:1px solid #e2e8f0}.ptable-count{font-size:12px;color:#64748b;margin:0 0 9px}
 @media(max-width:900px){.ptable-layout{grid-template-columns:1fr}.ptable-side{position:static;grid-row:1}.ptable-grid{min-width:850px}.ptable-board{padding:8px}.ptable-hero{padding:20px 17px}}
 `}</style>
 <div className="ptable-wrap">
  <nav className="ptable-crumb"><Link href="/animasyonlar">Animasyonlar</Link> / <Link href="/animasyonlar/8">8. Sınıf</Link> / Periyodik Cetvel</nav>
  <header className="ptable-hero"><small>8. SINIF · MADDE VE ENDÜSTRİ</small><h1>118 Elementli Etkileşimli Periyodik Cetvel</h1><p>Cetveldeki elementlerden birini seçerek atom numarasını, sembolünü, atom kütlesini, bulunduğu grubu ve periyodu, element sınıfını ve oda sıcaklığındaki fiziksel hâlini incele.</p></header>
  <div className="ptable-tools"><input className="ptable-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Element adı, sembolü veya atom numarası ara…" aria-label="Element ara"/><select className="ptable-filter" value={filter} onChange={e=>setFilter(e.target.value)} aria-label="Element türüne göre filtrele">{filters.map(f=><option key={f}>{f}</option>)}</select><button className="ptable-filter" onClick={()=>{setQuery("");setFilter("Tümü");}}>Filtreleri temizle</button></div>
  <div className="ptable-layout">
   <section className="ptable-board"><p className="ptable-count">{filtered.length} / 118 element gösteriliyor · Element kartına dokun</p>
    <div className="ptable-grid">{Array.from({length:7},(_,p)=>Array.from({length:18},(_,g)=>{const e=elements.find(x=>x.p===p+1&&x.g===g+1&&!(x.p===6&&x.g===3)&&!(x.p===7&&x.g===3));if(e)return cell(e);if((p===5||p===6)&&g===2)return <div key={p+"-"+g} className="ptable-gap" title={p===5?"Lantanitler aşağıda":"Aktinitler aşağıda"} />;if(p===0&&![0,17].includes(g))return <div key={p+"-"+g} className="ptable-gap"/>;if(p===1&&g>1&&g<12)return <div key={p+"-"+g} className="ptable-gap"/>;if(p===2&&g>1&&g<12)return <div key={p+"-"+g} className="ptable-gap"/>;return <div key={p+"-"+g} className="ptable-gap"/>;}))}</div>
    <div className="ptable-series"><div className="series-label">LANTANİTLER · 57–71</div><div className="series-grid">{elements.filter(e=>e.t==="Lantanit").map(e=>cell(e))}</div><div className="series-label">AKTİNİTLER · 89–103</div><div className="series-grid">{elements.filter(e=>e.t==="Aktinit").map(e=>cell(e))}</div></div>
    <div className="ptable-legend">{Object.entries(colors).map(([k,v])=><span className="legend" key={k} style={{background:v}}>{k}</span>)}</div>
   </section>
   <aside className="ptable-side"><small style={{color:"#64748b",fontWeight:900}}>SEÇİLİ ELEMENT · ATOM NO {selected.z}</small><div className="big-symbol">{selected.s}</div><div className="el-name">{selected.n}</div><span className="type" style={{background:colors[selected.t]}}>{selected.t}</span><div className="ptable-facts">
    <div className="fact"><small>Atom numarası</small><b>{selected.z}</b></div><div className="fact"><small>Kimyasal sembol</small><b>{selected.s}</b></div><div className="fact"><small>Atom kütlesi (u)</small><b>{selected.mass}</b></div><div className="fact"><small>Grup</small><b>{selected.g}. grup</b></div><div className="fact"><small>Periyot</small><b>{selected.p}. periyot</b></div><div className="fact"><small>Oda sıcaklığında</small><b>{selected.state}</b></div>
   </div><p className="ptable-note">Atom numarası, nötr atomdaki proton sayısını gösterir. Grup ve periyot bilgileri modern periyodik cetveldeki konumunu belirtir. Bazı süper ağır elementlerin fiziksel hâlleri deneysel olarak tam belirlenemediğinden tahmini kabul edilir.</p><button className="ptable-filter" style={{width:"100%",marginTop:8}} onClick={()=>{setSelected(elements[0]);setQuery("");setFilter("Tümü");}}>Cetveli sıfırla</button></aside>
  </div>
  <p style={{fontSize:11,color:"#64748b",marginTop:13}}>Not: Atom kütleleri yaygın kullanılan yaklaşık değerlerdir; radyoaktif ve kısa ömürlü elementlerde gösterilen sayılar en kararlı izotopa dayalı kütle numarası olabilir.</p>
  <div style={{marginTop:15}}><Link href="/animasyonlar/8" style={{color:"#2563eb",fontWeight:800,textDecoration:"none"}}>← 8. sınıf animasyonlarına dön</Link></div>
 </div></main>;
}

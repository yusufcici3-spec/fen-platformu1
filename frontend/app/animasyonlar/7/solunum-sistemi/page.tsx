"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const steps = [
  { title: "1. Burun", text: "Hava burundan alınır. Burun kılları ve mukus, havadaki tozların tutulmasına yardımcı olur; hava ısınır ve nemlenir.", tag: "Havanın giriş kapısı" },
  { title: "2. Yutak ve gırtlak", text: "Hava burun boşluğundan yutağa, ardından gırtlağa geçer. Solunum ve sindirim yollarının kesiştiği bölge yutaktır.", tag: "Havanın geçiş yolu" },
  { title: "3. Soluk borusu", text: "Hava, kıkırdak halkalarla açık tutulan soluk borusundan aşağı ilerler. Borunun iç yüzeyindeki tüysü yapılar yabancı maddelerin uzaklaştırılmasına yardım eder.", tag: "Havayı akciğerlere taşır" },
  { title: "4. Bronş ve bronşçuklar", text: "Soluk borusu iki bronşa ayrılır. Bronşlar akciğerlerin içinde daha ince bronşçuklara dallanır ve havayı alveollere ulaştırır.", tag: "Dallanarak dağıtır" },
  { title: "5. Alveoller", text: "Alveollerde oksijen kılcal damarlara, kandaki karbondioksit ise alveollere geçer. Karbondioksit, nefes verirken vücuttan uzaklaştırılır.", tag: "Gaz alışverişinin gerçekleştiği yer" },
];

export default function SolunumSistemiPage() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % steps.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [playing]);

  const next = () => setStep((current) => Math.min(current + 1, steps.length - 1));
  const previous = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <main className="resp-page">
      <div className="resp-wrap">
        <nav className="resp-crumb"><Link href="/animasyonlar/7">7. Sınıf Animasyonları</Link><span>/</span><span>Solunum Sistemi</span></nav>
        <header className="resp-hero">
          <div>
            <span className="resp-kicker">7. SINIF FEN BİLİMLERİ · VÜCUDUMUZDAKİ SİSTEMLER</span>
            <h1>Solunum Sistemini Keşfet</h1>
            <p>Havanın vücudumuzdaki yolculuğunu izle. Organları sırayla keşfet ve alveollerde gerçekleşen gaz alışverişini öğren.</p>
            <div className="resp-pills"><span>🫁 Etkileşimli animasyon</span><span>🔬 Adım adım öğren</span><span>📱 Mobil uyumlu</span></div>
          </div>
          <div className="resp-icon" aria-hidden="true">🫁</div>
        </header>

        <section className="resp-card" aria-label="Solunum sistemi animasyonu">
          <div className="resp-card-head"><div><span className="resp-kicker">ANİMASYON ALANI</span><h2>Havanın yolculuğu</h2></div><span className="resp-counter">{step + 1} / {steps.length}</span></div>
          <div className="resp-stage" data-step={step}>
            <div className="resp-legend"><span><i className="dot oxygen" /> Oksijen</span><span><i className="dot carbon" /> Karbondioksit</span></div>
            <svg className="resp-svg" viewBox="0 0 700 480" role="img" aria-label="Burun, soluk borusu, bronşlar, akciğerler ve alveolleri gösteren solunum sistemi çizimi">
              <defs>
                <linearGradient id="lungFill" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#ff9aab"/><stop offset="1" stopColor="#d84d73"/></linearGradient>
                <linearGradient id="tubeFill" x1="0" x2="1"><stop offset="0" stopColor="#ffe0a8"/><stop offset="1" stopColor="#f6ad68"/></linearGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <path className="airway" d="M350 92 L350 220 M350 220 C320 245 285 263 260 300 M350 220 C380 245 415 263 440 300" />
              <path className="airway-small" d="M260 300 C230 320 215 342 205 370 M260 300 C270 330 270 355 260 385 M440 300 C470 320 485 342 495 370 M440 300 C430 330 430 355 440 385" />
              <path className="lung" d="M322 238 C280 218 224 232 192 274 C157 320 162 400 206 427 C238 447 286 425 311 389 C334 355 339 291 322 238Z" />
              <path className="lung" d="M378 238 C420 218 476 232 508 274 C543 320 538 400 494 427 C462 447 414 425 389 389 C366 355 361 291 378 238Z" />
              <path className="lung-highlight" d="M218 287 C198 323 199 371 218 397 M482 287 C502 323 501 371 482 397" />
              <path className="trachea" d="M350 76 L350 226" />
              {Array.from({length:7},(_,i)=><path key={i} className="trachea-ring" d={`M337 ${96+i*18} Q350 ${101+i*18} 363 ${96+i*18}`}/>)}
              <path className="nose" d="M331 42 Q350 24 369 42 L365 65 Q350 77 335 65Z" />
              <path className="nose-line" d="M341 55 Q350 61 359 55" />
              <g className="alveoli-cluster">
                <path d="M260 385 Q245 405 230 415 M440 385 Q455 405 470 415" className="airway-small"/>
                {Array.from({length:7},(_,i)=><circle key={i} cx={230+(i%4)*12} cy={414+Math.floor(i/4)*12} r="8" className="alveolus"/>)}
                {Array.from({length:7},(_,i)=><circle key={i} cx={470+(i%4)*12} cy={414+Math.floor(i/4)*12} r="8" className="alveolus"/>)}
              </g>
              <g className="oxygen-particles"><circle cx="350" cy="115" r="7"/><circle cx="350" cy="165" r="6"/><circle cx="350" cy="205" r="6"/><circle cx="315" cy="270" r="6"/><circle cx="285" cy="320" r="6"/><circle cx="390" cy="270" r="6"/><circle cx="420" cy="320" r="6"/></g>
              <g className="carbon-particles"><circle cx="230" cy="414" r="5"/><circle cx="482" cy="414" r="5"/></g>
              <g className="svg-labels">
                <text x="386" y="52">Burun</text><path d="M378 55 L365 55"/>
                <text x="390" y="150">Soluk borusu</text><path d="M384 153 L360 153"/>
                <text x="95" y="255">Akciğer</text><path d="M150 258 L194 285"/>
                <text x="520" y="285">Bronşlar</text><path d="M514 288 L453 302"/>
                <text x="520" y="430">Alveoller</text><path d="M515 425 L486 418"/>
              </g>
            </svg>
            <div className="resp-stage-caption">{steps[step].tag}</div>
          </div>

          <div className="resp-progress" aria-label="İlerleme">{steps.map((item,index)=><button key={item.title} className={index===step?"active":index<step?"done":""} onClick={()=>{setStep(index);setPlaying(false);}} aria-label={item.title} title={item.title}><span>{index+1}</span></button>)}</div>
          <div className="resp-info"><div><span className="resp-kicker">ŞİMDİ ÖĞRENİYORSUN</span><h3>{steps[step].title}</h3><p>{steps[step].text}</p></div><div className="resp-controls"><button onClick={previous} disabled={step===0}>← Geri</button><button className="play" onClick={()=>setPlaying(!playing)}>{playing?"Duraklat":"▶ Oynat"}</button><button onClick={next} disabled={step===steps.length-1}>İleri →</button></div></div>
          <div className="resp-bottom"><button onClick={()=>{setStep(0);setPlaying(false);}}>↺ Baştan başla</button><span>{playing?"Animasyon oynatılıyor":"Bir organı seçerek o bölümü inceleyebilirsin."}</span></div>
        </section>

        <section className="resp-fact"><span>💡 BİLİYOR MUYDUN?</span><p>Akciğerlerimizde bulunan milyonlarca alveol, gaz alışverişi için çok geniş bir yüzey oluşturur.</p></section>
        <footer className="resp-footer"><Link href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link><span>Fen Platformu · Öğren, keşfet, pekiştir.</span></footer>
      </div>
      <style jsx>{`
        .resp-page{min-height:100vh;padding:22px 0 55px;color:#eaf2ff;background:radial-gradient(ellipse at 70% 0%,#17304a 0,transparent 42%),linear-gradient(180deg,#081526,#0b1423)}
        .resp-wrap{width:min(100% - 36px,1120px);margin:auto}.resp-crumb{display:flex;gap:10px;margin:0 0 18px;color:#8ea5c2;font-size:12px}.resp-crumb a,.resp-footer a{color:#8de3db;text-decoration:none}.resp-hero{display:flex;align-items:center;justify-content:space-between;gap:25px;padding:clamp(24px,5vw,48px);border:1px solid #28445c;border-radius:24px;background:linear-gradient(120deg,#142b42,#1a2540);box-shadow:0 18px 45px #0003}.resp-kicker{color:#72d8d0;font-size:10px;font-weight:900;letter-spacing:.15em}.resp-hero h1{margin:12px 0;font-size:clamp(32px,5vw,52px);line-height:1.05;letter-spacing:-.04em}.resp-hero p{max-width:670px;color:#b7c9dd;line-height:1.7;font-size:14px}.resp-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.resp-pills span{padding:8px 11px;border:1px solid #426078;border-radius:20px;color:#d8eeff;font-size:11px}.resp-icon{font-size:clamp(70px,12vw,125px);filter:drop-shadow(0 12px 22px #ff769555)}.resp-card{margin-top:25px;padding:clamp(17px,3vw,30px);border:1px solid #29435b;border-radius:22px;background:#101f32;box-shadow:0 15px 40px #0003}.resp-card-head{display:flex;justify-content:space-between;align-items:center}.resp-card-head h2{margin:7px 0 0;font-size:25px}.resp-counter{padding:8px 12px;border-radius:12px;background:#20384e;color:#9ee9e0;font-size:12px;font-weight:800}.resp-stage{position:relative;display:grid;place-items:center;min-height:390px;margin-top:17px;overflow:hidden;border:1px solid #263f56;border-radius:18px;background:radial-gradient(ellipse at 50% 45%,#263e58,#14263a 60%,#101d2e)}.resp-svg{width:min(100%,650px);height:auto;max-height:460px}.lung{fill:url(#lungFill);stroke:#ffb5c2;stroke-width:3;opacity:.88;transform-box:fill-box;transform-origin:center;animation:breath 4s ease-in-out infinite}.lung-highlight{fill:none;stroke:#ffc1ca;stroke-width:5;stroke-linecap:round;opacity:.6}.airway,.airway-small{fill:none;stroke:#ffd19b;stroke-width:15;stroke-linecap:round;stroke-linejoin:round}.airway-small{stroke-width:8}.trachea{stroke:url(#tubeFill);stroke-width:24;stroke-linecap:round}.trachea-ring{fill:none;stroke:#bd7f55;stroke-width:2.5;opacity:.75}.nose{fill:#f2ad88;stroke:#ffd0b0;stroke-width:2}.nose-line{fill:none;stroke:#a65e55;stroke-width:2}.alveolus{fill:#f59bb1;stroke:#ffd2dc;stroke-width:2;filter:url(#glow)}.oxygen-particles circle{fill:#60e3cf;filter:url(#glow);animation:flow 2.8s ease-in-out infinite}.oxygen-particles circle:nth-child(2n){animation-delay:.35s}.carbon-particles circle{fill:#ffc56b;filter:url(#glow);animation:flowBack 2.5s ease-in-out infinite}.svg-labels{fill:#dcecff;font-size:13px;font-weight:800}.svg-labels path{stroke:#b7cce0;stroke-width:1.5;fill:none}.resp-legend{position:absolute;top:15px;left:17px;display:flex;gap:15px;color:#bcd0e4;font-size:10px}.resp-legend span{display:flex;align-items:center;gap:6px}.dot{width:8px;height:8px;border-radius:50%}.oxygen{background:#60e3cf}.carbon{background:#ffc56b}.resp-stage-caption{position:absolute;bottom:13px;padding:8px 14px;border:1px solid #426078;border-radius:20px;background:#14283dcc;color:#a6f0e5;font-size:11px;font-weight:800}.resp-progress{display:flex;justify-content:center;gap:10px;margin:20px 0}.resp-progress button{width:34px;height:34px;border:1px solid #47617b;border-radius:50%;color:#a8bdd3;background:#1b3047;cursor:pointer}.resp-progress button.active{border-color:#80e3d9;color:#09202b;background:#80e3d9;box-shadow:0 0 0 5px #80e3d922}.resp-progress button.done{border-color:#4b9d92;color:#8fe7d9}.resp-info{display:flex;justify-content:space-between;align-items:center;gap:22px;padding:20px;border:1px solid #2b455e;border-radius:16px;background:#14263b}.resp-info h3{margin:7px 0;font-size:22px}.resp-info p{max-width:650px;margin:0;color:#bdcde0;font-size:13px;line-height:1.7}.resp-controls{display:flex;flex-wrap:wrap;gap:7px}.resp-controls button,.resp-bottom button{padding:10px 13px;border:1px solid #48627b;border-radius:10px;color:#dcecff;background:#20364d;font-weight:750;font-size:11px;cursor:pointer}.resp-controls button:disabled{opacity:.35;cursor:not-allowed}.resp-controls .play{border-color:#73d9ce;color:#08242a;background:#73d9ce}.resp-bottom{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-top:13px}.resp-bottom span{color:#91a8c1;font-size:11px}.resp-fact{display:flex;gap:16px;align-items:center;margin-top:20px;padding:19px 22px;border:1px solid #36536a;border-radius:16px;background:#132b3b}.resp-fact span{flex-shrink:0;color:#ffcf83;font-size:10px;font-weight:900;letter-spacing:.1em}.resp-fact p{margin:0;color:#c8d9e9;font-size:13px;line-height:1.6}.resp-footer{display:flex;justify-content:space-between;gap:15px;margin-top:22px;color:#8ea4bd;font-size:11px}.resp-footer a{font-weight:800}
        @keyframes breath{0%,100%{transform:scale(.97)}50%{transform:scale(1.035)}}@keyframes flow{0%{opacity:.25;transform:translateY(-15px)}50%{opacity:1}100%{opacity:.2;transform:translateY(25px)}}@keyframes flowBack{0%,100%{opacity:.3;transform:translateY(10px)}50%{opacity:1;transform:translateY(-10px)}}
        [data-step="0"] .nose,[data-step="1"] .trachea,[data-step="2"] .trachea,[data-step="3"] .airway-small,[data-step="3"] .airway,[data-step="4"] .alveolus{filter:drop-shadow(0 0 9px #75e8dc);stroke:#78e5d7}
        @media(max-width:700px){.resp-hero{align-items:flex-start}.resp-icon{font-size:65px}.resp-stage{min-height:300px}.resp-svg{width:115%;max-width:none}.svg-labels{font-size:15px}.resp-info{align-items:flex-start;flex-direction:column}.resp-controls{width:100%}.resp-controls button{flex:1}.resp-fact{align-items:flex-start;flex-direction:column;gap:7px}}
        @media(max-width:450px){.resp-wrap{width:calc(100% - 24px)}.resp-hero{padding:22px 18px}.resp-icon{display:none}.resp-hero h1{font-size:34px}.resp-stage{min-height:250px}.resp-legend{font-size:9px;gap:8px}.resp-stage-caption{font-size:9px}.resp-bottom,.resp-footer{align-items:flex-start;flex-direction:column}.resp-progress{gap:6px}.resp-progress button{width:31px;height:31px}}
        @media(prefers-reduced-motion:reduce){.lung,.oxygen-particles circle,.carbon-particles circle{animation:none}}
      `}</style>
    </main>
  );
}

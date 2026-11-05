"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const steps = [
  { title: "1. Böbrekler", text: "Böbrekler kanı süzer. Kandaki atık maddelerin, fazla suyun ve bazı tuzların uzaklaştırılmasını sağlayarak idrarı oluşturur.", tag: "Kan süzülür, idrar oluşur" },
  { title: "2. Nefronlar", text: "Böbreklerin yapısında çok sayıda nefron bulunur. Nefronlar kanın süzülmesi ve gerekli maddelerin geri kazanılması görevlerinde rol alır.", tag: "Böbreğin süzme birimi" },
  { title: "3. Üreterler", text: "Böbreklerde oluşan idrar, üreter adı verilen iki kanal aracılığıyla idrar kesesine taşınır.", tag: "İdrarı mesaneye taşır" },
  { title: "4. İdrar kesesi", text: "İdrar kesesi (mesane), idrarı bir süre depolar. Dolduğunda sinir sistemi aracılığıyla tuvalet ihtiyacı hissedilir.", tag: "İdrarı geçici olarak depolar" },
  { title: "5. Üretra", text: "İdrar, üretra adı verilen kanal aracılığıyla vücut dışına atılır. Böylece boşaltımın idrarla gerçekleşen bölümü tamamlanır.", tag: "İdrar vücuttan uzaklaştırılır" },
];

export default function BosaltimSistemiPage() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % steps.length), 3200);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <main className="ex-page">
      <div className="ex-wrap">
        <nav className="ex-crumb"><Link href="/animasyonlar/7">7. Sınıf Animasyonları</Link><span>/</span><span>Boşaltım Sistemi</span></nav>
        <header className="ex-hero">
          <div>
            <span className="ex-kicker">7. SINIF FEN BİLİMLERİ · VÜCUDUMUZDAKİ SİSTEMLER</span>
            <h1>Boşaltım Sistemini Keşfet</h1>
            <p>Böbreklerde kanın süzülmesinden idrarın vücuttan atılmasına kadar gerçekleşen yolculuğu adım adım incele.</p>
            <div className="ex-pills"><span>🫘 Böbreklerin görevi</span><span>💧 İdrarın yolculuğu</span><span>📱 Mobil uyumlu</span></div>
          </div>
          <div className="ex-icon" aria-hidden="true">🫘</div>
        </header>

        <section className="ex-card" aria-label="Boşaltım sistemi animasyonu">
          <div className="ex-card-head"><div><span className="ex-kicker">ETKİLEŞİMLİ ANİMASYON</span><h2>İdrarın yolculuğu</h2></div><span className="ex-counter">{step + 1} / {steps.length}</span></div>
          <div className="ex-stage" data-step={step}>
            <div className="ex-legend"><span><i className="ex-dot blood" /> Kanın süzülmesi</span><span><i className="ex-dot urine" /> İdrarın izlediği yol</span></div>
            <svg className="ex-svg" viewBox="0 0 700 480" role="img" aria-label="Böbrekler, üreterler, idrar kesesi ve üretrayı gösteren boşaltım sistemi çizimi">
              <defs>
                <linearGradient id="kidneyColor" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#f58b83"/><stop offset="1" stopColor="#a93650"/></linearGradient>
                <linearGradient id="bladderColor" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#ffd18b"/><stop offset="1" stopColor="#e99b50"/></linearGradient>
                <filter id="exGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <path className="ex-vessel" d="M350 82 L350 215 M350 116 C315 116 280 116 248 137 M350 116 C385 116 420 116 452 137" />
              <path className="ex-vessel ex-vessel-blue" d="M350 98 L350 225 M350 137 C315 137 280 137 248 157 M350 137 C385 137 420 137 452 157" />
              <path className="ex-kidney" d="M260 120 C218 95 174 123 171 170 C168 212 194 244 228 235 C253 229 260 205 246 187 C232 169 238 148 260 120Z" />
              <path className="ex-kidney" d="M440 120 C482 95 526 123 529 170 C532 212 506 244 472 235 C447 229 440 205 454 187 C468 169 462 148 440 120Z" />
              <path className="ex-kidney-inner" d="M240 145 Q210 160 221 199 M460 145 Q490 160 479 199" />
              <path className="ex-ureter" d="M236 224 C244 280 276 302 315 340 M464 224 C456 280 424 302 385 340" />
              <path className="ex-bladder" d="M315 328 C290 349 296 402 327 418 Q350 431 373 418 C404 402 410 349 385 328 Q350 305 315 328Z" />
              <path className="ex-bladder-fill" d="M311 372 Q350 356 389 372 L385 400 Q350 425 315 400Z" />
              <path className="ex-urethra" d="M350 418 L350 463" />
              <g className="ex-flow">
                <circle cx="236" cy="245" r="6"/><circle cx="248" cy="277" r="6"/><circle cx="272" cy="307" r="6"/>
                <circle cx="464" cy="245" r="6"/><circle cx="452" cy="277" r="6"/><circle cx="428" cy="307" r="6"/>
                <circle cx="350" cy="350" r="6"/><circle cx="350" cy="390" r="6"/><circle cx="350" cy="443" r="6"/>
              </g>
              <g className="ex-labels">
                <text x="80" y="102">Böbrek</text><path d="M130 106 L184 133"/>
                <text x="512" y="105">Böbrek</text><path d="M510 109 L512 133"/>
                <text x="70" y="285">Üreter</text><path d="M122 289 L244 282"/>
                <text x="500" y="288">Üreter</text><path d="M500 292 L456 282"/>
                <text x="425" y="384">İdrar kesesi</text><path d="M420 388 L390 388"/>
                <text x="375" y="455">Üretra</text><path d="M370 451 L354 451"/>
              </g>
              <g className="ex-nephron">
                <circle cx="350" cy="38" r="20"/><path d="M337 38 C337 24 362 24 362 38 C362 52 337 52 337 38" />
                <text x="383" y="43">Nefron: süzme birimi</text>
              </g>
            </svg>
            <div className="ex-stage-caption">{steps[step].tag}</div>
          </div>
          <div className="ex-progress">{steps.map((item,index)=><button key={item.title} className={index===step?"active":index<step?"done":""} onClick={()=>{setStep(index);setPlaying(false);}} aria-label={item.title} title={item.title}><span>{index+1}</span></button>)}</div>
          <div className="ex-info"><div><span className="ex-kicker">ŞİMDİ ÖĞRENİYORSUN</span><h3>{steps[step].title}</h3><p>{steps[step].text}</p></div><div className="ex-controls"><button onClick={()=>{setStep((s)=>Math.max(0,s-1));setPlaying(false);}} disabled={step===0}>← Geri</button><button className="ex-play" onClick={()=>setPlaying(!playing)}>{playing?"Duraklat":"▶ Oynat"}</button><button onClick={()=>{setStep((s)=>Math.min(steps.length-1,s+1));setPlaying(false);}} disabled={step===steps.length-1}>İleri →</button></div></div>
          <div className="ex-bottom"><button onClick={()=>{setStep(0);setPlaying(false);}}>↺ Baştan başla</button><span>{playing?"Animasyon oynatılıyor":"Aşamaları seçerek inceleyebilirsin."}</span></div>
        </section>

        <section className="ex-fact"><span>💡 BİLİYOR MUYDUN?</span><p>Böbrekler yalnızca atık maddeleri uzaklaştırmaz; vücudun su ve mineral dengesinin korunmasına da yardımcı olur.</p></section>
        <footer className="ex-footer"><Link href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link><span>Fen Platformu · Öğren, keşfet, pekiştir.</span></footer>
      </div>
      <style jsx>{`
        .ex-page{min-height:100vh;padding:22px 0 55px;color:#eaf2ff;background:radial-gradient(ellipse at 70% 0%,#26334b 0,transparent 42%),linear-gradient(180deg,#091526,#0b1423)}
        .ex-wrap{width:min(100% - 36px,1120px);margin:auto}.ex-crumb{display:flex;gap:10px;margin:0 0 18px;color:#8ea5c2;font-size:12px}.ex-crumb a,.ex-footer a{color:#8de3db;text-decoration:none}.ex-hero{display:flex;align-items:center;justify-content:space-between;gap:25px;padding:clamp(24px,5vw,48px);border:1px solid #3d465f;border-radius:24px;background:linear-gradient(120deg,#182c42,#30243e);box-shadow:0 18px 45px #0003}.ex-kicker{color:#81ddd2;font-size:10px;font-weight:900;letter-spacing:.15em}.ex-hero h1{margin:12px 0;font-size:clamp(32px,5vw,52px);line-height:1.05;letter-spacing:-.04em}.ex-hero p{max-width:670px;color:#b7c9dd;line-height:1.7;font-size:14px}.ex-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.ex-pills span{padding:8px 11px;border:1px solid #526078;border-radius:20px;color:#e5e7ff;font-size:11px}.ex-icon{font-size:clamp(70px,12vw,125px);filter:drop-shadow(0 12px 22px #f47a7555)}.ex-card{margin-top:25px;padding:clamp(17px,3vw,30px);border:1px solid #35465e;border-radius:22px;background:#101f32;box-shadow:0 15px 40px #0003}.ex-card-head{display:flex;justify-content:space-between;align-items:center}.ex-card-head h2{margin:7px 0 0;font-size:25px}.ex-counter{padding:8px 12px;border-radius:12px;background:#29364c;color:#a5eee2;font-size:12px;font-weight:800}.ex-stage{position:relative;display:grid;place-items:center;min-height:390px;margin-top:17px;overflow:hidden;border:1px solid #34445b;border-radius:18px;background:radial-gradient(ellipse at 50% 45%,#34405a,#1c2b40 60%,#121f31)}.ex-svg{width:min(100%,650px);height:auto;max-height:460px}.ex-kidney{fill:url(#kidneyColor);stroke:#ffb1a5;stroke-width:3;filter:drop-shadow(0 4px 9px #d34b5840)}.ex-kidney-inner{fill:none;stroke:#ffd0a9;stroke-width:5;stroke-linecap:round;opacity:.8}.ex-vessel{fill:none;stroke:#dc666c;stroke-width:12;stroke-linecap:round}.ex-vessel-blue{stroke:#66a8df;stroke-width:7;opacity:.9}.ex-ureter{fill:none;stroke:#f2c17d;stroke-width:10;stroke-linecap:round;stroke-linejoin:round}.ex-bladder{fill:url(#bladderColor);stroke:#ffe0aa;stroke-width:3}.ex-bladder-fill{fill:#f2c76e;opacity:.75}.ex-urethra{stroke:#f3c77f;stroke-width:9;stroke-linecap:round}.ex-flow circle{fill:#ffe08c;filter:url(#exGlow);animation:exFlow 3s ease-in-out infinite}.ex-flow circle:nth-child(3n){animation-delay:.5s}.ex-nephron circle{fill:#a7e8d9;stroke:#e0fff5;stroke-width:2}.ex-nephron path{fill:none;stroke:#3e9b8d;stroke-width:3}.ex-nephron text{fill:#d8fff4;font-size:13px;font-weight:800}.ex-labels{fill:#e1edff;font-size:14px;font-weight:800}.ex-labels path{stroke:#c0d0e4;stroke-width:1.5;fill:none}.ex-legend{position:absolute;top:15px;left:17px;display:flex;gap:15px;color:#c6d4e5;font-size:10px}.ex-legend span{display:flex;align-items:center;gap:6px}.ex-dot{width:8px;height:8px;border-radius:50%}.blood{background:#df737a}.urine{background:#ffda83}.ex-stage-caption{position:absolute;bottom:13px;padding:8px 14px;border:1px solid #59617a;border-radius:20px;background:#1c2a40dd;color:#b7f1e7;font-size:11px;font-weight:800}.ex-progress{display:flex;justify-content:center;gap:10px;margin:20px 0}.ex-progress button{width:34px;height:34px;border:1px solid #52627b;border-radius:50%;color:#b1c1d5;background:#233249;cursor:pointer}.ex-progress button.active{border-color:#80e3d9;color:#09202b;background:#80e3d9;box-shadow:0 0 0 5px #80e3d922}.ex-progress button.done{border-color:#4b9d92;color:#8fe7d9}.ex-info{display:flex;justify-content:space-between;align-items:center;gap:22px;padding:20px;border:1px solid #344a61;border-radius:16px;background:#17283c}.ex-info h3{margin:7px 0;font-size:22px}.ex-info p{max-width:650px;margin:0;color:#bdcde0;font-size:13px;line-height:1.7}.ex-controls{display:flex;flex-wrap:wrap;gap:7px}.ex-controls button,.ex-bottom button{padding:10px 13px;border:1px solid #52627b;border-radius:10px;color:#e2ebfa;background:#26374d;font-weight:750;font-size:11px;cursor:pointer}.ex-controls button:disabled{opacity:.35;cursor:not-allowed}.ex-controls .ex-play{border-color:#7bddd2;color:#09242b;background:#7bddd2}.ex-bottom{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-top:13px}.ex-bottom span{color:#9aacc2;font-size:11px}.ex-fact{display:flex;gap:16px;align-items:center;margin-top:20px;padding:19px 22px;border:1px solid #4b5368;border-radius:16px;background:#1b2b3c}.ex-fact span{flex-shrink:0;color:#ffcf83;font-size:10px;font-weight:900;letter-spacing:.1em}.ex-fact p{margin:0;color:#c8d9e9;font-size:13px;line-height:1.6}.ex-footer{display:flex;justify-content:space-between;gap:15px;margin-top:22px;color:#8ea4bd;font-size:11px}.ex-footer a{font-weight:800}
        @keyframes exFlow{0%{opacity:.2;transform:translateY(-10px)}50%{opacity:1}100%{opacity:.2;transform:translateY(13px)}}
        [data-step="0"] .ex-kidney,[data-step="1"] .ex-nephron,[data-step="2"] .ex-ureter,[data-step="3"] .ex-bladder,[data-step="4"] .ex-urethra{filter:drop-shadow(0 0 10px #8ce8d7);stroke:#9bf1e5}
        @media(max-width:700px){.ex-hero{align-items:flex-start}.ex-icon{font-size:65px}.ex-stage{min-height:300px}.ex-svg{width:115%;max-width:none}.ex-labels{font-size:15px}.ex-info{align-items:flex-start;flex-direction:column}.ex-controls{width:100%}.ex-controls button{flex:1}.ex-fact{align-items:flex-start;flex-direction:column;gap:7px}}
        @media(max-width:450px){.ex-wrap{width:calc(100% - 24px)}.ex-hero{padding:22px 18px}.ex-icon{display:none}.ex-hero h1{font-size:34px}.ex-stage{min-height:250px}.ex-legend{font-size:9px;gap:8px}.ex-stage-caption{font-size:9px}.ex-bottom,.ex-footer{align-items:flex-start;flex-direction:column}.ex-progress{gap:6px}.ex-progress button{width:31px;height:31px}}
        @media(prefers-reduced-motion:reduce){.ex-flow circle{animation:none}}
      `}</style>
    </main>
  );
}

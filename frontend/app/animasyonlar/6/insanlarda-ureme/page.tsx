"use client";

import Link from "next/link";
import { useState } from "react";

type Organ = { id: string; name: string; short: string; role: string; x: number; y: number; color: string };
type SystemKey = "male" | "female";

const systems: Record<SystemKey, { title: string; intro: string; organs: Organ[] }> = {
  male: {
    title: "Erkek üreme sistemi",
    intro: "Erkek üreme sisteminin temel görevi sperm hücrelerini üretmek ve bu hücrelerin taşınmasını sağlamaktır.",
    organs: [
      { id: "testis", name: "Testisler", short: "Sperm hücreleri burada üretilir.", role: "Erkek üreme hücreleri olan spermler testislerde üretilir. Testisler, vücut sıcaklığından biraz daha düşük sıcaklıkta bulunmalarını sağlayan kese içinde yer alır.", x: 320, y: 315, color: "#2878c8" },
      { id: "sperm-kanali", name: "Sperm kanalları", short: "Spermlerin taşınmasını sağlar.", role: "Testislerde üretilen spermleri ilgili kanallara doğru taşır. Şemada iki yanda uzanan ince kanallar olarak gösterilmiştir.", x: 320, y: 188, color: "#2878c8" },
      { id: "yardimci-bezler", name: "Yardımcı bezler", short: "Sıvı salgılayarak spermlere yardımcı olur.", role: "Salgıladıkları sıvılar spermlerin taşınmasına ve korunmasına yardımcı olan meni sıvısının oluşumuna katkı sağlar.", x: 320, y: 238, color: "#d28a25" },
      { id: "penis", name: "Penis", short: "Üreme ve boşaltım sisteminde görev alır.", role: "Erkek üreme sisteminin dış bölümüdür. Üreme sırasında spermlerin vücut dışına aktarılmasında görev alır. Aynı zamanda idrarın vücuttan atılmasını sağlayan yapıdır.", x: 320, y: 380, color: "#2878c8" },
    ],
  },
  female: {
    title: "Dişi üreme sistemi",
    intro: "Dişi üreme sisteminin temel görevi yumurta hücresini üretmek, döllenme ve embriyonun gelişimi için uygun ortamı sağlamaktır.",
    organs: [
      { id: "yumurtalik", name: "Yumurtalıklar", short: "Yumurta hücreleri burada olgunlaşır.", role: "Yumurta hücrelerinin üretildiği ve olgunlaştığı yapılardır. Ayrıca dişiye özgü bazı hormonları salgılar.", x: 185, y: 205, color: "#b34c91" },
      { id: "yumurta-kanali", name: "Yumurta kanalları", short: "Yumurtayı rahme doğru taşır.", role: "Yumurtalık ile rahim arasında uzanır. Döllenme genellikle yumurta kanalında gerçekleşir.", x: 320, y: 168, color: "#b34c91" },
      { id: "rahim", name: "Rahim (döl yatağı)", short: "Embriyo burada gelişir.", role: "Döllenme sonucunda oluşan embriyo rahme yerleşir ve gelişimini burada sürdürür. Rahmin iç tabakası gebelik boyunca değişime uğrar.", x: 320, y: 260, color: "#b34c91" },
      { id: "vajina", name: "Vajina", short: "Rahmi vücudun dışına bağlayan kanaldır.", role: "Rahim ile vücut dışı arasında bağlantı kuran esnek kanaldır. Doğum sırasında doğum kanalı olarak görev yapar.", x: 320, y: 355, color: "#b34c91" },
    ],
  },
};

function AnatomyDiagram({ system, active, onSelect }: { system: SystemKey; active: string; onSelect: (id: string) => void }) {
  const organs = systems[system].organs;
  return (
    <svg viewBox="0 0 640 455" className="anatomy-svg" role="img" aria-label={systems[system].title + " şeması. Yapıları seçerek görevlerini öğrenin."}>
      <defs>
        <linearGradient id="bodyFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f2e8df"/><stop offset="1" stopColor="#e4d4c9"/></linearGradient>
      </defs>
      <path d="M230 42 Q320 12 410 42 L455 110 Q430 145 420 190 L410 425 L230 425 L220 190 Q210 145 185 110Z" fill="url(#bodyFill)" stroke="#c9b7aa" strokeWidth="4" opacity=".7"/>
      {system === "male" ? (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M278 300 Q260 250 270 190 Q275 150 300 125" fill="none" stroke="#2878c8" strokeWidth="10"/>
          <path d="M362 300 Q380 250 370 190 Q365 150 340 125" fill="none" stroke="#2878c8" strokeWidth="10"/>
          <path d="M300 125 Q320 110 340 125" fill="none" stroke="#2878c8" strokeWidth="9"/>
          <ellipse cx="300" cy="305" rx="25" ry="34" fill="#83b8e7" stroke="#2878c8" strokeWidth="4"/>
          <ellipse cx="340" cy="305" rx="25" ry="34" fill="#83b8e7" stroke="#2878c8" strokeWidth="4"/>
          <path d="M290 220 Q320 198 350 220 L344 250 Q320 265 296 250Z" fill="#e5b66b" stroke="#b77a28" strokeWidth="4"/>
          <path d="M320 250 L320 382" stroke="#2878c8" strokeWidth="24"/>
          <path d="M300 380 Q320 397 340 380" fill="none" stroke="#1e5f9e" strokeWidth="5"/>
          <path d="M278 338 Q320 365 362 338" fill="none" stroke="#b77a28" strokeWidth="4"/>
        </g>
      ) : (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M320 165 C285 125 250 120 210 155 Q190 170 190 195" fill="none" stroke="#b34c91" strokeWidth="13"/>
          <path d="M320 165 C355 125 390 120 430 155 Q450 170 450 195" fill="none" stroke="#b34c91" strokeWidth="13"/>
          <ellipse cx="185" cy="205" rx="26" ry="33" fill="#e8a6ce" stroke="#a43f83" strokeWidth="4"/>
          <ellipse cx="455" cy="205" rx="26" ry="33" fill="#e8a6ce" stroke="#a43f83" strokeWidth="4"/>
          <path d="M278 225 Q320 202 362 225 L350 292 Q320 325 290 292Z" fill="#e8a6ce" stroke="#a43f83" strokeWidth="5"/>
          <path d="M300 300 Q320 315 340 300 L335 375 Q320 393 305 375Z" fill="#d88bb9" stroke="#a43f83" strokeWidth="4"/>
          <path d="M320 165 L320 218" stroke="#a43f83" strokeWidth="7"/>
        </g>
      )}
      {organs.map((organ) => (
        <g key={organ.id} onClick={() => onSelect(organ.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(organ.id); }} role="button" tabIndex={0} aria-label={organ.name + " seç"} style={{ cursor: "pointer" }}>
          <circle cx={organ.x} cy={organ.y} r={active === organ.id ? 21 : 15} fill={organ.color} stroke="white" strokeWidth={4}/>
          <circle cx={organ.x} cy={organ.y} r="5" fill="white"/>
          <circle cx={organ.x} cy={organ.y} r={active === organ.id ? 28 : 0} fill="none" stroke={organ.color} strokeWidth="3" opacity=".5"/>
        </g>
      ))}
    </svg>
  );
}

export default function HumanReproductionPage() {
  const [system, setSystem] = useState<SystemKey>("male");
  const [active, setActive] = useState("testis");
  const current = systems[system];
  const selected = current.organs.find((organ) => organ.id === active) ?? current.organs[0];
  const changeSystem = (next: SystemKey) => { setSystem(next); setActive(systems[next].organs[0].id); };

  return (
    <main className="repro-page">
      <div className="repro-wrap">
        <nav className="crumb"><Link href="/#animasyonlar">Animasyonlar</Link><span>/</span><Link href="/animasyonlar/6">6. Sınıf</Link><span>/</span><span>İnsanlarda üreme</span></nav>
        <header className="hero">
          <span className="eyebrow">6. SINIF FEN BİLİMLERİ · CANLILARDA ÜREME</span>
          <h1>İnsanlarda Üremeyi Sağlayan Yapılar</h1>
          <p>Erkek ve dişi üreme sistemlerini ayrı ayrı incele. Şemadaki işaretlere dokunarak organların isimlerini ve görevlerini öğren.</p>
        </header>
        <div className="system-tabs" role="tablist" aria-label="Üreme sistemi seçimi">
          <button role="tab" aria-selected={system === "male"} className={system === "male" ? "tab active male" : "tab"} onClick={() => changeSystem("male")}>♂ Erkek üreme organları</button>
          <button role="tab" aria-selected={system === "female"} className={system === "female" ? "tab active female" : "tab"} onClick={() => changeSystem("female")}>♀ Dişi üreme organları</button>
        </div>
        <section className="system-layout">
          <div className="diagram-card">
            <div className="diagram-head"><div><span>ETKİLEŞİMLİ ŞEMA</span><h2>{current.title}</h2></div><span className="tap-hint">● İşaretlere dokun</span></div>
            <AnatomyDiagram system={system} active={active} onSelect={setActive}/>
            <div className="organ-buttons">{current.organs.map((organ) => <button key={organ.id} className={active === organ.id ? "organ-chip selected" : "organ-chip"} onClick={() => setActive(organ.id)}>{organ.name}</button>)}</div>
          </div>
          <article className="detail-card" aria-live="polite">
            <div className="detail-kicker">SEÇİLEN ORGAN</div>
            <div className="detail-dot" style={{ background: selected.color }}/>
            <h2>{selected.name}</h2>
            <p className="short">{selected.short}</p>
            <div className="role-panel"><strong>Görevi nedir?</strong><p>{selected.role}</p></div>
            <div className="step-controls">
              <button onClick={() => setActive(current.organs[(current.organs.findIndex((o) => o.id === active) + current.organs.length - 1) % current.organs.length].id)}>← Önceki</button>
              <button onClick={() => setActive(current.organs[(current.organs.findIndex((o) => o.id === active) + 1) % current.organs.length].id)}>Sonraki →</button>
            </div>
          </article>
        </section>
        <section className="summary">
          <h2>Öğrendiklerimizi özetleyelim</h2>
          <div className="summary-grid">
            <div><strong>Erkek üreme sistemi</strong><p>Sperm hücreleri testislerde üretilir. Sperm kanalları taşınmasına yardımcı olur. Yardımcı bezlerin salgıları meni sıvısına katkı sağlar.</p></div>
            <div><strong>Dişi üreme sistemi</strong><p>Yumurta hücresi yumurtalıklarda olgunlaşır. Döllenme genellikle yumurta kanalında gerçekleşir. Embriyo rahimde gelişir.</p></div>
          </div>
          <p className="note">Bilimsel not: Şemalar öğretim amacıyla sadeleştirilmiştir; organların gerçek boyut ve biçimlerini göstermez.</p>
        </section>
        <footer className="bottom"><Link href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link><button onClick={() => { setSystem("male"); setActive("testis"); }}>↻ Baştan başla</button></footer>
      </div>
      <style jsx>{`
        .repro-page{min-height:100vh;background:linear-gradient(180deg,#edf5ff 0,#f8fafc 390px);padding:22px 14px 55px;color:#172b45}.repro-wrap{max-width:1100px;margin:auto}.crumb{display:flex;gap:9px;flex-wrap:wrap;font-size:13px;color:#718096;margin-bottom:20px}.crumb a,.bottom a{color:#2766a5;font-weight:800;text-decoration:none}.hero{text-align:center;padding:15px 4px 24px}.eyebrow{font-size:11px;font-weight:900;letter-spacing:.13em;color:#3678ad}.hero h1{font-size:clamp(27px,5vw,43px);line-height:1.1;margin:12px 0;color:#173f68;font-weight:950}.hero p{max-width:720px;margin:auto;color:#61748a;line-height:1.65;font-size:15px}.system-tabs{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:5px 0 17px}.tab{border:1px solid #d8e3ed;background:white;color:#4b627a;border-radius:13px;padding:13px 20px;font-weight:900;cursor:pointer}.tab.active{box-shadow:0 5px 18px #15395b18}.tab.male.active{background:#e7f2ff;border-color:#6da7df;color:#205e9b}.tab.female.active{background:#fbeaf5;border-color:#d78bbb;color:#984477}.system-layout{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);gap:16px;align-items:stretch}.diagram-card,.detail-card,.summary{background:white;border:1px solid #e0e8ef;border-radius:21px;box-shadow:0 12px 35px #183a5b0c}.diagram-card{padding:18px;background:linear-gradient(180deg,#fff,#f7fbff)}.diagram-head{display:flex;align-items:center;justify-content:space-between;gap:10px}.diagram-head span{font-size:10px;font-weight:900;letter-spacing:.12em;color:#8ba0b4}.diagram-head h2{font-size:21px;margin:5px 0 0;color:#234d74;font-weight:950}.tap-hint{white-space:nowrap}.anatomy-svg{width:100%;height:auto;max-height:420px;display:block;margin:3px auto}.organ-buttons{display:flex;gap:7px;flex-wrap:wrap;justify-content:center}.organ-chip{border:1px solid #dce6ef;border-radius:20px;background:white;padding:8px 12px;color:#526a81;font-size:12px;font-weight:800;cursor:pointer}.organ-chip.selected{background:#eaf3fc;border-color:#78a8d4;color:#1d5e96}.detail-card{padding:25px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}.detail-kicker{font-size:10px;font-weight:900;letter-spacing:.16em;color:#92a2b2}.detail-dot{width:12px;height:12px;border-radius:50%;margin-top:20px}.detail-card h2{font-size:30px;line-height:1.1;margin:10px 0;color:#234f78;font-weight:950}.short{font-size:16px;color:#536c83;line-height:1.55;margin:0}.role-panel{margin-top:21px;border-radius:15px;background:#f1f6fb;border:1px solid #e0eaf3;padding:16px}.role-panel strong{color:#285e8c;font-size:14px}.role-panel p{color:#52677c;line-height:1.7;font-size:14px;margin:7px 0 0}.step-controls{display:flex;gap:9px;margin-top:22px}.step-controls button,.bottom button{border:0;border-radius:11px;background:#eaf1f8;color:#285b86;padding:11px 14px;font-weight:850;cursor:pointer}.step-controls button:last-child{background:#286da7;color:white;flex:1}.summary{padding:21px;margin-top:17px}.summary h2{font-size:19px;color:#234f78;font-weight:950;margin:0 0 13px}.summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.summary-grid>div{background:#f6f9fc;border:1px solid #e5edf4;border-radius:13px;padding:15px}.summary-grid strong{color:#315f87;font-size:14px}.summary-grid p{font-size:13px;line-height:1.65;color:#607286;margin:7px 0 0}.note{font-size:11px;color:#8796a5;margin:14px 0 0}.bottom{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:19px;font-size:14px}.bottom button{background:#e8f0f8}@media(max-width:760px){.system-layout{grid-template-columns:1fr}.diagram-card{padding:13px}.anatomy-svg{max-height:340px}.detail-card{padding:20px}.summary-grid{grid-template-columns:1fr}.hero p{font-size:14px}}
      `}</style>
    </main>
  );
}

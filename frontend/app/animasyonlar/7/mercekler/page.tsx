"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type LensType = "convex" | "concave";

export default function MerceklerPage() {
  const [lens, setLens] = useState<LensType>("convex");
  const [distance, setDistance] = useState(220);
  const [showRays, setShowRays] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const f = 120;
  const lensX = 390;
  const axisY = 265;
  const scale = 0.85;
  const objectX = lensX - distance * scale;
  const objectHeight = 82;

  const image = useMemo(() => {
    if (lens === "convex") {
      const v = (f * distance) / (distance - f);
      const m = -v / distance;
      return { x: lensX + v * scale, height: objectHeight * m, virtual: distance < f, real: distance > f, magnification: Math.abs(m) };
    }
    const v = -(f * distance) / (distance + f);
    const m = -v / distance;
    return { x: lensX + v * scale, height: objectHeight * m, virtual: true, real: false, magnification: Math.abs(m) };
  }, [distance, lens, lensX]);

  const imageX = Math.max(38, Math.min(742, image.x));
  const imageTop = axisY - image.height;
  const imageInside = imageX < lensX;
  const status = lens === "concave"
    ? "Sanal, düz ve cisimden küçük"
    : distance > f
      ? "Gerçek ve ters (büyüklüğü uzaklığa bağlı)"
      : distance < f
        ? "Sanal, düz ve büyük"
        : "Görüntü sonsuzda oluşur";

  const reset = () => { setLens("convex"); setDistance(220); setShowRays(true); setShowLabels(true); };

  return (
    <main className="lens-page">
      <style jsx global>{`
        .lens-page{min-height:100vh;background:#f3f7fc;color:#17243a;padding:18px 14px 48px}
        .lens-wrap{max-width:1080px;margin:0 auto}
        .lens-crumb{display:flex;gap:9px;flex-wrap:wrap;color:#64748b;font-size:13px;margin:4px 0 20px}
        .lens-crumb a,.lens-link{color:#2563eb;text-decoration:none;font-weight:700}
        .lens-hero{border-radius:22px;padding:27px;background:linear-gradient(120deg,#142b52,#155e75);color:white;box-shadow:0 14px 35px #12345b20}
        .lens-kicker{font-size:12px;font-weight:900;letter-spacing:1.5px;color:#a5f3fc}
        .lens-hero h1{font-size:clamp(26px,4vw,39px);line-height:1.15;margin:10px 0}
        .lens-hero p{color:#e0f2fe;line-height:1.65;max-width:780px;margin:0}
        .lens-chips{display:flex;gap:9px;flex-wrap:wrap;margin-top:17px}
        .lens-chips span{background:#ffffff18;border:1px solid #ffffff30;border-radius:999px;padding:8px 12px;font-size:12px}
        .lens-panel{background:white;border:1px solid #e2e8f0;border-radius:19px;padding:19px;margin-top:18px;box-shadow:0 8px 24px #0f172a08}
        .lens-panel h2{font-size:20px;margin:0 0 6px}
        .lens-muted{color:#64748b;font-size:13px;line-height:1.55;margin:0 0 16px}
        .lens-controls{display:grid;grid-template-columns:1fr 1fr;gap:13px}
        .lens-control{background:#f8fafc;border:1px solid #e2e8f0;padding:14px;border-radius:14px;min-width:0}
        .lens-label{display:block;font-size:13px;font-weight:850;color:#334155;margin-bottom:10px}
        .lens-options{display:flex;gap:8px;flex-wrap:wrap}
        .lens-options button,.lens-action{border:1px solid #cbd5e1;background:white;color:#334155;border-radius:10px;padding:10px 12px;cursor:pointer;font-weight:750;font-size:13px}
        .lens-options button.active{background:#155e75;border-color:#155e75;color:white}
        .lens-range{width:100%;accent-color:#0e7490}
        .lens-stage{margin-top:16px;border:1px solid #dbeafe;border-radius:15px;overflow:hidden;background:#f8fcff}
        .lens-stage svg{display:block;width:100%;height:auto}
        .lens-caption{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:10px 13px;background:#eff6ff;color:#334155;font-size:12px}
        .lens-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:13px}
        .lens-metric{padding:13px;border-radius:12px;background:#eff6ff}
        .lens-metric small{display:block;color:#64748b;font-size:11px}
        .lens-metric strong{display:block;font-size:16px;margin-top:5px;color:#0f4774}
        .lens-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:13px}
        .lens-action.primary{background:#0f766e;color:white;border-color:#0f766e}
        .lens-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:13px}
        .lens-card{border:1px solid #e2e8f0;border-radius:14px;padding:15px;background:#fff}
        .lens-card h3{font-size:16px;font-weight:900;margin:0 0 8px}
        .lens-card p{font-size:13px;color:#64748b;line-height:1.55;margin:0}
        .lens-bottom{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:20px;font-size:14px}
        @media(max-width:650px){.lens-page{padding:12px 9px 35px}.lens-hero{padding:20px 17px}.lens-panel{padding:13px}.lens-controls,.lens-cards{grid-template-columns:1fr}.lens-metrics{grid-template-columns:1fr 1fr}.lens-caption{font-size:11px}}
      `}</style>

      <div className="lens-wrap">
        <nav className="lens-crumb"><Link href="/animasyonlar">Animasyonlar</Link><span>/</span><Link href="/animasyonlar/7">7. Sınıf</Link><span>/</span><span>Mercekler</span></nav>
        <header className="lens-hero">
          <span className="lens-kicker">7. SINIF · IŞIĞIN MADDE İLE ETKİLEŞİMİ</span>
          <h1>Mercekleri deneyerek keşfet</h1>
          <p>İnce kenarlı ve kalın kenarlı merceklerin ışığı nasıl etkilediğini gözlemle. Mercek türünü ve cismin uzaklığını değiştir; ışınların yönünü ve görüntünün özelliklerini incele.</p>
          <div className="lens-chips"><span>🔎 Mercek türünü değiştir</span><span>↔️ Cismi hareket ettir</span><span>💡 Işınları gözlemle</span></div>
        </header>

        <section className="lens-panel">
          <h2>🔬 Kontrol paneli</h2>
          <p className="lens-muted">Mercek seçimini yap ve alttaki uzaklık çubuğunu hareket ettir. Şemadaki cisim ve görüntü konumu ayarlarına göre değişir.</p>
          <div className="lens-controls">
            <div className="lens-control">
              <span className="lens-label">1. Mercek türünü seç</span>
              <div className="lens-options">
                <button className={lens === "convex" ? "active" : ""} onClick={() => setLens("convex")}>🔵 İnce kenarlı</button>
                <button className={lens === "concave" ? "active" : ""} onClick={() => setLens("concave")}>🟣 Kalın kenarlı</button>
              </div>
            </div>
            <div className="lens-control">
              <label className="lens-label" htmlFor="object-distance">2. Cismin merceğe uzaklığı: <strong>{distance} birim</strong></label>
              <input id="object-distance" className="lens-range" type="range" min="65" max="330" step="5" value={distance} onChange={e => setDistance(Number(e.target.value))}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#64748b"}}><span>Merceğe yakın</span><span>Mercekten uzak</span></div>
            </div>
          </div>

          <div className="lens-stage">
            <svg viewBox="0 0 780 440" role="img" aria-label={`${lens === "convex" ? "İnce kenarlı" : "Kalın kenarlı"} mercek, cisim ve görüntü ışın şeması`}>
              <defs>
                <linearGradient id="convexGlass" x1="0" x2="1"><stop stopColor="#38bdf8" stopOpacity=".18"/><stop offset=".5" stopColor="#0ea5e9" stopOpacity=".55"/><stop offset="1" stopColor="#38bdf8" stopOpacity=".18"/></linearGradient>
                <linearGradient id="concaveGlass" x1="0" x2="1"><stop stopColor="#a78bfa" stopOpacity=".18"/><stop offset=".5" stopColor="#8b5cf6" stopOpacity=".55"/><stop offset="1" stopColor="#a78bfa" stopOpacity=".18"/></linearGradient>
                <marker id="lensArrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L0 6 L7 3Z" fill="#2563eb"/></marker>
                <marker id="lensArrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L0 6 L7 3Z" fill="#ea580c"/></marker>
              </defs>
              <rect width="780" height="440" fill="#f8fcff"/>
              <g stroke="#e2e8f0" strokeWidth="1">{Array.from({length:15},(_,i)=><line key={i} x1={i*55} y1="25" x2={i*55} y2="410"/>)}{Array.from({length:8},(_,i)=><line key={i} x1="20" y1={45+i*50} x2="760" y2={45+i*50}/>)}</g>
              <line x1="25" y1={axisY} x2="755" y2={axisY} stroke="#475569" strokeWidth="2"/>
              <text x="744" y={axisY-9} textAnchor="end" fill="#475569" fontSize="12">Ana eksen</text>
              <line x1={lensX-f*scale} y1="75" x2={lensX-f*scale} y2="390" stroke="#94a3b8" strokeDasharray="5 6"/>
              <line x1={lensX+f*scale} y1="75" x2={lensX+f*scale} y2="390" stroke="#94a3b8" strokeDasharray="5 6"/>
              <text x={lensX-f*scale} y="62" textAnchor="middle" fill="#64748b" fontSize="13">F</text>
              <text x={lensX+f*scale} y="62" textAnchor="middle" fill="#64748b" fontSize="13">F</text>
              <text x={lensX} y="38" textAnchor="middle" fill={lens==="convex"?"#0369a1":"#7c3aed"} fontSize="14" fontWeight="bold">{lens==="convex"?"İNCE KENARLI MERCEK":"KALIN KENARLI MERCEK"}</text>
              {lens==="convex"
                ? <path d={`M ${lensX} 80 C ${lensX-48} 145 ${lensX-48} 345 ${lensX} 410 C ${lensX+48} 345 ${lensX+48} 145 ${lensX} 80Z`} fill="url(#convexGlass)" stroke="#0284c7" strokeWidth="2.5"/>
                : <path d={`M ${lensX-3} 80 C ${lensX+24} 145 ${lensX+24} 345 ${lensX-3} 410 Q ${lensX-9} 390 ${lensX-3} 80 M ${lensX+3} 80 C ${lensX-24} 145 ${lensX-24} 345 ${lensX+3} 410 Q ${lensX+9} 390 ${lensX+3} 80Z`} fill="url(#concaveGlass)" stroke="#7c3aed" strokeWidth="2.5"/>}
              <line x1={objectX} y1={axisY} x2={objectX} y2={axisY-objectHeight} stroke="#16a34a" strokeWidth="5" markerEnd="url(#lensArrowBlue)"/>
              <text x={objectX} y={axisY+24} textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">Cisim</text>
              {showRays && <>
                <line x1={objectX} y1={axisY-objectHeight} x2={lensX} y2={axisY-objectHeight} stroke="#2563eb" strokeWidth="2.5"/>
                <line x1={lensX} y1={axisY-objectHeight} x2={lensX+260} y2={axisY-objectHeight-(lens==="convex"?260/f*distance*0.25:-260/f*distance*0.25)} stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#lensArrowBlue)"/>
                <line x1={objectX} y1={axisY-objectHeight} x2={lensX+250} y2={axisY-objectHeight+(250/(lensX-objectX))*(axisY-objectHeight-axisY)} stroke="#ea580c" strokeWidth="2" strokeDasharray="7 5"/>
                {image.virtual && <line x1={lensX} y1={axisY-objectHeight} x2={imageX} y2={imageTop} stroke="#ea580c" strokeWidth="2" strokeDasharray="5 5"/>}
                <line x1={objectX} y1={axisY-objectHeight} x2={lensX} y2={axisY} stroke="#0d9488" strokeWidth="2"/>
                <line x1={lensX} y1={axisY} x2={imageX} y2={imageTop} stroke="#0d9488" strokeWidth="2"/>
              </>}
              {imageX < 735 && imageX > 28 && <g>
                <line x1={imageX} y1={axisY} x2={imageX} y2={imageTop} stroke={image.virtual?"#9333ea":"#dc2626"} strokeWidth="5" strokeDasharray={image.virtual?"7 5":"none"}/>
                <path d={`M ${imageX-7} ${imageTop+10} L ${imageX} ${imageTop} L ${imageX+7} ${imageTop+10}`} fill="none" stroke={image.virtual?"#9333ea":"#dc2626"} strokeWidth="3"/>
                <text x={imageX} y={axisY+25} textAnchor="middle" fill={image.virtual?"#7e22ce":"#b91c1c"} fontSize="13" fontWeight="bold">Görüntü</text>
              </g>}
              {showLabels && <g fill="#475569" fontSize="12"><text x="28" y="425">Cisim ve görüntü konumları şematik gösterilmiştir.</text><text x="750" y="425" textAnchor="end">Işınlar renklerle ayrılmıştır.</text></g>}
            </svg>
            <div className="lens-caption"><span>🟢 Cisim</span><span>🔵 Mercekten geçen ışın</span><span>🟣 Sanal / 🔴 Gerçek görüntü</span></div>
          </div>

          <div className="lens-metrics">
            <div className="lens-metric"><small>Görüntünün türü</small><strong>{image.virtual?"Sanal":"Gerçek"}</strong></div>
            <div className="lens-metric"><small>Görüntünün yönü</small><strong>{image.height>0?"Düz":"Ters"}</strong></div>
            <div className="lens-metric"><small>Görüntünün boyutu</small><strong>{image.magnification>1.05?"Büyük":image.magnification<0.95?"Küçük":"Cisimle aynı"}</strong></div>
          </div>
          <div className="lens-control" style={{marginTop:13}}>
            <span className="lens-label">Gözlem sonucu</span>
            <p style={{margin:0,fontSize:14,lineHeight:1.6,color:"#334155"}}>{status}. {lens==="convex" && distance===f ? "Cisim odak noktasındadır." : ""}</p>
          </div>
          <div className="lens-actions">
            <button className="lens-action" onClick={()=>setShowRays(v=>!v)}>{showRays?"Işınları gizle":"Işınları göster"}</button>
            <button className="lens-action" onClick={()=>setShowLabels(v=>!v)}>{showLabels?"Açıklamaları gizle":"Açıklamaları göster"}</button>
            <button className="lens-action primary" onClick={reset}>↺ Deneyi sıfırla</button>
          </div>
        </section>

        <section className="lens-panel">
          <h2>💡 Mercekleri tanıyalım</h2>
          <div className="lens-cards">
            <article className="lens-card"><h3 style={{color:"#0369a1"}}>İnce kenarlı mercek</h3><p>Ortası kenarlarına göre daha kalındır. Işık ışınlarını bir noktada toplamaya yardımcı olur. Büyüteçlerde ve bazı gözlüklerde kullanılır.</p></article>
            <article className="lens-card"><h3 style={{color:"#7c3aed"}}>Kalın kenarlı mercek</h3><p>Ortası kenarlarına göre daha incedir. Işık ışınlarını dağıtır. Bazı gözlüklerde ve optik araçlarda kullanılır.</p></article>
          </div>
          <p className="lens-muted" style={{marginTop:13,marginBottom:0}}>Not: Bu etkinlikte ışın çizimleri ve odak uzaklığı eğitim amacıyla basitleştirilmiştir; gerçek merceklerin görüntü özellikleri mercek ve cisim uzaklığına göre değişir.</p>
        </section>
        <div className="lens-bottom"><Link className="lens-link" href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link><Link className="lens-link" href="/animasyonlar">Tüm animasyonlar →</Link></div>
      </div>
    </main>
  );
}

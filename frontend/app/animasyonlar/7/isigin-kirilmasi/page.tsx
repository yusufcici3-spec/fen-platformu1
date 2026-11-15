"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Medium = "su" | "cam";
type Direction = "azdan-coga" | "cogdan-aza";

const refractiveIndex: Record<Medium, number> = { su: 1.33, cam: 1.5 };

export default function IsiginKirilmasiPage() {
  const [medium, setMedium] = useState<Medium>("su");
  const [direction, setDirection] = useState<Direction>("azdan-coga");
  const [angle, setAngle] = useState(35);
  const [records, setRecords] = useState<Array<{ medium: string; direction: string; incident: number; refracted: number }>>([]);

  const values = useMemo(() => {
    const denseIndex = refractiveIndex[medium];
    const n1 = direction === "azdan-coga" ? 1 : denseIndex;
    const n2 = direction === "azdan-coga" ? denseIndex : 1;
    const rad = (angle * Math.PI) / 180;
    const sinOut = Math.min(1, Math.max(-1, (n1 / n2) * Math.sin(rad)));
    const refracted = Math.asin(sinOut) * (180 / Math.PI);
    return {
      n1, n2, refracted: Math.round(refracted),
      top: direction === "azdan-coga" ? "HAVA" : medium === "su" ? "SU" : "CAM",
      bottom: direction === "azdan-coga" ? medium === "su" ? "SU" : "CAM" : "HAVA",
      rule: direction === "azdan-coga" ? "Normale yaklaşır" : "Normalden uzaklaşır",
      bendsToward: direction === "azdan-coga",
    };
  }, [angle, direction, medium]);

  const rad1 = (angle * Math.PI) / 180;
  const rad2 = (values.refracted * Math.PI) / 180;
  const startX = 300 - Math.sin(rad1) * 170;
  const startY = 250 - Math.cos(rad1) * 170;
  const endX = 300 + Math.sin(rad2) * 170;
  const endY = 250 + Math.cos(rad2) * 170;

  const saveRecord = () => setRecords((old) => [...old, {
    medium: medium === "su" ? "Su" : "Cam",
    direction: direction === "azdan-coga" ? "Az yoğundan çok yoğuna" : "Çok yoğundan az yoğuna",
    incident: angle,
    refracted: values.refracted,
  }]);

  return (
    <main className="refraction-page">
      <style jsx global>{`
        * { box-sizing: border-box; }
        .refraction-page { min-height: 100vh; background: #f4f7fb; color: #17243a; padding: 24px 16px 56px; }
        .refraction-wrap { max-width: 1080px; margin: 0 auto; }
        .refraction-crumb { display:flex; gap:9px; flex-wrap:wrap; color:#64748b; font-size:13px; margin: 4px 0 22px; }
        .refraction-crumb a { color:#2563eb; text-decoration:none; }
        .refraction-hero { background:linear-gradient(120deg,#102b55,#176b91); color:white; border-radius:22px; padding:28px; box-shadow:0 14px 35px #12345b20; }
        .refraction-kicker { font-size:12px; font-weight:800; letter-spacing:1.5px; color:#9ee7ff; }
        .refraction-hero h1 { font-size:clamp(25px,4vw,38px); line-height:1.15; margin:10px 0; }
        .refraction-hero p { color:#e0f2fe; line-height:1.65; max-width:760px; margin:0; }
        .refraction-facts { display:flex; gap:10px; flex-wrap:wrap; margin-top:18px; }
        .refraction-facts span { background:#ffffff18; border:1px solid #ffffff30; border-radius:999px; padding:8px 12px; font-size:13px; }
        .refraction-panel { background:white; border:1px solid #e2e8f0; border-radius:20px; padding:20px; margin-top:20px; box-shadow:0 8px 24px #0f172a08; }
        .refraction-panel h2 { font-size:21px; margin:0 0 6px; }
        .refraction-muted { color:#64748b; line-height:1.55; font-size:14px; margin:0 0 18px; }
        .refraction-controls { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .refraction-control { background:#f8fafc; border:1px solid #e2e8f0; padding:15px; border-radius:15px; min-width:0; }
        .refraction-label { display:block; font-size:13px; font-weight:800; margin-bottom:10px; color:#334155; }
        .refraction-options { display:flex; flex-wrap:wrap; gap:8px; }
        .refraction-options button { border:1px solid #cbd5e1; background:white; color:#334155; border-radius:10px; padding:10px 13px; cursor:pointer; font-weight:700; font-size:13px; }
        .refraction-options button.active { color:white; background:#155e91; border-color:#155e91; }
        .refraction-range { width:100%; accent-color:#0e7490; }
        .refraction-stage { margin-top:18px; border-radius:16px; overflow:hidden; border:1px solid #dbeafe; background:#f8fcff; }
        .refraction-stage svg { display:block; width:100%; height:auto; }
        .refraction-stage-caption { display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; padding:10px 14px; background:#eff6ff; color:#334155; font-size:12px; }
        .ray { stroke-dasharray:12 8; animation:ray-flow 1.2s linear infinite; }
        @keyframes ray-flow { to { stroke-dashoffset:-40; } }
        .refraction-result { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:14px; }
        .refraction-metric { padding:14px; border-radius:13px; background:#eff6ff; }
        .refraction-metric small { display:block; color:#64748b; font-size:12px; }
        .refraction-metric strong { display:block; font-size:22px; margin-top:4px; color:#0f4774; }
        .refraction-save { border:0; border-radius:11px; background:#0f766e; color:white; padding:12px 16px; font-weight:800; cursor:pointer; margin-top:14px; }
        .refraction-table { width:100%; border-collapse:collapse; font-size:13px; margin-top:10px; }
        .refraction-table th,.refraction-table td { text-align:left; padding:10px 8px; border-bottom:1px solid #e2e8f0; }
        .refraction-table th { color:#475569; background:#f8fafc; }
        .refraction-learning { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:14px; }
        .refraction-tip { border:1px solid #e2e8f0; border-radius:14px; padding:15px; background:white; }
        .refraction-tip b { display:block; margin-bottom:6px; }
        .refraction-tip p { color:#64748b; font-size:13px; line-height:1.55; margin:0; }
        .refraction-bottom { display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-top:22px; }
        .refraction-bottom a { color:#1d4ed8; text-decoration:none; font-weight:700; font-size:14px; }
        @media(max-width:650px) {
          .refraction-page { padding:14px 10px 38px; }
          .refraction-hero { padding:21px 18px; border-radius:17px; }
          .refraction-panel { padding:14px; }
          .refraction-controls { grid-template-columns:1fr; }
          .refraction-result { grid-template-columns:1fr 1fr; }
          .refraction-learning { grid-template-columns:1fr; }
          .refraction-stage-caption { font-size:11px; }
        }
      `}</style>

      <div className="refraction-wrap">
        <nav className="refraction-crumb" aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link><span>/</span>
          <Link href="/animasyonlar/7">7. Sınıf</Link><span>/</span>
          <span>Işığın Kırılması</span>
        </nav>

        <header className="refraction-hero">
          <span className="refraction-kicker">7. SINIF · IŞIĞIN MADDE İLE ETKİLEŞİMİ</span>
          <h1>Işığın kırılmasını deneyerek keşfet</h1>
          <p>Işık bir ortamdan başka bir ortama geçerken nasıl yol alır? Ortamın yoğunluğunu ve gelme açısını değiştir; ışının izlediği yolu gözlemle ve sonuçlarını kaydet.</p>
          <div className="refraction-facts">
            <span>🔎 Gelme açısını değiştir</span><span>💧 Su ve camı karşılaştır</span><span>📊 Ölçümlerini kaydet</span>
          </div>
        </header>

        <section className="refraction-panel">
          <h2>🔬 Kırılma deney düzeneği</h2>
          <p className="refraction-muted">Önce ışığın geçtiği ortamı, sonra ışığın hangi yönde ilerlediğini seç. Ardından gelme açısını ayarla.</p>
          <div className="refraction-controls">
            <div className="refraction-control">
              <span className="refraction-label">1. İkinci ortamı seç</span>
              <div className="refraction-options">
                <button className={medium === "su" ? "active" : ""} onClick={() => setMedium("su")}>💧 Su</button>
                <button className={medium === "cam" ? "active" : ""} onClick={() => setMedium("cam")}>🔷 Cam</button>
              </div>
            </div>
            <div className="refraction-control">
              <span className="refraction-label">2. Işığın geçiş yönü</span>
              <div className="refraction-options">
                <button className={direction === "azdan-coga" ? "active" : ""} onClick={() => setDirection("azdan-coga")}>Az yoğundan çok yoğuna</button>
                <button className={direction === "cogdan-aza" ? "active" : ""} onClick={() => setDirection("cogdan-aza")}>Çok yoğundan az yoğuna</button>
              </div>
            </div>
            <div className="refraction-control" style={{gridColumn:"1 / -1"}}>
              <label className="refraction-label" htmlFor="incident-angle">3. Gelme açısı: <strong>{angle}°</strong></label>
              <input id="incident-angle" className="refraction-range" type="range" min="10" max="40" step="1" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#64748b"}}><span>10°</span><span>40°</span></div>
            </div>
          </div>

          <div className="refraction-stage">
            <svg viewBox="0 0 600 430" role="img" aria-label={`Işık ${values.top.toLowerCase()} ortamından ${values.bottom.toLowerCase()} ortamına geçerken ${angle} dereceyle gelip ${values.refracted} dereceyle kırılıyor`}>
              <defs>
                <marker id="rayArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/></marker>
                <linearGradient id="topMedium" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#e0f2fe"/><stop offset="1" stopColor="#f0f9ff"/></linearGradient>
                <linearGradient id="bottomMedium" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#bae6fd"/><stop offset="1" stopColor="#dbeafe"/></linearGradient>
              </defs>
              <rect x="0" y="0" width="600" height="250" fill="url(#topMedium)"/>
              <rect x="0" y="250" width="600" height="180" fill="url(#bottomMedium)"/>
              <text x="20" y="32" fill="#075985" fontSize="16" fontWeight="bold">{values.top} ORTAMI</text>
              <text x="20" y="278" fill="#075985" fontSize="16" fontWeight="bold">{values.bottom} ORTAMI</text>
              <line x1="0" y1="250" x2="600" y2="250" stroke="#0e7490" strokeWidth="4"/>
              <text x="580" y="239" textAnchor="end" fill="#0e7490" fontSize="12">Ortam sınırı</text>
              <line x1="300" y1="45" x2="300" y2="410" stroke="#64748b" strokeWidth="2" strokeDasharray="7 7"/>
              <text x="311" y="62" fill="#64748b" fontSize="12">Normal</text>
              <path d={`M ${startX} ${startY} L 300 250`} stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" markerEnd="url(#rayArrow)" className="ray" fill="none"/>
              <path d={`M 300 250 L ${endX} ${endY}`} stroke="#ea580c" strokeWidth="5" strokeLinecap="round" markerEnd="url(#rayArrow)" className="ray" fill="none"/>
              <circle cx="300" cy="250" r="7" fill="#0f172a" stroke="white" strokeWidth="3"/>
              <path d={`M 300 190 A 60 60 0 0 0 ${300-Math.sin(rad1)*60} ${250-Math.cos(rad1)*60}`} fill="none" stroke="#2563eb" strokeWidth="2.5"/>
              <path d={`M 300 310 A 60 60 0 0 1 ${300+Math.sin(rad2)*60} ${250+Math.cos(rad2)*60}`} fill="none" stroke="#7c3aed" strokeWidth="2.5"/>
              <text x={Math.max(25,startX+12)} y={Math.max(55,startY+35)} fill="#1d4ed8" fontSize="15" fontWeight="bold">Gelme ışını</text>
              <text x={Math.min(470,endX+12)} y={Math.min(395,endY-12)} fill="#9a3412" fontSize="15" fontWeight="bold">Kırılan ışın</text>
              <text x="355" y="190" fill="#1d4ed8" fontSize="14"> {angle}° </text>
              <text x="355" y="322" fill="#7c3aed" fontSize="14"> {values.refracted}° </text>
              <text x="300" y="420" textAnchor="middle" fill="#334155" fontSize="12">Açılar normale göre ölçülür.</text>
            </svg>
            <div className="refraction-stage-caption"><span>🔵 Gelme açısı: {angle}°</span><span>🟣 Kırılma açısı: {values.refracted}°</span><span>🟠 Işık ışını</span></div>
          </div>

          <div className="refraction-result">
            <div className="refraction-metric"><small>Gelme açısı</small><strong>{angle}°</strong></div>
            <div className="refraction-metric"><small>Kırılma açısı</small><strong>{values.refracted}°</strong></div>
            <div className="refraction-metric"><small>Işığın yönü</small><strong style={{fontSize:17}}>{values.rule}</strong></div>
          </div>
          <button className="refraction-save" onClick={saveRecord}>＋ Bu deneyi veri tablosuna kaydet</button>
        </section>

        <section className="refraction-panel">
          <h2>📋 Deney verilerim</h2>
          <p className="refraction-muted">Farklı ortam ve açılarda yaptığın ölçümleri kaydet. Sonuçları karşılaştır.</p>
          {records.length === 0 ? <p style={{color:"#64748b",fontSize:14}}>Henüz kayıt yok. Deney ayarlarını değiştirip “Bu deneyi veri tablosuna kaydet” düğmesine bas.</p> : (
            <table className="refraction-table"><thead><tr><th>Ortam</th><th>Geçiş</th><th>Gelme</th><th>Kırılma</th></tr></thead><tbody>
              {records.map((r,i)=><tr key={i}><td>{r.medium}</td><td>{r.direction}</td><td>{r.incident}°</td><td>{r.refracted}°</td></tr>)}
            </tbody></table>
          )}
        </section>

        <section className="refraction-panel">
          <h2>💡 Gözlemlerinden çıkarım yap</h2>
          <div className="refraction-learning">
            <article className="refraction-tip"><b>Az yoğundan çok yoğuna</b><p>Işık, hava ortamından su veya cam gibi optikçe daha yoğun ortama geçerken normale yaklaşarak kırılır.</p></article>
            <article className="refraction-tip"><b>Çok yoğundan az yoğuna</b><p>Işık, su veya camdan havaya geçerken normalden uzaklaşarak kırılır.</p></article>
            <article className="refraction-tip"><b>Normal doğrultusunda gelirse</b><p>Işık ortam değiştirse bile doğrultusunu değiştirmez; yoluna doğrultu değiştirmeden devam eder.</p></article>
          </div>
        </section>

        <div className="refraction-bottom">
          <Link href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link>
          <Link href="/#animasyonlar">Tüm animasyonlar →</Link>
        </div>
      </div>
    </main>
  );
}

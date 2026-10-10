"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./MoonSurfaceExplorer.module.css";

type LunarStop = {
  name: string;
  shortName: string;
  region: string;
  x: number;
  summary: string;
  observe: string;
  mission: string;
};

const STOPS: LunarStop[] = [
  {
    name: "Sükûnet Denizi",
    shortName: "Mare",
    region: "Mare Tranquillitatis",
    x: 13,
    summary:
      "Adında “deniz” geçse de burada sıvı su yok. Mare adı verilen koyu düzlükler, eski çarpma havzalarını doldurup soğuyan lavların oluşturduğu geniş alanlardır.",
    observe: "Görece düz, koyu renkli bazalt ovasını ve çevresindeki eski kraterleri incele.",
    mission: "Apollo 11 Ay Modülü, 20 Temmuz 1969’da bu bölgeye indi.",
  },
  {
    name: "Çarpma krateri",
    shortName: "Krater",
    region: "Ay yüzeyindeki çarpma izleri",
    x: 31,
    summary:
      "Bir asteroid, meteoroid ya da kuyruklu yıldız Ay’a çarptığında yüzeyde çukur biçimli bir krater oluşabilir. Çarpma çevreye kaya parçaları da saçar.",
    observe: "Kraterin çanak biçimli içini, yükselmiş kenarını ve çevresindeki küçük izleri karşılaştır.",
    mission: "Ay’da rüzgâr ve akan su olmadığı için birçok çarpma izi çok uzun süre korunur.",
  },
  {
    name: "Yüksek bölgeler",
    shortName: "Yüksekler",
    region: "Lunar highlands",
    x: 50,
    summary:
      "Ay’ın yüksek bölgeleri, koyu lav ovalarına göre daha parlak ve engebelidir. Bu eski kabuk alanlarında çok sayıda krater görülür.",
    observe: "Engebeli sırtlara ve birbirinin üzerine binmiş krater izlerine bak.",
    mission: "ESA’nın SMART-1 aracı, yüksek bölgeler ile mare alanlarını yakından görüntüledi.",
  },
  {
    name: "Ay yarığı (rille)",
    shortName: "Rille",
    region: "Eski lav kanalları ve kabuk çatlakları",
    x: 69,
    summary:
      "Riller, Ay yüzeyinde görülen uzun kanal ya da yarık biçimli yer şekilleridir. Bazıları eski volkanik etkinlikle, bazıları da kabuğun çatlamasıyla ilişkilidir.",
    observe: "Yüzeyi kesen uzun, kıvrımlı çizgiyi çevredeki kraterlerden ayırt etmeye çalış.",
    mission: "Bu şekiller, Ay’ın geçmişte jeolojik olarak etkin olduğunu anlamamıza yardım eder.",
  },
  {
    name: "Regolit ve ayak izleri",
    shortName: "Regolit",
    region: "Gevşek toz ve kaya parçaları",
    x: 87,
    summary:
      "Regolit, Ay toprağı için kullanılan addır: darbelerle ufalanmış kaya, mineral parçaları ve ince tozdan oluşan gevşek bir yüzey örtüsü.",
    observe: "Astronotun ayak izlerinin yumuşak yüzeyde nasıl belirginleştiğini ve küçük taşları fark et.",
    mission: "NASA’nın Apollo 15 fotoğraflarında astronot izleri ve ayak izleri regolit üzerinde görülür.",
  },
];

const STARS = [
  [52, 48, 1.8], [146, 106, 1.2], [218, 47, 1.1], [298, 95, 1.5],
  [390, 39, 1.2], [467, 87, 1.8], [566, 44, 1.2], [642, 114, 1.1],
  [728, 49, 1.7], [804, 92, 1.2], [902, 42, 1.4], [1002, 108, 1.8],
  [1090, 51, 1.1], [1152, 132, 1.5], [338, 143, 1.1], [762, 141, 1.1],
];

export default function MoonSurfaceExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tourPlaying, setTourPlaying] = useState(false);
  const [walking, setWalking] = useState(false);
  const firstRender = useRef(true);
  const gradientId = `lunar-${useId().replace(/:/g, "")}`;
  const activeStop = STOPS[activeIndex];

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setWalking(true);
    const timer = window.setTimeout(() => setWalking(false), 1050);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    if (!tourPlaying) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % STOPS.length);
    }, 4300);
    return () => window.clearInterval(timer);
  }, [tourPlaying]);

  function chooseStop(index: number) {
    setTourPlaying(false);
    setActiveIndex(index);
  }

  function step(direction: -1 | 1) {
    setTourPlaying(false);
    setActiveIndex((current) => (current + direction + STOPS.length) % STOPS.length);
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.scene} role="group" aria-label="Ay yüzeyinde seçilebilir keşif noktalarının bulunduğu canlandırma">
        <svg className={styles.landscape} viewBox="0 0 1200 460" preserveAspectRatio="none" role="img" aria-label="Kraterli Ay yüzeyi, uzay ve uzakta görünen Dünya">
          <defs>
            <linearGradient id={`${gradientId}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#080e1c" />
              <stop offset="70%" stopColor="#151d2e" />
              <stop offset="100%" stopColor="#30384a" />
            </linearGradient>
            <linearGradient id={`${gradientId}-far-ground`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#788094" />
              <stop offset="100%" stopColor="#444b5d" />
            </linearGradient>
            <linearGradient id={`${gradientId}-near-ground`} x1="0" y1="0" x2="0.15" y2="1">
              <stop offset="0%" stopColor="#7c8190" />
              <stop offset="48%" stopColor="#555c6c" />
              <stop offset="100%" stopColor="#353d4d" />
            </linearGradient>
            <radialGradient id={`${gradientId}-earth`} cx="35%" cy="28%" r="75%">
              <stop offset="0%" stopColor="#b7f0ff" />
              <stop offset="45%" stopColor="#438ec5" />
              <stop offset="100%" stopColor="#16385d" />
            </radialGradient>
            <pattern id={`${gradientId}-dust`} width="44" height="36" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="8" r="1" fill="#e3e4e9" opacity=".16" />
              <circle cx="30" cy="23" r="1.3" fill="#202837" opacity=".18" />
              <circle cx="39" cy="5" r=".8" fill="#f2f1e9" opacity=".12" />
              <path d="M12 28l5-1" stroke="#d1d2da" strokeOpacity=".12" />
            </pattern>
          </defs>
          <rect width="1200" height="460" fill={`url(#${gradientId}-sky)`} />
          <g aria-hidden="true">
            {STARS.map(([cx, cy, radius], index) => (
              <circle key={index} cx={cx} cy={cy} r={radius} fill="#e7efff" opacity={index % 3 === 0 ? ".9" : ".58"} />
            ))}
            <circle cx="104" cy="92" r="39" fill={`url(#${gradientId}-earth)`} />
            <path d="M79 78q13-14 22-4l-3 11 14 5-6 15-17 2-8-10-10 1-4-11zM111 60l10 3 5 12-8 5-7-8z" fill="#94c698" opacity=".7" />
            <circle cx="104" cy="92" r="42" fill="none" stroke="#9fd9ee" strokeOpacity=".3" />
            <path d="M0 281 72 254l43 13 49-56 41 24 53-62 48 39 52-31 46 40 38-21 43 53 62-72 51 29 58-43 50 41 44-22 59 59 56-36 57 26 48-33 78 39 58-18 59 32v76H0z" fill="#353e52" />
            <path d="M0 304 91 267l52 27 63-36 66 28 58-31 65 44 65-23 64 26 65-37 67 27 60-38 71 35 58-23 68 34 76-32 81 44v75H0z" fill="#515a6d" />
            <path d="M0 331q83-14 158 1t153 0q102-13 194 3t188-3q92-15 190 4t178-6q75-9 139 5v125H0z" fill={`url(#${gradientId}-far-ground)`} />
            <path d="M0 359q92-18 173-2t178 4q104-18 197 2t192-2q89-12 177 5t169-5q66-9 114 3v96H0z" fill="#373f50" />
            <ellipse cx="262" cy="356" rx="90" ry="22" fill="#252d3b" opacity=".78" />
            <path d="M177 356q85-56 170 0" fill="none" stroke="#9196a2" strokeWidth="7" opacity=".54" />
            <path d="M192 356q70-37 140 0" fill="none" stroke="#141c2a" strokeWidth="2" opacity=".7" />
            <ellipse cx="807" cy="346" rx="75" ry="18" fill="#2e3544" opacity=".8" />
            <path d="M737 346q70-42 140 0" fill="none" stroke="#9196a2" strokeWidth="6" opacity=".5" />
            <path d="M0 385q89-31 182-8t177 5q91-23 188-1t184 4q91-23 173 0t160 3q76-14 136 2v70H0z" fill={`url(#${gradientId}-near-ground)`} />
            <path d="M0 385q89-31 182-8t177 5q91-23 188-1t184 4q91-23 173 0t160 3q76-14 136 2v70H0z" fill={`url(#${gradientId}-dust)`} />
            <g fill="#bbc0c8" opacity=".7">
              <path d="m45 398 18-5 10 8-13 5z" /><path d="m169 423 12-6 9 5-11 6z" />
              <path d="m384 403 17-8 12 7-18 6z" /><path d="m610 436 15-6 13 7-17 5z" />
              <path d="m934 402 19-7 11 8-18 6z" /><path d="m1098 427 14-6 11 7-16 5z" />
            </g>
            <path d="M557 389q54-9 108 1M566 398q48-8 94 1" fill="none" stroke="#d8d3c8" strokeOpacity=".42" strokeWidth="2" strokeDasharray="4 8" />
          </g>
        </svg>

        <div className={styles.sceneTopline}>
          <span className={styles.missionChip}><span aria-hidden="true">✦</span> AY YÜZEYİ KEŞİF GÖREVİ</span>
          <span className={styles.stopCounter}>{activeIndex + 1} / {STOPS.length} nokta</span>
        </div>

        <div className={styles.markers} aria-label="Keşif noktaları">
          {STOPS.map((stop, index) => (
            <button
              key={stop.region}
              type="button"
              className={`${styles.marker} ${index === activeIndex ? styles.markerActive : ""}`}
              style={{ left: `${stop.x}%`, top: "65%" }}
              aria-label={`${index + 1}. keşif noktası: ${stop.name}`}
              aria-current={index === activeIndex ? "step" : undefined}
              onClick={() => chooseStop(index)}
            >
              <span className={styles.markerDot} aria-hidden="true" />
              <span className={styles.markerLabel}>{stop.shortName}</span>
            </button>
          ))}
        </div>

        <div
          className={`${styles.astronaut} ${walking || tourPlaying ? styles.astronautWalking : ""}`}
          style={{ left: `${activeStop.x}%` }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 90 130">
            <ellipse cx="45" cy="121" rx="25" ry="5" fill="#111723" opacity=".5" />
            <path d="M28 71 19 94l8 4 12-19M57 74l12 19-8 5-15-17" fill="#d9dee8" stroke="#6f7a8d" strokeWidth="3" strokeLinejoin="round" />
            <path d="m27 96 12 1 3 15-19 1q-5-2 0-7zM60 94l11-2 9 12q2 5-4 6l-17-6z" fill="#eff2f7" stroke="#6f7a8d" strokeWidth="3" strokeLinejoin="round" />
            <rect x="56" y="48" width="18" height="32" rx="5" fill="#c4ccd9" stroke="#68758b" strokeWidth="3" />
            <path d="M30 48q15-7 29 0l3 29q-16 10-34 0z" fill="#f0f2f6" stroke="#727e91" strokeWidth="3" />
            <path d="m29 55-12 18 7 4 14-15M60 55l12 15-7 5-13-12" fill="none" stroke="#e5e9ef" strokeWidth="8" strokeLinecap="round" />
            <path d="M38 29q1-17 17-17 17 0 17 18v7q0 13-17 14-17-1-17-15z" fill="#f7f8fa" stroke="#737f93" strokeWidth="3" />
            <path d="M43 30q10-10 24-2v11q-10 7-24 0z" fill="#9dd9ea" stroke="#52677b" strokeWidth="2" />
            <path d="M43 32q11-6 22-2" fill="none" stroke="#e4fbff" strokeOpacity=".8" strokeWidth="2" />
            <path d="M37 67h11v10H37zM49 63h7v8h-7z" fill="#e9a755" />
            <path d="M34 83 26 95M58 81l11 13" fill="none" stroke="#d5dae3" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className={styles.expeditionControls}>
        <button className={styles.secondaryButton} type="button" onClick={() => step(-1)} aria-label="Önceki keşif noktasına yürü">
          <span aria-hidden="true">←</span><span>Önceki</span>
        </button>
        <button
          className={styles.playButton}
          type="button"
          aria-pressed={tourPlaying}
          onClick={() => setTourPlaying((playing) => !playing)}
        >
          <span aria-hidden="true">{tourPlaying ? "Ⅱ" : "▶"}</span>
          {tourPlaying ? "Turu duraklat" : "Keşif turunu başlat"}
        </button>
        <button className={styles.secondaryButton} type="button" onClick={() => step(1)} aria-label="Sonraki keşif noktasına yürü">
          <span>Sonraki</span><span aria-hidden="true">→</span>
        </button>
      </div>

      <section className={styles.infoCard} aria-live="polite" aria-atomic="true" aria-labelledby="lunar-stop-title">
        <div className={styles.infoHeading}>
          <span className={styles.infoIndex}>NOKTA {String(activeIndex + 1).padStart(2, "0")}</span>
          <h3 id="lunar-stop-title">{activeStop.name}</h3>
          <p>{activeStop.region}</p>
        </div>
        <p className={styles.stopSummary}>{activeStop.summary}</p>
        <div className={styles.observationGrid}>
          <div>
            <span className={styles.observationLabel}>GÖZLEM GÖREVİ</span>
            <p>{activeStop.observe}</p>
          </div>
          <div>
            <span className={styles.observationLabel}>BİLİM NOTU</span>
            <p>{activeStop.mission}</p>
          </div>
        </div>
      </section>

      <p className={styles.controlHint}>Haritadaki bir noktaya dokun veya keşif turunu başlat; astronotun rotada ilerlesin.</p>
    </div>
  );
}

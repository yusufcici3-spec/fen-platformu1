"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./SeasonsSimulator.module.css";

type Hemisphere = "north" | "south";
type SeasonName = "İlkbahar" | "Yaz" | "Sonbahar" | "Kış";

type SeasonInfo = {
  name: SeasonName;
  subtitle: string;
  color: string;
};

const MILESTONES = [
  { day: 80, date: "21 Mar", event: "Ekinoks" },
  { day: 172, date: "21 Haz", event: "Gündönümü" },
  { day: 266, date: "23 Eyl", event: "Ekinoks" },
  { day: 355, date: "21 Ara", event: "Gündönümü" },
];

const NORTHERN_SEASONS: SeasonInfo[] = [
  { name: "İlkbahar", subtitle: "İlkbahar ekinoksu", color: "#8ee6d4" },
  { name: "Yaz", subtitle: "Yaz gündönümü", color: "#ffd27c" },
  { name: "Sonbahar", subtitle: "Sonbahar ekinoksu", color: "#ffad91" },
  { name: "Kış", subtitle: "Kış gündönümü", color: "#a8c9ff" },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const radians = (degrees: number) => (degrees * Math.PI) / 180;

function declinationForDay(day: number) {
  // Simplified solar-declination cycle: equinox near day 80; obliquity ±23.44°.
  return 23.44 * Math.sin((2 * Math.PI * (day - 80)) / 365);
}

function seasonForDay(day: number, hemisphere: Hemisphere): SeasonInfo {
  let northIndex: number;
  if (day < 80 || day >= 355) northIndex = 3;
  else if (day < 172) northIndex = 0;
  else if (day < 266) northIndex = 1;
  else northIndex = 2;

  const southIndex = [2, 3, 0, 1][northIndex];
  return (hemisphere === "north" ? NORTHERN_SEASONS[northIndex] : NORTHERN_SEASONS[southIndex])!;
}

function dateLabel(day: number) {
  const date = new Date(Date.UTC(2025, 0, 1) + (Math.round(day) - 1) * 86_400_000);
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", timeZone: "UTC" }).format(date);
}

function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
}

function formatClock(hour: number) {
  const totalMinutes = Math.round(hour * 60);
  const hh = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const mm = String(totalMinutes % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

function getSunStats(day: number, latitude: number, localTime: number) {
  const declination = declinationForDay(day);
  const hourAngle = (localTime - 12) * 15;
  const phi = radians(latitude);
  const delta = radians(declination);
  const h = radians(hourAngle);
  const sinAltitude = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.cos(h);
  const altitude = Math.asin(clamp(sinAltitude, -1, 1)) * (180 / Math.PI);
  const daylight = altitude > 0;
  const energy = daylight ? Math.round(Math.sin(radians(altitude)) * 100) : 0;
  const shadowMeters = daylight ? 1 / Math.tan(radians(Math.max(altitude, 0.15))) : null;

  let heating = "Gece";
  if (daylight) {
    heating = energy < 25 ? "Düşük" : energy < 55 ? "Ilımlı" : energy < 80 ? "Belirgin" : "Yüksek";
  }
  return { declination, hourAngle, altitude, daylight, energy, shadowMeters, heating };
}

function PolarPoint({ angle, rx, ry, cx, cy }: { angle: number; rx: number; ry: number; cx: number; cy: number }) {
  const a = radians(angle);
  return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
}

function EarthMark({ x, y, radius, highlight = false, color = "#9be7df" }: { x: number; y: number; radius: number; highlight?: boolean; color?: string }) {
  // The marker lives on a horizontally stretched orbital diagram, so project the axis too.
  const projectedAxisX = 278 * 0.39;
  const projectedAxisY = -122 * 0.92;
  const axisLength = Math.hypot(projectedAxisX, projectedAxisY);
  const axisX = radius * projectedAxisX / axisLength;
  const axisY = radius * projectedAxisY / axisLength;
  return (
    <g>
      {highlight && <circle cx={x} cy={y} r={radius + 10} fill="none" stroke={color} strokeOpacity=".55" strokeWidth="1.5" />}
      <circle cx={x} cy={y} r={radius} fill="#2e80e2" stroke="#9ed8ff" strokeWidth="1.5" />
      <path d={`M ${x} ${y - radius} A ${radius} ${radius} 0 0 1 ${x} ${y + radius} L ${x} ${y - radius} Z`} fill="#0b1d42" opacity=".7" />
      <path d={`M ${x - radius * .66} ${y - radius * .08} C ${x - radius * .5} ${y - radius * .6}, ${x - radius * .2} ${y - radius * .32}, ${x - radius * .1} ${y - radius * .03} C ${x - radius * .22} ${y + radius * .13}, ${x - radius * .35} ${y + radius * .23}, ${x - radius * .66} ${y - radius * .08} Z`} fill="#70d1a2" opacity=".9" />
      <path d={`M ${x + radius * .15} ${y + radius * .1} C ${x + radius * .4} ${y - radius * .1}, ${x + radius * .57} ${y + radius * .18}, ${x + radius * .3} ${y + radius * .54} C ${x + radius * .12} ${y + radius * .35}, ${x + radius * .07} ${y + radius * .21}, ${x + radius * .15} ${y + radius * .1} Z`} fill="#70d1a2" opacity=".85" />
      <line x1={x - axisX * 1.15} y1={y - axisY * 1.15} x2={x + axisX * 1.15} y2={y + axisY * 1.15} stroke="#edf5ff" strokeWidth="2" />
      <circle cx={x + axisX * 1.2} cy={y + axisY * 1.2} r="3" fill="#fff5d3" />
    </g>
  );
}

function OrbitScene({ day, season, id }: { day: number; season: SeasonInfo; id: string }) {
  const cx = 450;
  const cy = 164;
  const rx = 278;
  const ry = 122;
  const angle = 23 + ((day - 80) / 365) * 360;
  const earth = PolarPoint({ angle, rx, ry, cx, cy });
  const seasonAngles = [23, 113, 203, 293];
  const markerPoints = seasonAngles.map((a) => PolarPoint({ angle: a, rx, ry, cx, cy }));
  const labels = [
    { text: "21 Mar · Ekinoks", x: 695, y: 210, anchor: "start" as const },
    { text: "21 Haz · Gündönümü", x: 325, y: 298, anchor: "middle" as const },
    { text: "23 Eyl · Ekinoks", x: 168, y: 111, anchor: "end" as const },
    { text: "21 Ara · Gündönümü", x: 570, y: 45, anchor: "start" as const },
  ];
  return (
    <svg className={styles.orbitSvg} viewBox="0 0 900 330" role="img" aria-label={`${dateLabel(day)} tarihinde Dünya'nın Güneş çevresindeki konumu; mevsim: ${season.name}`}>
      <defs>
        <radialGradient id={`${id}-sun`}>
          <stop offset="0" stopColor="#fff6c7" />
          <stop offset=".58" stopColor="#ffd36e" />
          <stop offset="1" stopColor="#ff982f" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#7385b4" strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="6 8" />
      {markerPoints.map((p, i) => (
        <g key={i} opacity={i === 0 ? .55 : .35}>
          <circle cx={p.x} cy={p.y} r="4" fill="#cad9ff" />
          <text x={labels[i]!.x} y={labels[i]!.y} textAnchor={labels[i]!.anchor} className={styles.orbitLabel}>{labels[i]!.text}</text>
        </g>
      ))}
      <line x1={cx} y1={cy} x2={earth.x} y2={earth.y} stroke="#ffbe61" strokeWidth="2" strokeDasharray="5 7" opacity=".83" />
      <circle cx={cx} cy={cy} r="41" fill="#ffbd57" opacity=".12" filter={`url(#${id}-glow)`} />
      <circle cx={cx} cy={cy} r="27" fill={`url(#${id}-sun)`} stroke="#ffe6a0" strokeWidth="2" />
      <circle cx={cx - 7} cy={cy - 8} r="7" fill="#fff8d6" opacity=".64" />
      <text x={cx} y={cy + 53} textAnchor="middle" className={styles.sunCaption}>GÜNEŞ</text>
      <EarthMark x={earth.x} y={earth.y} radius={16} highlight color={season.color} />
      <text x={earth.x + 20} y={earth.y - 16} className={styles.currentMarker}>DÜNYA</text>
    </svg>
  );
}

function EarthDayNight({ latitude, hemisphere, localTime, declination, id }: { latitude: number; hemisphere: Hemisphere; localTime: number; declination: number; id: string }) {
  const cx = 174;
  const cy = 143;
  const r = 104;
  const signedLatitude = latitude * (hemisphere === "north" ? 1 : -1);
  const phi = radians(signedLatitude);
  const hourAngle = radians((localTime - 12) * 15);
  const delta = radians(declination);
  const observerIsLit = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.cos(hourAngle) > 0;
  // A simple orthographic projection: the observer is on the noon meridian at 12:00.
  const observerX = cx - r * Math.cos(phi) * Math.cos(hourAngle);
  const observerY = cy - r * Math.sin(phi);
  const clipId = `${id}-globe-clip`;
  return (
    <svg className={styles.globeSvg} viewBox="0 0 540 285" role="img" aria-label={`Dünya'nın gündüz ve gece tarafı; ${formatNumber(latitude)} derece ${latitude < 0 ? "Güney" : "Kuzey"}, yerel Güneş saati ${formatNumber(localTime, 1)}`}>
      <defs>
        <clipPath id={clipId}><circle cx={cx} cy={cy} r={r} /></clipPath>
        <radialGradient id={`${id}-earth-grad`} cx="35%" cy="32%">
          <stop offset="0" stopColor="#54b3ff" />
          <stop offset=".72" stopColor="#2874cb" />
          <stop offset="1" stopColor="#123c79" />
        </radialGradient>
        <filter id={`${id}-earth-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-earth-grad)`} />
        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} L ${cx} ${cy - r} Z`} transform={`rotate(${declination} ${cx} ${cy})`} fill="#07152e" opacity=".78" />
        <path d={`M ${cx - 75} ${cy - 35} C ${cx - 48} ${cy - 78}, ${cx - 20} ${cy - 58}, ${cx - 28} ${cy - 25} C ${cx - 42} ${cy - 8}, ${cx - 60} ${cy - 10}, ${cx - 75} ${cy - 35} Z`} fill="#48b989" opacity=".82" />
        <path d={`M ${cx + 14} ${cy + 14} C ${cx + 28} ${cy - 12}, ${cx + 57} ${cy - 3}, ${cx + 65} ${cy + 18} C ${cx + 46} ${cy + 51}, ${cx + 22} ${cy + 41}, ${cx + 14} ${cy + 14} Z`} fill="#48b989" opacity=".68" />
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#d9ecff" strokeOpacity=".36" strokeDasharray="4 6" />
        <ellipse cx={cx} cy={cy - r * Math.sin(phi)} rx={r * Math.cos(phi)} ry="12" fill="none" stroke="#d9ecff" strokeOpacity=".34" strokeDasharray="5 5" />
        <circle cx={observerX} cy={observerY} r="10" fill={observerIsLit ? "#ff896b" : "#98a8c8"} opacity=".22" />
        <circle cx={observerX} cy={observerY} r="5.5" fill={observerIsLit ? "#ff896b" : "#7183a6"} stroke="#fff0dc" strokeWidth="2" />
      </g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#92d5ff" strokeWidth="2" />
      <text x="174" y="274" textAnchor="middle" className={styles.svgCaption}>Gündüz</text>
      <text x="407" y="274" textAnchor="middle" className={styles.svgCaption}>Gece</text>
      <g className={styles.sunRays}>
        <circle cx="27" cy="143" r="13" fill="#ffc768" />
        <circle cx="27" cy="143" r="24" fill="#ffc768" opacity=".13" />
        <path d="M 48 126 L 69 132 M 48 143 L 69 143 M 48 160 L 69 154" stroke="#ffc768" strokeWidth="2" strokeLinecap="round" />
      </g>
      <text x="174" y="21" textAnchor="middle" className={styles.svgCaption}>{hemisphere === "north" ? "Kuzey" : "Güney"} enlemi {formatNumber(Math.abs(latitude))}°{hemisphere === "north" ? "K" : "G"}</text>
      <text x="442" y="143" textAnchor="middle" className={styles.svgCaption}>{formatClock(localTime)} · yerel saat</text>
      <text x="442" y="164" textAnchor="middle" className={styles.svgSubcaption}>Güneş deklinasyonu {formatNumber(declination, 1)}°</text>
    </svg>
  );
}

function ShadowScene({ altitude, daylight, shadowMeters, energy, heating, id }: { altitude: number; daylight: boolean; shadowMeters: number | null; energy: number; heating: string; id: string }) {
  const groundY = 222;
  const poleX = 342;
  const poleTop = 126;
  const radiansAltitude = radians(clamp(altitude, 0, 89));
  const rayLength = 122;
  const sourceX = poleX - rayLength * Math.cos(radiansAltitude);
  const sourceY = poleTop - rayLength * Math.sin(radiansAltitude);
  const shadowLength = daylight && shadowMeters !== null ? Math.min(235, shadowMeters * 96) : 0;
  const shadowEnd = poleX + shadowLength;
  const arcPoints = Array.from({ length: 17 }, (_, i) => {
    const theta = radians(clamp(altitude, 0, 89)) * (i / 16);
    return `${poleX - 44 * Math.cos(theta)},${groundY - 44 * Math.sin(theta)}`;
  }).join(" ");
  return (
    <svg className={styles.shadowSvg} viewBox="0 0 640 285" role="img" aria-label={daylight ? `Güneş yüksekliği ${formatNumber(altitude, 1)} derece; bir metrelik cismin gölgesi yaklaşık ${formatNumber(shadowMeters ?? 0, 1)} metre` : "Güneş ufkun altında; doğrudan güneş gölgesi oluşmuyor"}>
      <defs>
        <radialGradient id={`${id}-sun-grad`}><stop offset="0" stopColor="#fff5cd" /><stop offset=".7" stopColor="#ffd26e" /><stop offset="1" stopColor="#ff9f45" /></radialGradient>
        <filter id={`${id}-sun-glow`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8 Z" fill="#a7b9ff" /></marker>
      </defs>
      {[0, 1, 2].map((_, i) => {
        const offset = (i - 1) * 15;
        const perpX = Math.sin(radiansAltitude) * offset;
        const perpY = Math.cos(radiansAltitude) * offset;
        return daylight ? <line key={i} x1={sourceX + perpX} y1={sourceY - perpY} x2={poleX + perpX} y2={poleTop - perpY} stroke="#ffd481" strokeOpacity={i === 1 ? .9 : .45} strokeWidth={i === 1 ? 2.4 : 1.4} strokeDasharray={i === 1 ? undefined : "4 5"} /> : null;
      })}
      {daylight && <g filter={`url(#${id}-sun-glow)`}><circle cx={sourceX} cy={sourceY} r="14" fill={`url(#${id}-sun-grad)`} /><circle cx={sourceX - 4} cy={sourceY - 5} r="4" fill="#fff8db" opacity=".75" /></g>}
      <line x1="36" y1={groundY} x2="604" y2={groundY} stroke="#8091b5" strokeWidth="2" />
      {daylight && shadowLength > 2 && <>
        <path d={`M ${poleX} ${groundY} L ${shadowEnd} ${groundY - 2} L ${poleX + 4} ${groundY - 8} Z`} fill="#829aff" opacity=".3" />
        <line x1={poleX + 3} y1={groundY - 4} x2={shadowEnd} y2={groundY - 4} stroke="#a5b3ff" strokeWidth="3" markerEnd={`url(#${id}-arrow)`} />
      </>}
      <line x1={poleX} y1={groundY} x2={poleX} y2={poleTop} stroke="#eaf2ff" strokeWidth="5" strokeLinecap="round" />
      <circle cx={poleX} cy={poleTop} r="5" fill="#fff0c1" />
      <circle cx={poleX} cy={groundY} r="5" fill="#d8e5ff" />
      <text x={poleX + 11} y={(groundY + poleTop) / 2} className={styles.svgCaption}>1 m</text>
      {daylight && <>
        <polyline points={arcPoints} fill="none" stroke="#87d9d1" strokeWidth="2" />
        <text x={poleX - 54} y={groundY - 24} className={styles.angleLabel}>α</text>
        <text x={clamp(shadowEnd - 8, poleX + 14, 575)} y={groundY - 16} textAnchor="middle" className={styles.svgCaption}>gölge</text>
      </>}
      <g className={styles.shadowLegend}>
        <rect x="34" y="244" width="572" height="28" rx="10" fill="#0a1530" opacity=".76" />
        <text x="50" y="263" className={styles.svgSubcaption}>{daylight ? `Işık yoğunluğu: tepe Güneşi = 100 · ${heating} ısınma eğilimi` : "Güneş ufuk altında · doğrudan ışık ve gölge yok"}</text>
        <text x="591" y="263" textAnchor="end" className={styles.svgCaption}>{daylight ? `${formatNumber(energy)}%` : "—"}</text>
      </g>
    </svg>
  );
}

export default function SeasonsSimulator() {
  const id = useId().replace(/:/g, "");
  const [day, setDay] = useState(80);
  const [latitude, setLatitude] = useState(41);
  const [localTime, setLocalTime] = useState(12);
  const [hemisphere, setHemisphere] = useState<Hemisphere>("north");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const lastFrame = useRef<number | null>(null);

  const currentSeason = useMemo(() => seasonForDay(day, hemisphere), [day, hemisphere]);
  const signedLatitude = latitude * (hemisphere === "north" ? 1 : -1);
  const stats = useMemo(() => getSunStats(day, signedLatitude, localTime), [day, signedLatitude, localTime]);
  const dayProgress = ((day - 1) / 364) * 100;
  const rangeStyle = { "--range-fill": `${dayProgress}%` } as CSSProperties;
  const latitudeStyle = { "--range-fill": `${(latitude / 60) * 100}%` } as CSSProperties;
  const timeStyle = { "--range-fill": `${((localTime - 6) / 12) * 100}%` } as CSSProperties;
  const dateText = dateLabel(day);
  const shadowText = stats.shadowMeters === null ? "—" : stats.shadowMeters >= 15 ? "15+ m" : `${formatNumber(stats.shadowMeters, 1)} m`;

  useEffect(() => {
    if (!isPlaying) {
      lastFrame.current = null;
      return;
    }
    let frame = 0;
    const advance = (timestamp: number) => {
      if (lastFrame.current === null) lastFrame.current = timestamp;
      const elapsed = Math.min((timestamp - lastFrame.current) / 1000, 0.12);
      lastFrame.current = timestamp;
      setDay((value) => (((value - 1 + elapsed * 4 * speed) % 365) + 365) % 365 + 1);
      frame = window.requestAnimationFrame(advance);
    };
    frame = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frame);
  }, [isPlaying, speed]);

  const jumpToDay = (nextDay: number) => {
    setDay(nextDay);
    setIsPlaying(false);
  };

  const toggleHemisphere = () => setHemisphere((value) => value === "north" ? "south" : "north");

  const reset = () => {
    setIsPlaying(false);
    setSpeed(1);
    setDay(80);
    setLatitude(41);
    setLocalTime(12);
    setHemisphere("north");
  };

  return (
    <section className={styles.simulator} aria-labelledby={`${id}-title`}>
      <div className={styles.spaceGlow} aria-hidden="true" />
      <div className={styles.content}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}><span className={styles.eyebrowDot} /> ETKİLEŞİMLİ FEN LABORATUVARI</span>
            <h2 id={`${id}-title`} className={styles.title}>Dünya’nın mevsim yolculuğu</h2>
            <p className={styles.description}>Tarihi, enlemi ve Güneş saatini değiştir; ışığın ve gölgenin nasıl değiştiğini keşfet.</p>
          </div>
          <div className={styles.seasonBadge} style={{ "--season-color": currentSeason.color } as CSSProperties} aria-live="polite">
            <span className={styles.badgeKicker}>{hemisphere === "north" ? "KUZEY YARIMKÜRE" : "GÜNEY YARIMKÜRE"}</span>
            <strong>{currentSeason.name}</strong>
            <span>{dateText}</span>
          </div>
        </header>

        <div className={styles.summaryStrip} aria-live="polite">
          <div className={styles.summaryItem}><span className={styles.summaryIcon}>✦</span><span><small>GÜNEŞ YÜKSEKLİĞİ</small><strong>{stats.daylight ? `${formatNumber(stats.altitude, 1)}°` : "Ufuk altında"}</strong></span></div>
          <div className={styles.summaryItem}><span className={styles.summaryIcon}>☀</span><span><small>YÜZEYDE IŞIK</small><strong>{stats.daylight ? `%${stats.energy}` : "%0"}</strong></span></div>
          <div className={styles.summaryItem}><span className={styles.summaryIcon}>↗</span><span><small>1 m CİSMİN GÖLGESİ</small><strong>{shadowText}</strong></span></div>
          <div className={styles.summaryItem}><span className={styles.summaryIcon}>◌</span><span><small>GÖRELİ ISINMA</small><strong>{stats.heating}</strong></span></div>
        </div>

        <section className={styles.panel} aria-labelledby={`${id}-orbit-title`}>
          <div className={styles.panelHeader}>
            <div><span className={styles.sectionNumber}>01</span><div><h3 id={`${id}-orbit-title`}>Yörüngede bugün</h3><p>Yörüngeyi ve Güneş’e göre Dünya’nın konumunu izle.</p></div></div>
            <span className={styles.livePill}><span /> {dateText}</span>
          </div>
          <OrbitScene day={day} season={currentSeason} id={id} />
          <div className={styles.milestones} aria-label="Önemli tarihleri seç">
            {MILESTONES.map((item) => (
              <button key={item.day} className={styles.milestone} type="button" onClick={() => jumpToDay(item.day)} aria-label={`${item.date} ${item.event} tarihine git`}>
                <span className={styles.milestoneDot} />{item.date}<span className={styles.milestoneEvent}>{item.event}</span>
              </button>
            ))}
          </div>
        </section>

        <div className={styles.scienceGrid}>
          <section className={styles.panel} aria-labelledby={`${id}-earth-title`}>
            <div className={styles.panelHeader}>
              <div><span className={styles.sectionNumber}>02</span><div><h3 id={`${id}-earth-title`}>Dünya’da gündüz ve gece</h3><p>Seçtiğin enlemde aydınlık bölgeyi gör.</p></div></div>
              <button className={styles.hemisphereButton} type="button" onClick={toggleHemisphere} aria-label={`Yarımküreyi değiştir, şu an ${hemisphere === "north" ? "kuzey" : "güney"}`}>
                {hemisphere === "north" ? "Kuzey" : "Güney"} <span aria-hidden="true">↔</span>
              </button>
            </div>
            <EarthDayNight latitude={latitude} hemisphere={hemisphere} localTime={localTime} declination={stats.declination} id={id} />
            <div className={styles.explainLine}><span className={styles.sunDot} /> Sarı nokta: seçili enlem ve yerel saat</div>
          </section>

          <section className={styles.panel} aria-labelledby={`${id}-shadow-title`}>
            <div className={styles.panelHeader}>
              <div><span className={styles.sectionNumber}>03</span><div><h3 id={`${id}-shadow-title`}>Gölge laboratuvarı</h3><p>Güneş alçaldıkça gölge uzar.</p></div></div>
              <span className={styles.angleBadge}>{stats.daylight ? `α ${formatNumber(stats.altitude, 1)}°` : "Gece"}</span>
            </div>
            <ShadowScene altitude={stats.altitude} daylight={stats.daylight} shadowMeters={stats.shadowMeters} energy={stats.energy} heating={stats.heating} id={id} />
          </section>
        </div>

        <section className={styles.controlPanel} aria-labelledby={`${id}-controls-title`}>
          <div className={styles.controlHeader}>
            <div><span className={styles.sectionNumber}>04</span><div><h3 id={`${id}-controls-title`}>Simülasyonu sen yönet</h3><p>Oynat, duraklat veya istediğin ana sürükle.</p></div></div>
            <div className={styles.transport}>
              <button className={styles.playButton} type="button" onClick={() => setIsPlaying((value) => !value)} aria-label={isPlaying ? "Simülasyonu duraklat" : "Simülasyonu oynat"} aria-pressed={isPlaying}>
                <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>{isPlaying ? "Duraklat" : "Oynat"}
              </button>
              <label className={styles.speedControl}>Hız
                <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} aria-label="Animasyon hızı">
                  <option value={0.5}>0,5×</option><option value={1}>1×</option><option value={4}>4×</option><option value={12}>12×</option>
                </select>
              </label>
              <button className={styles.resetButton} type="button" onClick={reset} aria-label="Simülasyonu başlangıca al">Sıfırla</button>
            </div>
          </div>

          <div className={styles.dateControl}>
            <div className={styles.rangeLabels}><label htmlFor={`${id}-day`}>Yıl içinde tarih</label><output htmlFor={`${id}-day`}>{dateText} · {currentSeason.name}</output></div>
            <input id={`${id}-day`} className={styles.range} style={rangeStyle} type="range" min="1" max="365" step="1" value={Math.round(day)} onChange={(event) => jumpToDay(Number(event.target.value))} aria-label="Yılın günü" />
            <div className={styles.rangeTicks}><span>1 Oca</span><span>21 Mar</span><span>21 Haz</span><span>23 Eyl</span><span>31 Ara</span></div>
          </div>

          <div className={styles.adjustments}>
            <div className={styles.adjustment}>
              <div className={styles.rangeLabels}><label htmlFor={`${id}-latitude`}>Enlem</label><output htmlFor={`${id}-latitude`}>{formatNumber(Math.abs(latitude))}° {hemisphere === "north" ? "K" : "G"}</output></div>
              <input id={`${id}-latitude`} className={styles.range} style={latitudeStyle} type="range" min="0" max="60" step="1" value={latitude} onChange={(event) => setLatitude(Number(event.target.value))} aria-label="Enlem, derece" />
              <div className={styles.rangeTicks}><span>Ekvator</span><span>60°</span></div>
            </div>
            <div className={styles.adjustment}>
              <div className={styles.rangeLabels}><label htmlFor={`${id}-time`}>Yerel Güneş saati</label><output htmlFor={`${id}-time`}>{formatClock(localTime)}</output></div>
              <input id={`${id}-time`} className={styles.range} style={timeStyle} type="range" min="6" max="18" step="0.5" value={localTime} onChange={(event) => setLocalTime(Number(event.target.value))} aria-label="Yerel Güneş saati" />
              <div className={styles.rangeTicks}><span>06:00</span><span>12:00</span><span>18:00</span></div>
            </div>
          </div>
          <p className={styles.controlHint}>Simülasyonu oynatırken tarihi senkronize değiştir; istediğin anda durdurup ayarları elle değiştirebilirsin.</p>
        </section>

        <footer className={styles.note}>
          <span className={styles.noteIcon} aria-hidden="true">i</span>
          <p><strong>Bilim notu:</strong> Mevsimlerin temel nedeni Dünya’nın 23,44° eksen eğikliğidir; Güneş’e yaklaşıp uzaklaşması değildir. Işık yüzdesi, yatay yüzeyde atmosfer etkileri hariç yaklaşık geliş açısı göstergesidir. Gerçek hava sıcaklığı atmosfer, bulutlar, yüzey türü ve mevsimsel gecikmeden de etkilenir. Yörünge çizimi şematiktir.</p>
        </footer>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./EnergyConversionSimulator.module.css";
import {
  calculateEnergyState,
  formatEnergy,
  GRAVITY,
  MAX_HEIGHT_M,
  MAX_MASS_KG,
  MIN_HEIGHT_M,
  MIN_MASS_KG,
  trackHeightRatio,
} from "./energyModel";

const START_X = 58;
const END_X = 942;
const TRACK_BASELINE = 270;
const TRACK_HEIGHT = 128;
const MAX_ENERGY_J = MAX_MASS_KG * GRAVITY * MAX_HEIGHT_M;
const TRACK_SAMPLES = Array.from({ length: 121 }, (_, index) => index / 120);

function trackY(progress: number, startHeightM: number) {
  const ratio = trackHeightRatio(progress);
  const heightScale = 84 + ((startHeightM - MIN_HEIGHT_M) / (MAX_HEIGHT_M - MIN_HEIGHT_M)) * 44;
  return TRACK_BASELINE - ratio * heightScale;
}

function buildTrackPath(startHeightM: number) {
  return TRACK_SAMPLES.map((progress, index) => {
    const x = START_X + (END_X - START_X) * progress;
    const y = trackY(progress, startHeightM);
    return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

type EnergyMeterProps = {
  label: string;
  value: number;
  max: number;
  colorClass: string;
  note: string;
};

function EnergyMeter({ label, value, max, colorClass, note }: EnergyMeterProps) {
  const width = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={styles.meter}>
      <div className={styles.meterTop}>
        <span className={styles.meterLabel}><i className={`${styles.meterDot} ${colorClass}`} />{label}</span>
        <strong>{formatEnergy(value)} J</strong>
      </div>
      <div
        className={styles.meterTrack}
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={Math.round(max)}
        aria-valuenow={Math.round(value)}
        aria-valuetext={`${formatEnergy(value)} joule`}
      >
        <span className={`${styles.meterFill} ${colorClass}`} style={{ width: `${width}%` }} />
      </div>
      <span className={styles.meterNote}>{note}</span>
    </div>
  );
}

export default function EnergyConversionSimulator() {
  const [massKg, setMassKg] = useState(2);
  const [startHeightM, setStartHeightM] = useState(10);
  const [frictionEnabled, setFrictionEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const energy = useMemo(
    () => calculateEnergyState(massKg, startHeightM, progress, frictionEnabled),
    [massKg, startHeightM, progress, frictionEnabled],
  );
  const trackPath = useMemo(() => buildTrackPath(startHeightM), [startHeightM]);
  const cartX = START_X + (END_X - START_X) * progress;
  const cartY = trackY(progress, startHeightM);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(1, current + 0.006 * playbackRate));
    }, 50);
    return () => window.clearInterval(timer);
  }, [isPlaying, playbackRate]);

  useEffect(() => {
    if (progress >= 1) setIsPlaying(false);
  }, [progress]);

  function playOrPause() {
    if (progress >= 1) {
      setProgress(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((playing) => !playing);
  }

  function reset() {
    setIsPlaying(false);
    setProgress(0);
  }

  function stepForward() {
    setIsPlaying(false);
    setProgress((current) => Math.min(1, current + 0.06));
  }

  function scrub(value: number) {
    setIsPlaying(false);
    setProgress(value / 100);
  }

  return (
    <div className={styles.simulator}>
      <div className={styles.simulatorHeader}>
        <div>
          <span className={styles.kicker}>ENERJİ DÖNÜŞÜMÜ · KONTROL PANELİ</span>
          <h2>Treni bırak, enerjiyi izle</h2>
          <p>Yüksekten alçağa inerken enerji çubuklarının ve süratin nasıl değiştiğini gözlemle.</p>
        </div>
        <span className={styles.modelBadge}><span /> Basitleştirilmiş fizik modeli</span>
      </div>

      <div className={styles.workspace}>
        <section className={styles.sceneColumn} aria-label="Hareketli enerji simülasyonu">
          <div className={styles.sceneTopline}>
            <span><i className={styles.liveDot} /> SİMÜLASYON SAHNESİ</span>
            <span className={styles.sceneReadout}>Anlık yükseklik <b>{formatEnergy(energy.heightM)} m</b></span>
          </div>
          <div className={styles.scene}>
            <svg className={styles.coasterSvg} viewBox="0 0 1000 330" role="img" aria-label={`Kinetik ve potansiyel enerji dönüşümünü gösteren hız treni; araç yolun yüzde ${Math.round(progress * 100)} noktasında.`}>
              <defs>
                <linearGradient id="energySky" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#142845" />
                  <stop offset="100%" stopColor="#101b31" />
                </linearGradient>
                <linearGradient id="trackGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#70d6ce" />
                  <stop offset="55%" stopColor="#81b8ff" />
                  <stop offset="100%" stopColor="#ffc578" />
                </linearGradient>
                <radialGradient id="cartBody" cx="30%" cy="18%">
                  <stop offset="0%" stopColor="#fff0c4" />
                  <stop offset="100%" stopColor="#f6a847" />
                </radialGradient>
                <filter id="cartShadow" x="-50%" y="-80%" width="200%" height="260%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>
              <rect width="1000" height="330" fill="url(#energySky)" />
              <circle cx="797" cy="70" r="2" fill="#fff1bf" opacity=".8" />
              <circle cx="875" cy="118" r="1.6" fill="#9bdbe8" opacity=".7" />
              <circle cx="695" cy="46" r="1.5" fill="#d3e6ff" opacity=".72" />
              <circle cx="171" cy="97" r="1.7" fill="#fff1bf" opacity=".62" />
              <path d="M0 272 H1000" stroke="#536b86" strokeWidth="1" strokeDasharray="5 9" opacity=".45" />
              <path d={trackPath} fill="none" stroke="#08111e" strokeWidth="23" strokeLinecap="round" strokeLinejoin="round" opacity=".65" />
              <path d={trackPath} fill="none" stroke="#314b66" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
              <path d={trackPath} fill="none" stroke="url(#trackGlow)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              {TRACK_SAMPLES.filter((_, index) => index % 10 === 0).map((point) => {
                const x = START_X + (END_X - START_X) * point;
                const y = trackY(point, startHeightM);
                return <path key={point} d={`M ${x} ${y + 10} l 0 30`} stroke="#405d78" strokeWidth="3" opacity=".58" />;
              })}
              <path d={`M ${cartX} ${cartY - 4} L ${cartX} ${TRACK_BASELINE}`} stroke="#ffd27e" strokeWidth="1.5" strokeDasharray="4 5" opacity=".6" />
              <ellipse cx={cartX} cy={cartY + 20} rx="31" ry="7" fill="#020916" opacity=".45" filter="url(#cartShadow)" />
              <g transform={`translate(${cartX} ${cartY - 4})`}>
                <rect x="-25" y="-22" width="50" height="25" rx="10" fill="url(#cartBody)" stroke="#ffe2ad" strokeWidth="1.5" />
                <path d="M-13 -21 Q0 -39 13 -21" fill="#1a3550" stroke="#ffe5b2" strokeWidth="2" />
                <path d="M-12 -18 h8 M4 -18 h8" stroke="#f1f6ff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
                <circle cx="-14" cy="5" r="7" fill="#091626" stroke="#9cdad7" strokeWidth="2" />
                <circle cx="14" cy="5" r="7" fill="#091626" stroke="#9cdad7" strokeWidth="2" />
                <circle cx="-14" cy="5" r="2" fill="#d4fff3" />
                <circle cx="14" cy="5" r="2" fill="#d4fff3" />
              </g>
              <g transform={`translate(${START_X} ${trackY(0, startHeightM) - 43})`}>
                <rect x="-42" y="-16" width="84" height="25" rx="12.5" fill="#183b46" stroke="#5caaa5" strokeWidth="1" />
                <text x="0" y="1" textAnchor="middle" fill="#c8fff2" fontSize="11" fontWeight="700">BAŞLANGIÇ</text>
              </g>
              <g transform={`translate(${END_X} ${trackY(1, startHeightM) - 40})`}>
                <rect x="-34" y="-16" width="68" height="25" rx="12.5" fill="#403321" stroke="#c49350" strokeWidth="1" />
                <text x="0" y="1" textAnchor="middle" fill="#ffe5bb" fontSize="11" fontWeight="700">SON</text>
              </g>
            </svg>
            <div className={styles.sceneCaption}>
              <span>Yüksek nokta</span>
              <span className={styles.captionTrack} aria-hidden="true"><i style={{ left: `${progress * 100}%` }} /></span>
              <span>Alçak nokta</span>
            </div>
          </div>

          <div className={styles.transport}>
            <div className={styles.transportButtons}>
              <button className={styles.primaryButton} type="button" onClick={playOrPause} aria-label={isPlaying ? "Simülasyonu duraklat" : "Simülasyonu oynat"}>
                <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>{isPlaying ? "Duraklat" : progress >= 1 ? "Yeniden oynat" : "Oynat"}
              </button>
              <button className={styles.iconButton} type="button" onClick={stepForward} aria-label="Bir adım ilerlet" title="Bir adım ilerlet">⏭</button>
              <button className={styles.iconButton} type="button" onClick={reset} aria-label="Başa al" title="Başa al">↺</button>
            </div>
            <div className={styles.speedControl} aria-label="Animasyon hızı">
              <span>Hız</span>
              {[0.6, 1, 1.5].map((rate) => (
                <button key={rate} type="button" className={playbackRate === rate ? styles.speedActive : ""} onClick={() => setPlaybackRate(rate)} aria-pressed={playbackRate === rate}>
                  {rate === 0.6 ? "Yavaş" : `${rate}×`}
                </button>
              ))}
            </div>
          </div>
          <label className={styles.scrubberLabel} htmlFor="energy-progress">
            <span>Yol üzerindeki konum</span><strong>%{Math.round(progress * 100)}</strong>
          </label>
          <input id="energy-progress" className={styles.scrubber} type="range" min="0" max="100" step="1" value={Math.round(progress * 100)} onChange={(event) => scrub(Number(event.target.value))} aria-label="Trenin yol üzerindeki konumu" />
        </section>

        <aside className={styles.controlPanel} aria-label="Simülasyon ayarları ve enerji ölçümleri">
          <div className={styles.panelTitle}>
            <span className={styles.panelIcon} aria-hidden="true">⌘</span>
            <div><span className={styles.panelEyebrow}>DENEYİ SEN YÖNET</span><h3>Başlangıç ayarları</h3></div>
          </div>

          <label className={styles.rangeControl} htmlFor="energy-height">
            <span className={styles.rangeHeading}><span>Başlangıç yüksekliği</span><strong>{startHeightM} m</strong></span>
            <input id="energy-height" type="range" min={MIN_HEIGHT_M} max={MAX_HEIGHT_M} step="1" value={startHeightM} onChange={(event) => setStartHeightM(Number(event.target.value))} />
            <span className={styles.rangeEnds}><span>{MIN_HEIGHT_M} m</span><span>{MAX_HEIGHT_M} m</span></span>
          </label>

          <label className={styles.rangeControl} htmlFor="energy-mass">
            <span className={styles.rangeHeading}><span>Trenin kütlesi</span><strong>{massKg} kg</strong></span>
            <input id="energy-mass" type="range" min={MIN_MASS_KG} max={MAX_MASS_KG} step="1" value={massKg} onChange={(event) => setMassKg(Number(event.target.value))} />
            <span className={styles.rangeEnds}><span>{MIN_MASS_KG} kg</span><span>{MAX_MASS_KG} kg</span></span>
          </label>

          <label className={styles.toggleRow} htmlFor="energy-friction">
            <span className={styles.toggleText}><strong>Sürtünmeyi göster</strong><small>Bir miktar enerji ısıya dönüşsün</small></span>
            <input id="energy-friction" type="checkbox" checked={frictionEnabled} onChange={(event) => setFrictionEnabled(event.target.checked)} />
            <span className={styles.toggleVisual} aria-hidden="true" />
          </label>

          <div className={styles.energySummary}>
            <div className={styles.energySummaryTop}><span>ANLIK ENERJİ DURUMU</span><b>Toplam <strong>{formatEnergy(energy.totalJ)} J</strong></b></div>
            <EnergyMeter label="Çekim potansiyel" value={energy.potentialJ} max={MAX_ENERGY_J} colorClass={styles.potentialColor} note="Yükseklik ve kütleyle artar" />
            <EnergyMeter label="Kinetik" value={energy.kineticJ} max={MAX_ENERGY_J} colorClass={styles.kineticColor} note="Hareket ve süratle ilişkilidir" />
            <EnergyMeter label="Isı (sürtünme)" value={energy.thermalJ} max={MAX_ENERGY_J} colorClass={styles.thermalColor} note={frictionEnabled ? "Sürtünmeyle artan pay" : "Sürtünme kapalı"} />
            <div className={styles.speedReadout}><span>Trenin anlık sürati</span><strong>{formatEnergy(energy.speedMps)} <small>m/s</small></strong></div>
          </div>
        </aside>
      </div>

      <div className={styles.insightStrip}>
        <span className={styles.insightIcon} aria-hidden="true">✦</span>
        <p><strong>Gözlem ipucu:</strong> Treni daha yükseğe çıkar veya kütlesini artır. Enerji göstergelerinin nasıl değiştiğine bak; sürtünmeyi açınca ısı payının da arttığını izle.</p>
        <span className={styles.modelNote}>Değerler, öğrenmeyi destekleyen yaklaşık model ölçümleridir.</span>
      </div>
    </div>
  );
}

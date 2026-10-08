"use client";

import { useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import styles from "./DynamometerSimulator.module.css";
import {
  DYNAMOMETER_CAPACITIES_N,
  formatTurkish,
  isOverCapacity,
  massGramsToWeightNewtons,
  readingForForce,
  springExtensionRatio,
  type DynamometerCapacityN,
} from "./dynamometerModel";

type HangingMass = { id: number; grams: number };
type Measurement = { id: number; label: string; massGrams: number; forceN: number; capacityN: DynamometerCapacityN };

const PRESET_MASSES = [50, 100, 250, 500];
const MAX_WEIGHT_COUNT = 8;
const SCALE_TOP_Y = 118;
const SCALE_BOTTOM_Y = 334;
const TICK_COUNT = 20;
const springX = 172;

function makeSpringPath(bottomY: number) {
  const topY = 77;
  const turns = 14;
  const amplitude = 15;
  const points: string[] = [`M ${springX} ${topY}`];
  for (let i = 1; i <= turns * 2; i += 1) {
    const y = topY + ((bottomY - topY) * i) / (turns * 2 + 1);
    const x = springX + (i % 2 === 0 ? -amplitude : amplitude);
    points.push(`L ${x} ${y.toFixed(1)}`);
  }
  points.push(`L ${springX} ${bottomY}`);
  return points.join(" ");
}

export default function DynamometerSimulator() {
  const [weights, setWeights] = useState<HangingMass[]>([]);
  const [capacityN, setCapacityN] = useState<DynamometerCapacityN>(10);
  const [customGrams, setCustomGrams] = useState("100");
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const nextId = useRef(0);

  const totalMassGrams = weights.reduce((total, weight) => total + weight.grams, 0);
  const actualForceN = massGramsToWeightNewtons(totalMassGrams);
  const measuredForceN = readingForForce(actualForceN, capacityN);
  const overloaded = isOverCapacity(actualForceN, capacityN);
  const extensionRatio = springExtensionRatio(actualForceN, capacityN);
  const springBottomY = SCALE_TOP_Y + extensionRatio * (SCALE_BOTTOM_Y - SCALE_TOP_Y);
  const springPath = useMemo(() => makeSpringPath(springBottomY), [springBottomY]);
  const readingY = springBottomY;

  function addMass(grams: number) {
    const roundedGrams = Math.round(grams);
    if (!Number.isFinite(roundedGrams) || roundedGrams <= 0 || weights.length >= MAX_WEIGHT_COUNT) return;
    const id = nextId.current++;
    setWeights((current) => [...current, { id, grams: roundedGrams }]);
  }

  function addCustomMass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const grams = Number(customGrams);
    if (!Number.isFinite(grams) || grams <= 0 || grams > 5000) return;
    addMass(grams);
  }

  function removeMass(id: number) {
    setWeights((current) => current.filter((weight) => weight.id !== id));
  }

  function resetExperiment() {
    setWeights([]);
    setMeasurements([]);
  }

  function saveMeasurement() {
    const measurement: Measurement = {
      id: nextId.current++,
      label: `Ölçüm ${measurements.length + 1}`,
      massGrams: totalMassGrams,
      forceN: actualForceN,
      capacityN,
    };
    setMeasurements((current) => [...current, measurement].slice(-6));
  }

  return (
    <div className={styles.simulator}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>5. SINIF FEN BİLİMLERİ · KUVVETİN ÖLÇÜLMESİ</span>
          <h2>Ağırlıkları ekle, kuvveti ölç</h2>
          <p>Yaya kütle asıldıkça dinamometrenin nasıl uzadığını ve Newton değerinin nasıl değiştiğini incele.</p>
        </div>
        <span className={styles.modeBadge}><i /> ETKİLEŞİMLİ DENEY</span>
      </header>

      <div className={styles.layout}>
        <section className={styles.instrumentPanel} aria-label="Canlı dinamometre görseli">
          <div className={styles.instrumentTopline}>
            <span><i /> DİNAMOMETRE GÖRÜNÜMÜ</span>
            <span className={styles.capacityPill}>Ölçüm aralığı <b>0–{capacityN} N</b></span>
          </div>

          <div className={styles.instrumentScene}>
            <svg className={styles.instrumentSvg} viewBox="0 0 430 520" role="img" aria-label={`Dinamometrede toplam ${formatTurkish(totalMassGrams, 0)} gram kütle asılı. Kuvvet ${overloaded ? `kapasiteyi aşarak ${formatTurkish(actualForceN)} Newton` : `${formatTurkish(measuredForceN)} Newton`} olarak gösteriliyor.`}>
              <defs>
                <linearGradient id="meterHousing" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#f5fbff" />
                  <stop offset="48%" stopColor="#cbd9e5" />
                  <stop offset="100%" stopColor="#8296aa" />
                </linearGradient>
                <linearGradient id="meterInner" x1="0" x2="1">
                  <stop offset="0" stopColor="#122238" />
                  <stop offset="52%" stopColor="#1c314a" />
                  <stop offset="100%" stopColor="#0c1b2d" />
                </linearGradient>
                <linearGradient id="springMetal" x1="0" x2="1">
                  <stop offset="0" stopColor="#7f9aa8" />
                  <stop offset="40%" stopColor="#e5f4f1" />
                  <stop offset="100%" stopColor="#7ca2ad" />
                </linearGradient>
                <linearGradient id="weightPaint" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#ffc977" />
                  <stop offset="100%" stopColor="#bf713b" />
                </linearGradient>
                <filter id="weightShadow" x="-30%" y="-30%" width="160%" height="180%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity=".38" />
                </filter>
              </defs>
              <rect width="430" height="520" fill="#0d192a" />
              <g opacity=".35" fill="#b8d8ed">
                <circle cx="36" cy="42" r="1.5" /><circle cx="383" cy="59" r="1.2" /><circle cx="48" cy="390" r="1.2" /><circle cx="375" cy="428" r="1.5" />
              </g>
              <text x="24" y="31" fill="#8fa8c2" fontSize="9" fontWeight="800" letterSpacing="1.6">YAYLI KUVVET ÖLÇER</text>
              <text x="386" y="31" textAnchor="end" fill="#7bd7ce" fontSize="10" fontWeight="800">NEWTON · N</text>

              {/* Askı halkası ve dinamometre gövdesi */}
              <path d="M145 53 C145 31 199 31 199 53" fill="none" stroke="#b5c9d6" strokeWidth="7" />
              <path d="M145 53 C145 35 199 35 199 53" fill="none" stroke="#466276" strokeWidth="2" />
              <rect x="91" y="49" width="162" height="326" rx="17" fill="url(#meterHousing)" stroke="#edf5f8" strokeWidth="1.5" />
              <rect x="105" y="62" width="134" height="294" rx="11" fill="url(#meterInner)" stroke="#718da2" strokeWidth="1" />
              <rect x="116" y="71" width="76" height="266" rx="7" fill="#0b1828" stroke="#344a5f" strokeWidth="1" />
              <text x="154" y="91" textAnchor="middle" fill="#94adbf" fontSize="8" fontWeight="700">YAY</text>
              <line x1="154" y1="99" x2="154" y2="108" stroke="#647c8c" strokeWidth="2" />
              <path d={springPath} fill="none" stroke="#07111c" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity=".55" />
              <path d={springPath} fill="none" stroke="url(#springMetal)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Newton ölçeği: her dinamometre için 20 ara aralık */}
              <line x1="225" y1={SCALE_TOP_Y} x2="225" y2={SCALE_BOTTOM_Y} stroke="#38516a" strokeWidth="2" />
              {Array.from({ length: TICK_COUNT + 1 }, (_, index) => {
                const y = SCALE_TOP_Y + (index / TICK_COUNT) * (SCALE_BOTTOM_Y - SCALE_TOP_Y);
                const isMajor = index % 4 === 0;
                const value = capacityN * (index / TICK_COUNT);
                return (
                  <g key={index}>
                    <line x1={isMajor ? 207 : 215} y1={y} x2="226" y2={y} stroke={isMajor ? "#d2e3ed" : "#71889a"} strokeWidth={isMajor ? 1.7 : 1} />
                    {isMajor && <text x="233" y={y + 3.5} fill="#d7e5ef" fontSize="9" fontWeight="700">{formatTurkish(value, 0)}</text>}
                  </g>
                );
              })}
              <text x="222" y="352" textAnchor="middle" fill="#83d6cf" fontSize="8" fontWeight="800">N</text>

              {/* Hareketli gösterge: kapasite aşımında son çizgide kalır ve dışarıda uyarı gösterilir. */}
              <path d={`M196 ${readingY} L216 ${readingY - 8} L216 ${readingY + 8} Z`} fill={overloaded ? "#ff7771" : "#ffc878"} stroke="#14283c" strokeWidth="1" />
              <circle cx="197" cy={readingY} r="4" fill={overloaded ? "#ff7771" : "#ffc878"} stroke="#fff3d8" strokeWidth="1.2" />

              {/* Alt bağlantı ve eklenen kütleler */}
              <line x1={springX} y1={springBottomY} x2={springX} y2={springBottomY + 22} stroke="#c7d7df" strokeWidth="4" />
              <path d={`M ${springX} ${springBottomY + 20} C ${springX} ${springBottomY + 36}, ${springX + 24} ${springBottomY + 36}, ${springX + 17} ${springBottomY + 23}`} fill="none" stroke="#d8e8ee" strokeWidth="3" />
              {weights.map((weight, index) => {
                const y = springBottomY + 40 + index * 15;
                return (
                  <g key={weight.id} filter="url(#weightShadow)">
                    <rect x="145" y={y} width="54" height="13" rx="4" fill="url(#weightPaint)" stroke="#ffe0a8" strokeWidth="1" />
                    <rect x="152" y={y + 2} width="40" height="3" rx="1.5" fill="#ffe2a9" opacity=".64" />
                    <text x="172" y={y + 10} textAnchor="middle" fill="#382518" fontSize="7" fontWeight="900">{weight.grams} g</text>
                  </g>
                );
              })}
              {weights.length === 0 && (
                <g>
                  <line x1="155" y1={springBottomY + 31} x2="189" y2={springBottomY + 31} stroke="#c6d8e2" strokeWidth="4" strokeLinecap="round" />
                  <text x="172" y={springBottomY + 53} textAnchor="middle" fill="#8299ad" fontSize="8">KÜTLE EKLE</text>
                </g>
              )}
              <rect x="284" y="77" width="111" height="65" rx="12" fill={overloaded ? "#532f38" : "#17313a"} stroke={overloaded ? "#ec7b76" : "#43857e"} />
              <text x="339.5" y="98" textAnchor="middle" fill={overloaded ? "#ffaaa4" : "#9bded1"} fontSize="8" fontWeight="800" letterSpacing=".7">ANLIK KUVVET</text>
              <text x="339.5" y="126" textAnchor="middle" fill="#f7f2e8" fontSize="22" fontWeight="900">{overloaded ? `>${formatTurkish(capacityN, 0)}` : formatTurkish(measuredForceN)} <tspan fontSize="12">N</tspan></text>

              {overloaded ? (
                <g>
                  <rect x="278" y="158" width="124" height="53" rx="10" fill="#4a2931" stroke="#e47d76" />
                  <text x="340" y="179" textAnchor="middle" fill="#ffb4a7" fontSize="9" fontWeight="900">KAPASİTE AŞILDI</text>
                  <text x="340" y="195" textAnchor="middle" fill="#e8c0bd" fontSize="7.5">Ölçüm güvenilir değil</text>
                </g>
              ) : (
                <g>
                  <rect x="278" y="158" width="124" height="53" rx="10" fill="#16263a" stroke="#354b65" />
                  <text x="340" y="179" textAnchor="middle" fill="#b7c9da" fontSize="8" fontWeight="800">ÖLÇÜM ARALIĞINDA</text>
                  <text x="340" y="195" textAnchor="middle" fill="#8095ac" fontSize="7.5">Yay esnek sınırda</text>
                </g>
              )}
              <rect x="279" y="235" width="123" height="69" rx="11" fill="#15263a" stroke="#344b65" />
              <text x="340.5" y="256" textAnchor="middle" fill="#8ea6be" fontSize="8" fontWeight="800">EKLENEN KÜTLE</text>
              <text x="340.5" y="285" textAnchor="middle" fill="#ffdaa1" fontSize="19" fontWeight="900">{formatTurkish(totalMassGrams, 0)} <tspan fontSize="10">g</tspan></text>
              <text x="340.5" y="328" textAnchor="middle" fill="#657f97" fontSize="7">Dünya için g ≈ 10 N/kg</text>
              <line x1="28" y1="394" x2="402" y2="394" stroke="#2e4258" strokeWidth="1" />
              <text x="215" y="420" textAnchor="middle" fill="#829bb3" fontSize="9">Yay uzaması kuvvet arttıkça artar</text>
              <text x="215" y="438" textAnchor="middle" fill="#5f7791" fontSize="8">Ölçeği seç · kütle ekle · ölçümü karşılaştır</text>
            </svg>
            <div className={`${styles.readingBanner} ${overloaded ? styles.readingOverload : ""}`} aria-live="polite">
              <div><span>Ölçülen ağırlık kuvveti</span><strong>{overloaded ? `>${formatTurkish(capacityN, 0)} N` : `${formatTurkish(measuredForceN)} N`}</strong></div>
              <div className={styles.readingDivider} />
              <div><span>Asılı toplam kütle</span><strong>{formatTurkish(totalMassGrams, 0)} g</strong></div>
            </div>
          </div>
          <p className={styles.instrumentCaption}>Kuvvet dinamometreyle ölçülür ve birimi Newton’dur (N). Kütle (g) ile ağırlık kuvveti (N) aynı şey değildir.</p>
        </section>

        <aside className={styles.controls} aria-label="Ağırlık ekleme ve ölçüm kontrolleri">
          <div className={styles.panelHeading}>
            <span className={styles.panelIcon} aria-hidden="true">＋</span>
            <div><span className={styles.panelEyebrow}>DENEYİ SEN YÖNET</span><h3>Kütle ekle</h3></div>
          </div>
          <p className={styles.helperText}>Bir ağırlığa dokun, dinamometreye as ve ölçümün değişimini izle.</p>

          <div className={styles.presetGrid}>
            {PRESET_MASSES.map((grams) => (
              <button key={grams} className={styles.presetButton} type="button" onClick={() => addMass(grams)} disabled={weights.length >= MAX_WEIGHT_COUNT}>
                <span className={styles.weightIcon} aria-hidden="true">＋</span><strong>{grams} g</strong><small>≈ {formatTurkish(massGramsToWeightNewtons(grams))} N</small>
              </button>
            ))}
          </div>

          <form className={styles.customForm} onSubmit={addCustomMass}>
            <label htmlFor="custom-mass">Kendin kütle belirle <span>(1–5000 g)</span></label>
            <div className={styles.customInputRow}>
              <input id="custom-mass" type="number" min="1" max="5000" step="1" value={customGrams} onChange={(event) => setCustomGrams(event.target.value)} />
              <span>g</span>
              <button type="submit" disabled={weights.length >= MAX_WEIGHT_COUNT || Number(customGrams) <= 0 || Number(customGrams) > 5000}>Ekle</button>
            </div>
          </form>

          <div className={styles.capacityBlock}>
            <label htmlFor="dynamometer-capacity">Dinamometrenin ölçüm kapasitesi</label>
            <select id="dynamometer-capacity" value={capacityN} onChange={(event) => setCapacityN(Number(event.target.value) as DynamometerCapacityN)}>
              {DYNAMOMETER_CAPACITIES_N.map((capacity) => <option key={capacity} value={capacity}>0–{capacity} N {capacity === 5 ? "· daha hassas" : ""}</option>)}
            </select>
            <small>Küçük kuvvetleri ölçerken düşük aralıklı ölçek daha ayrıntılı gösterir.</small>
          </div>

          <div className={styles.hangingList}>
            <div className={styles.listHeading}><span>ASILI AĞIRLIKLAR</span><b>{weights.length}/{MAX_WEIGHT_COUNT}</b></div>
            {weights.length === 0 ? (
              <p className={styles.emptyList}>Henüz ağırlık eklenmedi. Yukarıdan bir kütle seç.</p>
            ) : (
              <ul>
                {weights.map((weight, index) => (
                  <li key={weight.id}>
                    <span><i>{index + 1}</i>{weight.grams} g <small>≈ {formatTurkish(massGramsToWeightNewtons(weight.grams))} N</small></span>
                    <button type="button" onClick={() => removeMass(weight.id)} aria-label={`${weight.grams} gram ağırlığı çıkar`}>Çıkar</button>
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.massTotal}><span>Toplam kütle</span><strong>{formatTurkish(totalMassGrams, 0)} g</strong></div>
            <div className={styles.forceTotal}><span>Gerçek ağırlık kuvveti</span><strong>{formatTurkish(actualForceN)} N</strong></div>
          </div>

          <div className={styles.actionRow}>
            <button type="button" className={styles.saveButton} onClick={saveMeasurement}>Ölçümü karşılaştırmaya ekle</button>
            <button type="button" className={styles.resetButton} onClick={resetExperiment}>Deneyi sıfırla</button>
          </div>
        </aside>
      </div>

      <section className={styles.comparison} aria-labelledby="comparison-title">
        <div className={styles.comparisonHeader}>
          <div><span className={styles.panelEyebrow}>GÖZLEM TABLOSU</span><h3 id="comparison-title">Ölçümleri karşılaştır</h3></div>
          <button type="button" onClick={() => setMeasurements([])} disabled={measurements.length === 0}>Tabloyu temizle</button>
        </div>
        {measurements.length === 0 ? (
          <p className={styles.noMeasurements}>Farklı kütleler ekleyip “Ölçümü karşılaştırmaya ekle” düğmesine bas. Ölçümler burada birikir.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table>
              <thead><tr><th>Deney</th><th>Toplam kütle</th><th>Ağırlık kuvveti</th><th>Dinamometre aralığı</th><th>Durum</th></tr></thead>
              <tbody>
                {measurements.map((measurement) => {
                  const wasOverloaded = isOverCapacity(measurement.forceN, measurement.capacityN);
                  return (
                    <tr key={measurement.id}>
                      <td>{measurement.label}</td>
                      <td>{formatTurkish(measurement.massGrams, 0)} g</td>
                      <td>{formatTurkish(measurement.forceN)} N</td>
                      <td>0–{measurement.capacityN} N</td>
                      <td><span className={wasOverloaded ? styles.tableOverload : styles.tableValid}>{wasOverloaded ? "Kapasite aşıldı" : "Ölçüm aralığında"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className={styles.learningStrip}>
        <span className={styles.learningMark} aria-hidden="true">✦</span>
        <p><strong>Hatırla:</strong> Dünya’da yaklaşık olarak her 100 g kütle 1 N ağırlık kuvveti oluşturur. Kütle arttıkça dinamometre yayı daha çok uzar; ölçüm aralığı aşılırsa göstergeye güvenilmez.</p>
      </div>
    </div>
  );
}

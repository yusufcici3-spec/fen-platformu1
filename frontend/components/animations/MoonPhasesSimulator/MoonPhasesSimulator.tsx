"use client";

import { useEffect, useId, useState } from "react";
import styles from "./MoonPhasesSimulator.module.css";
import { LUNAR_CYCLE_DAYS, MOON_PHASES } from "./moonPhaseData";

function wrapProgress(value: number) {
  return ((value % 1) + 1) % 1;
}

function phaseIndexForProgress(progress: number) {
  return Math.round(wrapProgress(progress) * MOON_PHASES.length) % MOON_PHASES.length;
}

function formatDay(day: number) {
  return day.toFixed(1).replace(".", ",");
}

function illuminatedFraction(progress: number) {
  return (1 - Math.cos(wrapProgress(progress) * Math.PI * 2)) / 2;
}

function illuminatedPath(progress: number, cx: number, cy: number, radius: number) {
  const phase = wrapProgress(progress);
  if (phase < 0.002 || phase > 0.998) return "";

  if (Math.abs(phase - 0.5) < 0.002) {
    return `M ${cx} ${cy - radius} A ${radius} ${radius} 0 0 1 ${cx} ${cy + radius} A ${radius} ${radius} 0 0 1 ${cx} ${cy - radius} Z`;
  }

  const angle = phase * Math.PI * 2;
  const waxing = phase < 0.5;
  const outerSweep = waxing ? 1 : 0;
  const terminatorSweep = waxing
    ? angle < Math.PI / 2
      ? 0
      : 1
    : angle < (Math.PI * 3) / 2
      ? 1
      : 0;
  const terminatorRadius = Math.max(0.5, Math.abs(Math.cos(angle)) * radius);

  return `M ${cx} ${cy - radius} A ${radius} ${radius} 0 0 ${outerSweep} ${cx} ${cy + radius} A ${terminatorRadius} ${radius} 0 0 ${terminatorSweep} ${cx} ${cy - radius} Z`;
}

function MoonDisk({
  progress,
  size,
  label,
}: {
  progress: number;
  size: number;
  label?: string;
}) {
  const generatedId = useId().replace(/:/g, "");
  const diskId = `moon-disk-${generatedId}`;
  const lightId = `moon-light-${generatedId}`;
  const shadeId = `moon-shade-${generatedId}`;
  const path = illuminatedPath(progress, 50, 50, 45);

  return (
    <svg
      className={styles.moonDisk}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <clipPath id={diskId}>
          <circle cx="50" cy="50" r="45" />
        </clipPath>
        {path ? (
          <clipPath id={lightId}>
            <path d={path} />
          </clipPath>
        ) : null}
        <radialGradient id={shadeId} cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="62%" stopColor="#111827" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#030712" stopOpacity="0.8" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="#111827" />
      <image
        href="/moon-phases/moon-surface.jpg"
        x="5"
        y="5"
        width="90"
        height="90"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${diskId})`}
        opacity="0.2"
      />
      {path ? (
        <image
          href="/moon-phases/moon-surface.jpg"
          x="5"
          y="5"
          width="90"
          height="90"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${lightId})`}
          opacity="1"
        />
      ) : null}
      <circle cx="50" cy="50" r="45" fill={`url(#${shadeId})`} />
      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(235,244,255,.75)" strokeWidth="1.2" />
    </svg>
  );
}

export default function MoonPhasesSimulator() {
  const [day, setDay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setInterval(() => {
      setDay((current) => (current + (LUNAR_CYCLE_DAYS / 60) * speed) % LUNAR_CYCLE_DAYS);
    }, 500);
    return () => window.clearInterval(timer);
  }, [isPlaying, speed]);

  const progress = day / LUNAR_CYCLE_DAYS;
  const phaseIndex = phaseIndexForProgress(progress);
  const phase = MOON_PHASES[phaseIndex];
  const litPercent = Math.round(illuminatedFraction(progress) * 100);
  const angle = Math.PI + progress * Math.PI * 2;
  const moonX = 380 + Math.cos(angle) * 140;
  const moonY = 210 + Math.sin(angle) * 140;

  function selectPhase(index: number) {
    setDay(MOON_PHASES[index].day);
    setIsPlaying(false);
  }

  function moveOnePhase(direction: -1 | 1) {
    setDay((current) => (current + (direction * LUNAR_CYCLE_DAYS) / MOON_PHASES.length + LUNAR_CYCLE_DAYS) % LUNAR_CYCLE_DAYS);
  }

  return (
    <div className={styles.simulator}>
      <div className={styles.simulatorHeading}>
        <div>
          <span className={styles.kicker}>AY’IN HAREKETLİ MODELİ</span>
          <h3>Güneş, Dünya ve Ay’ı birlikte izle</h3>
        </div>
        <span className={styles.scaleNote}>Yörünge ve boyutlar anlatım için ölçekli değildir.</span>
      </div>

      <div className={styles.modelGrid}>
        <section className={styles.orbitPanel} aria-labelledby="moon-orbit-title">
          <div className={styles.panelHeading}>
            <div>
              <span className={styles.panelEyebrow}>UZAYDAN BAKIŞ</span>
              <h4 id="moon-orbit-title">Ay, Dünya çevresinde dolanıyor</h4>
            </div>
            <span className={styles.directionTag}>Güneş ışığı soldan gelir</span>
          </div>
          <div
            className={styles.orbitStage}
            role="img"
            aria-label={`Güneş, Dünya ve Ay modeli. ${phase.name} evresinde Ay'ın konumu gösteriliyor.`}
          >
            <svg className={styles.orbitSvg} viewBox="0 0 760 420" aria-hidden="true">
              <defs>
                <radialGradient id="moon-sun-glow" cx="45%" cy="42%" r="60%">
                  <stop offset="0%" stopColor="#fff6c8" />
                  <stop offset="55%" stopColor="#ffc95c" />
                  <stop offset="100%" stopColor="#ff8e35" />
                </radialGradient>
                <radialGradient id="moon-earth-globe" cx="31%" cy="27%" r="78%">
                  <stop offset="0%" stopColor="#a5f0e9" />
                  <stop offset="38%" stopColor="#38a8c4" />
                  <stop offset="75%" stopColor="#1d5794" />
                  <stop offset="100%" stopColor="#0a1c3a" />
                </radialGradient>
                <clipPath id="moon-earth-clip">
                  <circle cx="380" cy="210" r="39" />
                </clipPath>
                <marker id="moon-orbit-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                  <path d="M0,0 L7,3.5 L0,7 Z" fill="#97b8dd" />
                </marker>
                <filter id="moon-sun-blur" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="16" />
                </filter>
              </defs>
              <circle cx="70" cy="210" r="43" fill="#ffb640" opacity="0.13" filter="url(#moon-sun-blur)" />
              <g className={styles.sunRays}>
                <path d="M116 193 H244 M116 210 H238 M116 227 H244" />
                <path d="M180 193 H244" markerEnd="url(#moon-orbit-arrow)" />
              </g>
              <circle className={styles.orbitLine} cx="380" cy="210" r="140" />
              <path className={styles.orbitDirection} d="M 240 210 A 140 140 0 0 1 281 309" markerEnd="url(#moon-orbit-arrow)" />
              {MOON_PHASES.map((item, index) => {
                const markerAngle = Math.PI + (index / MOON_PHASES.length) * Math.PI * 2;
                const x = 380 + Math.cos(markerAngle) * 140;
                const y = 210 + Math.sin(markerAngle) * 140;
                return <circle key={item.id} className={index === phaseIndex ? styles.orbitPointActive : styles.orbitPoint} cx={x} cy={y} r={index === phaseIndex ? 5 : 3.2} />;
              })}
              <g className={styles.sun}>
                <circle cx="70" cy="210" r="29" fill="url(#moon-sun-glow)" />
                <path d="M70 168 V157 M70 263 V252 M28 210 H17 M123 210 H112 M40 180 L32 172 M108 248 L100 240 M100 180 L108 172 M32 248 L40 240" />
              </g>
              <g className={styles.earth}>
                <circle cx="380" cy="210" r="39" fill="url(#moon-earth-globe)" />
                <g clipPath="url(#moon-earth-clip)" fill="#72c99b" opacity="0.82">
                  <path d="M347 186 l12 -8 10 4 3 9 -7 5 -3 11 -8 4 -5 -9 -8 -2z" />
                  <path d="M379 217 l10 -6 9 4 2 10 -7 7 -2 15 -8 7 -4 -14 3 -11z" />
                  <path d="M397 179 l12 2 8 9 -7 8 -11 -3 -4 -8z" />
                  <path d="M414 217 l8 4 3 10 -8 4 -6 -7z" />
                </g>
                <path d="M380 171 A39 39 0 0 1 380 249" fill="#06142c" opacity="0.28" />
              </g>
              <text className={styles.svgLabel} x="70" y="286" textAnchor="middle">GÜNEŞ</text>
              <text className={styles.svgLabel} x="380" y="274" textAnchor="middle">DÜNYA</text>
              <text className={styles.orbitLabel} x="500" y="94" textAnchor="middle">AY’IN YÖRÜNGESİ</text>
            </svg>
            <div
              className={styles.movingMoon}
              style={{ left: `${(moonX / 760) * 100}%`, top: `${(moonY / 420) * 100}%` }}
              aria-hidden="true"
            >
              <MoonDisk progress={progress} size={46} />
            </div>
            <div className={styles.stageCaption}>Aydınlık yarımküre Güneş’e dönüktür</div>
          </div>
          <div className={styles.orbitLegend}>
            <span><i className={styles.sunLegend} />Güneş</span>
            <span><i className={styles.earthLegend} />Dünya</span>
            <span><i className={styles.moonLegend} />Ay’ın konumu</span>
          </div>
        </section>

        <aside className={styles.phasePanel}>
          <div className={styles.earthViewLabel}>DÜNYA’DAN GÖRÜNÜŞ</div>
          <div className={styles.phaseMoonWrap}>
            <MoonDisk progress={progress} size={154} label={`${phase.name}; Ay'ın yaklaşık yüzde ${litPercent} kadarı aydınlık görünüyor.`} />
          </div>
          <p className={styles.phaseCounter}>EVRE {String(phaseIndex + 1).padStart(2, "0")} / 08</p>
          <h4 className={styles.phaseName} aria-live="polite">{phase.name}</h4>
          <p className={styles.phaseDescription}>{phase.description}</p>
          <div className={styles.phaseStats}>
            <div>
              <span>Döngüde yaklaşık</span>
              <strong>{formatDay(day)} / 29,5 gün</strong>
            </div>
            <div>
              <span>Görünen aydınlık</span>
              <strong>%{litPercent}</strong>
            </div>
          </div>
          <p className={styles.observation}>{phase.observation}</p>
        </aside>
      </div>

      <section className={styles.controls} aria-label="Ay evreleri animasyon kontrolleri">
        <div className={styles.transportRow}>
          <div className={styles.transportButtons}>
            <button className={styles.secondaryButton} type="button" onClick={() => moveOnePhase(-1)} aria-label="Önceki evre">
              <span aria-hidden="true">←</span> Önceki
            </button>
            <button className={styles.playButton} type="button" onClick={() => setIsPlaying((current) => !current)}>
              <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span> {isPlaying ? "Duraklat" : "Animasyonu oynat"}
            </button>
            <button className={styles.secondaryButton} type="button" onClick={() => moveOnePhase(1)} aria-label="Sonraki evre">
              Sonraki <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className={styles.speedControls} role="group" aria-label="Animasyon hızı">
            <span>Hız</span>
            {[0.5, 1, 2].map((value) => (
              <button
                key={value}
                className={speed === value ? styles.speedActive : styles.speedButton}
                type="button"
                aria-pressed={speed === value}
                onClick={() => setSpeed(value)}
              >
                {value.toString().replace(".", ",")}×
              </button>
            ))}
          </div>
        </div>
        <label className={styles.sliderLabel} htmlFor="moon-day-slider">
          <span>Döngüde ilerle</span>
          <strong>{formatDay(day)} gün</strong>
        </label>
        <input
          id="moon-day-slider"
          className={styles.daySlider}
          type="range"
          min="0"
          max={LUNAR_CYCLE_DAYS}
          step="0.1"
          value={day}
          onChange={(event) => {
            setDay(Number(event.currentTarget.value));
            setIsPlaying(false);
          }}
          aria-label={`Ay evreleri döngüsünde gün ${formatDay(day)}; ${phase.name}`}
        />
        <div className={styles.sliderEnds} aria-hidden="true"><span>Yeni Ay</span><span>Dolunay</span><span>Yeni Ay</span></div>
      </section>

      <section className={styles.phasePicker} aria-labelledby="phase-picker-title">
        <div className={styles.pickerHeading}>
          <div>
            <span className={styles.panelEyebrow}>EVRE SEÇ</span>
            <h4 id="phase-picker-title">İstediğin evreye dokun</h4>
          </div>
          <span>Her düğme, döngünün yaklaşık bir adımını gösterir.</span>
        </div>
        <div className={styles.phaseButtons}>
          {MOON_PHASES.map((item, index) => (
            <button
              key={item.id}
              className={phaseIndex === index ? styles.phaseButtonActive : styles.phaseButton}
              type="button"
              aria-pressed={phaseIndex === index}
              onClick={() => selectPhase(index)}
            >
              <MoonDisk progress={index / MOON_PHASES.length} size={42} />
              <span>{item.name}</span>
              <small>≈ {formatDay(item.day)} gün</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.learningGrid} aria-label="Ay evreleri hakkında temel bilgiler">
        <article className={styles.learningCard}>
          <span className={styles.learningNumber}>01</span>
          <h4>Ay kendi ışığını üretmez</h4>
          <p>Güneş ışığını yansıtır. Güneş, Ay’ın yarısını sürekli aydınlatır.</p>
        </article>
        <article className={styles.learningCard}>
          <span className={styles.learningNumber}>02</span>
          <h4>Gördüğümüz bölüm değişir</h4>
          <p>Ay Dünya çevresinde dolanırken aydınlık yarısının farklı miktarlarını görürüz.</p>
        </article>
        <article className={`${styles.learningCard} ${styles.misconceptionCard}`}>
          <span className={styles.learningNumber}>03</span>
          <h4>Evreler Dünya’nın gölgesi değildir</h4>
          <p>Dünya’nın gölgesi Ay’a düşerse bu, her ay gördüğümüz evrelerden farklı olan Ay tutulmasıdır.</p>
        </article>
      </section>

      <section className={styles.quiz} aria-labelledby="quiz-title">
        <div className={styles.quizCopy}>
          <span className={styles.panelEyebrow}>KENDİNİ DENE</span>
          <h4 id="quiz-title">Ay’ın evreleri neden oluşur?</h4>
        </div>
        <div className={styles.quizOptions}>
          <button type="button" className={quizAnswer === "shadow" ? styles.answerWrong : styles.answerButton} onClick={() => setQuizAnswer("shadow")}>
            Dünya’nın gölgesi Ay’ın üstünde dolaştığı için
          </button>
          <button type="button" className={quizAnswer === "sunlight" ? styles.answerCorrect : styles.answerButton} onClick={() => setQuizAnswer("sunlight")}>
            Ay’ın Güneş’ten aldığı ışıklı kısmı farklı açılardan gördüğümüz için
          </button>
          <button type="button" className={quizAnswer === "own-light" ? styles.answerWrong : styles.answerButton} onClick={() => setQuizAnswer("own-light")}>
            Ay kendi ışığını açıp kapattığı için
          </button>
        </div>
        {quizAnswer ? (
          <p className={quizAnswer === "sunlight" ? styles.quizFeedbackCorrect : styles.quizFeedback} role="status">
            {quizAnswer === "sunlight"
              ? "Doğru! Ay’ın şekli değişmez; Güneş’in aydınlattığı bölümün Dünya’dan görünen kısmı değişir."
              : "Bir daha düşün: Güneş Ay’ın yarısını aydınlatır; biz bu aydınlık kısmı farklı açılardan görürüz."}
          </p>
        ) : null}
      </section>

      <p className={styles.sourceNote}>
        Bilimsel içerik: <a href="https://science.nasa.gov/moon/moon-phases/" target="_blank" rel="noreferrer">NASA Moon Phases</a> ·
        Görsel Ay yüzeyi: <a href="https://svs.gsfc.nasa.gov/4720" target="_blank" rel="noreferrer">NASA Goddard CGI Moon Kit</a>.
      </p>
    </div>
  );
}

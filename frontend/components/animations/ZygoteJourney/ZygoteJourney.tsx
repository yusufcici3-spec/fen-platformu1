"use client";

import { useState } from "react";
import styles from "./ZygoteJourney.module.css";

const stages = [
  { title: "Döllenme", time: "Başlangıç", detail: "Sperm hücresi ile yumurta hücresi birleşir. Bu olaya döllenme denir ve sonucunda zigot oluşur.", kind: "fertilization", fact: "Döllenme, sperm ve yumurta hücrelerinin birleşmesidir." },
  { title: "Zigot", time: "İlk hücre", detail: "Döllenme sonucunda oluşan ilk hücreye zigot denir. Zigot, büyüme ve gelişme sürecinin başlangıcıdır.", kind: "single", fact: "Zigot, yeni canlının ilk hücresidir." },
  { title: "Embriyo", time: "Gelişimin ilk dönemi", detail: "Zigotun geçirdiği hücre bölünmeleri ve gelişim sonucunda embriyo oluşur. Embriyo büyüyüp gelişmeye devam eder.", kind: "embryo", fact: "Embriyo, büyüme ve gelişme sürecinin bir aşamasıdır." },
  { title: "Fetüs", time: "Doğuma kadar", detail: "Embriyo gelişimini sürdürerek fetüs hâline gelir. Fetüs büyür ve doğuma hazırlanır.", kind: "fetus", fact: "Fetüs dönemi doğuma kadar devam eder." },
  { title: "Bebek ve doğum", time: "Doğum", detail: "Büyüme ve gelişme sonucunda bebek dünyaya gelir. Büyüme ve gelişme doğumdan sonra da devam eder.", kind: "baby", fact: "Büyüme ve gelişme doğumdan sonra da sürer." },
];

export default function ZygoteJourney() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <section className={styles.shell} aria-label="Zigottan bebeğe gelişim animasyonu">
      <div className={styles.intro}>
        <span className={styles.kicker}>İNSANDA ÜREME, BÜYÜME VE GELİŞME</span>
        <h2>Zigottan Bebeğe</h2>
        <p>Kitaptaki sıralamayı takip ederek döllenmeden doğuma kadar gelişim aşamalarını incele.</p>
      </div>

      <div className={styles.timeline} aria-label="Gelişim basamakları">
        {stages.map((item, index) => (
          <button key={item.title} type="button" onClick={() => setActive(index)} className={index === active ? styles.activeStep : styles.step} aria-current={index === active ? "step" : undefined}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      <div className={styles.stageCard}>
        <div className={styles.visualPanel}>
          <div className={styles.visualTop}><span>GELİŞİM MODELİ</span><strong>{stage.time}</strong></div>
          <div className={styles.visual} key={stage.kind + active}>
            {stage.kind === "fertilization" && (
              <div className={styles.fertilization}>
                <div className={styles.gamete}><span className={styles.sperm}><i /></span><b>Sperm</b></div>
                <div className={styles.fertilizationArrow}>↓</div>
                <div className={styles.gamete}><span className={styles.egg}><i /></span><b>Yumurta</b></div>
                <strong className={styles.fertilizationLabel}>Döllenme</strong>
              </div>
            )}
            {stage.kind === "single" && <div className={styles.singleCell}><span /></div>}
            {stage.kind === "embryo" && <div className={styles.embryo}><span /></div>}
            {stage.kind === "fetus" && <div className={styles.fetus}><span /></div>}
            {stage.kind === "baby" && <div className={styles.baby}><span>👶</span><b>Doğum</b></div>}
          </div>
          <p className={styles.visualCaption}>Şematik gösterimdir; gerçek boyut ve şekilleri temsil etmez.</p>
        </div>
        <div className={styles.explanation}>
          <span className={styles.counter}>AŞAMA {active + 1} / {stages.length}</span>
          <h3>{stage.title}</h3>
          <p>{stage.detail}</p>
          <div className={styles.keyFact}><strong>Unutma</strong><span>{stage.fact}</span></div>
          <div className={styles.controls}>
            <button type="button" onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>← Önceki</button>
            <button type="button" onClick={() => setActive(Math.min(stages.length - 1, active + 1))} disabled={active === stages.length - 1}>Sonraki aşama →</button>
          </div>
        </div>
      </div>
      <div className={styles.progressTrack}><span style={{ width: ((active + 1) / stages.length) * 100 + "%" }} /></div>
      <p className={styles.footerNote}>Sıralama: Döllenme → Zigot → Embriyo → Fetüs → Bebek (doğum).</p>
    </section>
  );
}

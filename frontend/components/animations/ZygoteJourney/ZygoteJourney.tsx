"use client";

import { useState } from "react";
import styles from "./ZygoteJourney.module.css";

const stages = [
  { title: "Döllenme", time: "0. gün", detail: "Sperm hücresi ile yumurta hücresi birleşir. Yeni canlıya ait ilk hücre olan zigot oluşur.", cells: 1, kind: "single" },
  { title: "Zigot", time: "1. gün", detail: "Zigot, döllenme sonucu oluşan tek hücreli yapıdır. Gelişimin başlangıç noktasıdır.", cells: 1, kind: "single" },
  { title: "Hücre bölünmeleri", time: "2–3. gün", detail: "Zigot art arda mitoz bölünmeler geçirir. Hücre sayısı artarken oluşan hücrelerin toplam büyüklüğü başlangıçta belirgin şekilde artmaz.", cells: 8, kind: "cluster" },
  { title: "Morula", time: "3–4. gün", detail: "Hücreler çoğalarak dut görünümüne benzeyen sıkı bir hücre kümesi oluşturur. Bu evreye morula denir.", cells: 16, kind: "morula" },
  { title: "Blastokist", time: "5–6. gün", detail: "Hücre kümesinin içinde boşluk oluşur. Blastokist rahme doğru ilerler.", cells: 12, kind: "ring" },
  { title: "Embriyo", time: "2–8. hafta", detail: "Rahim duvarına tutunan yapı gelişimini sürdürür. Temel organ ve vücut yapılarının oluşumu başlar.", cells: 1, kind: "embryo" },
  { title: "Fetüs", time: "9. hafta–doğum", detail: "Organ ve sistemler büyüyüp olgunlaşır. Bu dönem doğuma kadar devam eder.", cells: 1, kind: "fetus" },
  { title: "Bebek", time: "Doğum", detail: "Gelişim sürecinin sonunda bebek dünyaya gelir. Büyüme ve gelişme doğumdan sonra da devam eder.", cells: 1, kind: "baby" },
];

export default function ZygoteJourney() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <section className={styles.shell} aria-label="Zigottan bebeğe gelişim animasyonu">
      <div className={styles.intro}>
        <span className={styles.kicker}>İNSANDA ÜREME, BÜYÜME VE GELİŞME</span>
        <h2>Tek bir hücreden bebeğe uzanan yolculuk</h2>
        <p>Basamakları seçerek döllenmeden doğuma kadar gerçekleşen gelişim aşamalarını keşfet.</p>
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
            {stage.kind === "single" && <div className={styles.singleCell}><span /></div>}
            {(stage.kind === "cluster" || stage.kind === "morula" || stage.kind === "ring") && (
              <div className={stage.kind === "ring" ? styles.ring : styles.cluster}>
                {Array.from({ length: stage.cells }, (_, i) => <i key={i} />)}
              </div>
            )}
            {stage.kind === "embryo" && <div className={styles.embryo}><span /></div>}
            {stage.kind === "fetus" && <div className={styles.fetus}><span /></div>}
            {stage.kind === "baby" && <div className={styles.baby}><span>👶</span></div>}
          </div>
          <p className={styles.visualCaption}>Şematik gösterimdir; gerçek boyut ve şekilleri temsil etmez.</p>
        </div>
        <div className={styles.explanation}>
          <span className={styles.counter}>AŞAMA {active + 1} / {stages.length}</span>
          <h3>{stage.title}</h3>
          <p>{stage.detail}</p>
          <div className={styles.keyFact}><strong>Unutma</strong><span>{active < 5 ? "Mitoz bölünmeler hücre sayısını artırır." : "Büyüme ve gelişme doğumdan sonra da sürer."}</span></div>
          <div className={styles.controls}>
            <button type="button" onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>← Önceki</button>
            <button type="button" onClick={() => setActive(Math.min(stages.length - 1, active + 1))} disabled={active === stages.length - 1}>Sonraki aşama →</button>
          </div>
        </div>
      </div>
      <div className={styles.progressTrack}><span style={{ width: ((active + 1) / stages.length) * 100 + "%" }} /></div>
      <p className={styles.footerNote}>Not: Süreler yaklaşık değerlerdir ve bireysel farklılıklar gösterebilir.</p>
    </section>
  );
}

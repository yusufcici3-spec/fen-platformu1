"use client";

import { useState } from "react";
import styles from "./DnaPairingSimulator.module.css";
import {
  BASE_INFO,
  countPairingResults,
  createExampleSequence,
  createRandomSequence,
  DNA_BASES,
  DNA_CHAIN_LENGTHS,
  hydrogenBondCount,
  isComplementary,
  type DnaBase,
  type DnaChainLength,
} from "./dnaModel";

function baseClass(base: DnaBase) {
  switch (base) {
    case "A": return styles.baseA;
    case "T": return styles.baseT;
    case "G": return styles.baseG;
    case "C": return styles.baseC;
  }
}

export default function DnaPairingSimulator() {
  const [chainLength, setChainLength] = useState<DnaChainLength>(8);
  const [firstStrand, setFirstStrand] = useState<DnaBase[]>(() => createExampleSequence(8));
  const [secondStrand, setSecondStrand] = useState<Array<DnaBase | null>>(() => Array(8).fill(null));
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState("");

  const result = countPairingResults(firstStrand, secondStrand);
  const allPaired = result.empty === 0;

  function resetSecondStrand() {
    setSecondStrand(Array(chainLength).fill(null));
    setChecked(false);
    setFeedback("Karşı zincir temizlendi. Bazları yeniden eşleştir.");
  }

  function changeChainLength(nextLength: DnaChainLength) {
    setChainLength(nextLength);
    setFirstStrand(createExampleSequence(nextLength));
    setSecondStrand(Array(nextLength).fill(null));
    setChecked(false);
    setFeedback(`${nextLength} baz çifti uzunluğunda yeni zincir hazır.`);
  }

  function generateNewStrand() {
    setFirstStrand(createRandomSequence(chainLength));
    setSecondStrand(Array(chainLength).fill(null));
    setChecked(false);
    setFeedback("Yeni DNA zinciri oluşturuldu. Her bazın karşılığını seç.");
  }

  function updateFirstBase(index: number, base: DnaBase) {
    setFirstStrand((current) => current.map((value, position) => position === index ? base : value));
    setChecked(false);
    setFeedback("");
  }

  function choosePartner(index: number, base: DnaBase) {
    setSecondStrand((current) => current.map((value, position) => position === index ? base : value));
    setChecked(false);
    setFeedback("");
  }

  function checkPairings() {
    if (!allPaired) {
      setChecked(false);
      setFeedback(`${result.empty} eşleşme boş. Önce her basın karşısına bir baz seç.`);
      return;
    }

    setChecked(true);
    if (result.correct === chainLength) {
      setFeedback(`Harika! ${chainLength} baz çiftinin tamamı doğru eşleşti.`);
    } else {
      setFeedback(`${result.correct} doğru, ${result.incorrect} yanlış eşleşme var. Kırmızı satırlarda hangi bazın gelmesi gerektiğini incele.`);
    }
  }

  return (
    <section className={styles.simulator} aria-labelledby="dna-simulator-title">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>DNA MODELİ · BAZLARI EŞLEŞTİR</span>
          <h2 id="dna-simulator-title">Karşı zinciri sen tamamla</h2>
          <p>İlk zinciri düzenle, karşı sıraya uygun bazı seç ve kurduğun DNA merdivenini kontrol et.</p>
        </div>
        <div className={styles.progressBadge} aria-live="polite">
          <span>{checked ? "DOĞRU EŞLEŞME" : "TAMAMLANAN"}</span>
          <strong>{checked ? `${result.correct}/${chainLength}` : `${result.paired}/${chainLength}`}</strong>
        </div>
      </header>

      <div className={styles.toolbar}>
        <label className={styles.lengthControl} htmlFor="dna-chain-length">
          Zincir uzunluğu
          <select id="dna-chain-length" value={chainLength} onChange={(event) => changeChainLength(Number(event.target.value) as DnaChainLength)}>
            {DNA_CHAIN_LENGTHS.map((length) => <option key={length} value={length}>{length} baz çifti</option>)}
          </select>
        </label>
        <div className={styles.toolbarActions}>
          <button type="button" className={styles.secondaryButton} onClick={resetSecondStrand}>Karşı zinciri temizle</button>
          <button type="button" className={styles.secondaryButton} onClick={generateNewStrand}>Yeni zincir oluştur <span aria-hidden="true">↻</span></button>
        </div>
      </div>

      <div className={styles.ruleStrip}>
        <span className={`${styles.rulePair} ${styles.ruleAT}`}><b>A</b> Adenin <i>↔</i> <b>T</b> Timin <small>2 hidrojen bağı</small></span>
        <span className={`${styles.rulePair} ${styles.ruleGC}`}><b>G</b> Guanin <i>↔</i> <b>C</b> Sitozin <small>3 hidrojen bağı</small></span>
      </div>

      <div className={styles.ladderHeading}>
        <span className={styles.positionHeading}>NO</span>
        <span className={styles.strandHeading}>ZİNCİR 1 <small>5′ → 3′</small></span>
        <span className={styles.bondHeading}>BAĞLAR</span>
        <span className={styles.strandHeading}>ZİNCİR 2 <small>3′ → 5′</small></span>
      </div>

      <div className={styles.ladder} role="group" aria-label="Düzenlenebilir DNA baz eşleşmeleri">
        {firstStrand.map((firstBase, index) => {
          const secondBase = secondStrand[index];
          const correct = secondBase !== null && isComplementary(firstBase, secondBase);
          const wrong = checked && secondBase !== null && !correct;
          const bonds = secondBase ? hydrogenBondCount(firstBase, secondBase) : 0;
          const rungClass = checked && secondBase !== null
            ? correct ? styles.rungCorrect : styles.rungWrong
            : "";

          return (
            <div className={`${styles.rung} ${rungClass}`} key={index}>
              <span className={styles.position}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.firstCell}>
                <select
                  className={`${styles.firstSelect} ${baseClass(firstBase)}`}
                  aria-label={`Zincir 1, ${index + 1}. baz`}
                  value={firstBase}
                  onChange={(event) => updateFirstBase(index, event.target.value as DnaBase)}
                >
                  {DNA_BASES.map((base) => <option key={base} value={base}>{base} · {BASE_INFO[base].name}</option>)}
                </select>
              </div>
              <div className={`${styles.bondCell} ${correct ? styles.bondCorrect : ""} ${wrong ? styles.bondWrong : ""}`} aria-label={secondBase ? `${bonds} hidrojen bağı` : "Eşleşme bekliyor"}>
                {secondBase ? (
                  <>
                    <span className={styles.bondLines}>
                      {Array.from({ length: bonds || 2 }, (_, bondIndex) => <i key={bondIndex} />)}
                    </span>
                    <small>{bonds ? `${bonds} bağ` : "uyuşmuyor"}</small>
                  </>
                ) : <span className={styles.bondPlaceholder}>···</span>}
              </div>
              <div className={styles.secondCell}>
                <div className={styles.baseChoices} role="group" aria-label={`${index + 1}. baz için karşı eşleşmeyi seç`}>
                  {DNA_BASES.map((base) => (
                    <button
                      key={base}
                      type="button"
                      className={`${styles.baseChoice} ${baseClass(base)} ${secondBase === base ? styles.choiceSelected : ""}`}
                      aria-label={`${BASE_INFO[base].name} (${base}) seç`}
                      aria-pressed={secondBase === base}
                      onClick={() => choosePartner(index, base)}
                    >{base}</button>
                  ))}
                </div>
                <span className={styles.pairResult} aria-live="polite">
                  {checked && correct && <span className={styles.correctText}>Doğru eşleşme</span>}
                  {wrong && <span className={styles.wrongText}>Beklenen: {BASE_INFO[firstBase].complement} · {BASE_INFO[BASE_INFO[firstBase].complement].name}</span>}
                  {!checked && secondBase && <span className={styles.chosenText}>{BASE_INFO[secondBase].name} seçildi</span>}
                  {!secondBase && <span className={styles.emptyText}>Bir baz seç</span>}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.sequencePanel}>
        <div className={styles.sequenceHeading}>
          <div><span className={styles.eyebrow}>OLUŞAN DİZİLİM</span><h3>DNA zincirleri</h3></div>
          <span className={styles.sequenceCount}>{result.paired} / {chainLength} baz seçildi</span>
        </div>
        <div className={styles.sequenceRows}>
          <div className={styles.sequenceRow}>
            <b>5′</b><span className={styles.sequenceLetters}>{firstStrand.map((base, index) => <i className={baseClass(base)} key={index}>{base}</i>)}</span><b>3′</b>
          </div>
          <div className={`${styles.sequenceRow} ${styles.secondSequence}`}>
            <b>3′</b><span className={styles.sequenceLetters}>{secondStrand.map((base, index) => <i className={base ? baseClass(base) : styles.baseEmpty} key={index}>{base ?? "·"}</i>)}</span><b>5′</b>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.feedback} aria-live="polite">
          <span className={checked && result.correct === chainLength ? styles.feedbackSuccess : styles.feedbackMark} aria-hidden="true">{checked && result.correct === chainLength ? "✓" : "i"}</span>
          <span>{feedback || "Tüm bazları karşılıklı yerleştir, ardından eşleşmelerini kontrol et."}</span>
        </div>
        <button type="button" className={styles.checkButton} onClick={checkPairings}>
          Eşleşmeleri kontrol et <span aria-hidden="true">→</span>
        </button>
      </footer>
    </section>
  );
}

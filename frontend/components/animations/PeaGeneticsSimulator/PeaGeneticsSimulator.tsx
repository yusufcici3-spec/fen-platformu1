"use client";

import { useId, useMemo, useState } from "react";
import styles from "./PeaGeneticsSimulator.module.css";
import {
  ALL_CROSS_PAIRS,
  PEA_GENOTYPES,
  PEA_PHENOTYPES,
  PRESET_CROSSES,
  crossPeas,
  getPhenotype,
  type PeaGenotype,
  type PeaPhenotype,
  type PeaPhenotypeId,
} from "./peaGenetics";

const phenotypeTone: Record<PeaPhenotypeId, string> = {
  "round-yellow": styles.roundYellow,
  "round-green": styles.roundGreen,
  "wrinkled-yellow": styles.wrinkledYellow,
  "wrinkled-green": styles.wrinkledGreen,
};

function percent(count: number, total: number) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 }).format((count / total) * 100);
}

function PeaSeed({ phenotype, size = 58 }: { phenotype: PeaPhenotype; size?: number }) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const gradientId = `pea-gradient-${id}`;
  const palette =
    phenotype.seedColor === "yellow"
      ? { light: "#fff0a5", base: "#f3c64d", dark: "#b97925", edge: "#c99531" }
      : { light: "#c6e89a", base: "#70b95d", dark: "#347747", edge: "#4d9050" };

  return (
    <svg
      aria-hidden="true"
      className={styles.peaSeed}
      width={size}
      height={size * 0.8}
      viewBox="0 0 88 70"
      role="presentation"
    >
      <defs>
        <linearGradient id={gradientId} x1="14%" y1="10%" x2="88%" y2="92%">
          <stop offset="0%" stopColor={palette.light} />
          <stop offset="54%" stopColor={palette.base} />
          <stop offset="100%" stopColor={palette.dark} />
        </linearGradient>
      </defs>
      <ellipse cx="44" cy="61" rx="25" ry="5" fill="#15213a" opacity="0.12" />
      {phenotype.shape === "round" ? (
        <ellipse
          cx="44"
          cy="35"
          rx="31"
          ry="25"
          transform="rotate(-10 44 35)"
          fill={`url(#${gradientId})`}
          stroke={palette.edge}
          strokeWidth="1.5"
        />
      ) : (
        <path
          d="M14 37c1-11 9-19 19-18 5-8 15-9 21-3 8-4 18 1 19 10 10 4 13 14 7 22 2 10-6 18-16 16-7 7-17 6-22 0-9 4-19-1-20-10-9-3-13-10-8-17Z"
          fill={`url(#${gradientId})`}
          stroke={palette.edge}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      )}
      <ellipse cx="31" cy="25" rx="8" ry="4" fill="#fff" opacity="0.42" transform="rotate(-28 31 25)" />
      {phenotype.shape === "wrinkled" && (
        <path
          d="M25 41c5-5 8 4 13 0s8 5 13 1 8 4 13 1"
          fill="none"
          stroke={palette.dark}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.28"
        />
      )}
    </svg>
  );
}

function ParentCard({
  parentLabel,
  genotype,
  onChange,
  gametes,
}: {
  parentLabel: string;
  genotype: PeaGenotype;
  onChange: (genotype: PeaGenotype) => void;
  gametes: string[];
}) {
  const phenotype = getPhenotype(genotype);
  const selectId = `genotype-${parentLabel.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section className={styles.parentCard} aria-label={`${parentLabel} genotip seçimi`}>
      <div className={styles.parentTop}>
        <div>
          <span className={styles.parentEyebrow}>{parentLabel}</span>
          <h3>Bezelye ebeveyni</h3>
          <p className={styles.parentPhenotype}>{phenotype.displayLabel}</p>
        </div>
        <div className={styles.parentSeed}>
          <PeaSeed phenotype={phenotype} size={74} />
        </div>
      </div>

      <label className={styles.selectLabel} htmlFor={selectId}>
        Genotipini seç
      </label>
      <select
        id={selectId}
        className={styles.genotypeSelect}
        value={genotype}
        onChange={(event) => onChange(event.target.value as PeaGenotype)}
      >
        {PEA_GENOTYPES.map((option) => (
          <option key={option} value={option}>
            {option} — {getPhenotype(option).displayLabel}
          </option>
        ))}
      </select>

      <div className={styles.gameteBlock}>
        <span className={styles.gameteLabel}>Oluşturabileceği gametler</span>
        <div className={styles.gameteList}>
          {gametes.map((gamete) => (
            <span key={gamete} className={styles.gameteChip}>
              {gamete}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PeaGeneticsSimulator() {
  const [parentA, setParentA] = useState<PeaGenotype>("RrYy");
  const [parentB, setParentB] = useState<PeaGenotype>("RrYy");
  const [hasCrossed, setHasCrossed] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const cross = useMemo(() => crossPeas(parentA, parentB), [parentA, parentB]);

  function changeParentA(value: PeaGenotype) {
    setParentA(value);
    setHasCrossed(false);
  }

  function changeParentB(value: PeaGenotype) {
    setParentB(value);
    setHasCrossed(false);
  }

  function chooseCross(first: PeaGenotype, second: PeaGenotype) {
    setParentA(first);
    setParentB(second);
    setHasCrossed(false);
  }

  function runCross() {
    setAnimationKey((previous) => previous + 1);
    setHasCrossed(true);
  }

  const phenotypeRatio = PEA_PHENOTYPES.map((phenotype) => cross.phenotypeCounts[phenotype.id]).join(" : ");

  return (
    <div className={styles.simulator}>
      <div className={styles.simulatorHeader}>
        <div>
          <span className={styles.headerEyebrow}>ETKİLEŞİMLİ KALITIM LABORATUVARI</span>
          <h2>Bezelyeleri çaprazla</h2>
          <p>Anne ve baba genotiplerini seç; olası yavruların genotip ve özelliklerini keşfet.</p>
        </div>
        <span className={styles.crossCount}>45 benzersiz eşleşme</span>
      </div>

      <div className={styles.modelStrip}>
        <span className={styles.modelIcon} aria-hidden="true">Rr</span>
        <p>
          <strong>Bu okul modelinde:</strong> <b>R</b> yuvarlak, <b>r</b> buruşuk tohum şeklini;
          <b> Y</b> sarı, <b>y</b> yeşil tohumu temsil eder. Büyük harfli alel baskın kabul edilir.
        </p>
      </div>

      <div className={styles.parents}>
        <ParentCard
          parentLabel="Ebeveyn A"
          genotype={parentA}
          onChange={changeParentA}
          gametes={cross.gametesA}
        />
        <div className={styles.crossSymbol} aria-hidden="true">×</div>
        <ParentCard
          parentLabel="Ebeveyn B"
          genotype={parentB}
          onChange={changeParentB}
          gametes={cross.gametesB}
        />
      </div>

      <div className={styles.quickPresets}>
        <span className={styles.quickLabel}>Hızlı örnekler</span>
        <div className={styles.presetButtons}>
          {PRESET_CROSSES.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className={styles.presetButton}
              onClick={() => chooseCross(preset.parentA, preset.parentB)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <details className={styles.crossLibrary}>
        <summary>Tüm 45 farklı genotip eşleşmesini görüntüle</summary>
        <p>Her genotip çifti bir kez listelenir. Bir eşleşmeye dokunup çaprazlama sonucunu çalıştırabilirsin.</p>
        <div className={styles.crossLibraryGrid}>
          {ALL_CROSS_PAIRS.map(([first, second]) => {
            const selected =
              (parentA === first && parentB === second) ||
              (parentA === second && parentB === first);
            return (
              <button
                key={`${first}-${second}`}
                type="button"
                className={selected ? styles.selectedPair : undefined}
                aria-pressed={selected}
                onClick={() => chooseCross(first, second)}
              >
                <span>{first}</span> × <span>{second}</span>
              </button>
            );
          })}
        </div>
      </details>

      <div className={styles.runRow}>
        <p>Bir gamet her özellik için ebeveynlerinden yalnızca bir alel taşır.</p>
        <button type="button" className={styles.runButton} onClick={runCross}>
          <span aria-hidden="true">✦</span> Çaprazla ve yavruları gör
        </button>
      </div>

      {hasCrossed && (
        <section className={styles.results} aria-live="polite" aria-label="Çaprazlama sonuçları">
          <div className={styles.resultsHeading}>
            <div>
              <span className={styles.headerEyebrow}>OLASI YAVRULAR</span>
              <h3>{parentA} × {parentB}</h3>
            </div>
            <span className={styles.outcomeCount}>{cross.total} olası gamet birleşimi</span>
          </div>

          <div className={styles.resultColumns}>
            <section className={styles.punnettCard} aria-label="Punnett karesi">
              <div className={styles.sectionTitle}>
                <span>01</span>
                <div>
                  <h4>Punnett karesi</h4>
                  <p>Gametler birleşince oluşabilecek yavru genotipleri</p>
                </div>
              </div>
              <div className={styles.squareScroll}>
                <div
                  className={styles.punnettGrid}
                  style={{
                    gridTemplateColumns: `54px repeat(${cross.gametesA.length}, minmax(66px, 1fr))`,
                  }}
                >
                  <div className={styles.cornerCell} aria-label="Ebeveyn B satır, ebeveyn A sütun gametleri">
                    B ↓<br />A →
                  </div>
                  {cross.gametesA.map((gamete) => (
                    <div key={`head-${gamete}`} className={styles.columnHeader}>{gamete}</div>
                  ))}
                  {cross.gametesB.flatMap((gameteB, row) => [
                    <div key={`row-${gameteB}`} className={styles.rowHeader}>{gameteB}</div>,
                    ...cross.gametesA.map((gameteA, column) => {
                      const genotype = cross.offspring[row][column];
                      const phenotype = getPhenotype(genotype);
                      const order = row * cross.gametesA.length + column;
                      return (
                        <div
                          key={`${animationKey}-${row}-${column}`}
                          className={`${styles.punnettCell} ${phenotypeTone[phenotype.id]}`}
                          style={{ animationDelay: `${Math.min(order * 55, 900)}ms` }}
                          aria-label={`${gameteA} ve ${gameteB} gametlerinden ${genotype}, ${phenotype.displayLabel} yavru`}
                        >
                          <PeaSeed phenotype={phenotype} size={40} />
                          <strong>{genotype}</strong>
                          <small>{phenotype.displayLabel}</small>
                        </div>
                      );
                    }),
                  ])}
                </div>
              </div>
            </section>

            <section className={styles.outcomesCard}>
              <div className={styles.sectionTitle}>
                <span>02</span>
                <div>
                  <h4>Fenotip sonuçları</h4>
                  <p>Gözle görülebilen tohum özellikleri</p>
                </div>
              </div>
              <div className={styles.phenotypeGrid}>
                {PEA_PHENOTYPES.map((phenotype) => {
                  const count = cross.phenotypeCounts[phenotype.id];
                  return (
                    <article key={phenotype.id} className={`${styles.outcomeCard} ${phenotypeTone[phenotype.id]}`}>
                      <PeaSeed phenotype={phenotype} size={55} />
                      <strong>{phenotype.displayLabel}</strong>
                      <span className={styles.outcomeFraction}>{count} / {cross.total}</span>
                      <span className={styles.outcomePercent}>%{percent(count, cross.total)}</span>
                    </article>
                  );
                })}
              </div>
              <div className={styles.ratioSummary}>
                <span>Fenotip oranı</span>
                <strong>{phenotypeRatio}</strong>
                <small>Sırasıyla: yuvarlak-sarı : yuvarlak-yeşil : buruşuk-sarı : buruşuk-yeşil</small>
              </div>
            </section>
          </div>

          <section className={styles.genotypePanel}>
            <div className={styles.sectionTitle}>
              <span>03</span>
              <div>
                <h4>Genotip dağılımı</h4>
                <p>Aynı görünüş, farklı genotiplerle oluşabilir.</p>
              </div>
            </div>
            <div className={styles.genotypeGrid}>
              {cross.genotypeCounts.map(({ genotype, count }) => (
                <div key={genotype} className={styles.genotypeRow}>
                  <code>{genotype}</code>
                  <span className={styles.genotypeBar}>
                    <span style={{ width: `${(count / cross.total) * 100}%` }} />
                  </span>
                  <strong>{count}/{cross.total}</strong>
                  <small>%{percent(count, cross.total)}</small>
                </div>
              ))}
            </div>
          </section>

          <p className={styles.probabilityNote}>
            <strong>Olasılık notu:</strong> Bu kare, her genotipin beklenen oranını gösterir; gerçek yavru sayısı küçük örneklemlerde bu oranla birebir aynı olmak zorunda değildir.
          </p>
        </section>
      )}
    </div>
  );
}

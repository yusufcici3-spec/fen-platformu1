"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  spaceTechnologies,
  type SpaceTechnology,
  type SpaceTechnologyId,
} from "./technologyData";
import styles from "./SpaceTechnologySimulator.module.css";

type ViewMode = "all" | "near" | "deep";

const viewLabels: Record<ViewMode, string> = {
  all: "Tüm görevler",
  near: "Dünya çevresi",
  deep: "Derin uzay",
};

export default function SpaceTechnologySimulator() {
  const [selectedId, setSelectedId] = useState<SpaceTechnologyId>("iss");
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [zoom, setZoom] = useState(100);

  const visibleTechnologies = useMemo(
    () =>
      viewMode === "all"
        ? spaceTechnologies
        : spaceTechnologies.filter((technology) => technology.zone === viewMode),
    [viewMode],
  );

  const selectedTechnology =
    visibleTechnologies.find((technology) => technology.id === selectedId) ??
    visibleTechnologies[0];

  const chooseView = (nextView: ViewMode) => {
    setViewMode(nextView);
    const firstInView =
      nextView === "all"
        ? spaceTechnologies[0]
        : spaceTechnologies.find((technology) => technology.zone === nextView);
    if (firstInView) setSelectedId(firstInView.id);
  };

  const chooseTechnology = (technology: SpaceTechnology) => {
    setSelectedId(technology.id);
  };

  if (!selectedTechnology) return null;

  const selectedNumber =
    spaceTechnologies.findIndex((technology) => technology.id === selectedTechnology.id) + 1;

  return (
    <section className={styles.simulator} aria-label="Uzay teknolojileri etkileşimli simülatörü">
      <div className={styles.controlBar}>
        <div className={styles.modeGroup} role="group" aria-label="Görünüm seç">
          {(Object.keys(viewLabels) as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`${styles.modeButton} ${viewMode === mode ? styles.modeButtonActive : ""}`}
              onClick={() => chooseView(mode)}
              aria-pressed={viewMode === mode}
            >
              {viewLabels[mode]}
            </button>
          ))}
        </div>

        <div className={styles.actionControls}>
          <button
            type="button"
            className={styles.controlButton}
            onClick={() => setIsPlaying((playing) => !playing)}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? "Yörünge hareketini durdur" : "Yörünge hareketini başlat"}
          >
            <span className={styles.playIcon} aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
            <span>{isPlaying ? "Durdur" : "Başlat"}</span>
          </button>
          <button
            type="button"
            className={`${styles.controlButton} ${showLabels ? styles.controlButtonSelected : ""}`}
            onClick={() => setShowLabels((visible) => !visible)}
            aria-pressed={showLabels}
            aria-label={showLabels ? "Araç etiketlerini gizle" : "Araç etiketlerini göster"}
          >
            <span className={styles.labelIcon} aria-hidden="true">Aa</span>
            <span>Etiketler</span>
          </button>
          <label className={styles.zoomControl}>
            <span>Yakınlaştır</span>
            <input
              type="range"
              min="75"
              max="125"
              step="5"
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              aria-label="Simülasyon sahnesini yakınlaştır"
            />
            <output>{zoom}%</output>
          </label>
        </div>
      </div>

      <div className={styles.workspace}>
        <div className={styles.sceneCard}>
          <div className={styles.sceneHeading}>
            <div>
              <span className={styles.sceneEyebrow}>GÖREV MERKEZİ · CANLI GÖRÜNÜM</span>
              <h2>Uzay araçları nerede çalışır?</h2>
            </div>
            <span className={styles.liveStatus}>
              <i className={isPlaying ? styles.liveDot : styles.pausedDot} aria-hidden="true" />
              {isPlaying ? "Hareket açık" : "Duraklatıldı"}
            </span>
          </div>

          <div className={styles.scene} data-playing={isPlaying}>
            <div className={styles.sceneStars} aria-hidden="true" />
            <div className={styles.sceneWorld} style={{ transform: `scale(${zoom / 100})` }}>
              <div className={`${styles.orbitRing} ${styles.orbitNear}`} aria-hidden="true" />
              <div className={`${styles.orbitRing} ${styles.orbitMid}`} aria-hidden="true" />
              <div className={`${styles.orbitRing} ${styles.orbitFar}`} aria-hidden="true" />

              <div className={styles.earthWrap} role="img" aria-label="Dünya">
                <div className={styles.earth}>
                  <span className={`${styles.continent} ${styles.continentOne}`} />
                  <span className={`${styles.continent} ${styles.continentTwo}`} />
                  <span className={`${styles.continent} ${styles.continentThree}`} />
                  <span className={styles.earthCloud} />
                </div>
                <span className={styles.earthLabel}>DÜNYA</span>
              </div>

              {visibleTechnologies.map((technology) => (
                <OrbitNode
                  key={technology.id}
                  technology={technology}
                  isSelected={technology.id === selectedTechnology.id}
                  isPlaying={isPlaying}
                  showLabel={showLabels}
                  onSelect={() => chooseTechnology(technology)}
                />
              ))}
            </div>

            <div className={styles.sceneLegend}>
              <span><i className={styles.legendOrbit} aria-hidden="true" /> Temsili yörünge</span>
              <span><i className={styles.legendEarth} aria-hidden="true" /> Dünya</span>
              <span className={styles.legendNote}>Çizimler ölçekli değildir</span>
            </div>
          </div>
        </div>

        <aside className={styles.infoCard} aria-live="polite" aria-atomic="true">
          <div className={styles.infoTopline}>
            <span className={styles.infoKicker}>SEÇİLİ TEKNOLOJİ</span>
            <span className={styles.counter}>{String(selectedNumber).padStart(2, "0")} / 06</span>
          </div>
          <div className={styles.infoTitleRow}>
            <div>
              <span className={styles.category}>{selectedTechnology.category}</span>
              <h2>{selectedTechnology.name}</h2>
            </div>
            <span className={styles.selectedIcon} aria-hidden="true">
              <TechnologyIcon kind={selectedTechnology.icon} />
            </span>
          </div>

          {selectedTechnology.image ? (
            <Image
              className={styles.missionImage}
              src={selectedTechnology.image}
              alt={selectedTechnology.imageAlt ?? "Uzay teknolojisi görseli"}
              width={1400}
              height={1000}
              sizes="(max-width: 790px) 100vw, 45vw"
              loading="lazy"
            />
          ) : (
            <div className={styles.missionIllustration} aria-hidden="true">
              <TechnologyIcon kind={selectedTechnology.icon} />
              <span>{selectedTechnology.shortName}</span>
            </div>
          )}

          <p className={styles.summary}>{selectedTechnology.summary}</p>
          <h3 className={styles.factsHeading}>Öne çıkan 5 bilgi</h3>
          <ol className={styles.factList}>
            {selectedTechnology.facts.map((fact, index) => (
              <li key={`${selectedTechnology.id}-${index}`}>
                <span className={styles.factNumber}>{index + 1}</span>
                <span>{fact}</span>
              </li>
            ))}
          </ol>
          <a
            className={styles.sourceLink}
            href={selectedTechnology.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Kaynak: {selectedTechnology.sourceLabel} <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>

      <div className={styles.selectorSection} id="gorevler">
        <div className={styles.selectorHeading}>
          <div>
            <span className={styles.sceneEyebrow}>BİR GÖREV SEÇ</span>
            <h2>Hangi aracı inceleyelim?</h2>
          </div>
          <p>Yörüngedeki simgeye veya aşağıdaki görev kartına tıkla.</p>
        </div>
        <div className={styles.technologyGrid}>
          {visibleTechnologies.map((technology) => (
            <button
              key={technology.id}
              type="button"
              className={`${styles.technologyButton} ${technology.id === selectedTechnology.id ? styles.technologyButtonActive : ""}`}
              onClick={() => chooseTechnology(technology)}
              aria-pressed={technology.id === selectedTechnology.id}
            >
              <span className={styles.technologyIcon} aria-hidden="true">
                <TechnologyIcon kind={technology.icon} />
              </span>
              <span className={styles.technologyText}>
                <strong>{technology.shortName}</strong>
                <small>{technology.category}</small>
              </span>
              <span className={styles.cardArrow} aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.learningNote}>
        <span className={styles.noteMark} aria-hidden="true">i</span>
        <p>
          <strong>Bilimsel not:</strong> Araçların simge boyutları, aralarındaki mesafeler ve yörünge
          çizgileri konuyu anlaşılır kılmak için şematik gösterilmiştir; gerçek boyut ve uzaklık
          ölçeğini temsil etmez.
        </p>
      </div>
    </section>
  );
}

type OrbitNodeProps = {
  technology: SpaceTechnology;
  isSelected: boolean;
  isPlaying: boolean;
  showLabel: boolean;
  onSelect: () => void;
};

function OrbitNode({
  technology,
  isSelected,
  isPlaying,
  showLabel,
  onSelect,
}: OrbitNodeProps) {
  const orbitStyle = {
    "--orbit-radius": `${technology.orbitRadius}%`,
    "--orbit-seconds": `${technology.orbitSeconds}s`,
    "--orbit-delay": `-${technology.orbitDelay}s`,
  } as CSSProperties;

  return (
    <div
      className={`${styles.orbitNode} ${technology.stationary ? styles.stationaryNode : ""} ${!isPlaying ? styles.orbitPaused : ""}`}
      style={orbitStyle}
      data-id={technology.id}
    >
      <button
        type="button"
        className={`${styles.nodeButton} ${isSelected ? styles.nodeButtonActive : ""}`}
        onClick={onSelect}
        aria-pressed={isSelected}
        aria-label={`${technology.shortName} hakkında bilgi al`}
      >
        <span className={`${styles.nodeCounterRotate} ${!isPlaying ? styles.orbitPaused : ""}`} style={orbitStyle}>
          <span className={styles.nodeIcon} aria-hidden="true">
            <TechnologyIcon kind={technology.icon} />
          </span>
          {showLabel && <span className={styles.nodeLabel}>{technology.shortName}</span>}
        </span>
      </button>
    </div>
  );
}

type TechnologyIconProps = { kind: SpaceTechnology["icon"] };

function TechnologyIcon({ kind }: TechnologyIconProps) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    focusable: false,
  };

  switch (kind) {
    case "station":
      return (
        <svg {...common}>
          <path d="M23 32h18M32 23v18M26 26l12 12M38 26 26 38" />
          <rect x="3" y="25" width="17" height="14" rx="2" />
          <path d="M7 25v14m5-14v14m5-14v14M44 25h17v14H44zM49 25v14m5-14v14m5-14v14" />
          <rect x="27" y="27" width="10" height="10" rx="2" />
          <path d="M32 17v6m0 18v6" />
        </svg>
      );
    case "probe":
      return (
        <svg {...common}>
          <path d="M31 31 45 17M28 34l-8 8m13-11 13 12" />
          <path d="M42 13c6-5 12-5 15-3-1 7-5 12-12 14" />
          <circle cx="29" cy="34" r="6" />
          <path d="m25 38-9 11m18-9 2 12M29 40l-1 10m-9-8-4-2" />
          <path d="M14 14 9 9m10 1-1-7m-6 17-8 2" />
        </svg>
      );
    case "telescope":
      return (
        <svg {...common}>
          <path d="M8 38 15 21l27 6-7 18-27-7Z" />
          <path d="m15 21 6-10 29 6-8 10M42 27l10-2 5 4-2 8-13-1" />
          <path d="M21 45 17 57m19-12 7 12m-15-9v9" />
          <circle cx="17" cy="30" r="2" fill="currentColor" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M35 8c9 3 15 10 18 19L34 46 18 30 35 8Z" />
          <path d="m18 30-8 2-3 10 14-3m13 7-2 8 10 3 3-14" />
          <circle cx="39" cy="22" r="4" />
          <path d="m18 43-7 7m12-4-2 9m-5-14-8 1" />
        </svg>
      );
    case "shuttle":
      return (
        <svg {...common}>
          <path d="M31 8c8 9 12 20 13 35L32 57 20 43c1-15 4-26 11-35Z" />
          <path d="m20 36-12 7 12 1m24-8 12 7-12 1M27 49l-7 9h12m5-9 7 9H32" />
          <circle cx="32" cy="25" r="3" />
          <path d="M32 11v5" />
        </svg>
      );
    case "observatory":
      return (
        <svg {...common}>
          <path d="M7 52h50M13 52V34a19 19 0 0 1 38 0v18" />
          <path d="M25 17a19 19 0 0 1 26 17H32a7 7 0 0 0-7-7V17Z" />
          <path d="M32 34v18m12-18v18M20 52V39" />
          <path d="m9 31 11-4m24-5 8-8m-2 17 8-3" />
        </svg>
      );
  }
}

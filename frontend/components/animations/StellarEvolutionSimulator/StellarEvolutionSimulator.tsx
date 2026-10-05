"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  MASSIVE_OUTCOMES,
  MASSIVE_STAGES,
  SHARED_STAGES,
  STELLAR_STAGES,
  SUN_LIKE_STAGES,
  type StarPath,
  type StellarStageId,
} from "./stellarData";
import styles from "./StellarEvolutionSimulator.module.css";

const VISUAL_CLASSES = {
  protostar: styles.protostar,
  supergiant: styles.supergiant,
  blackHole: styles.blackHole,
};

function StageButton({
  id,
  selected,
  onSelect,
}: {
  id: StellarStageId;
  selected: boolean;
  onSelect: (id: StellarStageId) => void;
}) {
  const stage = STELLAR_STAGES[id];
  return (
    <button
      type="button"
      className={`${styles.stageNode} ${selected ? styles.stageNodeSelected : ""}`}
      aria-pressed={selected}
      aria-label={`${stage.title} aşamasını incele`}
      onClick={() => onSelect(id)}
    >
      <span className={styles.nodeMark} aria-hidden="true" />
      <span className={styles.nodeText}>{stage.shortTitle}</span>
    </button>
  );
}

function StageSequence({
  ids,
  selected,
  onSelect,
}: {
  ids: StellarStageId[];
  selected: StellarStageId;
  onSelect: (id: StellarStageId) => void;
}) {
  return (
    <div className={styles.sequence}>
      {ids.map((id, index) => (
        <div className={styles.sequenceItem} key={id}>
          <StageButton id={id} selected={selected === id} onSelect={onSelect} />
          {index < ids.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  );
}

export default function StellarEvolutionSimulator() {
  const [path, setPath] = useState<StarPath>("sunLike");
  const [selectedId, setSelectedId] = useState<StellarStageId>("nebula");
  const [massiveOutcome, setMassiveOutcome] = useState<"neutronStar" | "blackHole">("neutronStar");
  const [isPlaying, setIsPlaying] = useState(false);

  const routeIds = useMemo<StellarStageId[]>(
    () => path === "sunLike"
      ? [...SHARED_STAGES, ...SUN_LIKE_STAGES]
      : [...SHARED_STAGES, ...MASSIVE_STAGES, massiveOutcome],
    [path, massiveOutcome],
  );
  const currentIndex = Math.max(0, routeIds.indexOf(selectedId));
  const stage = STELLAR_STAGES[selectedId];

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setInterval(() => {
      setSelectedId((current) => {
        const index = routeIds.indexOf(current);
        if (index < 0 || index >= routeIds.length - 1) {
          window.clearInterval(timer);
          setIsPlaying(false);
          return current;
        }
        return routeIds[index + 1];
      });
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isPlaying, routeIds]);

  function selectStage(id: StellarStageId) {
    setIsPlaying(false);
    if (SUN_LIKE_STAGES.includes(id)) setPath("sunLike");
    if (MASSIVE_STAGES.includes(id) || MASSIVE_OUTCOMES.includes(id)) setPath("massive");
    if (id === "neutronStar" || id === "blackHole") setMassiveOutcome(id);
    setSelectedId(id);
  }

  function selectPath(nextPath: StarPath) {
    setIsPlaying(false);
    setPath(nextPath);
    const uniqueStages = nextPath === "sunLike"
      ? SUN_LIKE_STAGES
      : [...MASSIVE_STAGES, massiveOutcome];
    if (!SHARED_STAGES.includes(selectedId) && !uniqueStages.includes(selectedId)) {
      setSelectedId(nextPath === "sunLike" ? "redGiant" : "redSupergiant");
    }
  }

  function moveTo(index: number) {
    setIsPlaying(false);
    const nextId = routeIds[index];
    if (nextId) setSelectedId(nextId);
  }

  function togglePlayback() {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (currentIndex >= routeIds.length - 1) setSelectedId(routeIds[0]);
    setIsPlaying(true);
  }

  const visualClass = stage.visual === "photo" ? "" : VISUAL_CLASSES[stage.visual];

  return (
    <div className={styles.simulator}>
      <div className={styles.controlBar}>
        <div className={styles.pathPicker} role="group" aria-label="Yıldız kütlesine göre yaşam yolunu seç">
          <span className={styles.controlCaption}>YILDIZIN BAŞLANGIÇ KÜTLESİ</span>
          <div className={styles.pathButtons}>
            <button
              type="button"
              className={`${styles.pathButton} ${path === "sunLike" ? styles.pathButtonActive : ""}`}
              aria-pressed={path === "sunLike"}
              onClick={() => selectPath("sunLike")}
            >
              Güneş benzeri <span>küçük / orta kütle</span>
            </button>
            <button
              type="button"
              className={`${styles.pathButton} ${styles.pathButtonMassive} ${path === "massive" ? styles.pathButtonActive : ""}`}
              aria-pressed={path === "massive"}
              onClick={() => selectPath("massive")}
            >
              Büyük kütleli <span>başlangıçta çok daha ağır</span>
            </button>
          </div>
        </div>

        <div className={styles.transport} aria-label="Simülasyon kontrolleri">
          <span className={styles.progressLabel}>AŞAMA {currentIndex + 1} / {routeIds.length}</span>
          <div className={styles.transportButtons}>
            <button type="button" onClick={() => moveTo(currentIndex - 1)} disabled={currentIndex === 0} aria-label="Önceki aşama">←</button>
            <button
              type="button"
              className={styles.playButton}
              onClick={togglePlayback}
              aria-pressed={isPlaying}
              aria-label={isPlaying ? "Animasyonu durdur" : "Yaşam döngüsünü oynat"}
            >
              <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
              {isPlaying ? "Durdur" : "Aşamaları oynat"}
            </button>
            <button type="button" onClick={() => moveTo(currentIndex + 1)} disabled={currentIndex >= routeIds.length - 1} aria-label="Sonraki aşama">→</button>
          </div>
        </div>
      </div>

      <div className={styles.explorer}>
        <div className={styles.scene} aria-label={`${stage.title} uzay görüntüsü`}>
          <div className={styles.sceneStars} aria-hidden="true" />
          <div className={styles.sceneGlow} aria-hidden="true" />
          {stage.image ? (
            <Image
              className={styles.sceneImage}
              src={stage.image}
              alt={stage.imageAlt ?? stage.title}
              fill
              sizes="(max-width: 760px) 100vw, 58vw"
              priority={selectedId === "nebula"}
            />
          ) : (
            <div className={`${styles.celestial} ${visualClass}`} aria-hidden="true">
              <span className={styles.celestialRing} />
              <span className={styles.celestialCorona} />
              <span className={styles.celestialCore} />
            </div>
          )}
          <div className={styles.sceneShade} aria-hidden="true" />
          <div className={styles.sceneTopline}>
            <span><i aria-hidden="true" /> KOZMİK GÖZLEM PENCERESİ</span>
            <span>{path === "sunLike" ? "GÜNEŞ BENZERİ AKIŞ" : "BÜYÜK KÜTLELİ AKIŞ"}</span>
          </div>
          <div className={styles.sceneCaption}>
            <span className={styles.scenePhase}>{stage.phase}</span>
            <h3>{stage.title}</h3>
            <p>{stage.imageCaption ?? "Eğitim amaçlı temsili uzay görselleştirmesi"}</p>
          </div>
          <span className={styles.imageCredit}>{stage.imageCredit ?? "Temsili görselleştirme"}</span>
        </div>

        <article className={styles.detailCard} aria-live="polite">
          <div className={styles.detailHeader}>
            <span className={styles.detailKicker}>SEÇİLİ AŞAMA</span>
            <span className={styles.timeScale}>{stage.timeScale}</span>
          </div>
          <h3>{stage.title}</h3>
          <p className={styles.summary}>{stage.summary}</p>
          <ul className={styles.factList}>
            {stage.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
          <a className={styles.sourceLink} href={stage.sourceUrl} target="_blank" rel="noreferrer">
            Kaynak: {stage.sourceName} <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>

      <div className={styles.timeline} aria-label="Tıklanabilir yıldız yaşam döngüsü aşamaları">
        <div className={styles.trackHeader}>
          <div>
            <span className={styles.trackEyebrow}>YILDIZIN YAŞAM YOLU</span>
            <h3>Aşamaları seçerek incele</h3>
          </div>
          <span className={styles.trackHint}>Parlayan aşamaya dokun</span>
        </div>

        <div className={styles.sharedTrack}>
          <div className={styles.trackLabel}>
            <span className={styles.sharedBadge}>ORTAK BAŞLANGIÇ</span>
            <span>Her iki kütle grubunda da ilk aşamalar benzerdir.</span>
          </div>
          <StageSequence ids={SHARED_STAGES} selected={selectedId} onSelect={selectStage} />
        </div>

        <div className={styles.branchGrid}>
          <section className={`${styles.branchTrack} ${path === "sunLike" ? styles.branchTrackActive : ""}`} aria-label="Güneş benzeri yıldızın yolu">
            <div className={styles.branchHeading}>
              <span className={`${styles.branchIndex} ${styles.branchIndexSun}`}>01</span>
              <div><h4>Güneş benzeri</h4><p>Düşük / orta kütleli yıldızların sonu</p></div>
            </div>
            <StageSequence ids={SUN_LIKE_STAGES} selected={selectedId} onSelect={selectStage} />
          </section>

          <section className={`${styles.branchTrack} ${path === "massive" ? styles.branchTrackActive : ""}`} aria-label="Büyük kütleli yıldızın yolu">
            <div className={styles.branchHeading}>
              <span className={`${styles.branchIndex} ${styles.branchIndexMassive}`}>02</span>
              <div><h4>Büyük kütleli</h4><p>Süpernova sonrası iki olası sonuç</p></div>
            </div>
            <div className={styles.massiveSequence}>
              <StageSequence ids={MASSIVE_STAGES} selected={selectedId} onSelect={selectStage} />
              <span className={styles.arrow} aria-hidden="true">→</span>
              <div className={styles.outcomeGroup}>
                <span className={styles.outcomeCaption}>Kalan çekirdeğe göre</span>
                <div className={styles.outcomeButtons}>
                  {MASSIVE_OUTCOMES.map((id) => (
                    <StageButton key={id} id={id} selected={selectedId === id} onSelect={selectStage} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.scaleNote}>
          <span className={styles.infoMark} aria-hidden="true">i</span>
          <p>Görseller gerçek uzay gözlemleri ve NASA sanatçı çizimlerinden seçilmiştir; yıldız boyutları, uzaklıklar ve evrim süreleri karşılaştırma için temsili gösterilir.</p>
        </div>
      </div>
    </div>
  );
}

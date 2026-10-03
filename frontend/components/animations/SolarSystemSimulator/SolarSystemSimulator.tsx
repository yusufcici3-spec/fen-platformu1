"use client";

import { useMemo, useState } from "react";
import styles from "./SolarSystemSimulator.module.css";
import PlanetCanvas, { type DistanceMode } from "./PlanetCanvas";
import { ASTRONOMICAL_UNIT_MILLION_KM, MAX_SIMULATION_DAYS, PLANETS } from "./planetData";

const number = (value: number, digits = 1) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(value);

function orbitalPeriodLabel(days: number) {
  return days < 365.256
    ? `${number(days, 1)} Dünya günü`
    : `${number(days / 365.256, 1)} Dünya yılı`;
}

export default function SolarSystemSimulator() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<(typeof PLANETS)[number]["id"]>("earth");
  const [simulationDay, setSimulationDay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [distanceMode, setDistanceMode] = useState<DistanceMode>("true");
  const [focused, setFocused] = useState(false);
  const [zoom, setZoom] = useState(8);

  const selectedPlanet = useMemo(
    () => PLANETS.find((planet) => planet.id === selectedPlanetId) ?? PLANETS[0],
    [selectedPlanetId],
  );
  const distanceMillionKm = selectedPlanet.meanSunDistanceAu * ASTRONOMICAL_UNIT_MILLION_KM;
  const rotationHours = Math.abs(selectedPlanet.rotationPeriodHours);
  const moonCount = selectedPlanet.knownMoons === 1 ? "1 uydu" : `${selectedPlanet.knownMoons} uydu`;

  const selectPlanet = (id: (typeof PLANETS)[number]["id"]) => {
    setSelectedPlanetId(id);
    setFocused(true);
    setZoom(8);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setSimulationDay(0);
    setDistanceMode("true");
    setFocused(false);
    setZoom(8);
  };

  return (
    <section className={styles.simulator} aria-label="Etkileşimli Güneş Sistemi simülasyonu">
      <div className={styles.topBar}>
        <div>
          <span className={styles.eyebrow}>ETKİLEŞİMLİ GÖK BİLİMİ LABORATUVARI</span>
          <h2>Gezegenleri seç, yaklaş ve keşfet</h2>
          <p>Gezegene tıkla ya da adını seç; yakınlaştırıp temel özelliklerini incele.</p>
        </div>
        <div className={styles.viewToggle} role="group" aria-label="Yörünge görünümü">
          <button
            type="button"
            className={distanceMode === "true" ? styles.activeToggle : ""}
            aria-pressed={distanceMode === "true"}
            onClick={() => setDistanceMode("true")}
          >
            Gerçek uzaklık
          </button>
          <button
            type="button"
            className={distanceMode === "tour" ? styles.activeToggle : ""}
            aria-pressed={distanceMode === "tour"}
            onClick={() => setDistanceMode("tour")}
          >
            Keşif görünümü
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.sceneColumn}>
          <div className={styles.canvasFrame}>
            <PlanetCanvas
              selectedPlanetId={selectedPlanetId}
              simulationDay={simulationDay}
              isPlaying={isPlaying}
              speed={speed}
              distanceMode={distanceMode}
              focused={focused}
              zoom={zoom}
              onSelectPlanet={selectPlanet}
              onSimulationDay={setSimulationDay}
            />
            <span className={styles.sceneBadge}>
              {focused ? `ODAK · ${selectedPlanet.name.toLocaleUpperCase("tr-TR")}` : "GÜNEŞ SİSTEMİ"}
            </span>
          </div>

          <div className={styles.planetPicker} role="group" aria-label="Gezegen seç">
            {PLANETS.map((planet, index) => (
              <button
                key={planet.id}
                type="button"
                className={planet.id === selectedPlanetId ? styles.selectedPlanetButton : styles.planetButton}
                aria-pressed={planet.id === selectedPlanetId}
                onClick={() => selectPlanet(planet.id)}
              >
                <span className={styles.pickerNumber}>{index + 1}</span>
                {planet.name}
              </button>
            ))}
          </div>

          <div className={styles.controls}>
            <div className={styles.playGroup}>
              <button
                type="button"
                className={styles.playButton}
                onClick={() => setIsPlaying((value) => !value)}
                aria-label={isPlaying ? "Simülasyonu duraklat" : "Simülasyonu oynat"}
              >
                <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
                {isPlaying ? "Duraklat" : "Oynat"}
              </button>
              <button type="button" className={styles.resetButton} onClick={resetSimulation}>
                Baştan al
              </button>
            </div>
            <div className={styles.speedGroup} role="group" aria-label="Animasyon hızı">
              <span>Hız</span>
              {[1, 4, 12].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={speed === value ? styles.speedActive : styles.speedButton}
                  aria-pressed={speed === value}
                  onClick={() => setSpeed(value)}
                >
                  {value}×
                </button>
              ))}
            </div>
          </div>

          <label className={styles.timelineLabel} htmlFor="solar-day">
            <span>Simülasyon zamanı</span>
            <strong>{number(simulationDay, 0)} Dünya günü</strong>
          </label>
          <input
            id="solar-day"
            className={styles.timeline}
            type="range"
            min={0}
            max={MAX_SIMULATION_DAYS}
            step={1}
            value={Math.min(simulationDay, MAX_SIMULATION_DAYS)}
            onChange={(event) => setSimulationDay(Number(event.target.value))}
            aria-label="Gezegenlerin yörünge konumları için simülasyon zamanı"
          />

          {focused && (
            <div className={styles.zoomRow}>
              <button type="button" className={styles.resetButton} onClick={() => setFocused(false)}>
                Tüm sisteme dön
              </button>
              <label htmlFor="planet-zoom">Yakınlaştırma</label>
              <input
                id="planet-zoom"
                type="range"
                min={2}
                max={18}
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                aria-label="Seçili gezegene yakınlaştırma düzeyi"
              />
              <span>{zoom}×</span>
            </div>
          )}

          <p className={styles.scaleNote}>
            {distanceMode === "true"
              ? "Gerçek uzaklık görünümü: yörünge yarıçapları Güneş’e ortalama uzaklıkla (AU) orantılıdır."
              : "Keşif görünümü: uzak gezegenleri birlikte görebilmek için yörünge aralıkları sıkıştırılmıştır."}
            {" "}Gezegen diskleri tıklanabilir olmaları için büyütülmüştür; yörünge çizimleri dairesel şemadır.
          </p>
        </div>

        <aside className={styles.infoPanel} aria-live="polite" aria-label={`${selectedPlanet.name} gezegen bilgileri`}>
          <div className={styles.infoHeader}>
            <span className={styles.infoEyebrow}>SEÇİLİ GEZEGEN</span>
            <span className={styles.planetType}>{selectedPlanet.planetType}</span>
          </div>
          <div
            className={`${styles.planetOrb} ${selectedPlanet.id === "saturn" ? styles.saturnOrb : ""}`}
            style={{ backgroundImage: `url("${selectedPlanet.textureUrl}")` }}
            role="img"
            aria-label={`${selectedPlanet.name} yüzey dokusu`}
          />
          <h3>{selectedPlanet.name}</h3>
          <p className={styles.englishName}>{selectedPlanet.englishName}</p>

          <dl className={styles.statsGrid}>
            <div><dt>Ekvator çapı</dt><dd>{number(selectedPlanet.diameterKm, 0)} <small>km</small></dd></div>
            <div><dt>Güneş’e ortalama uzaklık</dt><dd>{number(selectedPlanet.meanSunDistanceAu, 2)} <small>AU</small></dd><span>≈ {number(distanceMillionKm, 1)} milyon km</span></div>
            <div><dt>Bir yılı</dt><dd>{orbitalPeriodLabel(selectedPlanet.orbitalPeriodDays)}</dd><span>{number(selectedPlanet.orbitalPeriodDays, 1)} gün</span></div>
            <div><dt>Kendi ekseninde dönüş</dt><dd>{number(rotationHours, 1)} <small>saat</small></dd><span>{selectedPlanet.rotationPeriodHours < 0 ? "Ters yönde döner" : "Yıldızıl dönüş süresi"}</span></div>
            <div><dt>Bilinen uydu</dt><dd>{moonCount}</dd><span>{selectedPlanet.moonCountAsOf}</span></div>
          </dl>

          <div className={styles.atmosphereBlock}>
            <h4>Atmosfer</h4>
            <p>{selectedPlanet.atmosphere}</p>
          </div>

          <div className={styles.factsBlock}>
            <h4>5 kısa özellik</h4>
            <ol>
              {selectedPlanet.facts.map((fact) => <li key={fact}>{fact}</li>)}
            </ol>
          </div>

          <details className={styles.sources}>
            <summary>Bilgi kaynakları ve görsel kredisi</summary>
            <ul>
              {selectedPlanet.sources.map((source) => (
                <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>
              ))}
              <li><a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noreferrer">Gezegen dokuları: Solar System Scope, CC BY 4.0</a></li>
            </ul>
          </details>
        </aside>
      </div>
    </section>
  );
}

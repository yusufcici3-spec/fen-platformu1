"use client";

import { useEffect, useState } from "react";
import styles from "./BileskeKuvvetSimulator.module.css";
import {
  ACCELERATION_PER_NEWTON,
  DEFAULT_F1,
  DEFAULT_F2,
  MAX_FORCE,
  MAX_SPEED,
  describeResultant,
  directionName,
  motionText,
  netForce,
  type ForceMode,
} from "./kuvvetModel";

const SCALE = 22; // 1 N = 22 birim ok uzunluğu
const FLOOR = 290;
const BOX_CENTER = 320;

type Motion = { position: number; velocity: number };

function ForceArrow(props: {
  x0: number;
  x1: number;
  y: number;
  color: string;
  width: number;
  headHalf: number;
  headLength: number;
}) {
  const { x0, x1, y, color, width, headHalf, headLength } = props;
  const length = x1 - x0;
  if (Math.abs(length) < 1) return null;
  const sign = Math.sign(length);
  const head = Math.min(headLength, Math.abs(length));
  return (
    <g>
      <line x1={x0} y1={y} x2={x1 - sign * head * 0.8} y2={y} stroke={color} strokeWidth={width} />
      <polygon
        fill={color}
        points={`${x1},${y} ${x1 - sign * head},${y - headHalf} ${x1 - sign * head},${y + headHalf}`}
      />
    </g>
  );
}

function Person(props: {
  x: number;
  towardBox: 1 | -1;
  ropeY: number;
  force: number;
  edgeX: number;
  color: string;
}) {
  const { x, towardBox, ropeY, force, edgeX, color } = props;
  const lean = -towardBox * force * 2.2; // kuvvet arttıkça kutudan uzağa yaslanır
  const rad = (lean * Math.PI) / 180;
  const handX = towardBox * 20;
  const worldHandX = x + handX * Math.cos(rad) - ropeY * Math.sin(rad);
  const worldHandY = FLOOR + handX * Math.sin(rad) + ropeY * Math.cos(rad);

  return (
    <>
      <line
        x1={worldHandX}
        y1={worldHandY}
        x2={edgeX}
        y2={FLOOR + ropeY}
        stroke="#92400e"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <g transform={`translate(${x} ${FLOOR}) rotate(${lean})`}>
        <g stroke={color} strokeWidth={5} strokeLinecap="round" fill="none">
          <line x1={0} y1={-30} x2={-8} y2={0} />
          <line x1={0} y1={-30} x2={8} y2={0} />
          <line x1={0} y1={-30} x2={0} y2={-56} />
          <line x1={0} y1={-52} x2={handX} y2={ropeY} />
        </g>
        <circle cx={0} cy={-66} r={9} fill={color} />
      </g>
    </>
  );
}

export default function BileskeKuvvetSimulator() {
  const [mode, setMode] = useState<ForceMode>("opposite");
  const [f1, setF1] = useState(DEFAULT_F1);
  const [f2, setF2] = useState(DEFAULT_F2);
  const [playing, setPlaying] = useState(true);
  const [motion, setMotion] = useState<Motion>({ position: 0, velocity: 0 });

  const opposite = mode === "opposite";
  const net = netForce(mode, f1, f2);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      setMotion((current) => {
        const velocity = Math.max(
          -MAX_SPEED,
          Math.min(MAX_SPEED, current.velocity + net * ACCELERATION_PER_NEWTON * dt),
        );
        return { velocity, position: current.position + velocity * dt };
      });
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing, net]);

  const { equation, explanation } = describeResultant(mode, f1, f2);
  const status = motionText(mode, f1, f2, motion.velocity);
  const balanced = net === 0 && f1 + f2 > 0;

  const origin = opposite ? 320 : 100;
  const f1End = opposite ? origin - f1 * SCALE : origin + f1 * SCALE;
  const f2End = origin + f2 * SCALE;
  const netEnd = origin + net * SCALE;
  const tickShift = ((motion.position % 60) + 60) % 60;

  function resetAll() {
    setMode("opposite");
    setF1(DEFAULT_F1);
    setF2(DEFAULT_F2);
    setMotion({ position: 0, velocity: 0 });
    setPlaying(true);
  }

  return (
    <section className={styles.simulator} aria-labelledby="kuvvet-simulator-title">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>KUVVET MODELİ · BİLEŞKE KUVVET</span>
          <h2 id="kuvvet-simulator-title">Kuvvetleri sen ayarla</h2>
          <p>İki kuvvetin büyüklüğünü değiştir, bileşke kuvveti oku ve kutunun hareketini izle.</p>
        </div>
        <div className={`${styles.netBadge} ${balanced ? styles.netBalanced : ""}`} aria-live="polite">
          <span>BİLEŞKE</span>
          <strong>{Math.abs(net)} N</strong>
        </div>
      </header>

      <div className={styles.modeSwitch} role="group" aria-label="Kuvvet türü">
        <button
          type="button"
          className={styles.modeButton}
          aria-pressed={opposite}
          onClick={() => setMode("opposite")}
        >
          Zıt yönlü kuvvetler
        </button>
        <button
          type="button"
          className={styles.modeButton}
          aria-pressed={!opposite}
          onClick={() => setMode("same")}
        >
          Aynı yönlü kuvvetler
        </button>
      </div>

      <div className={styles.stage}>
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="Kutuya uygulanan iki kuvvet, bileşke kuvvet oku ve hareket eden kutu"
        >
          <rect className={styles.panel} x={1} y={1} width={638} height={168} rx={10} />
          <line x1={origin} y1={18} x2={origin} y2={162} className={styles.originLine} />

          <text x={origin} y={38} textAnchor="middle" className={styles.arrowLabel} fill="#2f6fd0">
            {`F₁ = ${f1} N${f1 ? ` (${opposite ? "sola" : "sağa"})` : ""}`}
          </text>
          <ForceArrow x0={origin} x1={f1End} y={54} color="#2f6fd0" width={8} headHalf={9} headLength={14} />

          <text x={origin} y={80} textAnchor="middle" className={styles.arrowLabel} fill="#d9661f">
            {`F₂ = ${f2} N${f2 ? " (sağa)" : ""}`}
          </text>
          <ForceArrow x0={origin} x1={f2End} y={96} color="#d9661f" width={8} headHalf={9} headLength={14} />

          <text x={origin} y={126} textAnchor="middle" className={styles.arrowLabel} fill="#2f8a57">
            {`Bileşke kuvvet = ${Math.abs(net)} N${net ? ` (${directionName(net)})` : ""}`}
          </text>
          <ForceArrow x0={origin} x1={netEnd} y={145} color="#2f8a57" width={10} headHalf={12} headLength={16} />

          <rect className={styles.ground} x={0} y={FLOOR} width={640} height={50} />
          <line x1={0} y1={FLOOR} x2={640} y2={FLOOR} className={styles.groundLine} />
          <g transform={`translate(${-tickShift} 0)`}>
            {Array.from({ length: 13 }, (_, index) => (
              <line key={index} x1={index * 60} y1={FLOOR} x2={index * 60} y2={FLOOR + 12} className={styles.tick} />
            ))}
          </g>

          {/* F2 kişisi önce çizilir; aynı yönlü modda F1 kişisinin arkasında kalır. */}
          <Person
            x={opposite ? 510 : 565}
            towardBox={-1}
            ropeY={opposite ? -34 : -44}
            force={f2}
            edgeX={BOX_CENTER + 40}
            color="#d9661f"
          />
          <Person
            x={opposite ? 130 : 520}
            towardBox={opposite ? 1 : -1}
            ropeY={opposite ? -34 : -26}
            force={f1}
            edgeX={opposite ? BOX_CENTER - 40 : BOX_CENTER + 40}
            color="#2f6fd0"
          />

          <g transform={`translate(${BOX_CENTER} ${FLOOR})`}>
            <rect x={-40} y={-60} width={80} height={60} rx={3} className={styles.box} />
            <line x1={-40} y1={-40} x2={40} y2={-40} className={styles.boxLine} />
            <line x1={-40} y1={-20} x2={40} y2={-20} className={styles.boxLine} />
            <text x={0} y={-26} textAnchor="middle" className={styles.boxText}>
              Kutu
            </text>
          </g>
        </svg>
        <p className={styles.caption}>
          Okların uzunluğu kuvvetin büyüklüğüyle orantılıdır. Kuvvet birimi newton (N) dur.
        </p>
      </div>

      <div className={styles.result} aria-live="polite">
        <p className={styles.equation}>{equation}</p>
        <p className={styles.explanation}>{explanation}</p>
        <p className={styles.status}>{status}</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="kuvvet-f1">
            <span className={`${styles.dot} ${styles.dotBlue}`} aria-hidden="true" />
            F₁ (mavi kişi)
            <b>{f1} N</b>
          </label>
          <input
            id="kuvvet-f1"
            className={styles.sliderBlue}
            type="range"
            min={0}
            max={MAX_FORCE}
            step={1}
            value={f1}
            onChange={(event) => setF1(Number(event.target.value))}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="kuvvet-f2">
            <span className={`${styles.dot} ${styles.dotOrange}`} aria-hidden="true" />
            F₂ (turuncu kişi)
            <b>{f2} N</b>
          </label>
          <input
            id="kuvvet-f2"
            className={styles.sliderOrange}
            type="range"
            min={0}
            max={MAX_FORCE}
            step={1}
            value={f2}
            onChange={(event) => setF2(Number(event.target.value))}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.secondaryButton} onClick={() => setPlaying((value) => !value)}>
          {playing ? "Duraklat" : "Devam et"}
        </button>
        {opposite && (
          <button type="button" className={styles.secondaryButton} onClick={() => setF2(f1)}>
            Kuvvetleri dengele
          </button>
        )}
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => setMotion((current) => ({ ...current, velocity: 0 }))}
        >
          Kutuyu durdur
        </button>
        <button type="button" className={styles.secondaryButton} onClick={resetAll}>
          Sıfırla <span aria-hidden="true">↻</span>
        </button>
      </div>

      <div className={styles.tryBox}>
        <p className={styles.tryTitle}>Dene ve keşfet</p>
        <ol>
          <li>Zıt yönlü kuvvetlerde F₁ ile F₂’yi eşit yap. Bileşke kuvvet kaç N oldu?</li>
          <li>F₂’yi F₁’den büyük yap. Bileşke kuvvet hangi yöne doğru?</li>
          <li>Aynı yönlü kuvvetlere geç. Kuvvetler toplanınca bileşke nasıl değişiyor?</li>
          <li>Kutu giderken kuvvetleri dengele. Kutunun hareketi nasıl değişiyor?</li>
        </ol>
      </div>
    </section>
  );
}

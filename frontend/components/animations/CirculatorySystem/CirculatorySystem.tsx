"use client";

import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/* 7. sınıf dolaşım sistemi: küçük ve büyük kan dolaşımı.
   Damarlar ve organlar SVG, akan kan hücreleri Canvas, geçişler Framer Motion ile çizilir. */

const W = 700;
const H = 860;
const SPRING = { type: "spring", stiffness: 260, damping: 26 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

type Loop = "k" | "b" | "h"; // küçük, büyük, kalp içi
type Mode = "all" | "k" | "b";
type Key = "ra" | "rv" | "la" | "lv" | "pa" | "lung" | "pv" | "aorta" | "head" | "body" | "vena";
type Seg = { d: string; o: [number, number]; loop: Loop; key: Key; w: number; cap?: boolean };

const SEG: Record<string, Seg> = {
  rarv: { d: "M305 372 C292 395 298 428 320 452", o: [0, 0], loop: "h", key: "rv", w: 14 },
  trunk: { d: "M320 452 C338 410 350 350 350 292", o: [0, 0], loop: "k", key: "pa", w: 17 },
  paL: { d: "M350 292 C338 232 225 226 158 284", o: [0, 0], loop: "k", key: "pa", w: 13 },
  paR: { d: "M350 292 C362 232 475 226 542 284", o: [0, 0], loop: "k", key: "pa", w: 13 },
  capL: { d: "M158 284 C112 288 62 330 102 346 C142 362 62 374 90 400 C108 420 140 420 160 408", o: [0, 1], loop: "k", key: "lung", w: 6, cap: true },
  capR: { d: "M542 284 C588 288 638 330 598 346 C558 362 638 374 610 400 C592 420 560 420 540 408", o: [0, 1], loop: "k", key: "lung", w: 6, cap: true },
  pvL: { d: "M160 408 C225 440 320 342 394 372", o: [1, 1], loop: "k", key: "pv", w: 13 },
  pvR: { d: "M540 408 C492 428 450 372 394 372", o: [1, 1], loop: "k", key: "pv", w: 13 },
  lalv: { d: "M394 372 C412 398 408 438 384 456", o: [1, 1], loop: "h", key: "lv", w: 14 },
  asc: { d: "M384 456 C366 420 374 330 392 284", o: [1, 1], loop: "b", key: "aorta", w: 19 },
  aUp: { d: "M392 284 C412 230 438 190 428 150 C422 118 406 102 388 96", o: [1, 1], loop: "b", key: "aorta", w: 14 },
  headCap: { d: "M388 96 C420 40 360 30 364 66 C368 104 332 104 336 66 C340 30 280 40 312 96", o: [1, 0], loop: "b", key: "head", w: 6, cap: true },
  svc: { d: "M312 96 C288 112 270 142 270 200 L270 292 C270 332 284 354 305 372", o: [0, 0], loop: "b", key: "vena", w: 15 },
  aDown: { d: "M392 284 C416 238 478 258 478 330 L478 640 C478 702 450 742 408 752", o: [1, 1], loop: "b", key: "aorta", w: 17 },
  bodyCap: { d: "M408 752 C410 698 366 700 374 752 C382 808 344 808 350 752 C356 696 318 696 326 752 C334 806 292 806 292 752", o: [1, 0], loop: "b", key: "body", w: 6, cap: true },
  ivc: { d: "M292 752 C252 744 226 706 226 640 L226 500 C226 430 262 388 305 372", o: [0, 0], loop: "b", key: "vena", w: 17 },
};
const SEG_IDS = Object.keys(SEG);

const ROUTES: string[][] = ["L", "R"].flatMap((s) => [
  ["rarv", "trunk", "pa" + s, "cap" + s, "pv" + s, "lalv", "asc", "aUp", "headCap", "svc"],
  ["rarv", "trunk", "pa" + s, "cap" + s, "pv" + s, "lalv", "asc", "aDown", "bodyCap", "ivc"],
]);

type Info = { name: string; tag: string; tone: string; text: string; tip: string };
const RED = "#ff4d6d";
const BLUE = "#4cc9f0";
const PURPLE = "#c77dff";

const INFO: Record<Key, Info> = {
  ra: { name: "Sağ kulakçık", tag: "Oksijence fakir", tone: BLUE, text: "Vücuttan gelen oksijence fakir kanı toplar ve sağ karıncığa aktarır.", tip: "Büyük kan dolaşımı burada biter." },
  rv: { name: "Sağ karıncık", tag: "Oksijence fakir", tone: BLUE, text: "Oksijence fakir kanı akciğer atardamarıyla akciğerlere pompalar.", tip: "Küçük kan dolaşımı buradan başlar." },
  la: { name: "Sol kulakçık", tag: "Oksijence zengin", tone: RED, text: "Akciğerlerden gelen oksijence zengin kanı toplar ve sol karıncığa aktarır.", tip: "Küçük kan dolaşımı burada biter." },
  lv: { name: "Sol karıncık", tag: "Oksijence zengin", tone: RED, text: "Oksijence zengin kanı aort ile bütün vücuda pompalar. Kas duvarı en kalın odacıktır.", tip: "Büyük kan dolaşımı buradan başlar." },
  pa: { name: "Akciğer atardamarı", tag: "Oksijence fakir", tone: BLUE, text: "Kanı sağ karıncıktan akciğerlere götürür. Kanı kalpten uzaklaştırdığı için atardamardır.", tip: "Dikkat: Atardamar olduğu hâlde oksijence fakir kan taşır." },
  lung: { name: "Akciğer kılcal damarları", tag: "Gaz alışverişi", tone: PURPLE, text: "Kan burada karbondioksiti verir, oksijeni alır.", tip: "Kan hücrelerinin maviden kırmızıya dönüşünü izle." },
  pv: { name: "Akciğer toplardamarı", tag: "Oksijence zengin", tone: RED, text: "Akciğerlerde oksijen alan kanı sol kulakçığa getirir. Kanı kalbe getirdiği için toplardamardır.", tip: "Dikkat: Toplardamar olduğu hâlde oksijence zengin kan taşır." },
  aorta: { name: "Aort (ana atardamar)", tag: "Oksijence zengin", tone: RED, text: "Sol karıncıktan çıkan kanı vücuda dağıtır. Duvarı kalın ve esnektir; yüksek basınca dayanır.", tip: "Atardamarlar kanı kalpten uzaklaştırır." },
  head: { name: "Baş kılcal damarları", tag: "Madde alışverişi", tone: PURPLE, text: "Beyin ve baş dokularındaki hücrelere oksijen ve besin verilir; karbondioksit ve atıklar alınır.", tip: "Kılcal damarlar atardamar ile toplardamarı birbirine bağlar." },
  body: { name: "Vücut kılcal damarları", tag: "Madde alışverişi", tone: PURPLE, text: "Organ ve kaslardaki hücrelere oksijen ve besin geçer; karbondioksit ve atıklar kana karışır.", tip: "Egzersizde kaslar daha çok oksijen ister, kalp hızlanır." },
  vena: { name: "Ana toplardamarlar", tag: "Oksijence fakir", tone: BLUE, text: "Üst ve alt ana toplardamar, vücuttan dönen kanı sağ kulakçığa getirir.", tip: "Toplardamarlar kanı kalbe getirir." },
};

const STORY: { seg: string; title: string; text: string; mode: Mode }[] = [
  { seg: "rarv", title: "Yolculuk başlıyor", text: "Merhaba, ben Alyuvar Alya! Vücuttan yeni döndüm, oksijenim azaldı. Sağ kulakçıktan sağ karıncığa geçiyorum.", mode: "all" },
  { seg: "trunk", title: "Sağ karıncık beni fırlattı", text: "Küçük kan dolaşımı başladı! Akciğer atardamarına giriyorum.", mode: "k" },
  { seg: "paL", title: "Akciğere doğru", text: "Atardamardayım ama hâlâ maviyim. Çünkü oksijenim henüz az.", mode: "k" },
  { seg: "capL", title: "Derin bir nefes", text: "Akciğer kılcal damarlarında karbondioksiti bırakıp oksijen alıyorum. Rengim parlak kırmızıya dönüyor!", mode: "k" },
  { seg: "pvL", title: "Kalbe dönüş", text: "Akciğer toplardamarıyla sol kulakçığa gidiyorum. Küçük kan dolaşımı burada tamamlanıyor.", mode: "k" },
  { seg: "lalv", title: "En güçlü odacık", text: "Sol kulakçıktan sol karıncığa iniyorum. Buradaki kas duvarı çok kalın!", mode: "all" },
  { seg: "asc", title: "Büyük yolculuk", text: "Sol karıncık kasıldı, aorta fırladım. Büyük kan dolaşımı başladı!", mode: "b" },
  { seg: "aDown", title: "Aort boyunca", text: "Organlara ve kaslara oksijen götürüyorum.", mode: "b" },
  { seg: "bodyCap", title: "Teslimat zamanı", text: "Vücut kılcallarında hücrelere oksijen veriyorum, karbondioksit kana karışıyor. Rengim yine koyulaşıyor.", mode: "b" },
  { seg: "ivc", title: "Eve dönüş", text: "Alt ana toplardamarla sağ kulakçığa dönüyorum. Büyük kan dolaşımı tamamlandı. Haydi baştan!", mode: "b" },
];

const LUNG_L = "M232 262 C170 218 48 262 44 366 C42 442 80 472 134 456 C196 438 236 446 240 398 C246 340 246 288 232 262Z";
const LUNG_R = "M468 262 C530 218 652 262 656 366 C658 442 620 472 566 456 C504 438 464 446 460 398 C454 340 454 288 468 262Z";
const HEART = "M262 372 C256 316 322 322 350 352 C380 318 450 322 440 384 C434 450 388 498 354 520 C312 498 268 440 262 372Z";
const CHAMBERS: { key: Key; cx: number; cy: number; rx: number; ry: number; label: string[]; red: boolean }[] = [
  { key: "ra", cx: 307, cy: 374, rx: 35, ry: 29, label: ["Sağ", "kulakçık"], red: false },
  { key: "la", cx: 395, cy: 374, rx: 35, ry: 29, label: ["Sol", "kulakçık"], red: true },
  { key: "rv", cx: 315, cy: 441, rx: 33, ry: 40, label: ["Sağ", "karıncık"], red: false },
  { key: "lv", cx: 389, cy: 441, rx: 36, ry: 42, label: ["Sol", "karıncık"], red: true },
];

const blood = (o: number) => {
  const t = Math.max(0, Math.min(1, o));
  const m = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${m(76, 255)},${m(201, 77)},${m(240, 109)})`;
};
const segColor = (s: Seg) => (s.cap ? PURPLE : s.o[0] ? RED : BLUE);

type Pt = { x: number; y: number };
type Track = { pts: Pt[]; len: number };
type Cell = { route: number; s: number; dx: number; dy: number; jitter: number };
type Ripple = { x: number; y: number; t: number };

const at = (tr: Track, s: number): Pt => {
  const i = Math.max(0, Math.min(tr.pts.length - 1.001, (s / tr.len) * (tr.pts.length - 1)));
  const a = tr.pts[Math.floor(i)];
  const b = tr.pts[Math.floor(i) + 1];
  const f = i - Math.floor(i);
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
};

export default function CirculatorySystem() {
  const [mode, setMode] = useState<Mode>("all");
  const [selected, setSelected] = useState<Key | null>(null);
  const [hovered, setHovered] = useState<Key | null>(null);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [exercise, setExercise] = useState(false);
  const [story, setStory] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tracks = useRef<Record<string, Track>>({});
  const cells = useRef<Cell[]>([]);
  const pointer = useRef<Pt | null>(null);
  const ripples = useRef<Ripple[]>([]);
  const beat = useRef(0);
  const hero = useRef(0);
  const clock = useRef(0);
  const visible = useRef(true);

  const atriaScale = useMotionValue(1);
  const ventScale = useMotionValue(1);
  const tiltX = useSpring(0, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 18 });

  const shownMode: Mode = story === null ? mode : STORY[story].mode;
  const focus: Key | null = story === null ? selected : SEG[STORY[story].seg].key;

  // Damar yollarını bir kez örnekle (her karede getPointAtLength çağırmamak için)
  useEffect(() => {
    const NS = "http://www.w3.org/2000/svg";
    for (const id of SEG_IDS) {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", SEG[id].d);
      const len = p.getTotalLength();
      const n = Math.max(24, Math.ceil(len / 3));
      const pts = Array.from({ length: n + 1 }, (_, i) => {
        const q = p.getPointAtLength((len * i) / n);
        return { x: q.x, y: q.y };
      });
      tracks.current[id] = { pts, len };
    }
    const PER = 24;
    cells.current = ROUTES.flatMap((r, route) => {
      const total = r.reduce((a, id) => a + tracks.current[id].len, 0);
      return Array.from({ length: PER }, (_, i) => ({
        route,
        s: (total * (i + route / ROUTES.length)) / PER,
        dx: 0,
        dy: 0,
        jitter: Math.random() * 2 - 1,
      }));
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    hero.current = 0;
  }, [story]);

  // Telefonda hikâye başlayınca şemayı ekrana getirir; anlatım kartı altta sabit kalır
  const inStory = story !== null;
  useEffect(() => {
    if (inStory && window.innerWidth <= 820) stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [inStory]);

  useAnimationFrame((_, delta) => {
    const canvas = canvasRef.current;
    if (!canvas || !visible.current || !cells.current.length) return;
    const dt = Math.min(delta, 50) / 1000;
    const bpm = exercise ? 130 : 72;
    if (playing) beat.current = (beat.current + dt * (bpm / 60) * speed) % 1;
    clock.current += dt;

    // Önce kulakçıklar, ardından karıncıklar kasılır
    const pulse = (from: number, to: number) => {
      const p = beat.current;
      return p > from && p < to ? Math.sin(((p - from) / (to - from)) * Math.PI) : 0;
    };
    const aK = pulse(0, 0.2);
    const vK = pulse(0.2, 0.52);
    atriaScale.set(1 - 0.11 * aK);
    ventScale.set(1 - 0.12 * vK);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (canvas.width !== Math.round(cw * dpr)) {
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const flow = playing ? 62 * speed * (exercise ? 1.8 : 1) * (0.65 + 1.5 * vK) : 0;
    const mouse = pointer.current;
    const ease = 1 - Math.exp(-dt * 12);

    for (const c of cells.current) {
      c.s += flow * dt;
      const route = ROUTES[c.route];
      const total = route.reduce((a, id) => a + tracks.current[id].len, 0);
      let s = c.s % total;
      let id = route[0];
      for (const r of route) {
        id = r;
        if (s <= tracks.current[r].len) break;
        s -= tracks.current[r].len;
      }
      const seg = SEG[id];
      const tr = tracks.current[id];
      const p = at(tr, s);
      const ox = seg.o[0] + (seg.o[1] - seg.o[0]) * (s / tr.len);

      // Fare yaklaşınca hücreler yay gibi kenara çekilir
      let tx = 0;
      let ty = 0;
      if (mouse) {
        const ddx = p.x - mouse.x;
        const ddy = p.y - mouse.y;
        const d = Math.hypot(ddx, ddy);
        if (d < 70 && d > 0.1) {
          const push = (1 - d / 70) * 22;
          tx = (ddx / d) * push;
          ty = (ddy / d) * push;
        }
      }
      c.dx += (tx - c.dx) * ease;
      c.dy += (ty - c.dy) * ease;

      const dim = story !== null ? 0.22 : shownMode === "all" || seg.loop === shownMode || seg.loop === "h" ? 1 : 0.1;
      const spread = seg.cap ? 1.5 : seg.w * 0.18;
      const x = p.x + c.dx + c.jitter * spread;
      const y = p.y + c.dy - c.jitter * spread * 0.5;
      const color = blood(ox);
      ctx.globalAlpha = 0.22 * dim;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = dim;
      ctx.beginPath();
      ctx.arc(x, y, 4.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.75)";
      ctx.beginPath();
      ctx.arc(x - 1.2, y - 1.4, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hikâye modu: büyük alyuvar o bölümü baştan sona dolaşır
    if (story !== null) {
      const id = STORY[story].seg;
      const seg = SEG[id];
      const tr = tracks.current[id];
      if (playing) hero.current = (hero.current + (dt * speed) / Math.max(3.2, tr.len / 90)) % 1;
      const p = at(tr, hero.current * tr.len);
      const color = blood(seg.o[0] + (seg.o[1] - seg.o[0]) * hero.current);
      const glow = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, 42);
      glow.addColorStop(0, color);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#0b1020";
      ctx.beginPath();
      ctx.arc(p.x - 5, p.y - 3, 2.4, 0, Math.PI * 2);
      ctx.arc(p.x + 5, p.y - 3, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#0b1020";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y + 2, 5.5, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
    }

    // Akciğerlerde O₂ içeri, CO₂ dışarı
    ctx.font = "700 15px system-ui, sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i < 2; i++) {
      const t = (clock.current * 0.28 + i / 2) % 1;
      for (const [cx, dir] of [[104, 1], [596, -1]]) {
        ctx.globalAlpha = Math.sin(t * Math.PI) * (shownMode === "b" ? 0.15 : 0.95);
        ctx.fillStyle = "#7ef9c4";
        ctx.fillText("O₂", cx + dir * (t * 22 - 22), 300 + i * 58);
        ctx.fillStyle = "#ffd166";
        ctx.fillText("CO₂", cx + dir * (22 - t * 52), 326 + i * 58);
      }
    }

    // Tıklama halkaları
    ripples.current = ripples.current.filter((r) => clock.current - r.t < 0.8);
    for (const r of ripples.current) {
      const k = (clock.current - r.t) / 0.8;
      ctx.globalAlpha = 1 - k;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3 * (1 - k) + 0.5;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 8 + 70 * (1 - Math.pow(1 - k, 3)), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });

  const toStage = (e: ReactPointerEvent) => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };
  const onMove = (e: ReactPointerEvent) => {
    const p = toStage(e);
    pointer.current = p;
    const r = rootRef.current!.getBoundingClientRect();
    rootRef.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    rootRef.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (e.pointerType === "mouse") {
      tiltY.set((p.x / W - 0.5) * 6);
      tiltX.set((0.5 - p.y / H) * 5);
    }
  };
  const onLeave = () => {
    pointer.current = null;
    tiltX.set(0);
    tiltY.set(0);
  };
  const onDown = (e: ReactPointerEvent) => {
    ripples.current.push({ ...toStage(e), t: clock.current });
  };

  const pick = useCallback((k: Key) => {
    setStory(null);
    setSelected(k);
  }, []);
  const changeMode = (m: Mode) => {
    setStory(null);
    setSelected(null);
    setMode(m);
  };
  const stepStory = (d: number) => setStory((s) => ((s ?? 0) + d + STORY.length) % STORY.length);

  const hot = (k: Key) => ({
    role: "button",
    tabIndex: 0,
    "aria-label": INFO[k].name,
    onClick: () => pick(k),
    onPointerEnter: () => setHovered(k),
    onPointerLeave: () => setHovered(null),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pick(k);
      }
    },
    className: "ds-hot",
  });
  const segOpacity = (s: Seg) => {
    if (story !== null) return s === SEG[STORY[story].seg] ? 1 : 0.28;
    return shownMode === "all" || s.loop === shownMode || s.loop === "h" ? 1 : 0.14;
  };
  const lit = (k: Key) => focus === k || hovered === k;
  const info = selected ? INFO[selected] : null;

  return (
    <div ref={rootRef} className="ds-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ds-aurora" aria-hidden="true" />

      <div className="ds-bar ds-glass">
        <div className="ds-seg" role="group" aria-label="Dolaşım türü">
          {([["all", "Tüm dolaşım"], ["k", "Küçük dolaşım"], ["b", "Büyük dolaşım"]] as const).map(([m, label]) => (
            <button key={m} type="button" aria-pressed={story === null && mode === m} onClick={() => changeMode(m)}>
              {story === null && mode === m && <motion.span layoutId="ds-pill" className="ds-pill" transition={SPRING} />}
              <span>{label}</span>
            </button>
          ))}
        </div>
        <motion.button type="button" className="ds-btn ds-story" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} transition={SPRING}
          onClick={() => { setSelected(null); setPlaying(true); setStory(story === null ? 0 : null); }}>
          {story === null ? "🎬 Alyuvar Alya'nın Yolculuğu" : "✕ Hikâyeden çık"}
        </motion.button>
      </div>

      <div className="ds-grid">
        <div className="ds-stagewrap ds-glass">
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }}>
            <div ref={stageRef} className="ds-stage" onPointerMove={onMove} onPointerLeave={onLeave} onPointerDown={onDown} onPointerUp={(e) => e.pointerType !== "mouse" && onLeave()} onPointerCancel={onLeave}>
              <svg viewBox={`0 0 ${W} ${H}`} aria-label="Küçük ve büyük kan dolaşımı şeması">
                <defs>
                  <linearGradient id="ds-lung" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ff8fab" stopOpacity=".32" />
                    <stop offset="1" stopColor="#7b2cbf" stopOpacity=".16" />
                  </linearGradient>
                  <radialGradient id="ds-red" cx=".35" cy=".3" r=".8">
                    <stop offset="0" stopColor="#ff8fa3" />
                    <stop offset="1" stopColor="#a4133c" />
                  </radialGradient>
                  <radialGradient id="ds-blue" cx=".35" cy=".3" r=".8">
                    <stop offset="0" stopColor="#90e0ef" />
                    <stop offset="1" stopColor="#023e8a" />
                  </radialGradient>
                </defs>

                {/* organlar */}
                <g {...hot("lung")}>
                  {[LUNG_L, LUNG_R].map((d) => (
                    <motion.path key={d} d={d} fill="url(#ds-lung)" stroke="#ff8fab" strokeWidth={lit("lung") ? 4 : 1.5}
                      animate={playing ? { scale: [1, 1.035, 1] } : { scale: 1 }}
                      transition={{ duration: exercise ? 1.8 : 3.6, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
                      style={{ originX: "50%", originY: "50%" }} />
                  ))}
                </g>
                <g {...hot("head")}>
                  <circle cx="350" cy="68" r="60" fill="rgba(199,125,255,.10)" stroke={PURPLE} strokeWidth={lit("head") ? 4 : 1.2} />
                </g>
                <g {...hot("body")}>
                  <rect x="262" y="694" width="176" height="112" rx="46" fill="rgba(199,125,255,.10)" stroke={PURPLE} strokeWidth={lit("body") ? 4 : 1.2} />
                </g>
                <path d={HEART} fill="rgba(255,77,109,.14)" stroke="rgba(255,143,163,.55)" strokeWidth="2" />

                {/* damarlar */}
                {SEG_IDS.filter((id) => SEG[id].loop !== "h").map((id) => {
                  const s = SEG[id];
                  const c = segColor(s);
                  return (
                    <motion.g key={id} initial={false} animate={{ opacity: segOpacity(s) }} transition={{ duration: 0.5, ease: EASE }}>
                      <g {...hot(s.key)} tabIndex={id === "paR" || id === "capR" || id === "pvR" ? -1 : 0} fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d={s.d} stroke={c} strokeWidth={s.w + (lit(s.key) ? 18 : 9)} opacity={lit(s.key) ? 0.32 : 0.1} />
                        <path d={s.d} stroke={c} strokeWidth={s.w} opacity={s.cap ? 0.6 : 0.42} />
                        <path d={s.d} stroke="#fff" strokeWidth="1.2" opacity=".28" />
                        <path d={s.d} stroke="transparent" strokeWidth="30" />
                      </g>
                    </motion.g>
                  );
                })}

                {/* kalp odacıkları */}
                {CHAMBERS.map((c) => (
                  <g key={c.key} {...hot(c.key)}>
                    <motion.ellipse cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} fill={c.red ? "url(#ds-red)" : "url(#ds-blue)"} fillOpacity=".82"
                      stroke={lit(c.key) ? "#fff" : "rgba(255,255,255,.35)"} strokeWidth={lit(c.key) ? 4 : 1.5}
                      style={{ scale: c.key === "ra" || c.key === "la" ? atriaScale : ventScale, originX: "50%", originY: "50%" }} />
                    {c.label.map((line, i) => (
                      <text key={line} x={c.cx} y={c.cy - 2 + i * 15} textAnchor="middle" className="ds-chamber">{line}</text>
                    ))}
                  </g>
                ))}

                {/* etiketler */}
                <g className="ds-labels" pointerEvents="none">
                  <text x="350" y="149" textAnchor="middle" fill="#e0aaff">BAŞ</text>
                  <text x="350" y="836" textAnchor="middle" fill="#e0aaff">VÜCUT (organlar, kaslar)</text>
                  <text x="105" y="494" textAnchor="middle" fill="#ffb3c6">SAĞ AKCİĞER</text>
                  <text x="595" y="494" textAnchor="middle" fill="#ffb3c6">SOL AKCİĞER</text>
                  <text x="350" y="548" textAnchor="middle" fill="#fff">KALP</text>
                  <text x="258" y="170" textAnchor="end" fill={BLUE}>Üst ana toplardamar</text>
                  <text x="214" y="604" textAnchor="end" fill={BLUE}>Alt ana</text>
                  <text x="214" y="626" textAnchor="end" fill={BLUE}>toplardamar</text>
                  <text x="492" y="604" fill={RED}>Aort</text>
                  <text x="164" y="222" textAnchor="middle" fill={BLUE}>Akciğer atardamarı</text>
                  <text x="570" y="532" textAnchor="middle" fill={RED}>Akciğer toplardamarı</text>
                  <path d="M552 512 L520 422" stroke={RED} strokeDasharray="4 5" fill="none" />
                </g>
              </svg>
              <canvas ref={canvasRef} aria-hidden="true" />
              <AnimatePresence>
                {hovered && (
                  <motion.div key={hovered} className="ds-tip ds-glass" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={SPRING}>
                    {INFO[hovered].name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <div className="ds-legend">
            <span><i style={{ background: RED }} />Oksijence zengin</span>
            <span><i style={{ background: BLUE }} />Oksijence fakir</span>
            <span><i style={{ background: PURPLE }} />Kılcal damar</span>
          </div>
        </div>

        <div className={`ds-side ${story !== null ? "ds-sticky" : ""}`}>
          <div className="ds-card ds-glass" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={story !== null ? `s${story}` : selected ?? shownMode} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: EASE }}>
                {story !== null ? (
                  <>
                    <small>Durak {story + 1} / {STORY.length}</small>
                    <h3>{STORY[story].title}</h3>
                    <p>{STORY[story].text}</p>
                  </>
                ) : info ? (
                  <>
                    <em style={{ color: info.tone, borderColor: info.tone }}>{info.tag}</em>
                    <h3>{info.name}</h3>
                    <p>{info.text}</p>
                    <p className="ds-note">💡 {info.tip}</p>
                  </>
                ) : shownMode === "k" ? (
                  <>
                    <h3>Küçük kan dolaşımı</h3>
                    <p><b>Kalp → Akciğer → Kalp.</b> Amaç: kanın oksijen alıp karbondioksit vermesi.</p>
                    <p className="ds-path">Sağ karıncık → Akciğer atardamarı → Akciğer kılcalları → Akciğer toplardamarı → Sol kulakçık</p>
                  </>
                ) : shownMode === "b" ? (
                  <>
                    <h3>Büyük kan dolaşımı</h3>
                    <p><b>Kalp → Vücut → Kalp.</b> Amaç: hücrelere oksijen ve besin götürmek, atıkları toplamak.</p>
                    <p className="ds-path">Sol karıncık → Aort → Vücut kılcalları → Ana toplardamarlar → Sağ kulakçık</p>
                  </>
                ) : (
                  <>
                    <h3>Kanın yolculuğunu keşfet</h3>
                    <p>Bir odacığa, damara ya da organa dokun. Fareyi kanın üzerinde gezdirerek hücreleri hareket ettir.</p>
                    <p className="ds-note">Şemada kalbin sağ tarafı senin solunda görünür.</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            {story !== null && (
              <>
                <div className="ds-progress"><motion.i animate={{ width: `${((story + 1) / STORY.length) * 100}%` }} transition={SPRING} /></div>
                <div className="ds-row">
                  <button type="button" className="ds-btn" onClick={() => stepStory(-1)}>← Geri</button>
                  <button type="button" className="ds-btn ds-primary" onClick={() => stepStory(1)}>{story === STORY.length - 1 ? "Başa dön ↻" : "İleri →"}</button>
                </div>
              </>
            )}
          </div>

          <div className="ds-card ds-glass ds-controls">
            <div className="ds-row">
              <button type="button" className="ds-btn" onClick={() => setPlaying((p) => !p)}>{playing ? "⏸ Duraklat" : "▶ Oynat"}</button>
              <button type="button" className="ds-btn" aria-pressed={exercise} onClick={() => setExercise((v) => !v)}>🏃 Egzersiz</button>
            </div>
            <label>Akış hızı
              <input type="range" min="0.3" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
            </label>
            <div className="ds-pulse">❤️ Nabız yaklaşık <b>{exercise ? 130 : 72}</b> atım/dk {exercise ? "(egzersiz)" : "(dinlenme)"}</div>
          </div>
          <p className="ds-small">Şema öğretim amacıyla basitleştirilmiştir; organlar gerçek ölçekte değildir.</p>
        </div>
      </div>
    </div>
  );
}

const CSS = `
.ds-root{--mx:50%;--my:30%;position:relative;isolation:isolate;overflow:clip;border-radius:28px;padding:14px;color:#eef2ff;background:#070a18;font-family:inherit}
.ds-root *{box-sizing:border-box}
.ds-aurora{position:absolute;inset:0;z-index:-1;pointer-events:none;background:
 radial-gradient(320px circle at var(--mx) var(--my),rgba(129,140,248,.22),transparent 70%),
 radial-gradient(700px circle at 0% 0%,rgba(76,201,240,.18),transparent 60%),
 radial-gradient(700px circle at 100% 100%,rgba(255,77,109,.18),transparent 60%)}
.ds-glass{background:linear-gradient(145deg,rgba(255,255,255,.10),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 12px 40px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.10);border-radius:20px}
.ds-bar{display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;align-items:center;padding:8px;margin-bottom:12px}
.ds-seg{display:flex;gap:4px;flex:1 1 320px;max-width:480px}
.ds-seg button{position:relative;flex:1;border:0;background:none;color:#eef2ff;font-family:inherit;font-weight:700;font-size:13px;line-height:1.2;padding:10px 6px;min-height:42px;cursor:pointer;border-radius:12px}
.ds-seg button span{position:relative}
.ds-seg .ds-pill{position:absolute;inset:0;border-radius:12px;background:linear-gradient(120deg,#4361ee,#b5179e)}
.ds-btn{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.07);color:#eef2ff;font-family:inherit;font-weight:700;font-size:14px;border-radius:12px;padding:9px 14px;min-height:42px;cursor:pointer;transition:background .25s cubic-bezier(.22,1,.36,1),border-color .25s}
.ds-btn:hover{background:rgba(255,255,255,.16)}
.ds-btn[aria-pressed="true"],.ds-primary{background:linear-gradient(120deg,#f72585,#ff7a45);border-color:transparent}
.ds-story{background:linear-gradient(120deg,#7209b7,#f72585);border-color:transparent}
.ds-root button:focus-visible,.ds-root input:focus-visible{outline:3px solid #ffd166;outline-offset:2px}
.ds-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:12px;align-items:start}
.ds-stagewrap{padding:8px}
.ds-stage{position:relative;width:100%;max-width:640px;margin:0 auto;aspect-ratio:${W}/${H};user-select:none;-webkit-user-select:none;touch-action:pan-y;scroll-margin-top:72px}
.ds-stage svg,.ds-stage canvas{position:absolute;inset:0;width:100%;height:100%}
.ds-stage canvas{pointer-events:none}
.ds-hot{cursor:pointer;outline:none}
.ds-hot:focus-visible{filter:drop-shadow(0 0 6px #ffd166)}
.ds-chamber{font-size:15px;font-weight:800;fill:#fff;pointer-events:none;paint-order:stroke;stroke:rgba(0,0,0,.55);stroke-width:3px}
.ds-labels text{font-size:19px;font-weight:800;paint-order:stroke;stroke:#070a18;stroke-width:4px}
.ds-tip{position:absolute;left:8px;top:8px;padding:6px 12px;font-size:13px;font-weight:800;pointer-events:none}
.ds-legend{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;font-size:12px;color:#c7d2fe;padding:6px}
.ds-legend i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;box-shadow:0 0 10px currentColor}
.ds-side{display:grid;gap:12px;position:sticky;top:80px}
.ds-card{padding:16px}
.ds-card h3{margin:8px 0;font-size:20px;font-weight:800;line-height:1.25}
.ds-card p{margin:8px 0;line-height:1.55;color:#dbe4ff;font-size:15px}
.ds-card small{color:#a5b4fc;font-weight:800}
.ds-card em{display:inline-block;font-style:normal;font-size:12px;font-weight:800;border:1px solid;border-radius:99px;padding:3px 10px}
.ds-card .ds-note{font-size:13px;color:#ffe29a}
.ds-card .ds-path{font-size:13px;font-weight:700}
.ds-row{display:flex;gap:8px;margin-top:10px}
.ds-row .ds-btn{flex:1}
.ds-controls .ds-row{margin-top:0}
.ds-controls label{display:flex;align-items:center;gap:10px;font-size:13px;margin:12px 0 8px}
.ds-controls input{flex:1;accent-color:#f72585}
.ds-pulse{font-size:13px;color:#c7d2fe}
.ds-progress{height:6px;border-radius:9px;background:rgba(255,255,255,.12);overflow:hidden;margin-top:12px}
.ds-progress i{display:block;height:100%;background:linear-gradient(90deg,#4cc9f0,#f72585)}
.ds-small{font-size:12px;color:#94a3c8;margin:0;padding:0 6px}
@media (max-width:820px){
 .ds-root{padding:8px;border-radius:20px}
 .ds-grid{grid-template-columns:minmax(0,1fr)}
 .ds-side{position:static}
 .ds-side.ds-sticky{display:contents}
 .ds-side.ds-sticky>.ds-card:first-child{position:sticky;bottom:8px;z-index:5;background:rgba(12,16,38,.92);padding:12px}
 .ds-side.ds-sticky>.ds-card:first-child h3{font-size:16px;margin:4px 0}
 .ds-side.ds-sticky>.ds-card:first-child p{font-size:13px;margin:4px 0}
}
`;

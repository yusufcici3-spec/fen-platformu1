"use client";

import { useEffect, useRef } from "react";
import { MAX_SIMULATION_DAYS, PLANETS, type Planet } from "./planetData";

export type DistanceMode = "true" | "tour";

type Props = {
  selectedPlanetId: Planet["id"];
  simulationDay: number;
  isPlaying: boolean;
  speed: number;
  distanceMode: DistanceMode;
  focused: boolean;
  zoom: number;
  onSelectPlanet: (id: Planet["id"]) => void;
  onSimulationDay: (day: number) => void;
};

type Marker = { id: Planet["id"]; x: number; y: number; radius: number };

const Y_FLATTEN = 0.36;
const CYCLE_SECONDS_AT_1X = 240;

function distanceFor(planet: Planet, mode: DistanceMode, maxAu: number) {
  if (mode === "true") return planet.meanSunDistanceAu;
  return (Math.log1p(planet.meanSunDistanceAu) / Math.log1p(maxAu)) * maxAu;
}

function drawSphere(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | undefined,
  planet: Planet,
  x: number,
  y: number,
  radius: number,
  day: number,
  isSelected: boolean,
) {
  if (planet.id === "saturn") {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.24);
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 2.05, radius * 0.68, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(230, 207, 166, .82)";
    ctx.lineWidth = Math.max(1, radius * 0.22);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 1.45, radius * 0.46, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(85, 67, 53, .72)";
    ctx.lineWidth = Math.max(1, radius * 0.12);
    ctx.stroke();
    ctx.restore();
  }

  if (isSelected) {
    const halo = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius * 2.4);
    halo.addColorStop(0, "rgba(128, 200, 255, .26)");
    halo.addColorStop(1, "rgba(128, 200, 255, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.clip();

  if (image?.complete && image.naturalWidth > 0) {
    const sourceWidth = image.naturalWidth;
    const rotationDirection = planet.rotationPeriodHours < 0 ? -1 : 1;
    const start = (((0.25 + rotationDirection * day * 24 / Math.max(1, Math.abs(planet.rotationPeriodHours))) % 1) + 1) % 1 * image.naturalWidth;
    let remaining = sourceWidth;
    let sourceX = start;
    let destinationX = x - radius;
    while (remaining > 0.1) {
      const slice = Math.min(remaining, image.naturalWidth - sourceX);
      const destinationWidth = (2 * radius * slice) / sourceWidth;
      ctx.drawImage(
        image,
        sourceX,
        0,
        slice,
        image.naturalHeight,
        destinationX,
        y - radius,
        destinationWidth,
        2 * radius,
      );
      remaining -= slice;
      destinationX += destinationWidth;
      sourceX = 0;
    }
  } else {
    ctx.fillStyle = "#6686b8";
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const shade = ctx.createRadialGradient(
    x - radius * 0.42,
    y - radius * 0.33,
    radius * 0.02,
    x - radius * 0.05,
    y - radius * 0.05,
    radius * 1.42,
  );
  shade.addColorStop(0, "rgba(255,255,255,.15)");
  shade.addColorStop(0.42, "rgba(4,10,25,.02)");
  shade.addColorStop(1, "rgba(0,5,22,.83)");
  ctx.globalCompositeOperation = "source-atop";
  ctx.fillStyle = shade;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = isSelected ? "rgba(202,232,255,.95)" : "rgba(222,235,255,.42)";
  ctx.lineWidth = isSelected ? 1.5 : 0.7;
  ctx.stroke();
}

export default function PlanetCanvas(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const propsRef = useRef(props);
  const markersRef = useRef<Marker[]>([]);
  const dayRef = useRef(props.simulationDay);
  propsRef.current = props;

  useEffect(() => {
    dayRef.current = props.simulationDay;
  }, [props.simulationDay]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const images: Record<string, HTMLImageElement> = {};
    PLANETS.forEach((planet) => {
      const image = new Image();
      image.src = planet.textureUrl;
      images[planet.id] = image;
    });

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let stars: { x: number; y: number; size: number; phase: number }[] = [];
    let animationFrame = 0;
    let lastFrame = 0;
    let lastUiUpdate = 0;
    const maxAu = Math.max(...PLANETS.map((planet) => planet.meanSunDistanceAu));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      stars = Array.from({ length: Math.max(95, Math.floor((width * height) / 4100)) }, (_, index) => {
        const seed = (index + 1) * 16807;
        const x = ((seed * 48271) % 2147483647) / 2147483647;
        const y = ((seed * 69621 + 37) % 2147483647) / 2147483647;
        const brightness = ((seed * 127 + 91) % 997) / 997;
        return { x: x * width, y: y * height, size: 0.45 + brightness * 1.25, phase: brightness * 6 };
      });
    };

    const draw = (now: number) => {
      const current = propsRef.current;
      if (lastFrame && current.isPlaying) {
        const elapsedSeconds = Math.min((now - lastFrame) / 1000, 0.08);
        dayRef.current = (dayRef.current + elapsedSeconds * (MAX_SIMULATION_DAYS / CYCLE_SECONDS_AT_1X) * current.speed) % MAX_SIMULATION_DAYS;
      } else if (!current.isPlaying) {
        dayRef.current = current.simulationDay;
      }
      lastFrame = now;

      ctx.clearRect(0, 0, width, height);
      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#050a19");
      background.addColorStop(0.58, "#091127");
      background.addColorStop(1, "#080d1c");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const nebula = ctx.createRadialGradient(width * 0.17, height * 0.17, 3, width * 0.17, height * 0.17, width * 0.5);
      nebula.addColorStop(0, "rgba(61, 85, 176, .15)");
      nebula.addColorStop(1, "rgba(44, 58, 125, 0)");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        ctx.globalAlpha = 0.34 + 0.3 * (0.5 + 0.5 * Math.sin(now * 0.001 + star.phase));
        ctx.fillStyle = "#dce9ff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      const orbitAU = (planet: Planet) => distanceFor(planet, current.distanceMode, maxAu);
      const getWorldPosition = (planet: Planet) => {
        const angle = planet.phase + (2 * Math.PI * dayRef.current) / planet.orbitalPeriodDays;
        const distance = orbitAU(planet);
        return { x: distance * Math.cos(angle), y: distance * Math.sin(angle) * Y_FLATTEN };
      };
      const focusedPlanet = current.focused ? PLANETS.find((planet) => planet.id === current.selectedPlanetId) : undefined;
      const target = focusedPlanet ? getWorldPosition(focusedPlanet) : { x: 0, y: 0 };
      const baseScale = Math.min((width - 42) / (2 * maxAu), (height - 38) / (2 * maxAu * Y_FLATTEN));
      const scale = baseScale * (current.focused ? current.zoom : 1);
      const centerX = width / 2 - target.x * scale;
      const centerY = height / 2 - target.y * scale;

      PLANETS.forEach((planet) => {
        const radiusAu = orbitAU(planet);
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusAu * scale, radiusAu * scale * Y_FLATTEN, 0, 0, Math.PI * 2);
        ctx.strokeStyle = current.focused && planet.id === current.selectedPlanetId
          ? "rgba(134,190,255,.48)"
          : "rgba(142,164,208,.16)";
        ctx.lineWidth = current.focused && planet.id === current.selectedPlanetId ? 1.2 : 0.7;
        ctx.stroke();
      });

      const sunX = centerX;
      const sunY = centerY;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 44);
      sunGlow.addColorStop(0, "rgba(255,216,127,.52)");
      sunGlow.addColorStop(1, "rgba(255,141,57,0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 44, 0, Math.PI * 2);
      ctx.fill();
      const sun = ctx.createRadialGradient(sunX - 4, sunY - 6, 1, sunX, sunY, 13);
      sun.addColorStop(0, "#fff6c2");
      sun.addColorStop(0.55, "#ffce63");
      sun.addColorStop(1, "#f0782d");
      ctx.fillStyle = sun;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 11, 0, Math.PI * 2);
      ctx.fill();
      if (sunX > 4 && sunX < width - 34 && sunY > 14 && sunY < height - 10) {
        ctx.font = "600 10px system-ui, sans-serif";
        ctx.fillStyle = "rgba(255,226,167,.84)";
        ctx.fillText("GÜNEŞ", sunX + 15, sunY + 3);
      }

      const markers: Marker[] = [];
      PLANETS.forEach((planet) => {
        const pos = getWorldPosition(planet);
        const x = centerX + pos.x * scale;
        const y = centerY + pos.y * scale;
        const selected = planet.id === current.selectedPlanetId;
        const baseRadius = 3.2 + Math.min(4.8, Math.log10(planet.diameterKm / 3500) * 3.2);
        const radius = baseRadius * (current.focused ? Math.min(3.1, 1 + current.zoom * 0.14) : 1);
        drawSphere(ctx, images[planet.id], planet, x, y, radius, dayRef.current, selected);
        markers.push({ id: planet.id, x, y, radius: Math.max(radius, 8) });

        if (selected || (!current.focused && planet.meanSunDistanceAu >= 5)) {
          ctx.font = selected ? "700 11px system-ui, sans-serif" : "500 9px system-ui, sans-serif";
          ctx.fillStyle = selected ? "#eef6ff" : "rgba(195,210,239,.78)";
          ctx.fillText(planet.name, x + radius + 5, y - radius - 2);
        }
      });
      markersRef.current = markers;

      ctx.font = "500 9px system-ui, sans-serif";
      ctx.fillStyle = "rgba(192,205,230,.63)";
      ctx.fillText(current.distanceMode === "true" ? "AU oranında yörünge uzaklıkları" : "Keşif görünümü · uzaklıklar sıkıştırılmış", 14, height - 14);

      if (current.isPlaying && now - lastUiUpdate > 140) {
        current.onSimulationDay(Math.round(dayRef.current));
        lastUiUpdate = now;
      }
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    animationFrame = window.requestAnimationFrame(draw);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let closest: Marker | undefined;
    let closestDistance = Number.POSITIVE_INFINITY;
    markersRef.current.forEach((marker) => {
      const distance = Math.hypot(marker.x - x, marker.y - y);
      if (distance <= Math.max(marker.radius + 10, 15) && distance < closestDistance) {
        closest = marker;
        closestDistance = distance;
      }
    });
    if (closest) propsRef.current.onSelectPlanet(closest.id);
  };

  return (
    <canvas
      ref={canvasRef}
      className="solar-system-canvas"
      onPointerUp={handlePointerUp}
      role="img"
      aria-label="Güneş çevresinde yörüngelerinde hareket eden, tıklanabilir sekiz gezegenin uzay görünümü"
    />
  );
}

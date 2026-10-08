export const GRAVITY = 9.8;
export const MIN_MASS_KG = 1;
export const MAX_MASS_KG = 5;
export const MIN_HEIGHT_M = 3;
export const MAX_HEIGHT_M = 12;

const TRACK_PROFILE = [1, 0.2, 0.62, 0.12, 0.52, 0.15, 0.43, 0.08, 0.04] as const;

export function clamp(value: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, value));
}

export function trackHeightRatio(progress: number): number {
  const t = clamp(progress) * (TRACK_PROFILE.length - 1);
  const index = Math.min(Math.floor(t), TRACK_PROFILE.length - 2);
  const raw = t - index;
  const smooth = raw * raw * (3 - 2 * raw);
  return TRACK_PROFILE[index] + (TRACK_PROFILE[index + 1] - TRACK_PROFILE[index]) * smooth;
}

export interface EnergyState {
  heightM: number;
  potentialJ: number;
  kineticJ: number;
  thermalJ: number;
  totalJ: number;
  speedMps: number;
  trackRatio: number;
}

/** Basitleştirilmiş model: potansiyel + kinetik + ısı enerjisi toplamı korunur. */
export function calculateEnergyState(
  massKg: number,
  startHeightM: number,
  progress: number,
  frictionEnabled: boolean,
): EnergyState {
  const mass = Math.max(MIN_MASS_KG, massKg);
  const startHeight = Math.max(MIN_HEIGHT_M, startHeightM);
  const position = clamp(progress);
  const trackRatio = trackHeightRatio(position);
  const totalJ = mass * GRAVITY * startHeight;
  const heightM = startHeight * trackRatio;
  const potentialJ = mass * GRAVITY * heightM;
  const thermalJ = frictionEnabled ? totalJ * 0.18 * position : 0;
  const kineticJ = Math.max(0, totalJ - potentialJ - thermalJ);
  const speedMps = Math.sqrt((2 * kineticJ) / mass);

  return {
    heightM,
    potentialJ,
    kineticJ,
    thermalJ,
    totalJ,
    speedMps,
    trackRatio,
  };
}

export function formatEnergy(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 1,
  }).format(value);
}

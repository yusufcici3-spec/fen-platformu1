export const SCHOOL_GRAVITY_N_PER_KG = 10;
export const DYNAMOMETER_CAPACITIES_N = [5, 10, 20] as const;
export type DynamometerCapacityN = (typeof DYNAMOMETER_CAPACITIES_N)[number];

export function massGramsToWeightNewtons(massGrams: number): number {
  return (Math.max(0, massGrams) / 1000) * SCHOOL_GRAVITY_N_PER_KG;
}

export function readingForForce(forceN: number, capacityN: number): number {
  return Math.min(Math.max(0, forceN), capacityN);
}

export function isOverCapacity(forceN: number, capacityN: number): boolean {
  return forceN > capacityN;
}

/** Maps a valid in-range force to the instrument's normalized spring travel. */
export function springExtensionRatio(forceN: number, capacityN: number): number {
  return readingForForce(forceN, capacityN) / capacityN;
}

export function formatTurkish(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits }).format(value);
}

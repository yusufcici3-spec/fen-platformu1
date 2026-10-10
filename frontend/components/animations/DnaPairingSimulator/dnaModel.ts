export const DNA_BASES = ["A", "T", "G", "C"] as const;
export type DnaBase = (typeof DNA_BASES)[number];

export const BASE_INFO: Record<DnaBase, { name: string; complement: DnaBase }> = {
  A: { name: "Adenin", complement: "T" },
  T: { name: "Timin", complement: "A" },
  G: { name: "Guanin", complement: "C" },
  C: { name: "Sitozin", complement: "G" },
};

export const DNA_CHAIN_LENGTHS = [6, 8, 10, 12] as const;
export type DnaChainLength = (typeof DNA_CHAIN_LENGTHS)[number];

const EXAMPLE_PATTERN: readonly DnaBase[] = ["A", "T", "G", "C", "A", "G", "T", "C"];

export function createExampleSequence(length: number): DnaBase[] {
  return Array.from({ length }, (_, index) => EXAMPLE_PATTERN[index % EXAMPLE_PATTERN.length]);
}

export function createRandomSequence(length: number, random: () => number = Math.random): DnaBase[] {
  return Array.from({ length }, () => DNA_BASES[Math.floor(random() * DNA_BASES.length)]);
}

export function complementaryBase(base: DnaBase): DnaBase {
  return BASE_INFO[base].complement;
}

export function isComplementary(first: DnaBase, second: DnaBase): boolean {
  return BASE_INFO[first].complement === second;
}

export function hydrogenBondCount(first: DnaBase, second: DnaBase): 0 | 2 | 3 {
  if (!isComplementary(first, second)) return 0;
  return first === "A" || first === "T" ? 2 : 3;
}

export function countPairingResults(
  firstStrand: readonly DnaBase[],
  secondStrand: readonly (DnaBase | null)[],
) {
  let correct = 0;
  let incorrect = 0;
  let empty = 0;

  firstStrand.forEach((base, index) => {
    const partner = secondStrand[index];
    if (!partner) empty += 1;
    else if (isComplementary(base, partner)) correct += 1;
    else incorrect += 1;
  });

  return { correct, incorrect, empty, paired: correct + incorrect, total: firstStrand.length };
}

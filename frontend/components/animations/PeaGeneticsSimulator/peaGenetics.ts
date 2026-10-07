export const PEA_GENOTYPES = [
  "RRYY",
  "RRYy",
  "RRyy",
  "RrYY",
  "RrYy",
  "Rryy",
  "rrYY",
  "rrYy",
  "rryy",
] as const;

export type PeaGenotype = (typeof PEA_GENOTYPES)[number];
export type PeaPhenotypeId = "round-yellow" | "round-green" | "wrinkled-yellow" | "wrinkled-green";

export interface PeaPhenotype {
  id: PeaPhenotypeId;
  shape: "round" | "wrinkled";
  seedColor: "yellow" | "green";
  shapeLabel: "Yuvarlak" | "Buruşuk";
  colorLabel: "Sarı" | "Yeşil";
  displayLabel: string;
  alleleRule: string;
}

export const PEA_PHENOTYPES: PeaPhenotype[] = [
  {
    id: "round-yellow",
    shape: "round",
    seedColor: "yellow",
    shapeLabel: "Yuvarlak",
    colorLabel: "Sarı",
    displayLabel: "Yuvarlak · Sarı",
    alleleRule: "En az bir R ve bir Y aleli",
  },
  {
    id: "round-green",
    shape: "round",
    seedColor: "green",
    shapeLabel: "Yuvarlak",
    colorLabel: "Yeşil",
    displayLabel: "Yuvarlak · Yeşil",
    alleleRule: "En az bir R; yy",
  },
  {
    id: "wrinkled-yellow",
    shape: "wrinkled",
    seedColor: "yellow",
    shapeLabel: "Buruşuk",
    colorLabel: "Sarı",
    displayLabel: "Buruşuk · Sarı",
    alleleRule: "rr; en az bir Y",
  },
  {
    id: "wrinkled-green",
    shape: "wrinkled",
    seedColor: "green",
    shapeLabel: "Buruşuk",
    colorLabel: "Yeşil",
    displayLabel: "Buruşuk · Yeşil",
    alleleRule: "rryy",
  },
];

export interface CrossResult {
  gametesA: string[];
  gametesB: string[];
  offspring: PeaGenotype[][];
  genotypeCounts: Array<{ genotype: PeaGenotype; count: number }>;
  phenotypeCounts: Record<PeaPhenotypeId, number>;
  total: number;
}

function uniqueAlleles(pair: string, dominant: string): string[] {
  return [...new Set(pair)].sort((left, right) => {
    if (left === dominant) return -1;
    if (right === dominant) return 1;
    return left.localeCompare(right);
  });
}

function combineAlleles(first: string, second: string, dominant: string): string {
  if (first === dominant || second !== dominant) return `${first}${second}`;
  return `${second}${first}`;
}

/** A gamete receives one allele for shape and one for seed color. */
export function getGametes(genotype: PeaGenotype): string[] {
  const shapeAlleles = uniqueAlleles(genotype.slice(0, 2), "R");
  const colorAlleles = uniqueAlleles(genotype.slice(2, 4), "Y");
  return shapeAlleles.flatMap((shapeAllele) =>
    colorAlleles.map((colorAllele) => `${shapeAllele}${colorAllele}`)
  );
}

export function getPhenotype(genotype: PeaGenotype): PeaPhenotype {
  const shape = genotype.slice(0, 2).includes("R") ? "round" : "wrinkled";
  const seedColor = genotype.slice(2, 4).includes("Y") ? "yellow" : "green";
  const id = `${shape}-${seedColor}` as PeaPhenotypeId;
  return PEA_PHENOTYPES.find((phenotype) => phenotype.id === id)!;
}

export function crossPeas(parentA: PeaGenotype, parentB: PeaGenotype): CrossResult {
  const gametesA = getGametes(parentA);
  const gametesB = getGametes(parentB);
  const genotypeCounts = new Map<PeaGenotype, number>();
  const phenotypeCounts: Record<PeaPhenotypeId, number> = {
    "round-yellow": 0,
    "round-green": 0,
    "wrinkled-yellow": 0,
    "wrinkled-green": 0,
  };

  const offspring = gametesB.map((gameteB) =>
    gametesA.map((gameteA) => {
      const genotype = `${combineAlleles(gameteA[0], gameteB[0], "R")}${combineAlleles(
        gameteA[1],
        gameteB[1],
        "Y"
      )}` as PeaGenotype;
      genotypeCounts.set(genotype, (genotypeCounts.get(genotype) ?? 0) + 1);
      phenotypeCounts[getPhenotype(genotype).id] += 1;
      return genotype;
    })
  );

  return {
    gametesA,
    gametesB,
    offspring,
    genotypeCounts: PEA_GENOTYPES.flatMap((genotype) => {
      const count = genotypeCounts.get(genotype) ?? 0;
      return count > 0 ? [{ genotype, count }] : [];
    }),
    phenotypeCounts,
    total: gametesA.length * gametesB.length,
  };
}

/** All unordered parent-genotype pairs: 9 × 10 ÷ 2 = 45. */
export const ALL_CROSS_PAIRS: Array<[PeaGenotype, PeaGenotype]> = [];
for (let first = 0; first < PEA_GENOTYPES.length; first += 1) {
  for (let second = first; second < PEA_GENOTYPES.length; second += 1) {
    ALL_CROSS_PAIRS.push([PEA_GENOTYPES[first], PEA_GENOTYPES[second]]);
  }
}

export const PRESET_CROSSES: Array<{
  label: string;
  parentA: PeaGenotype;
  parentB: PeaGenotype;
}> = [
  { label: "Şekil: RrYY × RrYY", parentA: "RrYY", parentB: "RrYY" },
  { label: "Renk: RRYy × RRYy", parentA: "RRYy", parentB: "RRYy" },
  { label: "İki özellik: RrYy × RrYy", parentA: "RrYy", parentB: "RrYy" },
  { label: "Kontrol çaprazlaması: RrYy × rryy", parentA: "RrYy", parentB: "rryy" },
];

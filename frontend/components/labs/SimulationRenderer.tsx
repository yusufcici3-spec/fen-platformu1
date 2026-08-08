"use client";

import { CircuitBuilder } from "./CircuitBuilder";
import { AcidBaseLab } from "./AcidBaseLab";
import { StateOfMatter } from "./StateOfMatter";
import { DensityTank } from "./DensityTank";
import { SolarSystem } from "./SolarSystem";
import { GenericLabActivity } from "./GenericLabActivity";

/** `componentKey`'e (veya deney slug'ına) göre doğru simülasyon bileşenini render eder. */
export function SimulationRenderer({ componentKey, slug }: { componentKey?: string | null; slug: string }) {
  switch (componentKey) {
    case "circuit-builder":
      return <CircuitBuilder />;
    case "acid-base-lab":
      return <AcidBaseLab />;
    case "state-of-matter":
      return <StateOfMatter />;
    case "density-tank":
      return <DensityTank />;
    case "solar-system":
      return <SolarSystem />;
    default:
      return <GenericLabActivity slug={slug} />;
  }
}

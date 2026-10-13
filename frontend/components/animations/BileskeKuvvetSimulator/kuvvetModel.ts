export type ForceMode = "opposite" | "same";

export const MAX_FORCE = 10;
export const DEFAULT_F1 = 6;
export const DEFAULT_F2 = 3;

// Görsel hız modeli: ivme = bileşke kuvvet × ACCELERATION_PER_NEWTON (piksel/sn²).
export const ACCELERATION_PER_NEWTON = 8;
export const MAX_SPEED = 500;

/** Sağ yön pozitif. Zıt yönlüde F1 sola, F2 sağa; aynı yönlüde ikisi de sağa uygulanır. */
export function netForce(mode: ForceMode, f1: number, f2: number): number {
  return mode === "opposite" ? f2 - f1 : f1 + f2;
}

export function directionName(value: number): "sağa" | "sola" {
  return value >= 0 ? "sağa" : "sola";
}

export function describeResultant(mode: ForceMode, f1: number, f2: number) {
  if (f1 + f2 === 0) {
    return {
      equation: "Kutuya kuvvet uygulanmıyor. Bileşke kuvvet = 0 N",
      explanation: "Kuvvet olmadığı için bileşke kuvvet sıfırdır.",
    };
  }
  if (mode === "same") {
    return {
      equation: `Bileşke kuvvet = F₁ + F₂ = ${f1} + ${f2} = ${f1 + f2} N`,
      explanation: "Aynı yönlü kuvvetler toplanır. Bileşke kuvvet, kuvvetlerle aynı yöndedir: sağa.",
    };
  }
  if (f1 === f2) {
    return {
      equation: `Bileşke kuvvet = F₁ − F₂ = ${f1} − ${f2} = 0 N`,
      explanation:
        "Kuvvetler eşit büyüklükte ve zıt yönlü olduğu için birbirini dengeler. Bunlara dengelenmiş kuvvetler denir.",
    };
  }
  if (f2 > f1) {
    return {
      equation: `Bileşke kuvvet = F₂ − F₁ = ${f2} − ${f1} = ${f2 - f1} N`,
      explanation:
        "Zıt yönlü kuvvetlerde büyük kuvvetten küçük kuvvet çıkarılır. Bileşke kuvvet, büyük kuvvet olan F₂ ile aynı yöndedir: sağa.",
    };
  }
  return {
    equation: `Bileşke kuvvet = F₁ − F₂ = ${f1} − ${f2} = ${f1 - f2} N`,
    explanation:
      "Zıt yönlü kuvvetlerde büyük kuvvetten küçük kuvvet çıkarılır. Bileşke kuvvet, büyük kuvvet olan F₁ ile aynı yöndedir: sola.",
  };
}

export function motionText(mode: ForceMode, f1: number, f2: number, velocity: number): string {
  const net = netForce(mode, f1, f2);
  const speed = Math.abs(velocity);
  const velocityDirection = directionName(velocity);

  if (speed < 1 && net === 0) {
    return f1 + f2 === 0
      ? "Kutuya kuvvet uygulanmıyor: kutu duruyor."
      : "Kuvvetler dengelenmiş: kutu duruyor, hareket durumu değişmiyor.";
  }
  if (net === 0) {
    return `Kuvvetler dengelenmiş: kutu sabit hızla ${velocityDirection} gidiyor, hızı değişmiyor.`;
  }
  if (speed < 1) {
    return `Dengelenmemiş kuvvet var: kutu ${directionName(net)} doğru harekete başlıyor.`;
  }
  if (Math.sign(velocity) === Math.sign(net)) {
    return `Dengelenmemiş kuvvet var: kutu ${velocityDirection} doğru hızlanıyor.`;
  }
  return `Dengelenmemiş kuvvet var: kutu ${velocityDirection} giderken yavaşlıyor.`;
}

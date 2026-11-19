import ZygoteJourney from "@/components/animations/ZygoteJourney/ZygoteJourney";

export const metadata = {
  title: "Zigottan Bebeğe | 6. Sınıf Fen Bilimleri",
  description: "İnsanda döllenmeden doğuma kadar gelişim aşamalarını etkileşimli animasyonla keşfet.",
};

export default function ZygoteToBabyPage() {
  return (
    <main style={{ width: "min(100% - 32px, 1180px)", margin: "0 auto", padding: "28px 0 56px" }}>
      <ZygoteJourney />
    </main>
  );
}

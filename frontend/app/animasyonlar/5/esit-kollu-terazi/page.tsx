import Link from "next/link";
import EqualArmBalance from "@/components/animations/EqualArmBalance";

export const metadata = {
  title: "Eşit Kollu Terazi Simülasyonu | 5. Sınıf Fen Bilimleri",
  description: "Kefelere kütle ekleyerek eşit kollu terazide dengeyi ve kütle karşılaştırmasını keşfet.",
};

export default function EqualArmBalancePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-6">
      <nav className="mb-5 text-sm text-slate-500" aria-label="Sayfa yolu">
        <Link href="/animasyonlar">Animasyonlar</Link> / <Link href="/animasyonlar/5">5. Sınıf</Link> / Eşit Kollu Terazi
      </nav>
      <EqualArmBalance />
      <div className="mt-5 text-center"><Link className="font-semibold text-blue-700 hover:underline" href="/animasyonlar/5">← 5. sınıf animasyonlarına dön</Link></div>
    </div>
  );
}

import { PageHeader } from "@/components/ui/PageHeader";
import SkeletonExplorer from "@/components/laboratuvar/SkeletonExplorer";

export const metadata = {
  title: "Destek ve Hareket Sistemi | Etkileşimli Fen Laboratuvarı",
  description: "5. sınıf Fen Bilimleri için kemikleri seçerek görevlerini, türlerini ve vücuttaki yerlerini keşfet.",
};

export default function SkeletonLabPage() {
  return <>
    <PageHeader eyebrow="5. Sınıf · 3. Ünite" title="Destek ve Hareket Sistemi" description="İskelet modelindeki kemiklere dokun; görevlerini, türlerini ve vücudumuzdaki yerlerini keşfet." />
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="rounded-2xl border border-beaker/20 bg-beaker/5 p-5">
        <h2 className="text-lg font-bold">🎯 Öğrenme hedefi</h2>
        <p className="mt-2 text-sm leading-relaxed">Temel kemiklerin yerlerini tanımak, kemiklerin görevlerini açıklamak ve kemikleri şekillerine göre sınıflandırmak.</p>
      </div>
      <SkeletonExplorer />
    </main>
  </>;
}

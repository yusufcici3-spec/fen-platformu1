import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Hakkımızda" };

const VALUES = [
  { icon: "🔬", title: "Meraktan öğrenmeye", text: "Öğrencilerin doğal merakını, kalıcı öğrenmeye dönüştürecek içerikler tasarlıyoruz." },
  { icon: "🧑‍🏫", title: "Öğretmenle birlikte", text: "İçeriklerimizi alanında deneyimli fen bilimleri öğretmenleriyle birlikte geliştiriyoruz." },
  { icon: "📈", title: "Ölçülebilir ilerleme", text: "Her öğrencinin ilerlemesini takip edebileceği, anlaşılır bir öğrenme yolculuğu sunuyoruz." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hakkımızda"
        title="Fen bilimlerini herkes için erişilebilir kılıyoruz"
        description="FenLab, ortaokul öğrencilerinin fen bilimlerini keşfederek, deneyerek ve eğlenerek öğrenmesi için kurulmuş bir eğitim platformudur."
      />
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-lab-inkMuted dark:text-lab-paper/70">
          Platformumuz; 5, 6, 7 ve 8. sınıf müfredatına uygun konu anlatımları, alıştırma soruları,
          deneme sınavları ve eğitsel oyunları tek bir çatı altında topluyor. Amacımız, her
          öğrencinin kendi hızında öğrenebileceği, öğretmenlerin içerik üretip takip edebileceği
          ve yöneticilerin platformu kolayca yönetebileceği sağlam bir altyapı sunmak.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {VALUES.map((v) => (
            <Card key={v.title}>
              <div className="text-3xl">{v.icon}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">{v.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

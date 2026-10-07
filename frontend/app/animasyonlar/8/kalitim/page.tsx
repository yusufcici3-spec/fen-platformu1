import Link from "next/link";
import PeaGeneticsSimulator from "@/components/animations/PeaGeneticsSimulator/PeaGeneticsSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "Bezelyelerde Kalıtım Simülatörü | 8. Sınıf Fen Bilimleri",
  description:
    "8. sınıf DNA ve Genetik Kod ünitesi için bezelyelerde renk ve şekil özelliklerini 45 farklı genotip eşleşmesiyle çaprazla.",
};

export default function PeaInheritancePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/8">8. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Kalıtım</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>8. SINIF · 2. ÜNİTE · DNA VE GENETİK KOD</span>
          <h1>Bezelyelerde kalıtım: çaprazla ve keşfet</h1>
          <p>
            İki ebeveynin genotipini seç. Gametleri, Punnett karesini ve ortaya çıkabilecek sarı-yeşil,
            yuvarlak-buruşuk bezelyelerin olasılıklarını adım adım incele.
          </p>
          <div className={styles.heroFacts}>
            <span><b>9</b> olası iki özellikli genotip</span>
            <span><b>45</b> benzersiz ebeveyn eşleşmesi</span>
            <span><b>16</b> hücreye kadar Punnett karesi</span>
          </div>
        </header>

        <PeaGeneticsSimulator />

        <section className={styles.explanation} aria-labelledby="model-title">
          <h2 id="model-title">Bu model neyi varsayıyor?</h2>
          <p>
            Öğrenme modelinde tohum şekli için <strong>R</strong> (yuvarlak) baskın, <strong>r</strong> (buruşuk)
            çekinik; tohum rengi için <strong>Y</strong> (sarı) baskın, <strong>y</strong> (yeşil) çekinik kabul edilir.
            Her yavru her özellik için bir aleli bir ebeveynden, diğer aleli öbür ebeveynden alır.
          </p>
          <p>
            Hesaplama, bu iki özelliğin birbirinden bağımsız dağıldığı ve baskınlığın tam olduğu okul düzeyindeki
            Mendel modelini kullanır. Örneğin <strong>RrYy × RrYy</strong> eşleşmesinde beklenen fenotip oranı
            <strong> 9 : 3 : 3 : 1</strong> olur. Bu oranlar olasılığı anlatır; az sayıdaki yavruda gözlenen sayılar
            birebir aynı çıkmayabilir.
          </p>
          <div className={styles.sourceLinks}>
            <span>Bilimsel kaynaklar:</span>
            <a href="https://www.genome.gov/25520230/online-education-kit-1865-mendels-peas" target="_blank" rel="noreferrer">
              NHGRI · Mendel’in bezelyeleri
            </a>
            <a href="https://opengenetics.pressbooks.tru.ca/chapter/a-dihybrid-cross-showing-mendels-second-law-independent-assortment/" target="_blank" rel="noreferrer">
              OpenGenetics · Bağımsız dağılım ve dihibrid çaprazlama
            </a>
          </div>
        </section>

        <div className={styles.bottomNav}>
          <Link href="/sinif/8/dna-ve-genetik-kod/kalitim-ve-genetik-muhendisligi">
            ← Kalıtım ve Genetik Mühendisliği konusuna dön
          </Link>
          <Link href="/animasyonlar/8">8. sınıf animasyonlarına dön →</Link>
        </div>
      </div>
    </main>
  );
}

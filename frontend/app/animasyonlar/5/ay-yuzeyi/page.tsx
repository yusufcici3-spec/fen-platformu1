import Image from "next/image";
import Link from "next/link";
import MoonSurfaceExplorer from "@/components/animations/MoonSurfaceExplorer/MoonSurfaceExplorer";
import styles from "./page.module.css";

export const metadata = {
  title: "Ay Yüzeyini Keşfet | 5. Sınıf Animasyonları",
  description:
    "Ay yüzeyinde ilerleyen astronotla kraterleri, Sükûnet Denizi'ni, yüksek bölgeleri, rilleri ve regolit tabakasını etkileşimli keşfet.",
};

export default function MoonSurfacePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/5">5. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Ay yüzeyi</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>5. SINIF · AY’DA KEŞİF GÖREVİ</span>
            <h1>Astronotla Ay yüzeyinde ilerle</h1>
            <p>
              Keşif noktasını seç, astronotu Ay’da yürüt; kraterleri, koyu lav ovalarını,
              yüksek bölgeleri ve Ay toprağı olan regolit tabakasını yakından tanı.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#kesif-simulatoru">
                Keşfe başla <span aria-hidden="true">↓</span>
              </a>
              <Link className={styles.secondaryAction} href="/animasyonlar/5">
                Ay’ın evrelerine dön <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className={styles.heroMoon} role="img" aria-label="Ay yüzeyini gösteren küre" />
        </header>

        <section className={styles.quickFacts} aria-label="Keşifte göreceğin özellikler">
          <div><span>05</span><p>keşif noktası</p></div>
          <div><span>NASA</span><p>bilim kaynakları</p></div>
          <div><span>ESA</span><p>gerçek arazi görüntüsü</p></div>
        </section>

        <section id="kesif-simulatoru" className={styles.simulatorSection} aria-labelledby="simulator-title">
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionEyebrow}>ROTA KONTROLÜ SENDE</span>
              <h2 id="simulator-title">Ay’da yürüyüşe çık</h2>
            </div>
            <p>Noktaları seç · astronotun ilerlesin · gözlem görevini tamamla</p>
          </div>
          <MoonSurfaceExplorer />
        </section>

        <section className={styles.learningSection} aria-labelledby="landforms-title">
          <div className={styles.learningHeading}>
            <span className={styles.sectionEyebrow}>AY YÜZEYİNDE NELER VAR?</span>
            <h2 id="landforms-title">Birbirinden farklı yer şekilleri</h2>
            <p>
              Ay’da koyu düzlükler, parlak ve engebeli yüksek bölgeler, çarpma kraterleri ve
              uzun yarıklar bulunur. Bunlar, uydumuzun geçmişini anlatan izlerdir.
            </p>
          </div>
          <div className={styles.factGrid}>
            <article className={styles.factCard}>
              <span className={styles.factIcon} aria-hidden="true">◒</span>
              <h3>“Deniz” denilen koyu düzlükler</h3>
              <p>Mare alanları suyla dolu değildir; eski çarpma havzalarını kaplayan, soğuyup katılaşmış lav ovalarıdır.</p>
            </article>
            <article className={styles.factCard}>
              <span className={styles.factIcon} aria-hidden="true">◉</span>
              <h3>Kraterler ve yüksek bölgeler</h3>
              <p>Çarpmalar kraterler oluşturur. Ay’ın eski yüksek bölgeleri parlak, engebeli ve krater bakımından zengindir.</p>
            </article>
            <article className={styles.factCard}>
              <span className={styles.factIcon} aria-hidden="true">⌁</span>
              <h3>Regolit: Ay’ın gevşek yüzeyi</h3>
              <p>Regolit; darbelerle ufalanmış kaya parçaları, mineraller ve ince tozdan oluşan yüzey örtüsüdür.</p>
            </article>
          </div>
        </section>

        <section className={styles.imageSection} aria-labelledby="image-title">
          <div className={styles.imageCopy}>
            <span className={styles.sectionEyebrow}>UZAY ARACINDAN GERÇEK GÖRÜNTÜLER</span>
            <h2 id="image-title">Yüksek bölgeler ve mare nasıl farklı görünür?</h2>
            <p>
              ESA’nın SMART-1 uzay aracındaki AMIE kamerası, Ay’ın engebeli yüksek bölgelerini
              ve daha düz mare alanını yakından görüntüledi. Görselleri karşılaştır: hangisinde
              daha çok krater seçiyorsun?
            </p>
            <a href="https://www.esa.int/Science_Exploration/Space_Science/SMART-1/Highlands_and_Mare_landscapes_on_the_Moon" target="_blank" rel="noreferrer">
              ESA görüntü açıklamasını aç <span aria-hidden="true">↗</span>
            </a>
          </div>
          <figure className={styles.esaFigure}>
            <Image
              src="/ay-yuzeyi/esa-highlands-mare.jpg"
              alt="ESA SMART-1 AMIE kamerasıyla çekilmiş, kraterli Ay yüksek bölgeleri ile daha düz mare arazisini karşılaştıran iki görüntü"
              width={2160}
              height={1080}
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <figcaption>Görsel: ESA / SMART-1 / AMIE · Yüksek bölgeler (sol) ve mare (sağ)</figcaption>
          </figure>
        </section>

        <section className={styles.sources} aria-labelledby="sources-title">
          <h2 id="sources-title">Bilgi kaynakları</h2>
          <ul>
            <li><a href="https://science.nasa.gov/moon/composition/" target="_blank" rel="noreferrer">NASA Science · Ay’ın bileşimi, yüksek bölgeler, maria, riller ve regolit</a></li>
            <li><a href="https://science.nasa.gov/moon/lunar-craters/" target="_blank" rel="noreferrer">NASA Science · Ay kraterleri nasıl oluşur?</a></li>
            <li><a href="https://science.nasa.gov/resource/apollo-11-landing-site-from-dawn-to-dusk/" target="_blank" rel="noreferrer">NASA Science · Apollo 11’in Sükûnet Denizi’ne inişi ve yüzey izleri</a></li>
            <li><a href="https://www.esa.int/Science_Exploration/Space_Science/SMART-1/Highlands_and_Mare_landscapes_on_the_Moon" target="_blank" rel="noreferrer">ESA · SMART-1 ile yüksek bölgeler ve mare görüntüleri</a></li>
          </ul>
        </section>

        <footer className={styles.bottomNav}>
          <Link href="/animasyonlar/5">← Ay’ın evreleri simülatörüne dön</Link>
          <Link href="/#animasyonlar">Diğer sınıf animasyonları</Link>
        </footer>
      </div>
    </main>
  );
}

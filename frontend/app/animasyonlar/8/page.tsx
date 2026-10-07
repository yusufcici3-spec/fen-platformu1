import Link from "next/link";
import SeasonsSimulator from "@/components/animations/SeasonsSimulator/SeasonsSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "8. Sınıf Animasyonları | Güneş Açısı ve Mevsimler",
  description: "Dünya'nın Güneş etrafındaki hareketini, mevsimleri ve gölge boyunu etkileşimli simülasyonla keşfet.",
};

export default function EighthGradeAnimationsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">8. Sınıf</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>8. SINIF · MEVSİMLER VE İKLİM</span>
          <h1>Güneş açısı ve mevsimler</h1>
          <p>
            Tarihi, bulunduğun enlemi ve yerel Güneş saatini değiştir. Dünya’nın yörüngesini izle;
            ışınların geliş açısının aydınlanmayı ve gölgeyi nasıl etkilediğini keşfet.
          </p>
          <div className={styles.heroLinks}>
            <span><i className={styles.miniDot} /> Oynatılabilir simülasyon</span>
            <Link href="/sinif/8/mevsimler-ve-iklim">Mevsimler ve İklim ünitesine dön <span aria-hidden="true">→</span></Link>
          </div>
        </header>

        <div className={styles.simulatorWrap}>
          <SeasonsSimulator />
        </div>

        <aside className={styles.lessonNote} aria-label="Kısa bilgi">
          <span className={styles.noteIcon} aria-hidden="true">i</span>
          <p>
            <strong>Hatırla:</strong> Mevsimlerin temel nedeni Dünya’nın eksen eğikliğidir. Güneş ışınları
            bir yüzeye daha dik geldiğinde enerji daha küçük bir alanda toplanır; aynı cismin gölgesi de
            genellikle kısalır.
          </p>
        </aside>

        <Link href="/animasyonlar/8/kalitim" className={styles.relatedAnimation}>
          <span className={styles.relatedIcon} aria-hidden="true">🧬</span>
          <span className={styles.relatedCopy}>
            <span className={styles.relatedEyebrow}>2. ÜNİTE · DNA VE GENETİK KOD</span>
            <strong>Bezelyelerde kalıtımı keşfet</strong>
            <span>Genotipleri seç, 45 farklı çaprazlamada yavru sonuçlarını incele.</span>
          </span>
          <span className={styles.relatedArrow} aria-hidden="true">→</span>
        </Link>

        <div className={styles.bottomNav}>
          <Link href="/#animasyonlar">← Diğer sınıf animasyonları</Link>
          <Link href="/sinif/8">8. sınıf ünitelerine git →</Link>
        </div>
      </div>
    </div>
  );
}

import type * as React from "react";
import { Arrow, Box, Fig, Section, T } from "./BasitMakinelerNotes";

const BLUE = "#2563eb";
const RED = "#dc2626";
const GREEN = "#16a34a";
const AMBER = "#f59e0b";
const GRAY = "#64748b";

function Orbit() {
  const cx = 150, cy = 105, rx = 105, ry = 58;
  const dx = 7.8, dy = 18.4;
  const earth = (x: number, y: number, key: string) => (
    <g key={key}>
      <line x1={x - dx} y1={y + dy} x2={x + dx} y2={y - dy} stroke={GRAY} strokeWidth={2} />
      <circle cx={x} cy={y} r={11} fill="#38bdf8" stroke="#0369a1" strokeWidth={2} />
      <circle cx={x + dx} cy={y - dy} r={2.5} fill={RED} />
    </g>
  );
  const pos: [number, number, string, string, "start" | "middle" | "end", number, number][] = [
    [cx - rx, cy, "21 Haziran", "Yaz (KYK)", "middle", 0, 0],
    [cx, cy + ry, "23 Eylül", "Sonbahar (KYK)", "middle", 0, 0],
    [cx + rx, cy, "22 Aralık", "Kış (KYK)", "middle", 0, 0],
    [cx, cy - ry, "21 Mart", "İlkbahar (KYK)", "middle", 0, 0],
  ];
  return (
    <Fig caption="Dünya’nın Güneş etrafındaki hareketi ve mevsimler (KYK: Kuzey Yarım Küre; kırmızı nokta kuzey kutbu)" h={225}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={GRAY} strokeWidth={1.5} strokeDasharray="5 4" />
      <circle cx={cx} cy={cy} r={16} fill="#fde047" stroke={AMBER} strokeWidth={3} />
      <T x={cx} y={cy + 4} size={9} bold>Güneş</T>
      {pos.map(([x, y, , , , ,], i) => earth(x, y, String(i)))}
      <T x={cx - rx} y={cy + 34} size={10} bold>21 Haziran</T>
      <T x={cx - rx} y={cy + 46} size={9} color={RED}>Yaz (KYK)</T>
      <T x={cx + rx} y={cy + 34} size={10} bold>22 Aralık</T>
      <T x={cx + rx} y={cy + 46} size={9} color={BLUE}>Kış (KYK)</T>
      <T x={cx} y={cy + ry + 42} size={10} bold>23 Eylül</T>
      <T x={cx} y={cy + ry + 54} size={9} color={AMBER}>Sonbahar (KYK)</T>
      <T x={cx} y={14} size={10} bold>21 Mart</T>
      <T x={cx} y={26} size={9} color={GREEN}>İlkbahar (KYK)</T>
    </Fig>
  );
}

function Rays() {
  return (
    <Fig caption="Işınlar dik geldikçe enerji küçük alana yoğunlaşır ve yüzey daha çok ısınır" h={150}>
      <line x1={15} y1={110} x2={135} y2={110} stroke="currentColor" strokeWidth={3} />
      <line x1={150} y1={110} x2={290} y2={110} stroke="currentColor" strokeWidth={3} />
      <Arrow x1={50} y1={20} x2={50} y2={108} color={AMBER} />
      <Arrow x1={74} y1={20} x2={74} y2={108} color={AMBER} />
      <line x1={50} y1={114} x2={74} y2={114} stroke={RED} strokeWidth={5} />
      <T x={62} y={130} size={10} bold color={RED}>Küçük alan</T>
      <T x={62} y={144} size={9}>Dik ışın → çok ısınma</T>
      <Arrow x1={160} y1={20} x2={238} y2={108} color={AMBER} />
      <Arrow x1={194} y1={20} x2={272} y2={108} color={AMBER} />
      <line x1={238} y1={114} x2={272} y2={114} stroke={BLUE} strokeWidth={5} />
      <T x={255} y={130} size={10} bold color={BLUE}>Büyük alan</T>
      <T x={238} y={144} size={9}>Eğik ışın → az ısınma</T>
    </Fig>
  );
}

function Breeze({ day }: { day: boolean }) {
  return (
    <Fig caption={day ? "Gündüz: deniz meltemi (denizden karaya)" : "Gece: kara meltemi (karadan denize)"} h={175}>
      <rect x={10} y={120} width={140} height={34} fill="#a16207" opacity={0.75} />
      <rect x={150} y={120} width={140} height={34} fill="#38bdf8" opacity={0.8} />
      <T x={80} y={141} size={11} color="#fff" bold>Kara</T>
      <T x={220} y={141} size={11} color="#fff" bold>Deniz</T>
      {day ? <circle cx={28} cy={26} r={11} fill="#fde047" stroke={AMBER} strokeWidth={2} /> : <path d="M26 16 a11 11 0 1 0 11 14 a9 9 0 1 1 -11 -14z" fill="#e2e8f0" stroke={GRAY} />}
      {day ? (
        <>
          <Arrow x1={80} y1={112} x2={80} y2={58} color={RED} />
          <Arrow x1={220} y1={56} x2={220} y2={110} color={BLUE} />
          <Arrow x1={110} y1={46} x2={200} y2={46} color={GRAY} />
          <Arrow x1={266} y1={112} x2={110} y2={112} color={BLUE} />
          <T x={86} y={88} size={9} color={RED} anchor="start" bold>sıcak hava yükselir (A)</T>
          <T x={226} y={88} size={9} color={BLUE} anchor="start" bold>çöker (Y)</T>
        </>
      ) : (
        <>
          <Arrow x1={220} y1={112} x2={220} y2={58} color={RED} />
          <Arrow x1={80} y1={56} x2={80} y2={110} color={BLUE} />
          <Arrow x1={200} y1={46} x2={110} y2={46} color={GRAY} />
          <Arrow x1={34} y1={112} x2={190} y2={112} color={BLUE} />
          <T x={214} y={88} size={9} color={RED} anchor="end" bold>sıcak hava yükselir (A)</T>
          <T x={86} y={88} size={9} color={BLUE} anchor="start" bold>çöker (Y)</T>
        </>
      )}
      <T x={150} y={170} size={9} color={GRAY}>A: alçak basınç • Y: yüksek basınç • Rüzgâr Y’den A’ya eser</T>
    </Fig>
  );
}

function ClimateChart() {
  const t = [9, 10, 12, 16, 20, 25, 28, 28, 24, 19, 14, 10];
  const r = [110, 90, 70, 50, 30, 10, 3, 5, 20, 60, 90, 120];
  const m = ["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"];
  const x = (i: number) => 42 + i * 20;
  return (
    <Fig caption="Örnek iklim grafiği (Akdeniz ikliminde bir şehir): çubuk = yağış, çizgi = sıcaklık" h={185}>
      <line x1={32} y1={20} x2={32} y2={140} stroke="currentColor" strokeWidth={1.5} />
      <line x1={32} y1={140} x2={285} y2={140} stroke="currentColor" strokeWidth={1.5} />
      {r.map((v, i) => <rect key={i} x={x(i) - 6} y={140 - v * 0.9} width={12} height={v * 0.9} fill="#7dd3fc" stroke={BLUE} strokeWidth={0.8} />)}
      <polyline points={t.map((v, i) => `${x(i)},${140 - v * 3.2}`).join(" ")} fill="none" stroke={RED} strokeWidth={3} />
      {t.map((v, i) => <circle key={i} cx={x(i)} cy={140 - v * 3.2} r={2.5} fill={RED} />)}
      {m.map((l, i) => <T key={i} x={x(i)} y={153} size={9}>{l}</T>)}
      <T x={36} y={14} size={9} anchor="start" color={RED} bold>Sıcaklık (°C)</T>
      <T x={285} y={14} size={9} anchor="end" color={BLUE} bold>Yağış (mm)</T>
      <T x={150} y={172} size={10}>Yazlar sıcak ve kurak, kışlar ılık ve yağışlı</T>
    </Fig>
  );
}

const TD = "border border-lab-paperLine p-2";

export function MevsimIklimNotes() {
  return (
    <div id="ders-notu" className="mt-10 space-y-6">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-beaker-dark dark:text-beaker-light">8. Sınıf · Ünite 1 · Ders Notu</p>
        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Mevsimler ve İklim – Görselli Ders Notu</h2>
        <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/70">
          Mevsimlerin neden oluştuğundan iklim tiplerine, hava hareketlerinden iklim değişikliğine kadar ünitenin tamamı şekillerle özetlendi.
        </p>
      </div>

      <Box tone="info" title="🎯 Bu notta neleri öğreneceksin? (Kazanımlar)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Mevsimlerin oluşumunu Dünya’nın hareketleri ve eksen eğikliği ile ilişkilendirir.</li>
          <li>Güneş ışınlarının geliş açısı ile gece-gündüz süresini mevsimlerle ilişkilendirir.</li>
          <li>Hava olayları ile iklim arasındaki farkı açıklar; iklim elemanlarını ve etkenlerini belirtir.</li>
          <li>Basınç farkından rüzgârın oluşumunu ve hava hareketlerini (meltem) açıklar.</li>
          <li>Türkiye’deki iklim tiplerini özellikleriyle tanır, iklim grafiklerini yorumlar.</li>
          <li>Küresel iklim değişikliğinin nedenlerini ve çözüm yollarını tartışır.</li>
        </ul>
      </Box>

      <Section no="1" title="Mevsimlerin Oluşumu">
        <p>Dünya iki temel hareket yapar: <b>kendi ekseni etrafında dönme</b> (yaklaşık 24 saat; gece-gündüzü oluşturur) ve <b>Güneş çevresinde dolanma</b> (365 gün 6 saat; mevsimleri oluşturur). Mevsimler, bu dolanma sırasında Dünya’nın <b>ekseninin yörünge düzlemine göre eğik (≈ 23°27′)</b> olması sebebiyle ortaya çıkar.</p>
        <Orbit />
        <Box tone="warn" title="⚠️ Dikkat: Mevsimler Güneş’e uzaklıktan değildir!">
          <p>Dünya, Güneş’e Ocak ayında en yakındır; yine de Kuzey Yarım Küre’de o zaman kıştır. Mevsimleri belirleyen asıl etken <b>eksen eğikliği ve Güneş ışınlarının geliş açısıdır</b>.</p>
        </Box>
        <Rays />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-beaker/10"><th className={TD}>Tarih</th><th className={TD}>Olay</th><th className={TD}>Güneş ışınları</th><th className={TD}>Kuzey Yarım Küre</th></tr>
            </thead>
            <tbody>
              <tr><td className={TD}>21 Mart</td><td className={TD}>İlkbahar ekinoksu</td><td className={TD}>Ekvator’a dik</td><td className={TD}>Gece = gündüz; ilkbahar başlar</td></tr>
              <tr><td className={TD}>21 Haziran</td><td className={TD}>Yaz gündönümü</td><td className={TD}>Yengeç Dönencesi’ne dik</td><td className={TD}>En uzun gündüz; yaz başlar</td></tr>
              <tr><td className={TD}>23 Eylül</td><td className={TD}>Sonbahar ekinoksu</td><td className={TD}>Ekvator’a dik</td><td className={TD}>Gece = gündüz; sonbahar başlar</td></tr>
              <tr><td className={TD}>22 Aralık</td><td className={TD}>Kış gündönümü</td><td className={TD}>Oğlak Dönencesi’ne dik</td><td className={TD}>En kısa gündüz; kış başlar</td></tr>
            </tbody>
          </table>
        </div>
        <ul className="list-disc space-y-1 pl-5">
          <li>Kuzey ve Güney yarım kürelerde mevsimler <b>zıttır</b> (biz yazı yaşarken Avustralya’da kıştır).</li>
          <li>Yazın gündüz uzun ve ışınlar dike yakındır; yüzey daha çok ısınır. Kışın gündüz kısa ve ışınlar eğik gelir.</li>
          <li>Ekvator’da ışınlar yıl boyu dike yakın geldiği için mevsim farkı çok azdır. Kutuplarda 6 ay gece, 6 ay gündüz yaşanır.</li>
          <li>Dönenceler 23°27′ enleminde, kutup daireleri 66°33′ enlemindedir.</li>
          <li>Dünya’nın dönme ekseni eğik olmasaydı mevsimler oluşmazdı; gece-gündüz süresi hep eşit olurdu.</li>
        </ul>
      </Section>

      <Section no="2" title="İklim ve Hava Olayları">
        <div className="grid gap-3 sm:grid-cols-2">
          <Box tone="info" title="Hava durumu">Bir yerde kısa süreli (saatlik, günlük) atmosfer olaylarıdır. Hızla değişir. (Bugün yağmur yağıyor, yarın güneşli.)</Box>
          <Box tone="info" title="İklim">Bir bölgede <b>uzun yıllar</b> boyunca gözlenen hava olaylarının ortalamasıdır. Çok yavaş değişir. (Karadeniz’de her mevsim yağış görülür.)</Box>
        </div>
        <p><b>İklim elemanları:</b> sıcaklık, yağış, nem, basınç ve rüzgâr. <b>İklim etkenleri:</b></p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Box tone="info" title="Enlem">Ekvator’dan kutuplara gidildikçe sıcaklık azalır (ışınların geliş açısı).</Box>
          <Box tone="info" title="Yükselti">Yükseldikçe sıcaklık düşer (yaklaşık her 200 m’de 1 °C).</Box>
          <Box tone="info" title="Denize uzaklık">Denizler geç ısınıp geç soğur; kıyılar ılıman, iç kesimler sert iklimlidir.</Box>
          <Box tone="info" title="Yer şekilleri">Dağların yönü nemli rüzgârları engeller, yağış dağın rüzgâra bakan yamacına düşer.</Box>
          <Box tone="info" title="Okyanus ve deniz akıntıları">Sıcak akıntılar kıyıyı ısıtır, soğuk akıntılar soğutur.</Box>
          <Box tone="info" title="Bitki örtüsü">Orman yağışı ve nemi artırır, sıcaklık farkını azaltır.</Box>
        </div>
        <ClimateChart />
        <Box tone="formula" title="📈 İklim grafiği nasıl okunur?">
          <p>Çizgi grafik sıcaklığı, sütun grafik yağışı gösterir. Yağışın en az olduğu ve sıcaklığın en yüksek olduğu aylar (Haziran–Ağustos) yazdır. Grafikte yaz kuruysa Akdeniz, her ay yağış varsa Karadeniz, sıcaklık farkı büyükse karasal iklim akla gelmelidir.</p>
        </Box>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead><tr className="bg-beaker/10"><th className={TD}>Türkiye’de iklim</th><th className={TD}>Yaz</th><th className={TD}>Kış</th><th className={TD}>Yağış</th></tr></thead>
            <tbody>
              <tr><td className={TD}>Akdeniz</td><td className={TD}>Sıcak ve kurak</td><td className={TD}>Ilık ve yağışlı</td><td className={TD}>Kışın yoğun</td></tr>
              <tr><td className={TD}>Karadeniz</td><td className={TD}>Serin ve yağışlı</td><td className={TD}>Ilık ve yağışlı</td><td className={TD}>Her mevsim</td></tr>
              <tr><td className={TD}>Karasal (İç Anadolu, Doğu Anadolu)</td><td className={TD}>Sıcak ve kurak</td><td className={TD}>Soğuk, kar yağışlı</td><td className={TD}>Az; en çok ilkbahar</td></tr>
            </tbody>
          </table>
        </div>
        <p>Dünya’da başlıca iklim tipleri: <b>ekvatoral, muson, savan, çöl, Akdeniz, okyanusal, karasal, kutup</b> iklimleridir. Ekvator çevresi sıcak ve nemli, çöller sıcak ve kurak, kutuplar çok soğuktur.</p>
      </Section>

      <Section no="3" title="Hava Hareketleri: Basınç ve Rüzgâr">
        <ul className="list-disc space-y-1 pl-5">
          <li>Isınan hava genleşir, hafifler ve <b>yükselir</b>: yeryüzünde <b>alçak basınç (A)</b> oluşur; bulutlanma ve yağış görülür.</li>
          <li>Soğuyan hava yoğunlaşır, ağırlaşır ve <b>alçalır</b>: <b>yüksek basınç (Y)</b> oluşur; hava açık ve kuraktır.</li>
          <li>Havanın yüksek basınç alanından alçak basınç alanına yatay hareketine <b>rüzgâr</b> denir. Basınç farkı ne kadar büyükse rüzgâr o kadar hızlı eser.</li>
          <li>Rüzgârın yönü rüzgârgülü ile, hızı anemometre ile ölçülür. Basınç barometreyle ölçülür.</li>
        </ul>
        <div className="grid gap-3 md:grid-cols-2">
          <Breeze day />
          <Breeze day={false} />
        </div>
        <Box tone="info" title="Neden böyle?">
          <p>Gündüz kara, denizden daha çabuk ısınır; kara üzerinde sıcak hava yükselir (alçak basınç), denizde basınç yüksek kalır ve rüzgâr denizden karaya eser. Gece kara daha çabuk soğur; rüzgâr karadan denize eser.</p>
        </Box>
        <p><b>Yağış oluşumu:</b> Su buharı yükselip soğuyunca yoğuşur, bulutlar oluşur, damlalar ağırlaşınca yağış (yağmur, kar, dolu) düşer. <b>Yağış çeşitleri:</b> konveksiyonel (yerel ısınma), orografik (dağ yamacında), cephesel (sıcak-soğuk hava kütlelerinin karşılaşması).</p>
      </Section>

      <Section no="4" title="Küresel İklim Değişikliği">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Sera etkisi:</b> Atmosferdeki bazı gazlar (karbondioksit, metan, su buharı) Dünya’dan yayılan ısıyı tutar. Doğal sera etkisi yaşam için gereklidir.</li>
          <li><b>Küresel ısınma:</b> Fosil yakıt kullanımı, ormanların yok edilmesi ve sanayi nedeniyle sera gazları artar; Dünya’nın ortalama sıcaklığı yükselir.</li>
          <li><b>Sonuçları:</b> Buzulların erimesi, deniz seviyesinin yükselmesi, kuraklık, orman yangınları, aşırı yağışlar ve sel, canlı türlerinin yaşam alanını kaybetmesi.</li>
        </ul>
        <Box tone="formula" title="🌱 Neler yapabiliriz?">
          <p>Enerji tasarrufu, yenilenebilir enerji (güneş, rüzgâr) kullanımı, toplu taşıma ve bisiklet, geri dönüşüm, ağaç dikme, gereksiz tüketimden kaçınma.</p>
        </Box>
      </Section>

      <Section no="5" title="Sık Yapılan Yanlışlar">
        <ul className="list-disc space-y-1 pl-5">
          <li>❌ “Yazın Dünya Güneş’e daha yakındır.” → ✅ Mevsimler eksen eğikliğinden oluşur.</li>
          <li>❌ “Gece-gündüz Dünya’nın Güneş çevresindeki dolanmasıyla oluşur.” → ✅ Dünya’nın kendi ekseni etrafında dönmesiyle oluşur.</li>
          <li>❌ “İklim, bugünkü hava durumudur.” → ✅ Uzun yıllık ortalamadır.</li>
          <li>❌ “Rüzgâr alçak basınçtan yükseğe eser.” → ✅ Yüksekten alçağa eser.</li>
          <li>❌ “Ekvator’da mevsimler çok belirgindir.” → ✅ Mevsim farkı en azdır.</li>
          <li>❌ “Sera etkisi tamamen zararlıdır.” → ✅ Doğal sera etkisi yaşam için gereklidir; zararlı olan artışıdır.</li>
        </ul>
      </Section>

      <Section no="6" title="Mini Test (Kendini Dene)">
        <ol className="list-decimal space-y-2 pl-5">
          <li>21 Haziran’da Güneş ışınları hangi enlem çizgisine dik gelir? <span className="text-lab-inkMuted">(Cevap: Yengeç Dönencesi)</span></li>
          <li>Kuzey Yarım Küre’de kış olduğunda Güney Yarım Küre’de hangi mevsim yaşanır? <span className="text-lab-inkMuted">(Cevap: Yaz)</span></li>
          <li>Gündüz kıyı kentlerinde rüzgâr hangi yönde eser? <span className="text-lab-inkMuted">(Cevap: Denizden karaya)</span></li>
          <li>Yazları sıcak ve kurak, kışları ılık ve yağışlı olan iklim hangisidir? <span className="text-lab-inkMuted">(Cevap: Akdeniz iklimi)</span></li>
          <li>Deniz seviyesinde 20 °C olan bir yerde, 1000 m yükseklikte (her 200 m’de 1 °C) sıcaklık yaklaşık kaç °C olur? <span className="text-lab-inkMuted">(Cevap: 15 °C)</span></li>
        </ol>
      </Section>
    </div>
  );
}

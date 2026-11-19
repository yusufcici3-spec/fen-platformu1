import type * as React from "react";
import { Arrow, Box, Fig, Section, T } from "./BasitMakinelerNotes";

const BLUE = "#2563eb";
const RED = "#dc2626";
const GREEN = "#16a34a";
const AMBER = "#f59e0b";
const GRAY = "#64748b";

function FoodChain() {
  const items = [
    ["☀️", "Güneş", "enerji kaynağı"],
    ["🌱", "Bitki", "üretici"],
    ["🐛", "Çekirge", "1. derece"],
    ["🐸", "Kurbağa", "2. derece"],
    ["🐍", "Yılan", "3. derece"],
    ["🦅", "Şahin", "4. derece"],
  ];
  return (
    <Fig caption="Besin zinciri: oklar enerjinin ve maddenin yenenden yiyene akışını gösterir" h={150}>
      {items.map(([e, n, r], i) => {
        const x = 26 + i * 50;
        return (
          <g key={n}>
            <text x={x} y={56} fontSize={26} textAnchor="middle">{e}</text>
            <T x={x} y={76} size={9} bold>{n}</T>
            <T x={x} y={88} size={7.5} color={GRAY}>{r}</T>
            {i < 5 && <Arrow x1={x + 17} y1={46} x2={x + 33} y2={46} color={GREEN} />}
          </g>
        );
      })}
      <rect x={76} y={108} width={216} height={28} rx={8} fill="#fef3c7" stroke={AMBER} strokeWidth={1.5} />
      <text x={90} y={127} fontSize={16}>🍄</text>
      <T x={188} y={126} size={9} bold>Ayrıştırıcılar (mantar, bakteri)</T>
      <T x={38} y={126} size={8} color={GRAY}>ölü canlıları</T>
      <T x={38} y={136} size={8} color={GRAY}>ayrıştırır</T>
    </Fig>
  );
}

function EnergyPyramid() {
  const rows = [
    ["3. tüketici", "10 kJ", 0],
    ["2. tüketici", "100 kJ", 1],
    ["1. tüketici (otçul)", "1 000 kJ", 2],
    ["Üretici (bitki)", "10 000 kJ", 3],
  ] as const;
  const cx = 105;
  return (
    <Fig caption="Enerji piramidi: her basamakta enerjinin yaklaşık %10’u bir üst basamağa aktarılır" h={165}>
      {rows.map(([n, e, i]) => {
        const wTop = 34 + i * 40;
        const wBot = 34 + (i + 1) * 40;
        const y = 14 + i * 36;
        return (
          <g key={n}>
            <polygon points={`${cx - wTop / 2},${y} ${cx + wTop / 2},${y} ${cx + wBot / 2},${y + 34} ${cx - wBot / 2},${y + 34}`} fill={["#bef264", "#86efac", "#4ade80", "#22c55e"][i]} stroke="#166534" strokeWidth={1.5} />
            <T x={cx} y={y + 21} size={i === 0 ? 8 : 9.5} bold>{e}</T>
            <T x={cx + wBot / 2 + 6} y={y + 21} size={9} anchor="start">{n}</T>
          </g>
        );
      })}
    </Fig>
  );
}

function EnergyChain() {
  const steps = [["Baraj gölü", "potansiyel", "enerji"], ["Akan su", "türbini döndürür", "(kinetik)"], ["Jeneratör", "elektrik", "enerjisi"], ["Ampul", "ışık + ısı", "enerjisi"]];
  return (
    <Fig caption="Enerji dönüşümü örneği: hidroelektrik santral" h={105}>
      {steps.map((lines, i) => {
        const x = 6 + i * 74;
        return (
          <g key={i}>
            <rect x={x} y={20} width={64} height={60} rx={8} fill={["#bfdbfe", "#a5f3fc", "#fef08a", "#fed7aa"][i]} stroke={GRAY} />
            {lines.map((l, j) => <T key={j} x={x + 32} y={40 + j * 13} size={8} bold={j === 0}>{l}</T>)}
            {i < 3 && <Arrow x1={x + 65} y1={50} x2={x + 74} y2={50} color={GRAY} />}
          </g>
        );
      })}
    </Fig>
  );
}

function CarbonCycle() {
  const box = (x: number, y: number, w: number, label: string, fill: string) => (
    <g>
      <rect x={x} y={y} width={w} height={28} rx={8} fill={fill} stroke={GRAY} strokeWidth={1.5} />
      <T x={x + w / 2} y={y + 18} size={10} bold>{label}</T>
    </g>
  );
  return (
    <Fig caption="Karbon döngüsü: karbon canlılar ve atmosfer arasında dolaşır" h={205}>
      {box(95, 10, 110, "Atmosfer (CO₂)", "#e0f2fe")}
      {box(212, 10, 80, "Fosil yakıt", "#e7e5e4")}
      {box(10, 92, 84, "Bitkiler", "#bbf7d0")}
      {box(206, 92, 84, "Hayvanlar", "#fed7aa")}
      {box(85, 168, 130, "Ayrıştırıcılar", "#fef3c7")}
      <Arrow x1={110} y1={40} x2={60} y2={90} color={GREEN} />
      <T x={72} y={62} size={8} color={GREEN} bold anchor="end">fotosentez</T>
      <Arrow x1={82} y1={90} x2={128} y2={40} color={RED} />
      <Arrow x1={228} y1={90} x2={185} y2={40} color={RED} />
      <T x={225} y={62} size={8} color={RED} bold anchor="start">solunum</T>
      <Arrow x1={213} y1={24} x2={207} y2={24} color={RED} />
      <T x={250} y={50} size={8} color={RED}>yanma</T>
      <Arrow x1={96} y1={108} x2={204} y2={108} color={GREEN} />
      <T x={150} y={102} size={8} color={GREEN} bold>beslenme</T>
      <Arrow x1={50} y1={122} x2={110} y2={166} color={GRAY} />
      <Arrow x1={250} y1={122} x2={190} y2={166} color={GRAY} />
      <Arrow x1={150} y1={166} x2={150} y2={42} color={AMBER} />
      <T x={156} y={140} size={8} color={AMBER} bold anchor="start">ayrışma</T>
      <T x={156} y={150} size={8} color={AMBER} bold anchor="start">(CO₂ çıkışı)</T>
    </Fig>
  );
}

function Venn() {
  return (
    <Fig caption="Sürdürülebilir kalkınma: çevre, toplum ve ekonominin dengesi" h={185}>
      <circle cx={150} cy={62} r={46} fill="#22c55e" fillOpacity={0.4} stroke="#16a34a" strokeWidth={2} />
      <circle cx={113} cy={116} r={46} fill="#3b82f6" fillOpacity={0.4} stroke={BLUE} strokeWidth={2} />
      <circle cx={187} cy={116} r={46} fill="#f59e0b" fillOpacity={0.4} stroke={AMBER} strokeWidth={2} />
      <T x={150} y={38} size={12} bold>Çevre</T>
      <T x={84} y={130} size={12} bold>Toplum</T>
      <T x={216} y={130} size={12} bold>Ekonomi</T>
      <T x={150} y={98} size={8.5} bold>Sürdürülebilir</T>
      <T x={150} y={109} size={8.5} bold>kalkınma</T>
      <T x={150} y={176} size={9} color={GRAY}>Hiçbiri diğerinden vazgeçilerek sağlanmaz</T>
    </Fig>
  );
}

const TD = "border border-lab-paperLine p-2";

export function BesinZinciriNotes() {
  return (
    <div id="ders-notu" className="mt-10 space-y-6">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-beaker-dark dark:text-beaker-light">8. Sınıf · Ünite 6 · Ders Notu</p>
        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Besin Zinciri ve Enerji Akışı – Görselli Ders Notu</h2>
        <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/70">
          Besin zincirinden enerji dönüşümlerine, madde döngülerinden çevre sorunlarına ve sürdürülebilir kalkınmaya kadar ünitenin tamamı şekillerle özetlendi.
        </p>
      </div>

      <Box tone="info" title="🎯 Bu notta neleri öğreneceksin? (Kazanımlar)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Besin zinciri ve besin ağlarında üretici, tüketici ve ayrıştırıcıların rolünü açıklar.</li>
          <li>Enerjinin besin zincirinde akışını ve enerji piramidini yorumlar.</li>
          <li>Enerji dönüşümlerini örneklerle açıklar; yenilenebilir ve yenilenemez enerji kaynaklarını karşılaştırır.</li>
          <li>Su, karbon ve azot döngülerini açıklar.</li>
          <li>Çevre sorunlarının nedenlerini, sonuçlarını ve çözümlerini tartışır.</li>
          <li>Sürdürülebilir kalkınmanın önemini ve bireysel sorumluluğu değerlendirir.</li>
        </ul>
      </Box>

      <Section no="1" title="Besin Zinciri ve Enerji Akışı">
        <FoodChain />
        <div className="grid gap-3 sm:grid-cols-3">
          <Box tone="info" title="Üreticiler">Fotosentezle besin üretir (bitkiler, algler). Zincirin ilk halkasıdır.</Box>
          <Box tone="info" title="Tüketiciler">Hazır besinle beslenir. Otçul (1. derece), etçil ve hepçil (2., 3. derece) olabilir.</Box>
          <Box tone="info" title="Ayrıştırıcılar">Ölü canlıları ve atıkları ayrıştırarak maddeleri doğaya geri kazandırır (bakteri, mantar).</Box>
        </div>
        <ul className="list-disc space-y-1 pl-5">
          <li>Besin zincirinin başlangıcında her zaman <b>üretici</b> bulunur; enerjinin kaynağı Güneş’tir.</li>
          <li>Oklar <b>yenilenden yiyene</b> doğru çizilir (enerji ve madde akışı yönü).</li>
          <li>Doğada canlılar birden fazla besinle beslendiği için zincirler birbirine bağlanıp <b>besin ağını</b> oluşturur.</li>
          <li>Besin ağı ne kadar karmaşıksa ekosistem o kadar dengelidir; bir türün yok olması dengeyi bozar (ör. kurbağa azalınca çekirge artar, bitki azalır).</li>
        </ul>
        <EnergyPyramid />
        <Box tone="formula" title="⚡ Enerji akışı kuralları">
          <ul className="list-disc space-y-1 pl-5">
            <li>Enerji besin zincirinde <b>tek yönlü akar</b>, döngüsel değildir.</li>
            <li>Her basamakta enerjinin yaklaşık <b>%90’ı</b> solunum, ısı, hareket ve atıklarla kaybolur; <b>%10’u</b> bir sonraki basamağa geçer.</li>
            <li>Bu yüzden zincirler kısa tutulur (genellikle 4–5 halka); üst basamaktaki canlı sayısı azdır.</li>
            <li>Üreticiler 10 000 kJ enerji depoluyorsa otçullara 1 000 kJ, etçillere 100 kJ geçer.</li>
          </ul>
        </Box>
        <Box tone="warn" title="☠️ Zehirli maddelerin birikimi">
          <p>DDT gibi çevresel zehirler vücuttan atılmaz; besin zinciri boyunca <b>üst basamaklara doğru birikerek</b> artar. En çok etkilenenler zincirin sonundaki canlılardır (şahin, insan).</p>
        </Box>
      </Section>

      <Section no="2" title="Enerji Dönüşümleri">
        <p>Enerji yoktan var edilemez, vardan yok edilemez; yalnızca bir türden başka bir türe <b>dönüşür</b> (enerjinin korunumu). Dönüşümde bir kısım enerji çoğunlukla ısı olarak çevreye yayılır.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead><tr className="bg-beaker/10"><th className={TD}>Olay</th><th className={TD}>Dönüşüm</th></tr></thead>
            <tbody>
              <tr><td className={TD}>Fotosentez</td><td className={TD}>Işık enerjisi → kimyasal enerji</td></tr>
              <tr><td className={TD}>Solunum</td><td className={TD}>Kimyasal enerji → ısı + hareket (kinetik)</td></tr>
              <tr><td className={TD}>Ampul</td><td className={TD}>Elektrik → ışık + ısı</td></tr>
              <tr><td className={TD}>Elektrik motoru</td><td className={TD}>Elektrik → hareket (kinetik)</td></tr>
              <tr><td className={TD}>Güneş paneli</td><td className={TD}>Işık → elektrik</td></tr>
              <tr><td className={TD}>Yanma</td><td className={TD}>Kimyasal → ısı + ışık</td></tr>
              <tr><td className={TD}>Pil</td><td className={TD}>Kimyasal → elektrik</td></tr>
              <tr><td className={TD}>Hoparlör</td><td className={TD}>Elektrik → ses</td></tr>
            </tbody>
          </table>
        </div>
        <EnergyChain />
        <div className="grid gap-3 sm:grid-cols-2">
          <Box tone="info" title="🌞 Yenilenebilir kaynaklar">Güneş, rüzgâr, hidroelektrik (akarsu), jeotermal, biyokütle. Doğada kendini yeniler, çevreyi çok az kirletir.</Box>
          <Box tone="info" title="⛽ Yenilenemez kaynaklar">Kömür, petrol, doğal gaz, uranyum. Tükenir, sera gazı salar veya atık bırakır.</Box>
        </div>
        <Box tone="formula" title="💡 Verim ve tasarruf">
          <p>Verim (%) = (Yararlı enerji / Harcanan enerji) × 100. LED ampuller akkor telli ampullerden daha verimlidir (daha az ısı kaybı). Enerji tasarrufu hem para hem çevre için önemlidir.</p>
        </Box>
      </Section>

      <Section no="3" title="Madde Döngüleri ve Çevre Sorunları">
        <p>Enerjinin aksine <b>madde, doğada döngüsel</b> olarak dolaşır. Başlıca döngüler: su, karbon ve azot döngüleridir.</p>
        <CarbonCycle />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Su döngüsü:</b> Buharlaşma → yoğuşma (bulut) → yağış → yüzey/yer altı akışı → yeniden buharlaşma. Bitkilerin terlemesi de döngüye katılır.</li>
          <li><b>Karbon döngüsü:</b> Bitkiler CO₂’yi fotosentezle alır; canlılar solunumla, ayrıştırıcılar ayrışmayla, fabrikalar ve taşıtlar yanmayla atmosfere CO₂ verir.</li>
          <li><b>Azot döngüsü:</b> Havadaki azot (N₂) toprak bakterileri ve şimşekle bitkilerin kullanabileceği hale gelir; bitkiden hayvana geçer, ayrıştırıcılarla toprağa döner.</li>
        </ul>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead><tr className="bg-beaker/10"><th className={TD}>Çevre sorunu</th><th className={TD}>Nedeni</th><th className={TD}>Sonuçları</th><th className={TD}>Çözümü</th></tr></thead>
            <tbody>
              <tr><td className={TD}>Hava kirliliği</td><td className={TD}>Fosil yakıt, sanayi, egzoz</td><td className={TD}>Solunum hastalıkları, asit yağmuru</td><td className={TD}>Temiz enerji, filtre, toplu taşıma</td></tr>
              <tr><td className={TD}>Su kirliliği</td><td className={TD}>Evsel ve sanayi atıkları, gübre</td><td className={TD}>Canlı ölümleri, içme suyu sıkıntısı</td><td className={TD}>Arıtma tesisleri, bilinçli tüketim</td></tr>
              <tr><td className={TD}>Toprak kirliliği ve erozyon</td><td className={TD}>Tarım ilaçları, çöp, ağaç kesimi</td><td className={TD}>Verim düşer, çölleşme</td><td className={TD}>Ağaçlandırma, organik tarım</td></tr>
              <tr><td className={TD}>Sera etkisi / küresel ısınma</td><td className={TD}>CO₂ ve metan artışı</td><td className={TD}>Buzullar erir, iklim değişir</td><td className={TD}>Enerji tasarrufu, yenilenebilir enerji</td></tr>
              <tr><td className={TD}>Ozon tabakası incelmesi</td><td className={TD}>CFC gazları</td><td className={TD}>UV ışınlarında artış, cilt kanseri</td><td className={TD}>CFC kullanımının yasaklanması</td></tr>
              <tr><td className={TD}>Biyolojik çeşitlilik kaybı</td><td className={TD}>Yaşam alanı yıkımı, aşırı avlanma</td><td className={TD}>Türler yok olur, denge bozulur</td><td className={TD}>Koruma alanları, bilinçli avcılık</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section no="4" title="Sürdürülebilir Kalkınma">
        <Venn />
        <p><b>Sürdürülebilir kalkınma:</b> Gelecek nesillerin ihtiyaçlarını karşılama hakkını tehlikeye atmadan, bugünkü ihtiyaçları karşılamaktır. Doğal kaynaklar sınırlıdır; bu yüzden akıllıca kullanılmalıdır.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Box tone="info" title="Çevre">Doğanın korunması, kirliliğin azaltılması, biyolojik çeşitliliğin sürdürülmesi.</Box>
          <Box tone="info" title="Toplum">Adil paylaşım, sağlık ve eğitim, herkesin temiz suya ve gıdaya ulaşabilmesi.</Box>
          <Box tone="info" title="Ekonomi">Kaynakların verimli kullanımı, yenilenebilir enerji yatırımları, yeşil istihdam.</Box>
        </div>
        <Box tone="formula" title="♻️ Bireysel sorumluluk: 5 R">
          <p><b>Reddet</b> (gereksiz ürün), <b>Azalt</b> (tüketimi), <b>Yeniden kullan</b>, <b>Geri dönüştür</b>, <b>Onar</b>. Ayrıca sıfır atık hedefi, enerji ve su tasarrufu, yerel ve mevsiminde beslenme ile <b>ekolojik ayak izimizi</b> küçültebiliriz.</p>
        </Box>
        <ul className="list-disc space-y-1 pl-5">
          <li>Ekolojik ayak izi: Bir kişinin yaşam biçimi için gereken doğal kaynak ve arazi miktarıdır.</li>
          <li>Karbon ayak izi: Bir kişinin veya kurumun ürettiği sera gazı miktarıdır.</li>
          <li>Birleşmiş Milletler 2030 hedefleri 17 Sürdürülebilir Kalkınma Amacı içerir (temiz su, temiz enerji, iklim eylemi, karasal yaşam gibi).</li>
        </ul>
      </Section>

      <Section no="5" title="Sık Yapılan Yanlışlar">
        <ul className="list-disc space-y-1 pl-5">
          <li>❌ “Enerji besin zincirinde döngüsel dolaşır.” → ✅ Enerji tek yönlü akar, madde döngüseldir.</li>
          <li>❌ “Besin zincirinde oklar yiyenden yenene çizilir.” → ✅ Yenilenden yiyene çizilir.</li>
          <li>❌ “Ayrıştırıcılar zincirde yer almaz.” → ✅ Ayrıştırıcılar maddenin geri dönüşünü sağlayan temel halkadır.</li>
          <li>❌ “Her basamakta enerjinin tamamı aktarılır.” → ✅ Yalnızca yaklaşık %10’u aktarılır.</li>
          <li>❌ “Yenilenebilir enerji hiç çevre etkisi bırakmaz.” → ✅ Çevre etkisi çok azdır ama sıfır değildir.</li>
          <li>❌ “Sürdürülebilirlik sadece çevre korumadır.” → ✅ Çevre, toplum ve ekonomiyi birlikte kapsar.</li>
        </ul>
      </Section>

      <Section no="6" title="Mini Test (Kendini Dene)">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Bitki → çekirge → kurbağa → yılan zincirinde ikinci derece tüketici hangisidir? <span className="text-lab-inkMuted">(Cevap: Kurbağa)</span></li>
          <li>Üreticilerde 20 000 kJ enerji varsa 2. basamaktaki (otçul) canlıya yaklaşık kaç kJ geçer? <span className="text-lab-inkMuted">(Cevap: 2 000 kJ)</span></li>
          <li>Fotosentezde hangi enerji dönüşümü olur? <span className="text-lab-inkMuted">(Cevap: Işık enerjisi → kimyasal enerji)</span></li>
          <li>Atmosferdeki CO₂’yi canlı maddeye dönüştüren olay nedir? <span className="text-lab-inkMuted">(Cevap: Fotosentez)</span></li>
          <li>Sürdürülebilir kalkınmanın üç boyutunu yazınız. <span className="text-lab-inkMuted">(Cevap: Çevre, toplum, ekonomi)</span></li>
        </ol>
      </Section>
    </div>
  );
}

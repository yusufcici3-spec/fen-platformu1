import { Arrow, Box, Fig, Section, T } from "./BasitMakinelerNotes";

const BLUE = "#2563eb";
const RED = "#dc2626";
const GREEN = "#16a34a";
const GRAY = "#64748b";
const WATER = "#bae6fd";

function Bricks() {
  return (
    <Fig caption="Aynı ağırlık, farklı yüzey: dik duran tuğla daha büyük basınç yapar" h={170}>
      <line x1={10} y1={135} x2={290} y2={135} stroke="currentColor" strokeWidth={3} />
      <rect x={55} y={55} width={36} height={80} fill="#f97316" stroke="#9a3412" strokeWidth={2} />
      <rect x={165} y={95} width={90} height={40} fill="#f97316" stroke="#9a3412" strokeWidth={2} />
      <Arrow x1={73} y1={20} x2={73} y2={52} color={GREEN} />
      <Arrow x1={210} y1={20} x2={210} y2={92} color={GREEN} />
      <T x={86} y={34} size={11} color={GREEN} bold anchor="start">G</T>
      <T x={223} y={40} size={11} color={GREEN} bold anchor="start">G</T>
      <T x={73} y={152} size={11} bold>S küçük → P büyük</T>
      <T x={210} y={152} size={11} bold>S büyük → P küçük</T>
    </Fig>
  );
}

function TankPressure() {
  return (
    <Fig caption="Sıvı basıncı derinlikle artar ve her yöne uygulanır" h={170}>
      <rect x={60} y={20} width={140} height={125} fill={WATER} stroke="currentColor" strokeWidth={3} />
      <line x1={60} y1={20} x2={200} y2={20} stroke={BLUE} strokeWidth={2} strokeDasharray="4 3" />
      {[[50, 20], [85, 45], [120, 70]].map(([y, l]) => (
        <Arrow key={y} x1={200} y1={y} x2={200 + l} y2={y} color={RED} />
      ))}
      <line x1={40} y1={20} x2={40} y2={120} stroke="currentColor" strokeWidth={1.5} />
      <line x1={34} y1={20} x2={46} y2={20} stroke="currentColor" strokeWidth={1.5} />
      <line x1={34} y1={120} x2={46} y2={120} stroke="currentColor" strokeWidth={1.5} />
      <T x={22} y={74} size={13} bold>h</T>
      <T x={130} y={85} size={11}>sıvı (d)</T>
      <T x={130} y={163} size={10}>Ok uzunluğu = basıncın büyüklüğü (derinde daha büyük)</T>
    </Fig>
  );
}

function Hydraulic() {
  return (
    <Fig caption="Hidrolik pres: sıvıya uygulanan basınç her noktaya aynen iletilir" h={170}>
      <path d="M40 95 H80 V125 H150 V95 H250 V145 H40 Z" fill={WATER} stroke="currentColor" strokeWidth={2.5} />
      <rect x={40} y={86} width={40} height={9} fill={GRAY} />
      <rect x={150} y={86} width={100} height={9} fill={GRAY} />
      <rect x={170} y={50} width={60} height={36} rx={3} fill={RED} />
      <T x={200} y={73} size={12} color="#fff" bold>Yük</T>
      <Arrow x1={60} y1={30} x2={60} y2={83} color={BLUE} />
      <T x={72} y={40} size={12} color={BLUE} bold anchor="start">F₁</T>
      <Arrow x1={260} y1={125} x2={260} y2={70} color={GREEN} />
      <T x={268} y={80} size={12} color={GREEN} bold anchor="start">F₂</T>
      <T x={60} y={112} size={11} bold>S₁</T>
      <T x={200} y={118} size={11} bold>S₂</T>
      <T x={150} y={163} size={11}>F₁ / S₁ = F₂ / S₂ (S₂ büyük → F₂ büyük)</T>
    </Fig>
  );
}

function Torricelli() {
  return (
    <Fig caption="Torricelli deneyi: deniz seviyesinde açık hava basıncı 76 cmHg" h={170}>
      <rect x={130} y={14} width={30} height={116} fill="none" stroke="currentColor" strokeWidth={2.5} />
      <rect x={132} y={50} width={26} height={80} fill="#94a3b8" />
      <path d="M90 125 H200 V150 H90 Z" fill="none" stroke="currentColor" strokeWidth={2.5} />
      <rect x={92} y={130} width={106} height={18} fill="#94a3b8" />
      <T x={170} y={34} size={10} bold anchor="start">← Boşluk (vakum)</T>
      <T x={145} y={92} size={11} color="#fff" bold>Civa</T>
      <line x1={188} y1={50} x2={188} y2={130} stroke="currentColor" strokeWidth={1.5} />
      <line x1={182} y1={50} x2={194} y2={50} stroke="currentColor" strokeWidth={1.5} />
      <line x1={182} y1={130} x2={194} y2={130} stroke="currentColor" strokeWidth={1.5} />
      <T x={198} y={94} size={12} bold anchor="start">76 cm</T>
      <Arrow x1={105} y1={90} x2={105} y2={122} color={RED} />
      <Arrow x1={118} y1={90} x2={118} y2={122} color={RED} />
      <T x={55} y={86} size={10} color={RED} bold>Açık hava</T>
      <T x={55} y={98} size={10} color={RED} bold>basıncı</T>
    </Fig>
  );
}

function GasPiston() {
  const left: [number, number][] = [[35, 60], [60, 90], [90, 70], [110, 105], [45, 115], [80, 120], [100, 50], [65, 55]];
  const right: [number, number][] = [[185, 105], [210, 115], [235, 100], [255, 118], [195, 125], [225, 125], [248, 108], [205, 107]];
  return (
    <Fig caption="Gaz basıncı: hacim küçülünce taneciklerin çarpma sayısı artar, basınç artar" h={170}>
      <rect x={20} y={40} width={100} height={92} fill="none" stroke="currentColor" strokeWidth={2.5} />
      <rect x={20} y={32} width={100} height={8} fill={GRAY} />
      {left.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={4} fill={RED} />)}
      <T x={70} y={150} size={11} bold>Büyük hacim, küçük P</T>
      <rect x={170} y={92} width={100} height={40} fill="none" stroke="currentColor" strokeWidth={2.5} />
      <rect x={170} y={84} width={100} height={8} fill={GRAY} />
      {right.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={4} fill={RED} />)}
      <Arrow x1={220} y1={40} x2={220} y2={80} color={BLUE} />
      <T x={232} y={52} size={12} color={BLUE} bold anchor="start">F</T>
      <T x={220} y={150} size={11} bold>Küçük hacim, büyük P</T>
    </Fig>
  );
}

const TD = "border border-lab-paperLine p-2";

export function BasincNotes() {
  return (
    <div id="ders-notu" className="mt-10 space-y-6">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-beaker-dark dark:text-beaker-light">8. Sınıf · Ünite 3 · Ders Notu</p>
        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Basınç – Görselli Ders Notu</h2>
        <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/70">
          Katı, sıvı ve gaz basıncını; açık hava basıncını; basıncı etkileyen değişkenleri ve günlük hayat uygulamalarını şekiller ve çözümlü örneklerle öğren.
        </p>
      </div>

      <Box tone="info" title="🎯 Bu notta neleri öğreneceksin? (Kazanımlar)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basıncı kuvvet ve yüzey alanı ilişkisiyle açıklar.</li>
          <li>Katı basıncını etkileyen değişkenleri belirler ve hesaplar.</li>
          <li>Sıvı basıncının derinlik ve sıvının yoğunluğu ile ilişkisini yorumlar.</li>
          <li>Pascal ilkesini ve hidrolik sistemlerin çalışmasını açıklar.</li>
          <li>Açık hava basıncını ve gaz basıncını örneklerle açıklar.</li>
          <li>Basınçla ilgili günlük hayat durumlarını yorumlar.</li>
        </ul>
      </Box>

      <Section no="1" title="Basınç Nedir?">
        <p>Birim yüzeye dik olarak etki eden kuvvete <b>basınç</b> denir. Basınç, yalnızca kuvvete değil kuvvetin uygulandığı <b>yüzey alanına</b> da bağlıdır.</p>
        <Bricks />
        <Box tone="formula" title="📐 Basınç bağıntısı">
          <p><b>P = F / S</b></p>
          <p>P: basınç (Pa = N/m²) • F: yüzeye dik kuvvet (N) • S: yüzey alanı (m²)</p>
          <p>Kuvvet sabitken yüzey alanı küçüldükçe basınç artar; yüzey alanı büyüdükçe basınç azalır.</p>
        </Box>
        <div className="grid gap-3 sm:grid-cols-2">
          <Box tone="info" title="Basıncı artırmak için (S küçültülür)">Bıçağın keskin tutulması, çivinin ucunun sivri olması, iğne, kazma, diş.</Box>
          <Box tone="info" title="Basıncı azaltmak için (S büyütülür)">Kar ayakkabısı, tank paleti, geniş temelli binalar, yük taşıyan tırların çok tekerlekli olması.</Box>
        </div>
      </Section>

      <Section no="2" title="Katı Basıncı">
        <p>Yatay zeminde duran katı bir cismin yüzeye uyguladığı kuvvet, cismin <b>ağırlığıdır</b> (F = G = m · g). Bu yüzden katı basıncı: <b>P = G / S</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Katılar uyguladıkları kuvveti <b>yalnızca kuvvet yönünde</b> (zemine doğru) iletir.</li>
          <li>Aynı cisim farklı yüzeyi üzerine konursa kuvvet değişmez, basınç değişir.</li>
          <li>Eşit ağırlıklı cisimlerde alt yüzeyi en küçük olanın basıncı en büyüktür.</li>
        </ul>
        <Box tone="formula" title="📐 Örnek 1">
          <p>Ağırlığı 600 N olan bir öğrenci, her bir ayağının alanı 150 cm² olan ayakkabılarla iki ayak üzerinde duruyor. Toplam alan = 2 · 150 = 300 cm² = 0,03 m².</p>
          <p>P = 600 / 0,03 = <b>20 000 Pa</b>. Tek ayak üzerinde dursa alan yarıya iner, basınç <b>40 000 Pa</b> olur.</p>
        </Box>
        <Box tone="formula" title="📐 Örnek 2">
          <p>Kenarları 10 cm, 20 cm, 40 cm olan 80 N’luk dikdörtgen prizma en geniş yüzeyi üzerine konursa S = 20 · 40 = 800 cm² = 0,08 m²; P = 80 / 0,08 = <b>1000 Pa</b>. En dar yüzeyi (10 · 20 = 200 cm² = 0,02 m²) üzerine konursa P = <b>4000 Pa</b> olur.</p>
        </Box>
      </Section>

      <Section no="3" title="Sıvı Basıncı">
        <TankPressure />
        <ul className="list-disc space-y-1 pl-5">
          <li>Sıvılar ağırlıkları nedeniyle bulundukları kabın taban ve yan yüzeylerine basınç uygular.</li>
          <li>Sıvı basıncı <b>her yöne</b> etki eder (katılardan farkı).</li>
          <li>Aynı sıvıda aynı derinlikteki bütün noktalarda basınç eşittir.</li>
          <li>Sıvı basıncı <b>kabın şekline ve sıvı miktarına bağlı değildir</b>; derinliğe ve sıvının yoğunluğuna bağlıdır.</li>
          <li>Sıvı basıncı derinlikle artar; yoğunluğu büyük sıvının basıncı daha büyüktür.</li>
        </ul>
        <Box tone="formula" title="📐 Sıvı basıncı bağıntısı">
          <p><b>P = h · d · g</b></p>
          <p>h: derinlik (m) • d: sıvı yoğunluğu (kg/m³) • g: yer çekimi ivmesi (≈ 10 N/kg)</p>
          <p>Kabın tabanındaki sıvı kuvveti: <b>F = P · S</b> (kabın şeklinden bağımsız basınç, ama kuvvet taban alanına bağlıdır).</p>
        </Box>
        <Box tone="formula" title="📐 Örnek">
          <p>Su (d = 1000 kg/m³) içinde 5 m derinlikte basınç: P = 5 · 1000 · 10 = <b>50 000 Pa</b>. Derinlik 10 m olursa basınç <b>100 000 Pa</b> olur (derinlik 2 katına çıkınca basınç da 2 katına çıkar).</p>
        </Box>
        <div className="grid gap-3 sm:grid-cols-2">
          <Box tone="info" title="Birleşik kaplar">Birbirine bağlı kaplarda sıvı, kapların şeklinden bağımsız olarak <b>aynı yükseklikte</b> durur (su kuleleri, çaydanlık, su terazisi). Kaplara farklı yoğunlukta sıvılar konursa yoğunluğu büyük olan daha düşük seviyede kalır.</Box>
          <Box tone="info" title="Günlük hayat">Baraj duvarlarının altta daha kalın yapılması, dalgıçların derinde özel kıyafet giymesi, denizaltı gövdesinin dayanıklı olması.</Box>
        </div>
      </Section>

      <Section no="4" title="Pascal İlkesi ve Hidrolik Sistemler">
        <p>Kapalı bir kaptaki durgun sıvıya uygulanan basınç, sıvının her noktasına ve kabın çeperlerine <b>aynen iletilir</b>.</p>
        <Hydraulic />
        <Box tone="formula" title="📐 Hidrolik sistemde denge">
          <p>P₁ = P₂ → <b>F₁ / S₁ = F₂ / S₂</b></p>
          <p>Küçük pistona uygulanan küçük kuvvet, büyük pistonda büyük bir kuvvet oluşturur. Ancak enerji kazancı yoktur: küçük piston büyük pistondan daha fazla yol alır.</p>
        </Box>
        <Box tone="formula" title="📐 Örnek">
          <p>Küçük piston alanı 10 cm², büyük piston alanı 200 cm². Küçük pistona 50 N kuvvet uygulanırsa büyük pistonda F₂ = 50 · 200 / 10 = <b>1000 N</b> oluşur.</p>
        </Box>
        <p><b>Kullanım alanları:</b> Araç lifti, hidrolik fren, kepçe ve iş makineleri, berber koltuğu, hidrolik kriko, diş hekimi koltuğu.</p>
      </Section>

      <Section no="5" title="Açık Hava Basıncı">
        <p>Dünya’yı saran hava tabakasının (atmosfer) ağırlığı nedeniyle yeryüzündeki cisimlere uyguladığı basınca <b>açık hava basıncı</b> denir.</p>
        <Torricelli />
        <ul className="list-disc space-y-1 pl-5">
          <li>Torricelli, civa dolu bir tüpü ters çevirerek açık hava basıncını ölçmüştür. Deniz seviyesinde civa sütunu <b>76 cm</b> yüksekliktedir. Bu değer <b>1 atmosfer</b> basıncıdır (≈ 100 000 Pa).</li>
          <li>Açık hava basıncı <b>her yöne</b> etki eder.</li>
          <li>Yükseklere çıkıldıkça hava tabakası inceldiği için açık hava basıncı <b>azalır</b>.</li>
          <li>Açık hava basıncı <b>barometre</b> ile ölçülür.</li>
          <li>Tüpün eğilmesi, tüpün kalınlığı ya da şekli civa sütununun düşey yüksekliğini değiştirmez; yükseklik değişirse değişir.</li>
          <li>Yükseklerde basınç azaldığı için sıvıların kaynama noktası düşer (dağda su daha düşük sıcaklıkta kaynar, yemek geç pişer).</li>
        </ul>
        <Box tone="info" title="Açık hava basıncının etkileri">
          <p>Pipetle içecek içmek, vantuzun yapışması, enjektöre ilaç çekmek, ters çevrilmiş dolu bardağın üzerindeki kartonun düşmemesi, Magdeburg yarım küreleri, konserve kutusunun iki delik açılınca akması.</p>
        </Box>
      </Section>

      <Section no="6" title="Gaz Basıncı">
        <GasPiston />
        <ul className="list-disc space-y-1 pl-5">
          <li>Kapalı kaptaki gaz tanecikleri sürekli hareket eder ve çeperlere çarpar; bu çarpmalar <b>gaz basıncını</b> oluşturur.</li>
          <li>Gaz basıncı kabın <b>her noktasında ve her yönde</b> eşittir.</li>
          <li><b>Sıcaklık sabitken:</b> Hacim küçülürse basınç artar, hacim büyürse basınç azalır (P · V = sabit).</li>
          <li><b>Hacim sabitken:</b> Sıcaklık artarsa tanecikler hızlanır, basınç artar (güneşte kalan sprey kutusunun patlaması).</li>
          <li>Gaz miktarı (tanecik sayısı) artarsa basınç artar (şişirilen balon, lastik).</li>
          <li>Kapalı kaplardaki gaz basıncı <b>manometre</b> ile ölçülür.</li>
        </ul>
        <Box tone="formula" title="📐 Örnek">
          <p>Sıcaklığı sabit bir gaz, pistonla hacmi yarıya düşecek şekilde sıkıştırılırsa gazın basıncı <b>2 katına</b> çıkar (P · V sabit).</p>
        </Box>
      </Section>

      <Section no="7" title="Özet Tablo">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead><tr className="bg-beaker/10"><th className={TD}>Basınç türü</th><th className={TD}>Bağlı olduğu değişkenler</th><th className={TD}>Yönü</th><th className={TD}>Bağıntı</th></tr></thead>
            <tbody>
              <tr><td className={TD}>Katı basıncı</td><td className={TD}>Ağırlık (kuvvet), yüzey alanı</td><td className={TD}>Yalnızca kuvvet yönünde</td><td className={TD}>P = F / S</td></tr>
              <tr><td className={TD}>Sıvı basıncı</td><td className={TD}>Derinlik, sıvı yoğunluğu</td><td className={TD}>Her yöne</td><td className={TD}>P = h · d · g</td></tr>
              <tr><td className={TD}>Açık hava basıncı</td><td className={TD}>Yükseklik (hava tabakası)</td><td className={TD}>Her yöne</td><td className={TD}>Deniz seviyesinde 76 cmHg</td></tr>
              <tr><td className={TD}>Gaz basıncı</td><td className={TD}>Hacim, sıcaklık, gaz miktarı</td><td className={TD}>Her yöne</td><td className={TD}>Sabit sıcaklıkta P · V = sabit</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section no="8" title="Sık Yapılan Yanlışlar">
        <ul className="list-disc space-y-1 pl-5">
          <li>❌ “Ağırlık büyükse basınç da büyüktür.” → ✅ Basınç aynı zamanda yüzey alanına bağlıdır.</li>
          <li>❌ “Sıvı basıncı kabın şekline bağlıdır.” → ✅ Yalnızca derinlik, yoğunluk (ve g) önemlidir.</li>
          <li>❌ “Sıvı basıncı sadece tabana etki eder.” → ✅ Her yöne etki eder.</li>
          <li>❌ “Yükseğe çıkınca açık hava basıncı artar.” → ✅ Azalır.</li>
          <li>❌ “Hidrolik sistemde enerji kazanılır.” → ✅ Kuvvetten kazanç var, işten kazanç yoktur.</li>
          <li>❌ “Basıncın birimi newton’dur.” → ✅ Basınç birimi pascal (Pa = N/m²); newton kuvvet birimidir.</li>
        </ul>
      </Section>

      <Section no="9" title="Mini Test (Kendini Dene)">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Ağırlığı 200 N olan bir cisim 0,05 m² alana sahip yüzeyi üzerinde duruyor. Basınç kaç Pa’dır? <span className="text-lab-inkMuted">(Cevap: 4000 Pa)</span></li>
          <li>Yoğunluğu 800 kg/m³ olan yağda 3 m derinlikteki basınç kaç Pa’dır? <span className="text-lab-inkMuted">(Cevap: 24 000 Pa)</span></li>
          <li>Küçük piston 5 cm², büyük piston 100 cm² olan hidrolik sistemde küçük pistona 20 N kuvvet uygulanırsa büyük pistonda kaç N oluşur? <span className="text-lab-inkMuted">(Cevap: 400 N)</span></li>
          <li>Bir dağın tepesine çıkıldıkça açık hava basıncı nasıl değişir? <span className="text-lab-inkMuted">(Cevap: Azalır)</span></li>
          <li>Sıcaklığı sabit kapalı kaptaki gazın hacmi 3 katına çıkarılırsa basınç nasıl değişir? <span className="text-lab-inkMuted">(Cevap: 1/3’üne düşer)</span></li>
        </ol>
      </Section>
    </div>
  );
}

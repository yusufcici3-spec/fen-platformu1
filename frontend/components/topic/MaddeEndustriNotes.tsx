import { Arrow, Box, Fig, Section, T } from "./BasitMakinelerNotes";

const BLUE = "#2563eb";
const RED = "#dc2626";
const GREEN = "#16a34a";
const AMBER = "#f59e0b";
const PURPLE = "#9333ea";
const GRAY = "#64748b";

/* ---------- Periyodik sistem (ilk 3 periyot) ---------- */
type Kind = "m" | "a" | "y" | "s";
const KIND_COLOR: Record<Kind, string> = { m: "#93c5fd", a: "#86efac", y: "#fcd34d", s: "#d8b4fe" };
const EL: [number, number, string, Kind][] = [
  [1, 1, "H", "a"], [1, 18, "He", "s"],
  [2, 1, "Li", "m"], [2, 2, "Be", "m"], [2, 13, "B", "y"], [2, 14, "C", "a"], [2, 15, "N", "a"], [2, 16, "O", "a"], [2, 17, "F", "a"], [2, 18, "Ne", "s"],
  [3, 1, "Na", "m"], [3, 2, "Mg", "m"], [3, 13, "Al", "m"], [3, 14, "Si", "y"], [3, 15, "P", "a"], [3, 16, "S", "a"], [3, 17, "Cl", "a"], [3, 18, "Ar", "s"],
];

function PeriodicMini() {
  const cw = 15.4, ch = 22, x0 = 22, y0 = 22;
  return (
    <Fig caption="Periyodik sistemin ilk 3 periyodu (yatay satır = periyot, düşey sütun = grup)" h={150}>
      {Array.from({ length: 18 }, (_, i) => (
        <T key={i} x={x0 + i * cw + cw / 2} y={16} size={8}>{i + 1}</T>
      ))}
      {[1, 2, 3].map((p) => (
        <T key={p} x={10} y={y0 + (p - 1) * ch + 15} size={9} bold>{p}</T>
      ))}
      {EL.map(([p, g, s, k]) => (
        <g key={s}>
          <rect x={x0 + (g - 1) * cw} y={y0 + (p - 1) * ch} width={cw - 1} height={ch - 1} rx={2} fill={KIND_COLOR[k]} stroke="#475569" strokeWidth={0.6} />
          <T x={x0 + (g - 1) * cw + (cw - 1) / 2} y={y0 + (p - 1) * ch + 14} size={8} bold>{s}</T>
        </g>
      ))}
      <T x={150} y={104} size={8.5} color={GRAY}>Alt periyotlar ve geçiş metalleri (3-12. gruplar) şekilde gösterilmedi</T>
      {([["Metal", "m"], ["Ametal", "a"], ["Yarı metal", "y"], ["Soygaz", "s"]] as [string, Kind][]).map(([n, k], i) => (
        <g key={n}>
          <rect x={20 + i * 68} y={118} width={11} height={11} rx={2} fill={KIND_COLOR[k]} stroke="#475569" strokeWidth={0.6} />
          <T x={35 + i * 68} y={127} size={10} anchor="start">{n}</T>
        </g>
      ))}
    </Fig>
  );
}

/* ---------- Parçacık çizimleri ---------- */
function Water({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={8} fill={RED} />
      <circle cx={x - 9} cy={y + 8} r={5} fill="#fff" stroke={GRAY} strokeWidth={1.2} />
      <circle cx={x + 9} cy={y + 8} r={5} fill="#fff" stroke={GRAY} strokeWidth={1.2} />
    </g>
  );
}
function H2({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x - 5} cy={y} r={5} fill="#fff" stroke={GRAY} strokeWidth={1.2} />
      <circle cx={x + 5} cy={y} r={5} fill="#fff" stroke={GRAY} strokeWidth={1.2} />
    </g>
  );
}
function O2({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x - 8} cy={y} r={8} fill={RED} />
      <circle cx={x + 8} cy={y} r={8} fill={RED} />
    </g>
  );
}

function PhysicalChange() {
  return (
    <Fig caption="Fiziksel değişim: buz erir; molekülün yapısı aynı kalır (H₂O → H₂O)" h={120}>
      <rect x={15} y={25} width={110} height={70} rx={6} fill="#e0f2fe" stroke={BLUE} />
      {[[40, 45], [80, 45], [40, 75], [80, 75]].map(([x, y]) => <Water key={`${x}${y}`} x={x} y={y} />)}
      <T x={70} y={110} size={11}>Buz (katı)</T>
      <Arrow x1={135} y1={60} x2={165} y2={60} />
      <rect x={175} y={25} width={110} height={70} rx={6} fill="#e0f2fe" stroke={BLUE} />
      {[[205, 50], [255, 45], [225, 78], [265, 80]].map(([x, y]) => <Water key={`${x}${y}`} x={x} y={y} />)}
      <T x={230} y={110} size={11}>Su (sıvı)</T>
    </Fig>
  );
}

function ChemicalChange() {
  return (
    <Fig caption="Kimyasal değişim: 2H₂ + O₂ → 2H₂O (yeni madde oluşur, atomlar korunur)" h={130}>
      <H2 x={30} y={40} />
      <H2 x={30} y={70} />
      <T x={58} y={59} size={16} bold>+</T>
      <O2 x={95} y={55} />
      <Arrow x1={125} y1={55} x2={165} y2={55} />
      <Water x={205} y={45} />
      <Water x={255} y={45} />
      <T x={150} y={105} size={11}>Girenler (reaktifler): 4 H, 2 O</T>
      <T x={150} y={120} size={11}>Ürünler: 4 H, 2 O → atom sayısı eşit</T>
    </Fig>
  );
}

/* ---------- pH ölçeği ---------- */
function PhScale() {
  const colors = ["#dc2626", "#ea580c", "#f97316", "#f59e0b", "#eab308", "#a3e635", "#4ade80", "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1", "#7c3aed", "#6d28d9", "#581c87"];
  const w = 19;
  return (
    <Fig caption="pH ölçeği: 0–6 asit, 7 nötr, 8–14 baz" h={150}>
      {colors.map((c, i) => (
        <g key={i}>
          <rect x={7 + i * w} y={62} width={w - 1} height={24} fill={c} />
          <T x={7 + i * w + w / 2 - 0.5} y={79} size={10} color="#fff" bold>{i}</T>
        </g>
      ))}
      <T x={60} y={102} size={11} bold color={RED}>ASİT</T>
      <T x={140} y={102} size={11} bold color={GREEN}>NÖTR</T>
      <T x={235} y={102} size={11} bold color={PURPLE}>BAZ</T>
      <T x={26} y={52} size={9}>Mide asidi</T>
      <T x={73} y={30} size={9}>Limon</T>
      <T x={92} y={52} size={9}>Sirke</T>
      <T x={150} y={30} size={9}>Saf su</T>
      <T x={187} y={52} size={9}>Kabartma t.</T>
      <T x={240} y={30} size={9}>Sabun</T>
      <T x={277} y={52} size={9}>Çam. suyu</T>
      <T x={150} y={128} size={10} color={GRAY}>pH sayısı küçüldükçe asitlik, büyüdükçe bazlık artar</T>
    </Fig>
  );
}

/* ---------- Isıtma eğrisi ---------- */
function HeatingCurve() {
  return (
    <Fig caption="Isıtma eğrisi: hal değişimi sırasında sıcaklık sabit kalır" h={170}>
      <line x1={35} y1={20} x2={35} y2={140} stroke="currentColor" strokeWidth={1.5} />
      <line x1={35} y1={140} x2={285} y2={140} stroke="currentColor" strokeWidth={1.5} />
      <T x={38} y={14} size={10} anchor="start">Sıcaklık</T>
      <T x={160} y={158} size={10}>Verilen ısı / zaman</T>
      <polyline points="40,130 80,105 120,105 170,55 215,55 265,30" fill="none" stroke={BLUE} strokeWidth={3} />
      <line x1={35} y1={105} x2={80} y2={105} stroke={GRAY} strokeDasharray="3 3" />
      <line x1={35} y1={55} x2={170} y2={55} stroke={GRAY} strokeDasharray="3 3" />
      <T x={28} y={108} size={9} anchor="end">E.N.</T>
      <T x={28} y={58} size={9} anchor="end">K.N.</T>
      <T x={52} y={96} size={10} color={BLUE} bold>Katı</T>
      <T x={100} y={98} size={10} color={RED} bold>Erime</T>
      <T x={135} y={68} size={10} color={BLUE} bold anchor="end">Sıvı</T>
      <T x={192} y={47} size={10} color={RED} bold>Kaynama</T>
      <T x={252} y={52} size={10} color={BLUE} bold>Gaz</T>
    </Fig>
  );
}

const TD = "border border-lab-paperLine p-2";

export function MaddeEndustriNotes() {
  return (
    <div id="ders-notu" className="mt-10 space-y-6">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-beaker-dark dark:text-beaker-light">8. Sınıf · Ünite 4 · Ders Notu</p>
        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Madde ve Endüstri – Görselli Ders Notu</h2>
        <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/70">
          Periyodik sistemden asit-baza, kimyasal tepkimelerden maddenin ısı ile etkileşimine ve Türkiye’de kimya endüstrisine kadar ünitenin tamamı şekillerle özetlendi.
        </p>
      </div>

      <Box tone="info" title="🎯 Bu notta neleri öğreneceksin? (Kazanımlar)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Elementleri periyodik sistemdeki yerlerine göre sınıflandırır ve özelliklerini yorumlar.</li>
          <li>Fiziksel ve kimyasal değişimleri örneklerle ayırt eder.</li>
          <li>Kimyasal tepkimelerde atomların ve kütlenin korunduğunu açıklar, tepkimeleri denkleştirir.</li>
          <li>Asit ve bazları özelliklerine, pH değerlerine ve günlük hayattaki kullanımlarına göre ayırt eder.</li>
          <li>Isı alış verişinde hal değişimini ve sıcaklık değişimini ayırt eder.</li>
          <li>Türkiye’de kimya endüstrisinin alanlarını ve çevreye etkilerini sorgular.</li>
        </ul>
      </Box>

      <Section no="1" title="Periyodik Sistem">
        <p>
          Elementler, <b>artan atom numaralarına</b> göre (Moseley) dizilmiş ve benzer özellik gösterenler alt alta gelecek şekilde tabloda toplanmıştır. İlk tabloyu atom kütlesine göre hazırlayan bilim insanı <b>Mendeleyev</b>’dir; boş bıraktığı yerlerdeki elementlerin özelliklerini önceden tahmin etmiştir.
        </p>
        <PeriodicMini />
        <div className="grid gap-3 sm:grid-cols-2">
          <Box tone="info" title="Periyot ve grup">
            <p><b>Periyot:</b> Yatay sıra (7 tane). Soldan sağa gidildikçe atom numarası artar.</p>
            <p><b>Grup:</b> Düşey sütun (18 tane). Aynı gruptaki elementlerin kimyasal özellikleri benzerdir.</p>
          </Box>
          <Box tone="info" title="Element sınıfları">
            <p><b>Metaller:</b> Parlak, işlenebilir, ısı ve elektriği iyi iletir (Fe, Cu, Al). Hg dışında oda sıcaklığında katıdır.</p>
            <p><b>Ametaller:</b> Mat, kırılgan, genelde yalıtkan (C, S, O, N).</p>
            <p><b>Yarı metaller:</b> İkisinin özelliklerini taşır (Si, B).</p>
          </Box>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead><tr className="bg-beaker/10"><th className={TD}>Grup</th><th className={TD}>Adı</th><th className={TD}>Özellik</th><th className={TD}>Örnek</th></tr></thead>
            <tbody>
              <tr><td className={TD}>1. grup</td><td className={TD}>Alkali metaller</td><td className={TD}>Çok aktif, yumuşak, suyla şiddetli tepkime</td><td className={TD}>Li, Na, K</td></tr>
              <tr><td className={TD}>2. grup</td><td className={TD}>Toprak alkali metaller</td><td className={TD}>Aktif metaller</td><td className={TD}>Mg, Ca</td></tr>
              <tr><td className={TD}>17. grup</td><td className={TD}>Halojenler</td><td className={TD}>Çok aktif ametaller</td><td className={TD}>F, Cl, Br</td></tr>
              <tr><td className={TD}>18. grup</td><td className={TD}>Soygazlar</td><td className={TD}>Kararlı, tepkimeye girmez, tek atomlu gaz</td><td className={TD}>He, Ne, Ar</td></tr>
            </tbody>
          </table>
        </div>
        <Box tone="warn" title="⚠️ Dikkat">
          <p>Hidrojen (H) 1. grupta yer alsa da <b>ametaldir</b>. Helyum (He) soygaz olduğu için 18. gruptadır.</p>
        </Box>
      </Section>

      <Section no="2" title="Fiziksel ve Kimyasal Değişimler">
        <p>Maddenin dış görünüşünün değişip <b>kimliğinin değişmediği</b> olaylar fiziksel, <b>yeni maddelerin oluştuğu</b> olaylar kimyasal değişimdir.</p>
        <div className="grid gap-3 md:grid-cols-2">
          <PhysicalChange />
          <ChemicalChange />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead><tr className="bg-beaker/10"><th className={TD}></th><th className={TD}>Fiziksel değişim</th><th className={TD}>Kimyasal değişim</th></tr></thead>
            <tbody>
              <tr><td className={TD}>Yeni madde</td><td className={TD}>Oluşmaz</td><td className={TD}>Oluşur</td></tr>
              <tr><td className={TD}>Madde türü</td><td className={TD}>Değişmez</td><td className={TD}>Değişir</td></tr>
              <tr><td className={TD}>Geri dönüş</td><td className={TD}>Genelde kolay</td><td className={TD}>Genelde zor</td></tr>
              <tr><td className={TD}>Örnekler</td><td className={TD}>Hal değişimi, çözünme, kırılma, kesme, genleşme</td><td className={TD}>Yanma, paslanma, çürüme, mayalanma, pişirme</td></tr>
            </tbody>
          </table>
        </div>
        <Box tone="formula" title="🔎 Kimyasal değişimin belirtileri">
          <p>Renk değişimi • Gaz çıkışı (kabarcık) • Çökelme (katı oluşumu) • Işık ve ısı çıkışı • Koku değişimi • Tat değişimi</p>
        </Box>
      </Section>

      <Section no="3" title="Kimyasal Tepkimeler">
        <p>Maddelerin atomlarının yeniden düzenlenerek yeni maddelerin oluşmasına <b>kimyasal tepkime</b> denir. Girenlere <b>reaktif</b>, oluşanlara <b>ürün</b> adı verilir: <b>Reaktifler → Ürünler</b></p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Kütlenin korunumu (Lavoisier):</b> Tepkimeden önceki toplam kütle, tepkimeden sonraki toplam kütleye eşittir.</li>
          <li><b>Atom sayısı korunur:</b> Her elementin atom sayısı iki tarafta eşit olmalıdır; bu yüzden tepkime denkleştirilir.</li>
          <li><b>Atom türü korunur:</b> Atomlar yok olmaz, yeni atom da oluşmaz; yalnızca yeniden dizilir.</li>
          <li><b>Molekül sayısı ve molekül türü korunmak zorunda değildir.</b></li>
        </ul>
        <Box tone="formula" title="📐 Denkleştirme örneği">
          <p>H₂ + O₂ → H₂O (denk değil: solda 2 O, sağda 1 O)</p>
          <p>Katsayılarla: <b>2H₂ + O₂ → 2H₂O</b> (her iki yanda 4 H ve 2 O)</p>
          <p>Katsayılar yalnızca denkleştirmede değişir; alt indisler (H₂ ve O₂ gibi) asla değiştirilmez.</p>
        </Box>
        <Box tone="formula" title="📐 Kütle korunumu örneği">
          <p>12 g karbon, 32 g oksijenle tepkimeye girerek CO₂ oluşturuyor. Oluşan CO₂ kütlesi = 12 + 32 = <b>44 g</b>.</p>
          <p>Açık kapta yapılan yanma tepkimelerinde gaz çıkabilir; bu durumda kap tartıldığında kütle azalmış gibi görünür, sistem kapalı olsaydı korunurdu.</p>
        </Box>
        <div className="grid gap-3 sm:grid-cols-2">
          <Box tone="info" title="Isı veren (egzotermik)">Yanma, nötrleşme, solunum. Ortamın sıcaklığı artar.</Box>
          <Box tone="info" title="Isı alan (endotermik)">Fotosentez, kuru buzun yer değiştirmesi gibi tepkimeler. Ortamın sıcaklığı düşer.</Box>
        </div>
      </Section>

      <Section no="4" title="Asitler ve Bazlar">
        <PhScale />
        <div className="grid gap-3 sm:grid-cols-2">
          <Box tone="info" title="Asit özellikleri">
            <ul className="list-disc space-y-1 pl-5">
              <li>Tadı ekşidir (tatmayız!).</li>
              <li>Mavi turnusol kâğıdını kırmızıya çevirir.</li>
              <li>Bazı metallerle tepkimeye girip hidrojen gazı çıkarır.</li>
              <li>Sulu çözeltisi elektriği iletir.</li>
              <li>Örnek: HCl (tuz ruhu), H₂SO₄, sirke asidi, limon, mide asidi.</li>
            </ul>
          </Box>
          <Box tone="info" title="Baz özellikleri">
            <ul className="list-disc space-y-1 pl-5">
              <li>Tadı acıdır, ele kaygan hissettirir.</li>
              <li>Kırmızı turnusol kâğıdını maviye çevirir.</li>
              <li>Sulu çözeltisi elektriği iletir.</li>
              <li>Örnek: NaOH (sudkostik), sabun, çamaşır suyu, kabartma tozu.</li>
            </ul>
          </Box>
        </div>
        <Box tone="formula" title="📐 Nötrleşme">
          <p><b>Asit + Baz → Tuz + Su</b> (ısı açığa çıkar)</p>
          <p>Örnek: HCl + NaOH → NaCl (sofra tuzu) + H₂O</p>
          <p>Mide yanmasında antiasit ilaçlar, fazla asidi nötrleştirmek için kullanılır.</p>
        </Box>
        <Box tone="warn" title="⚠️ Güvenlik">
          <p>Güçlü asit ve bazlar yakıcıdır. Deney yaparken gözlük ve eldiven kullan; seyreltirken asidi suya yavaşça ekle. Temizlik ürünlerini (çamaşır suyu ve tuz ruhu gibi) birbirine karıştırma, zehirli gaz çıkar.</p>
        </Box>
        <p>İndikatörler (turnusol kâğıdı, kırmızılahana suyu, fenolftalein, pH kâğıdı) asit-baz ayrımı için kullanılır. Evrensel indikatör ile pH değeri de okunabilir.</p>
      </Section>

      <Section no="5" title="Maddenin Isı ile Etkileşimi">
        <HeatingCurve />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Isı</b> bir enerji türüdür (J veya cal), sıcak cisimden soğuk cisme akar. <b>Sıcaklık</b> ise taneciklerin ortalama kinetik enerjisinin ölçüsüdür (°C).</li>
          <li>Isı alan madde ya sıcaklığını artırır ya da <b>hal değiştirir</b>; hal değişimi sırasında sıcaklık sabittir.</li>
          <li><b>Erime / donma</b> noktası ve <b>kaynama / yoğuşma</b> noktası maddenin ayırt edici özelliğidir.</li>
          <li>Saf maddelerde hal değişimi sırasında sıcaklık sabit kalır; karışımlarda sabit kalmaz.</li>
          <li><b>Genleşme:</b> Isıtılan maddelerin boyutları artar (tren rayları arasındaki boşluk, termometre).</li>
        </ul>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead><tr className="bg-beaker/10"><th className={TD}>Hal değişimi</th><th className={TD}>Isı</th><th className={TD}>Örnek</th></tr></thead>
            <tbody>
              <tr><td className={TD}>Erime (katı → sıvı)</td><td className={TD}>Alır</td><td className={TD}>Buzun erimesi</td></tr>
              <tr><td className={TD}>Buharlaşma (sıvı → gaz)</td><td className={TD}>Alır</td><td className={TD}>Çamaşırın kuruması</td></tr>
              <tr><td className={TD}>Yoğuşma (gaz → sıvı)</td><td className={TD}>Verir</td><td className={TD}>Cam üzerinde su damlaları</td></tr>
              <tr><td className={TD}>Donma (sıvı → katı)</td><td className={TD}>Verir</td><td className={TD}>Suyun buz olması</td></tr>
              <tr><td className={TD}>Kırağılaşma (gaz → katı)</td><td className={TD}>Verir</td><td className={TD}>Kırağı oluşumu</td></tr>
              <tr><td className={TD}>Süblimleşme (katı → gaz)</td><td className={TD}>Alır</td><td className={TD}>Naftalin, kuru buz</td></tr>
            </tbody>
          </table>
        </div>
        <Box tone="formula" title="📐 Isı alış verişi (Q = m · c · ΔT)">
          <p>m: kütle (g), c: öz ısı (J/g·°C), ΔT: sıcaklık değişimi (°C). Suyun öz ısısı yaklaşık 4,2 J/g·°C’dir.</p>
          <p>Örnek: 500 g suyu 20 °C’den 60 °C’ye ısıtmak için Q = 500 · 4,2 · 40 = <b>84 000 J</b> gerekir.</p>
          <p>Öz ısı büyük olan madde geç ısınır, geç soğur (deniz kıyılarında iklimin ılıman olması).</p>
        </Box>
      </Section>

      <Section no="6" title="Türkiye’de Kimya Endüstrisi">
        <p>Kimya endüstrisi, hammaddeleri kimyasal işlemlerle ürünlere dönüştürür. Günlük hayatımızdaki pek çok şey (ilaç, deterjan, plastik, boya, gübre, cam) bu sektörün ürünüdür.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["⛽", "Petrokimya", "Ham petrolden plastik, sentetik elyaf, kauçuk ve akaryakıt elde edilir."],
            ["🌾", "Gübre", "Azot, fosfor ve potasyum içeren gübreler tarımda verimi artırır."],
            ["💊", "İlaç ve kozmetik", "Hastalıkların tedavisi, hijyen ve kişisel bakım ürünleri."],
            ["🧼", "Sabun ve deterjan", "Bazik özellikteki temizlik maddeleri; bitkisel yağlardan üretilir."],
            ["🎨", "Boya ve vernik", "Yüzeyleri korur ve renklendirir; çözücüler çevreye zararlı olabilir."],
            ["🏺", "Cam, seramik, çimento", "Kum, kil, kireç taşı gibi madenler yüksek sıcaklıkta işlenir."],
          ].map(([e, t, d]) => (
            <div key={t} className="rounded-2xl border border-lab-paperLine bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-2xl">{e}</p>
              <p className="mt-1 font-bold">{t}</p>
              <p className="text-xs text-lab-inkMuted dark:text-lab-paper/70">{d}</p>
            </div>
          ))}
        </div>
        <Box tone="info" title="⛏️ Bor madeni">
          <p>Türkiye, dünya bor rezervlerinin büyük bölümüne sahiptir. Bor; cam, seramik, deterjan, tarım ve enerji sektörlerinde kullanılan stratejik bir madendir.</p>
        </Box>
        <Box tone="warn" title="🌍 Çevre ve sürdürülebilirlik">
          <ul className="list-disc space-y-1 pl-5">
            <li>Kimyasal atıklar su, toprak ve havayı kirletebilir; atıklar arıtılmadan doğaya bırakılmamalıdır.</li>
            <li>Geri dönüşüm, enerji tasarrufu ve doğa dostu (yeşil) kimya uygulamaları tercih edilmelidir.</li>
            <li>Ürün etiketlerindeki uyarı sembollerini okumak ve kimyasalları doğru saklamak güvenliğimiz için önemlidir.</li>
          </ul>
        </Box>
      </Section>

      <Section no="7" title="Sık Yapılan Yanlışlar">
        <ul className="list-disc space-y-1 pl-5">
          <li>❌ “Buzun erimesi kimyasal değişimdir.” → ✅ Yeni madde oluşmaz, fizikseldir.</li>
          <li>❌ “Kimyasal tepkimede kütle azalır.” → ✅ Toplam kütle korunur.</li>
          <li>❌ “Tepkimede molekül sayısı her zaman korunur.” → ✅ Atom sayısı ve türü korunur.</li>
          <li>❌ “Hal değişiminde sıcaklık artar.” → ✅ Saf maddede sıcaklık sabit kalır.</li>
          <li>❌ “Hidrojen bir metaldir.” → ✅ Hidrojen ametaldir.</li>
          <li>❌ “pH 7’den küçükse madde bazdır.” → ✅ pH &lt; 7 asit, pH &gt; 7 bazdır.</li>
        </ul>
      </Section>

      <Section no="8" title="Mini Test (Kendini Dene)">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Periyodik sistemde aynı düşey sütundaki elementlere ne denir? <span className="text-lab-inkMuted">(Cevap: Aynı grup)</span></li>
          <li>Demirin paslanması hangi tür değişimdir? <span className="text-lab-inkMuted">(Cevap: Kimyasal)</span></li>
          <li>N₂ + H₂ → NH₃ tepkimesini denkleştir. <span className="text-lab-inkMuted">(Cevap: N₂ + 3H₂ → 2NH₃)</span></li>
          <li>pH değeri 3 olan çözelti asit mi bazdır? <span className="text-lab-inkMuted">(Cevap: Asit)</span></li>
          <li>200 g suyun sıcaklığı 10 °C artırılırsa gereken ısı kaç J’dür (c = 4,2)? <span className="text-lab-inkMuted">(Cevap: 8 400 J)</span></li>
        </ol>
      </Section>
    </div>
  );
}

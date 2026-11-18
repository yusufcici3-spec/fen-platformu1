import type { ReactNode } from "react";

const BLUE = "#2563eb";
const RED = "#dc2626";
const GREEN = "#16a34a";
const WOOD = "#b8854a";
const GRAY = "#64748b";

export function Arrow({ x1, y1, x2, y2, color = BLUE }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = 9;
  const p1 = `${x2},${y2}`;
  const p2 = `${x2 - s * Math.cos(a - 0.45)},${y2 - s * Math.sin(a - 0.45)}`;
  const p3 = `${x2 - s * Math.cos(a + 0.45)},${y2 - s * Math.sin(a + 0.45)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={3} />
      <polygon points={`${p1} ${p2} ${p3}`} fill={color} />
    </g>
  );
}

export function T({ x, y, children, color, size = 13, anchor = "middle", bold = false }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: "start" | "middle" | "end"; bold?: boolean }) {
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={color ?? "currentColor"} fontWeight={bold ? 700 : 400} fontFamily="sans-serif">
      {children}
    </text>
  );
}

export function Fig({ children, caption, h = 170 }: { children: ReactNode; caption: string; h?: number }) {
  return (
    <figure className="rounded-2xl border border-lab-paperLine bg-white p-3 dark:border-white/10 dark:bg-white/5">
      <svg viewBox={`0 0 300 ${h}`} className="w-full text-slate-800 dark:text-slate-100" role="img" aria-label={caption}>
        {children}
      </svg>
      <figcaption className="mt-1 text-center text-xs font-semibold text-lab-inkMuted dark:text-lab-paper/70">{caption}</figcaption>
    </figure>
  );
}

function Lever({ type }: { type: 1 | 2 | 3 }) {
  const cfg = {
    1: { f: 150, load: 60, eff: 250, effUp: false, cap: "1. tür kaldıraç: Destek ortada (makas, tahterevalli)" },
    2: { f: 35, load: 130, eff: 265, effUp: true, cap: "2. tür kaldıraç: Yük ortada (el arabası, fındık kıracağı)" },
    3: { f: 35, load: 265, eff: 130, effUp: true, cap: "3. tür kaldıraç: Kuvvet ortada (cımbız, olta)" },
  }[type];
  return (
    <Fig caption={cfg.cap}>
      <rect x={15} y={78} width={270} height={10} rx={3} fill={WOOD} />
      <polygon points={`${cfg.f},88 ${cfg.f - 16},118 ${cfg.f + 16},118`} fill={GRAY} />
      <T x={cfg.f} y={136} bold size={12}>Destek</T>
      <Arrow x1={cfg.load} y1={28} x2={cfg.load} y2={74} color={RED} />
      <T x={cfg.load} y={20} color={RED} bold>Yük</T>
      {cfg.effUp ? (
        <>
          <Arrow x1={cfg.eff} y1={140} x2={cfg.eff} y2={94} color={BLUE} />
          <T x={cfg.eff} y={156} color={BLUE} bold>Kuvvet</T>
        </>
      ) : (
        <>
          <Arrow x1={cfg.eff} y1={28} x2={cfg.eff} y2={74} color={BLUE} />
          <T x={cfg.eff} y={20} color={BLUE} bold>Kuvvet</T>
        </>
      )}
    </Fig>
  );
}

function Pulley({ cx, cy, r = 16, fixed = false }: { cx: number; cy: number; r?: number; fixed?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#e2e8f0" stroke={GRAY} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={3} fill={GRAY} />
      {fixed && <line x1={cx} y1={cy} x2={cx} y2={14} stroke={GRAY} strokeWidth={3} />}
    </g>
  );
}

function FixedPulley() {
  return (
    <Fig caption="Sabit makara: yön değiştirir, kuvvetten kazanç yok (F = Y)" h={190}>
      <rect x={90} y={8} width={120} height={8} fill={GRAY} />
      <Pulley cx={150} cy={50} fixed />
      <line x1={134} y1={50} x2={134} y2={135} stroke="currentColor" strokeWidth={2} />
      <line x1={166} y1={50} x2={166} y2={120} stroke="currentColor" strokeWidth={2} />
      <rect x={116} y={135} width={36} height={32} rx={4} fill={RED} />
      <T x={134} y={156} color="#fff" bold size={12}>Y</T>
      <Arrow x1={166} y1={120} x2={166} y2={170} color={BLUE} />
      <T x={196} y={150} color={BLUE} bold anchor="start">F</T>
    </Fig>
  );
}

function MovingPulley() {
  return (
    <Fig caption="Hareketli makara: kuvvetten 2 kat kazanç (F = Y/2)" h={190}>
      <rect x={60} y={8} width={190} height={8} fill={GRAY} />
      <line x1={100} y1={16} x2={100} y2={100} stroke="currentColor" strokeWidth={2} />
      <line x1={180} y1={16} x2={180} y2={100} stroke="currentColor" strokeWidth={2} />
      <Pulley cx={140} cy={100} r={40} />
      <circle cx={140} cy={100} r={40} fill="none" />
      <line x1={140} y1={100} x2={140} y2={140} stroke={GRAY} strokeWidth={3} />
      <rect x={122} y={140} width={36} height={30} rx={4} fill={RED} />
      <T x={140} y={160} color="#fff" bold size={12}>Y</T>
      <Arrow x1={180} y1={80} x2={180} y2={40} color={BLUE} />
      <T x={200} y={50} color={BLUE} bold anchor="start">F</T>
      <T x={260} y={110} size={11} anchor="end">2 ip taşır</T>
    </Fig>
  );
}

function Palanga() {
  return (
    <Fig caption="Palanga: 4 ip yükü taşır, F = Y/4 (yol 4 kat artar)" h={190}>
      <rect x={70} y={8} width={160} height={8} fill={GRAY} />
      <Pulley cx={115} cy={40} r={14} fixed />
      <Pulley cx={185} cy={40} r={14} fixed />
      <Pulley cx={115} cy={110} r={14} />
      <Pulley cx={185} cy={110} r={14} />
      {[101, 129, 171, 199].map((x) => (
        <line key={x} x1={x} y1={40} x2={x} y2={110} stroke="currentColor" strokeWidth={2} />
      ))}
      <rect x={105} y={124} width={90} height={6} fill={GRAY} />
      <rect x={130} y={130} width={40} height={32} rx={4} fill={RED} />
      <T x={150} y={152} color="#fff" bold size={12}>Y</T>
      <Arrow x1={199} y1={40} x2={199} y2={78} color={BLUE} />
      <T x={225} y={70} color={BLUE} bold anchor="start">F</T>
    </Fig>
  );
}

function Incline() {
  return (
    <Fig caption="Eğik düzlem: F = Y·h / ℓ (yol uzar, kuvvet azalır)" h={180}>
      <polygon points="30,150 260,150 260,50" fill="#fde68a" stroke={WOOD} strokeWidth={3} />
      <g transform="rotate(-24.8 150 100)">
        <rect x={125} y={78} width={44} height={26} rx={3} fill={RED} />
      </g>
      <Arrow x1={150} y1={90} x2={105} y2={113} color={BLUE} />
      <T x={92} y={108} color={BLUE} bold>F</T>
      <Arrow x1={160} y1={95} x2={160} y2={140} color={GREEN} />
      <T x={175} y={130} color={GREEN} bold anchor="start">Y</T>
      <line x1={272} y1={50} x2={272} y2={150} stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 3" />
      <T x={284} y={105} size={13} bold anchor="start">h</T>
      <T x={125} y={170} bold>ℓ (yol boyu)</T>
    </Fig>
  );
}

function Screw() {
  return (
    <Fig caption="Vida: sarmal eğik düzlemdir; adım küçüldükçe kuvvetten kazanç artar" h={180}>
      <rect x={95} y={15} width={110} height={16} rx={4} fill={GRAY} />
      <rect x={135} y={31} width={30} height={125} fill="#cbd5e1" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={131} y1={52 + i * 18} x2={169} y2={40 + i * 18} stroke={GRAY} strokeWidth={4} />
      ))}
      <polygon points="135,156 165,156 150,172" fill="#cbd5e1" />
      <line x1={215} y1={70} x2={215} y2={88} stroke="currentColor" strokeWidth={1.5} />
      <line x1={205} y1={70} x2={225} y2={70} stroke="currentColor" strokeWidth={1.5} />
      <line x1={205} y1={88} x2={225} y2={88} stroke="currentColor" strokeWidth={1.5} />
      <T x={232} y={83} anchor="start" bold>adım</T>
      <T x={150} y={9} size={11}>Başlık</T>
    </Fig>
  );
}

function Windlass() {
  return (
    <Fig caption="Çıkrık: F · R = Y · r (kol yarıçapı R, silindir yarıçapı r)" h={180}>
      <circle cx={130} cy={85} r={60} fill="none" stroke={BLUE} strokeWidth={3} strokeDasharray="5 4" />
      <circle cx={130} cy={85} r={24} fill="#e2e8f0" stroke={GRAY} strokeWidth={3} />
      <line x1={130} y1={85} x2={190} y2={85} stroke={WOOD} strokeWidth={6} />
      <Arrow x1={190} y1={85} x2={190} y2={135} color={BLUE} />
      <T x={206} y={125} color={BLUE} bold anchor="start">F</T>
      <T x={162} y={78} size={12} bold>R</T>
      <line x1={130} y1={85} x2={130} y2={61} stroke={GRAY} strokeWidth={2} />
      <T x={120} y={76} size={12} bold anchor="end">r</T>
      <line x1={106} y1={85} x2={106} y2={155} stroke="currentColor" strokeWidth={2} />
      <rect x={90} y={155} width={32} height={20} rx={3} fill={RED} />
      <T x={106} y={169} color="#fff" bold size={11}>Y</T>
    </Fig>
  );
}

function gearPoints(cx: number, cy: number, r: number, teeth: number, rot: number) {
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = rot + (i / teeth) * Math.PI * 2;
    const step = (Math.PI * 2) / teeth;
    const radii: [number, number][] = [
      [r - 6, a0],
      [r + 6, a0 + step * 0.2],
      [r + 6, a0 + step * 0.45],
      [r - 6, a0 + step * 0.65],
    ];
    radii.forEach(([rr, aa]) => pts.push(`${(cx + rr * Math.cos(aa)).toFixed(1)},${(cy + rr * Math.sin(aa)).toFixed(1)}`));
  }
  return pts.join(" ");
}

function Gears() {
  return (
    <Fig caption="Dişli çarklar: komşu çarklar zıt yönde döner; küçük çark daha hızlı döner" h={170}>
      <polygon points={gearPoints(100, 85, 50, 20, 0)} fill="#cbd5e1" stroke={GRAY} strokeWidth={2} />
      <polygon points={gearPoints(190, 85, 30, 12, 0.26)} fill="#fde68a" stroke={WOOD} strokeWidth={2} />
      <circle cx={100} cy={85} r={6} fill={GRAY} />
      <circle cx={190} cy={85} r={5} fill={WOOD} />
      <T x={100} y={110} size={11} bold>20 diş</T>
      <T x={190} y={118} size={11} bold>12 diş</T>
      
      
      <T x={100} y={160} size={11} color={BLUE}>↻ saat yönü</T><T x={200} y={160} size={11} color={RED}>↺ ters yön</T>
    </Fig>
  );
}

export function Section({ no, title, children }: { no: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
      <h3 className="flex items-center gap-3 font-display text-xl font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-beaker/15 font-mono text-sm text-beaker-dark dark:text-beaker-light">{no}</span>
        {title}
      </h3>
      <div className="mt-4 space-y-4 text-sm leading-7 text-lab-ink dark:text-lab-paper/90">{children}</div>
    </section>
  );
}

export function Box({ tone, title, children }: { tone: "info" | "warn" | "formula"; title: string; children: ReactNode }) {
  const cls = {
    info: "border-sky-300 bg-sky-50 dark:border-sky-500/40 dark:bg-sky-500/10",
    warn: "border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10",
    formula: "border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10",
  }[tone];
  return (
    <div className={`rounded-2xl border-2 p-4 ${cls}`}>
      <p className="font-bold">{title}</p>
      <div className="mt-1 space-y-1">{children}</div>
    </div>
  );
}

export function BasitMakinelerNotes() {
  return (
    <div id="ders-notu" className="mt-10 space-y-6">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-beaker-dark dark:text-beaker-light">8. Sınıf · Ünite 5 · Ders Notu</p>
        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Basit Makineler – Görselli Ders Notu</h2>
        <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/70">
          Bu notta kaldıraç, makara, eğik düzlem, vida, çıkrık ve dişli çarkların nasıl çalıştığını, kuvvetten ve yoldan kazancı, iş-enerji ilişkisini ve günlük hayat örneklerini şekillerle öğreneceksin.
        </p>
      </div>

      <Box tone="info" title="🎯 Bu notta neleri öğreneceksin? (Kazanımlar)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basit makinelerin kuvvetten ve yoldan kazanç sağlayan araçlar olduğunu açıklar.</li>
          <li>Kaldıraç, makara, eğik düzlem, çıkrık, vida ve dişli çarkın çalışma ilkesini örneklerle açıklar.</li>
          <li>Günlük hayattaki araç-gereçlerde kullanılan basit makineleri belirler.</li>
          <li>Basit makinelerde iş ve enerjinin korunduğunu (işten kazanç olmadığını) yorumlar.</li>
          <li>Basit makinelerle ilgili işlem gerektiren problemleri çözer.</li>
        </ul>
      </Box>

      <Section no="1" title="Basit Makine Nedir?">
        <p>
          <b>Basit makine</b>, işi kolaylaştırmak için kullanılan; kuvvetin <b>yönünü</b>, <b>büyüklüğünü</b> veya uygulandığı <b>noktayı</b> değiştiren araçlardır. Basit makineler hiçbir zaman enerji üretmez.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Box tone="info" title="Kuvvetten kazanç">Daha küçük kuvvetle aynı yükü kaldırırız; ancak kuvveti daha uzun yolda uygularız.</Box>
          <Box tone="info" title="Yoldan kazanç">Küçük bir hareket, yükte büyük hareket oluşturur; ancak daha büyük kuvvet gerekir.</Box>
          <Box tone="info" title="Yön değişimi">Kuvvetin yönü değişir (aşağı çekip yukarı kaldırmak gibi); kazanç olmayabilir.</Box>
        </div>
        <Box tone="warn" title="⚠️ Altın kural: İşten kazanç yoktur!">
          <p>Sürtünmesiz ideal bir basit makinede: <b>Kuvvetten kazanırsak yoldan kaybederiz, yoldan kazanırsak kuvvetten kaybederiz.</b> Yapılan iş ve harcanan enerji hiçbir durumda azalmaz.</p>
        </Box>
        <Box tone="formula" title="📐 İş ve Güç">
          <p>İş = Kuvvet × Yol → <b>W = F · x</b> (birim: joule, J)</p>
          <p>İdeal makinede: <b>F · x(kuvvet yolu) = Y · h(yük yolu)</b></p>
          <p>Verim = (Yararlı iş / Harcanan iş) × 100. Sürtünme varsa verim %100&apos;den küçüktür.</p>
        </Box>
      </Section>

      <Section no="2" title="Kaldıraç">
        <p>
          Bir <b>destek noktası</b> etrafında dönebilen sert çubuğa kaldıraç denir. Kaldıraçta üç şey vardır: <b>destek noktası</b>, <b>yük (Y)</b> ve <b>kuvvet (F)</b>. Bunların sırasına göre üç tür kaldıraç oluşur.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <Lever type={1} />
          <Lever type={2} />
          <Lever type={3} />
        </div>
        <Box tone="formula" title="📐 Denge (dönme) koşulu">
          <p><b>F · Kuvvet kolu = Y · Yük kolu</b> (kuvvet × destek-kuvvet uzaklığı = yük × destek-yük uzaklığı)</p>
          <p>Kuvvet kolu, yük kolundan uzunsa kuvvetten kazanç vardır.</p>
        </Box>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-beaker/10">
                <th className="border border-lab-paperLine p-2">Tür</th>
                <th className="border border-lab-paperLine p-2">Sıralama</th>
                <th className="border border-lab-paperLine p-2">Kazanç</th>
                <th className="border border-lab-paperLine p-2">Örnekler</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-lab-paperLine p-2">1. tür</td><td className="border border-lab-paperLine p-2">Kuvvet – Destek – Yük</td><td className="border border-lab-paperLine p-2">Kuvvet kolu uzunsa kuvvetten, kısaysa yoldan kazanç</td><td className="border border-lab-paperLine p-2">Makas, pense, tahterevalli, levye</td></tr>
              <tr><td className="border border-lab-paperLine p-2">2. tür</td><td className="border border-lab-paperLine p-2">Destek – Yük – Kuvvet</td><td className="border border-lab-paperLine p-2">Her zaman kuvvetten kazanç</td><td className="border border-lab-paperLine p-2">El arabası, fındık kıracağı, şişe açacağı</td></tr>
              <tr><td className="border border-lab-paperLine p-2">3. tür</td><td className="border border-lab-paperLine p-2">Destek – Kuvvet – Yük</td><td className="border border-lab-paperLine p-2">Her zaman yoldan kazanç</td><td className="border border-lab-paperLine p-2">Cımbız, olta, süpürge, maşa</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section no="3" title="Makara">
        <p>Üzerinden ip geçen, kenarı oluklu, eksen etrafında dönebilen tekerleğe <b>makara</b> denir.</p>
        <div className="grid gap-3 md:grid-cols-3">
          <FixedPulley />
          <MovingPulley />
          <Palanga />
        </div>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Sabit makara:</b> Kuvvetin yönünü değiştirir. F = Y; yol da aynıdır. (Bayrak direği, kuyu)</li>
          <li><b>Hareketli makara:</b> Yük makaraya bağlıdır. Yükü 2 ip taşır, F = Y/2 (yük makara ağırlığı ihmal). İpi 2 kat uzun çekeriz.</li>
          <li><b>Palanga:</b> Sabit ve hareketli makaraların birlikte kullanıldığı sistemdir. Yükü taşıyan ip sayısı n ise <b>F = Y/n</b>, çekilen ip boyu = n · h.</li>
        </ul>
        <Box tone="formula" title="📐 Örnek">
          <p>240 N&apos;luk yük, yükü 4 ipin taşıdığı bir palanga ile 2 m yükseğe çıkarılıyor (ağırlık ve sürtünme ihmal).</p>
          <p>F = 240 / 4 = <b>60 N</b>; çekilen ip boyu = 4 × 2 = <b>8 m</b>; yapılan iş = 60 × 8 = 240 × 2 = <b>480 J</b> (işten kazanç yok).</p>
        </Box>
      </Section>

      <Section no="4" title="Eğik Düzlem">
        <p>Yatayla belli bir açı yapan düz yüzeye eğik düzlem denir. Yükü doğrudan yukarı kaldırmak yerine rampa boyunca iterek çıkarırız.</p>
        <div className="grid gap-3 md:grid-cols-2">
          <Incline />
          <div className="space-y-3">
            <Box tone="formula" title="📐 Bağıntı">
              <p><b>F · ℓ = Y · h</b> → F = Y · h / ℓ</p>
              <p>Eğik düzlem ne kadar uzun (yatık) ise gereken kuvvet o kadar küçük, yol o kadar uzundur.</p>
            </Box>
            <Box tone="info" title="Günlük hayat">Engelli rampası, dağ yolları (virajlı yollar), kamyon rampası, kaydırak, merdiven.</Box>
          </div>
        </div>
        <Box tone="formula" title="📐 Örnek">
          <p>Boyu 5 m, yüksekliği 1 m olan sürtünmesiz rampadan 300 N&apos;luk yük çıkarılıyor.</p>
          <p>F = 300 · 1 / 5 = <b>60 N</b>. Kuvvetten 5 kat kazanç var, yol 5 kat uzadı.</p>
        </Box>
      </Section>

      <Section no="5" title="Vida ve Kama">
        <div className="grid gap-3 md:grid-cols-2">
          <Screw />
          <div className="space-y-3">
            <p><b>Vida:</b> Silindir etrafına sarılmış eğik düzlemdir. Vida dişleri arasındaki uzaklığa <b>adım</b> denir. Adım ne kadar küçükse vida o kadar çok tur atar, kuvvetten kazanç o kadar büyük olur.</p>
            <p><b>Kama:</b> İki eğik düzlemin birleşmesidir. Cisimleri yarmaya veya sıkıştırmaya yarar (balta, bıçak, çivi, keski).</p>
            <p><b>Örnekler:</b> Vida, şişe kapağı, ampul duyu, kavanoz kapağı, matkap ucu, sıkıştırma mengenesi.</p>
          </div>
        </div>
      </Section>

      <Section no="6" title="Çıkrık">
        <p>Bir silindir (ya da tekerlek) ile ona sabitlenmiş bir koldan oluşur. Kol, silindirden daha büyük bir daire çizdiği için kuvvetten kazanç sağlar.</p>
        <div className="grid gap-3 md:grid-cols-2">
          <Windlass />
          <div className="space-y-3">
            <Box tone="formula" title="📐 Denge koşulu">
              <p><b>F · R = Y · r</b></p>
              <p>R (kol yarıçapı) ne kadar büyükse, kuvvetten kazanç o kadar fazladır: F = Y · r / R.</p>
            </Box>
            <Box tone="info" title="Günlük hayat">Kuyu çıkrığı, tornavida, direksiyon, musluk kolu, kapı kolu, el değirmeni, olta makarası.</Box>
          </div>
        </div>
      </Section>

      <Section no="7" title="Dişli Çarklar ve Kasnaklar">
        <p>Dişli çarklar dişleri birbirine geçerek hareketi ve dönme yönünü aktarır. Kasnaklar ise bir kayışla hareketi aktarır (kayış kasnaklarda dönme yönü aynı kalır).</p>
        <div className="grid gap-3 md:grid-cols-2">
          <Gears />
          <div className="space-y-3">
            <ul className="list-disc space-y-1 pl-5">
              <li>Birbirine geçen iki dişli çark <b>zıt yönde</b> döner.</li>
              <li>Küçük çark (az dişli) büyük çarktan <b>daha hızlı</b> döner; aynı sürede daha çok tur atar.</li>
              <li>Büyük çark küçüğü döndürüyorsa hız artar, kuvvet azalır; küçük çark büyüğü döndürüyorsa kuvvet artar, hız azalır.</li>
            </ul>
            <Box tone="formula" title="📐 Diş sayısı – devir ilişkisi">
              <p><b>Diş sayısı × Devir sayısı = sabit</b></p>
              <p>20 dişli çark 6 tur atarsa 12 dişli çark 20 · 6 / 12 = <b>10 tur</b> atar.</p>
            </Box>
            <p><b>Örnekler:</b> Bisiklet vitesi, saat mekanizması, otomobil şanzımanı, el matkabı, krank-biyel sistemleri.</p>
          </div>
        </div>
      </Section>

      <Section no="8" title="Özet Tablo">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-beaker/10">
                <th className="border border-lab-paperLine p-2">Basit makine</th>
                <th className="border border-lab-paperLine p-2">Ne sağlar?</th>
                <th className="border border-lab-paperLine p-2">Temel bağıntı</th>
                <th className="border border-lab-paperLine p-2">Örnek</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Kaldıraç", "Kuvvetten veya yoldan kazanç", "F · kuvvet kolu = Y · yük kolu", "Makas, el arabası, cımbız"],
                ["Sabit makara", "Yön değiştirir", "F = Y", "Bayrak direği"],
                ["Hareketli makara", "Kuvvetten 2 kat kazanç", "F = Y / 2", "İnşaat vinci"],
                ["Palanga", "Kuvvetten n kat kazanç", "F = Y / n", "Araç kaldırma vinci"],
                ["Eğik düzlem", "Kuvvetten kazanç", "F · ℓ = Y · h", "Rampa, merdiven"],
                ["Vida / Kama", "Kuvvetten kazanç", "Adım küçüldükçe kazanç artar", "Kapak, balta"],
                ["Çıkrık", "Kuvvetten kazanç", "F · R = Y · r", "Kuyu, direksiyon"],
                ["Dişli çark", "Yön ve hız değişimi", "Diş sayısı × devir = sabit", "Bisiklet, saat"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((c, i) => (
                    <td key={i} className="border border-lab-paperLine p-2">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section no="9" title="Sık Yapılan Yanlışlar">
        <ul className="list-disc space-y-1 pl-5">
          <li>❌ “Basit makine enerji kazandırır.” → ✅ Enerji ve iş korunur; yalnızca işi kolaylaştırır.</li>
          <li>❌ “Sabit makara kuvvetten kazandırır.” → ✅ Sadece yön değiştirir.</li>
          <li>❌ “Hareketli makarada yol da yarıya iner.” → ✅ Kuvvet yarıya iner, ipi 2 kat uzun çekeriz.</li>
          <li>❌ “Eğik düzlemde yol kısalır.” → ✅ Yol uzar, kuvvet azalır.</li>
          <li>❌ “Dişliler aynı yönde döner.” → ✅ Birbirine geçen dişliler zıt yönde döner.</li>
        </ul>
      </Section>

      <Section no="10" title="Mini Test (Kendini Dene)">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Kuvvet kolu 90 cm, yük kolu 30 cm olan kaldıraçla 120 N&apos;luk yük dengelenmek isteniyor. Gerekli kuvvet kaç N&apos;dur? <span className="text-lab-inkMuted">(Cevap: 40 N)</span></li>
          <li>Yükü 6 ipin taşıdığı ideal bir palanga ile 600 N&apos;luk yük kaldırmak için kaç N kuvvet gerekir? <span className="text-lab-inkMuted">(Cevap: 100 N)</span></li>
          <li>8 m uzunluğundaki sürtünmesiz rampa ile 2 m yüksekliğe 400 N&apos;luk yük çıkarılırken gereken kuvvet kaç N&apos;dur? <span className="text-lab-inkMuted">(Cevap: 100 N)</span></li>
          <li>Kuvvetten kazanç sağlayan bir sistem aynı zamanda ne kaybettirir? <span className="text-lab-inkMuted">(Cevap: Yoldan kayıp)</span></li>
        </ol>
      </Section>
    </div>
  );
}

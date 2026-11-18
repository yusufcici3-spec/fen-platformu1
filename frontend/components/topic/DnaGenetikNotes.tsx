import type * as React from "react";
import { Arrow, Box, Fig, Section, T } from "./BasitMakinelerNotes";

const BLUE = "#2563eb";
const RED = "#dc2626";
const GREEN = "#16a34a";
const AMBER = "#f59e0b";
const GRAY = "#64748b";
const BASE: Record<string, string> = { A: "#ef4444", T: "#3b82f6", G: "#22c55e", C: "#eab308" };

function Hierarchy() {
  const xs = [32, 92, 152, 212, 272];
  const labels = ["Hücre", "Çekirdek", "Kromozom", "DNA", "Gen"];
  return (
    <Fig caption="Kalıtım maddesinin düzeyleri: hücre → çekirdek → kromozom → DNA → gen" h={120}>
      <circle cx={xs[0]} cy={50} r={22} fill="#e0f2fe" stroke={BLUE} strokeWidth={2.5} />
      <circle cx={xs[0] + 4} cy={52} r={8} fill="#a78bfa" />
      <circle cx={xs[1]} cy={50} r={22} fill="#a78bfa" stroke="#6d28d9" strokeWidth={2.5} />
      <path d="M85 42 q4 8 0 16 M99 42 q-4 8 0 16" stroke="#fff" strokeWidth={3} fill="none" />
      <line x1={xs[2] - 12} y1={32} x2={xs[2] + 12} y2={68} stroke={RED} strokeWidth={8} strokeLinecap="round" />
      <line x1={xs[2] + 12} y1={32} x2={xs[2] - 12} y2={68} stroke={RED} strokeWidth={8} strokeLinecap="round" />
      <path d={`M${xs[3] - 15} 32 q8 9 0 18 t0 18 M${xs[3] + 15} 32 q-8 9 0 18 t0 18`} fill="none" stroke={BLUE} strokeWidth={3} />
      {[38, 50, 62].map((y) => <line key={y} x1={xs[3] - 10} y1={y} x2={xs[3] + 10} y2={y} stroke={GRAY} strokeWidth={1.5} />)}
      <rect x={xs[4] - 22} y={44} width={44} height={12} rx={3} fill="#e2e8f0" stroke={GRAY} />
      <rect x={xs[4] - 6} y={44} width={16} height={12} fill={GREEN} />
      {xs.slice(0, 4).map((x) => <Arrow key={x} x1={x + 24} y1={50} x2={x + 36} y2={50} color={GRAY} />)}
      {xs.map((x, i) => <T key={x} x={x} y={92 + (i === 4 ? 0 : 0)} size={10} bold>{labels[i]}</T>)}
      <T x={150} y={113} size={10} color={GRAY}>Gen, DNA’nın canlıya ait bir özelliği belirleyen bölümüdür</T>
    </Fig>
  );
}

function Helix() {
  const pairs = ["AT", "GC", "TA", "CG", "AT", "GC", "TA", "CG", "AT"];
  const els: React.ReactNode[] = [];
  const f = (x: number) => Math.sin(((x - 22) / 66) * Math.PI * 2 + 0.6);
  let d1 = "";
  let d2 = "";
  for (let x = 20; x <= 280; x += 4) {
    const y1 = 80 + 34 * f(x);
    const y2 = 80 - 34 * f(x);
    d1 += `${x === 20 ? "M" : "L"}${x},${y1.toFixed(1)} `;
    d2 += `${x === 20 ? "M" : "L"}${x},${y2.toFixed(1)} `;
  }
  pairs.forEach((p, k) => {
    const x = 36 + k * 28;
    const s = f(x);
    const y1 = 80 + 34 * s;
    const y2 = 80 - 34 * s;
    if (Math.abs(s) < 0.3) return;
    const mid = (y1 + y2) / 2;
    els.push(
      <g key={k}>
        <line x1={x} y1={y1} x2={x} y2={mid} stroke={BASE[s > 0 ? p[0] : p[1]]} strokeWidth={5} />
        <line x1={x} y1={mid} x2={x} y2={y2} stroke={BASE[s > 0 ? p[1] : p[0]]} strokeWidth={5} />
        {Math.abs(s) > 0.7 && (
          <>
            <T x={x} y={y1 + (s > 0 ? 14 : -6)} size={9} bold>{s > 0 ? p[0] : p[1]}</T>
            <T x={x} y={y2 + (s > 0 ? -6 : 14)} size={9} bold>{s > 0 ? p[1] : p[0]}</T>
          </>
        )}
      </g>
    );
  });
  return (
    <Fig caption="DNA: çift sarmal (iki iplik); iplikler bazlarla birbirine bağlanır (A–T, G–C)" h={170}>
      <path d={d1} fill="none" stroke="#475569" strokeWidth={4} />
      <path d={d2} fill="none" stroke="#94a3b8" strokeWidth={4} />
      {els}
      {(["A", "T", "G", "C"] as const).map((b, i) => (
        <g key={b}>
          <rect x={60 + i * 50} y={150} width={11} height={11} rx={2} fill={BASE[b]} />
          <T x={75 + i * 50} y={160} size={10} anchor="start">{{ A: "Adenin", T: "Timin", G: "Guanin", C: "Sitozin" }[b]}</T>
        </g>
      ))}
    </Fig>
  );
}

function Nucleotide() {
  return (
    <Fig caption="Nükleotid: DNA’nın yapı birimi (1 fosfat + 1 deoksiriboz şeker + 1 organik baz)" h={120}>
      <circle cx={70} cy={60} r={24} fill="#fde68a" stroke={AMBER} strokeWidth={2.5} />
      <T x={70} y={64} size={11} bold>Fosfat</T>
      <rect x={118} y={36} width={72} height={48} rx={8} fill="#bfdbfe" stroke={BLUE} strokeWidth={2.5} />
      <T x={154} y={56} size={11} bold>Deoksiriboz</T>
      <T x={154} y={71} size={11} bold>şeker</T>
      <rect x={228} y={36} width={56} height={48} rx={8} fill="#bbf7d0" stroke={GREEN} strokeWidth={2.5} />
      <T x={256} y={56} size={11} bold>Organik</T>
      <T x={256} y={71} size={11} bold>baz</T>
      <line x1={94} y1={60} x2={118} y2={60} stroke="currentColor" strokeWidth={3} />
      <line x1={190} y1={60} x2={228} y2={60} stroke="currentColor" strokeWidth={3} />
      <T x={256} y={104} size={10}>A, T, G veya C</T>
    </Fig>
  );
}

function Ladder({ x, left, right }: { x: number; left: string; right: string }) {
  const bases = ["A", "G", "T", "C", "A", "T"];
  const comp: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
  return (
    <g>
      <line x1={x} y1={30} x2={x} y2={128} stroke={left} strokeWidth={5} />
      <line x1={x + 28} y1={30} x2={x + 28} y2={128} stroke={right} strokeWidth={5} />
      {bases.map((b, i) => (
        <g key={i}>
          <line x1={x} y1={42 + i * 16} x2={x + 14} y2={42 + i * 16} stroke={BASE[b]} strokeWidth={5} />
          <line x1={x + 14} y1={42 + i * 16} x2={x + 28} y2={42 + i * 16} stroke={BASE[comp[b]]} strokeWidth={5} />
        </g>
      ))}
    </g>
  );
}

function Replication() {
  const NEW = "#a3a3a3";
  return (
    <Fig caption="DNA’nın kendini eşlemesi: eski ipliklerden her biri yeni bir iplik için kalıp olur" h={160}>
      <Ladder x={30} left={BLUE} right={RED} />
      <Arrow x1={78} y1={80} x2={118} y2={80} color={GRAY} />
      <Ladder x={140} left={BLUE} right={NEW} />
      <Ladder x={232} left={NEW} right={RED} />
      <T x={44} y={22} size={10} bold>Ana DNA</T>
      <T x={186} y={22} size={10} bold>Kopya 1</T>
      <T x={262} y={22} size={10} bold>Kopya 2</T>
      <T x={150} y={148} size={10}>Eski iplik (mavi/kırmızı) + yeni iplik (gri): aynı baz dizilimi</T>
    </Fig>
  );
}

function Punnett() {
  const cells: [string, string][] = [["AA", "#bbf7d0"], ["Aa", "#bbf7d0"], ["Aa", "#bbf7d0"], ["aa", "#fecaca"]];
  return (
    <Fig caption="Çaprazlama: Aa × Aa (A baskın, a çekinik)" h={150}>
      <T x={90} y={14} size={11} bold>Anne gametleri</T>
      <T x={120} y={36} size={13} bold>A</T>
      <T x={170} y={36} size={13} bold>a</T>
      <T x={40} y={84} size={11} bold>Baba</T>
      <T x={78} y={72} size={13} bold>A</T>
      <T x={78} y={116} size={13} bold>a</T>
      {cells.map(([g, c], i) => (
        <g key={i}>
          <rect x={96 + (i % 2) * 50} y={46 + Math.floor(i / 2) * 44} width={48} height={42} fill={c} stroke={GRAY} strokeWidth={1.5} />
          <T x={120 + (i % 2) * 50} y={72 + Math.floor(i / 2) * 44} size={14} bold>{g}</T>
        </g>
      ))}
      <T x={205} y={66} size={10} anchor="start" bold>Genotip:</T>
      <T x={205} y={80} size={10} anchor="start">1 AA : 2 Aa : 1 aa</T>
      <T x={205} y={104} size={10} anchor="start" bold>Fenotip:</T>
      <T x={205} y={118} size={10} anchor="start">3 baskın : 1 çekinik</T>
    </Fig>
  );
}

function MutationFig() {
  const row = (y: number, seq: string[], bad: number | null, label: string) => (
    <g>
      <T x={150} y={y - 8} size={10} bold>{label}</T>
      {seq.map((c, i) => (
        <g key={i}>
          <rect x={30 + i * 85} y={y} width={78} height={30} rx={5} fill={i === bad ? "#fecaca" : "#e2e8f0"} stroke={i === bad ? RED : GRAY} strokeWidth={i === bad ? 2.5 : 1.2} />
          <T x={69 + i * 85} y={y + 20} size={13} bold color={i === bad ? RED : undefined}>{c}</T>
        </g>
      ))}
    </g>
  );
  return (
    <Fig caption="Mutasyon: DNA’daki baz diziliminin kalıcı olarak değişmesi" h={130}>
      {row(24, ["ATG", "CCT", "GAA"], null, "Normal DNA")}
      <Arrow x1={150} y1={56} x2={150} y2={68} color={RED} />
      {row(88, ["ATG", "CGT", "GAA"], 1, "Mutasyona uğramış DNA (C → G)")}
    </Fig>
  );
}

function GeneEngineering() {
  const steps = [["İnsülin geni", "taşıyan", "insan hücresi"], ["Gen kesilip", "alınır"], ["Bakteri", "plazmidine", "eklenir"], ["Bakteri çoğalır,", "insülin", "üretir"]];
  return (
    <Fig caption="Gen mühendisliği örneği: bakterilerde insan insülini üretimi" h={120}>
      {steps.map((lines, i) => {
        const x = 6 + i * 74;
        return (
          <g key={i}>
            <rect x={x} y={25} width={64} height={64} rx={8} fill={["#e0f2fe", "#fef9c3", "#dcfce7", "#fce7f3"][i]} stroke={GRAY} />
            {lines.map((l, j) => (
              <T key={j} x={x + 32} y={50 + j * 12 + (lines.length === 2 ? 6 : 0)} size={8} bold>{l}</T>
            ))}
            {i < 3 && <Arrow x1={x + 65} y1={57} x2={x + 74} y2={57} color={GRAY} />}
          </g>
        );
      })}
      <T x={150} y={112} size={10} color={GRAY}>Aynı yöntemle büyüme hormonu ve aşı gibi ürünler de elde edilir</T>
    </Fig>
  );
}

const TD = "border border-lab-paperLine p-2";

export function DnaGenetikNotes() {
  return (
    <div id="ders-notu" className="mt-10 space-y-6">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-beaker-dark dark:text-beaker-light">8. Sınıf · Ünite 2 · Ders Notu</p>
        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">DNA ve Genetik Kod – Görselli Ders Notu</h2>
        <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/70">
          DNA’nın yapısından kalıtım kurallarına, mutasyon ve modifikasyondan adaptasyona ve biyoteknolojiye kadar ünitenin tamamı şekillerle özetlendi.
        </p>
      </div>

      <Box tone="info" title="🎯 Bu notta neleri öğreneceksin? (Kazanımlar)">
        <ul className="list-disc space-y-1 pl-5">
          <li>DNA, gen, nükleotid ve kromozom kavramlarını ilişkilendirir; DNA’nın kendini eşlemesini açıklar.</li>
          <li>Kalıtım kavramlarını (gen, allel, baskın-çekinik, genotip-fenotip) kullanarak çaprazlama yapar.</li>
          <li>Mutasyon ve modifikasyonu karşılaştırır.</li>
          <li>Adaptasyonu ve doğal seçilimi örneklerle açıklar.</li>
          <li>Biyoteknolojik uygulamaları ve bunların etik ve çevresel boyutlarını değerlendirir.</li>
        </ul>
      </Box>

      <Section no="1" title="DNA, Gen, Nükleotid ve Kromozom">
        <p>Canlıların tüm kalıtsal bilgisi hücre çekirdeğindeki <b>DNA</b> (deoksiribonükleik asit) molekülünde saklanır. DNA hücre bölünmesi sırasında sıkıca paketlenerek <b>kromozomları</b> oluşturur.</p>
        <Hierarchy />
        <div className="grid gap-3 sm:grid-cols-2">
          <Box tone="info" title="Kısaca tanımlar">
            <ul className="list-disc space-y-1 pl-5">
              <li><b>DNA:</b> Kalıtsal bilgiyi taşıyan çift sarmallı molekül.</li>
              <li><b>Gen:</b> DNA üzerinde bir özelliği belirleyen bölge.</li>
              <li><b>Kromozom:</b> DNA ve proteinlerden oluşan, kalıtım maddesini taşıyan yapı.</li>
              <li><b>Nükleotid:</b> DNA’nın yapı taşı.</li>
            </ul>
          </Box>
          <Box tone="info" title="Kromozom sayısı">
            <p>Bir türün vücut hücrelerindeki kromozom sayısı sabittir. İnsanda <b>46 kromozom (23 çift)</b>: 22 çift <b>vücut (otozom)</b> + 1 çift <b>eşey kromozomu</b> (kadın XX, erkek XY). Kromozom sayısı canlının gelişmişliğiyle ilgili değildir.</p>
          </Box>
        </div>
        <Nucleotide />
        <Helix />
        <ul className="list-disc space-y-1 pl-5">
          <li>Nükleotidler art arda eklenerek bir iplik oluşturur; iki iplik karşılıklı bazlarıyla eşleşir.</li>
          <li><b>Baz eşleşmesi:</b> Adenin (A) – Timin (T) ve Guanin (G) – Sitozin (C) birbiriyle eşleşir. Bir ipliğin baz dizilimi bilindiğinde diğeri bulunur.</li>
          <li>Genetik şifre, DNA’daki bazların dizilişidir; bu dizilim proteinlerin yapısını ve dolayısıyla canlının özelliklerini belirler.</li>
          <li>Her canlının (tek yumurta ikizleri dışında) DNA’sı farklıdır; bu yüzden DNA parmak izi kimlik tespitinde kullanılır.</li>
        </ul>
        <Box tone="formula" title="📐 Baz eşleme örneği">
          <p>1. iplik: A T G C C T A</p>
          <p>2. iplik: <b>T A C G G A T</b></p>
        </Box>
        <Replication />
        <p>Hücre bölünmeden önce DNA kendini <b>eşler</b>: çift sarmal açılır, her eski iplik yeni bir ipliğin kalıbı olur. Böylece aynı baz dizilimine sahip iki özdeş DNA oluşur ve yavru hücreler ana hücreyle aynı genetik bilgiyi taşır.</p>
      </Section>

      <Section no="2" title="Kalıtım">
        <p>Özelliklerin ana-babadan yavrulara aktarılmasına <b>kalıtım</b> denir. Kalıtımın kurallarını bezelyelerle yaptığı çaprazlamalarla ilk bulan bilim insanı <b>Gregor Mendel</b>’dir.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead><tr className="bg-beaker/10"><th className={TD}>Kavram</th><th className={TD}>Anlamı</th><th className={TD}>Örnek</th></tr></thead>
            <tbody>
              <tr><td className={TD}>Allel</td><td className={TD}>Aynı özelliği belirleyen gen çifti</td><td className={TD}>A ve a</td></tr>
              <tr><td className={TD}>Baskın gen</td><td className={TD}>Varlığında etkisini gösteren (büyük harf)</td><td className={TD}>A</td></tr>
              <tr><td className={TD}>Çekinik gen</td><td className={TD}>Yalnızca çift olduğunda etkisini gösteren (küçük harf)</td><td className={TD}>a</td></tr>
              <tr><td className={TD}>Homozigot (saf döl)</td><td className={TD}>İki allel aynı</td><td className={TD}>AA veya aa</td></tr>
              <tr><td className={TD}>Heterozigot (melez döl)</td><td className={TD}>İki allel farklı</td><td className={TD}>Aa</td></tr>
              <tr><td className={TD}>Genotip</td><td className={TD}>Canlının gen yapısı</td><td className={TD}>Aa</td></tr>
              <tr><td className={TD}>Fenotip</td><td className={TD}>Gözlenen dış görünüş</td><td className={TD}>Uzun boylu</td></tr>
            </tbody>
          </table>
        </div>
        <Punnett />
        <Box tone="formula" title="📐 Örnek">
          <p>Bezelyede uzun boy (T) kısa boya (t) baskındır. Heterozigot uzun bezelyeler (Tt × Tt) çaprazlanırsa yavruların %25’i TT, %50’si Tt, %25’i tt olur; yani <b>%75 uzun, %25 kısa</b> boylu bezelye elde edilir.</p>
        </Box>
        <ul className="list-disc space-y-1 pl-5">
          <li>Eşeyin belirlenmesi: Anne her zaman X, baba X veya Y gameti verir. Çocuğun cinsiyetini <b>babadan gelen gamet</b> belirler (XX kız, XY erkek, olasılık %50).</li>
          <li>Bir çiftin her çocuğunda aynı olasılıklar geçerlidir; önceki doğumlar sonrakini etkilemez.</li>
          <li>Kan gruplarında A ve B geni baskın, 0 geni çekiniktir (ek bilgi).</li>
        </ul>
      </Section>

      <Section no="3" title="Mutasyon ve Modifikasyon">
        <MutationFig />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead><tr className="bg-beaker/10"><th className={TD}></th><th className={TD}>Mutasyon</th><th className={TD}>Modifikasyon</th></tr></thead>
            <tbody>
              <tr><td className={TD}>Tanım</td><td className={TD}>DNA baz diziliminde ani, kalıcı değişim</td><td className={TD}>Çevre etkisiyle oluşan geçici değişim</td></tr>
              <tr><td className={TD}>Genetik yapı (DNA)</td><td className={TD}>Değişir</td><td className={TD}>Değişmez</td></tr>
              <tr><td className={TD}>Kalıtsal mı?</td><td className={TD}>Eşey hücresindeyse sonraki nesle geçer</td><td className={TD}>Geçmez</td></tr>
              <tr><td className={TD}>Nedenler</td><td className={TD}>Radyasyon, kimyasallar, virüsler, kopyalama hatası</td><td className={TD}>Beslenme, ışık, sıcaklık, spor, iklim</td></tr>
              <tr><td className={TD}>Örnekler</td><td className={TD}>Albinizm, orak hücreli anemi, Down sendromu (47 kromozom)</td><td className={TD}>Güneşte bronzlaşma, spor yapınca kasların gelişmesi, ortanca çiçeği renginin toprağa göre değişmesi</td></tr>
            </tbody>
          </table>
        </div>
        <ul className="list-disc space-y-1 pl-5">
          <li>Mutasyonların çoğu zararlıdır; bazıları etkisizdir, çok azı canlıya yarar sağlar.</li>
          <li>Mutasyona neden olan etkenlere <b>mutajen</b> denir (X ışını, UV ışınları, sigara dumanı, bazı kimyasallar).</li>
          <li>Yararlı mutasyonlar doğal seçilimle yayılabilir ve canlı çeşitliliğine katkı sağlar.</li>
        </ul>
      </Section>

      <Section no="4" title="Adaptasyon (Çevreye Uyum)">
        <p>Canlıların yaşadığı ortamda hayatta kalmasını ve üremesini sağlayan <b>kalıtsal</b> özelliklere <b>adaptasyon</b> denir.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Box tone="info" title="Yapısal">Devenin hörgücü ve geniş tabanlı ayağı, kutup ayısının kalın yağ tabakası, kaktüsün dikenleri, kameleonun renk değiştirmesi.</Box>
          <Box tone="info" title="Fizyolojik">Balinaların uzun süre nefes tutması, kutup balıklarında antifriz protein, bitkilerin kuraklığa dayanıklı olması.</Box>
          <Box tone="info" title="Davranışsal">Kuşların göç etmesi, ayının kış uykusu, hayvanların kamuflaj yapması.</Box>
        </div>
        <Box tone="formula" title="🌿 Doğal seçilim">
          <p>Bir popülasyondaki bireyler birbirinden farklıdır. Ortama daha uygun özelliklere sahip bireyler <b>daha uzun yaşar ve daha çok yavru bırakır</b>, genlerini sonraki nesillere aktarır. Böylece zamanla popülasyonda bu özellik yaygınlaşır. Bu süreç, Darwin’in doğal seçilim kuramının temelidir.</p>
        </Box>
        <p>Adaptasyon bir bireyin ömrü boyunca istekle kazandığı bir özellik değildir; nesiller boyunca kalıtımla ve seçilimle oluşur. Çevre değişirse uyumu düşük olan canlılar soyunu sürdüremeyebilir.</p>
      </Section>

      <Section no="5" title="Biyoteknoloji">
        <p><b>Biyoteknoloji</b>, canlıların ya da canlılardan elde edilen maddelerin insan yararına ürün ve hizmet üretmekte kullanılmasıdır.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Box tone="info" title="Geleneksel biyoteknoloji">Mayalanma ile yoğurt, peynir, ekmek, sirke, turşu, şalgam üretimi; bitki ve hayvan ıslahı (aşılama, seçilim).</Box>
          <Box tone="info" title="Modern biyoteknoloji">Gen mühendisliği, klonlama, doku mühendisliği, kök hücre tedavileri, aşı ve antibiyotik üretimi, DNA parmak izi.</Box>
        </div>
        <GeneEngineering />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Genetik mühendisliği:</b> Bir canlının geninin başka bir canlıya aktarılması. Örnek: İnsülin geninin bakteriye aktarılıp şeker hastalığı için insülin üretimi.</li>
          <li><b>GDO (genetiği değiştirilmiş organizma):</b> Dayanıklılık, verim ya da besin değeri için genleri değiştirilmiş canlı.</li>
          <li><b>Klonlama:</b> Genetik olarak özdeş canlı elde etme (Dolly koyunu).</li>
          <li><b>Kök hücre:</b> Farklı hücre türlerine dönüşebilen hücreler; doku ve organ onarımında kullanılır.</li>
        </ul>
        <Box tone="warn" title="⚖️ Etik ve çevre">
          <p>Biyoteknolojik uygulamaların sağlık, çevre ve biyolojik çeşitlilik üzerindeki etkileri, etik kurallar ve yasal denetimle birlikte değerlendirilmelidir. Hastalıkların tedavisi ve gıda güvenliği gibi yararları olduğu gibi riskleri de tartışılır.</p>
        </Box>
      </Section>

      <Section no="6" title="Sık Yapılan Yanlışlar">
        <ul className="list-disc space-y-1 pl-5">
          <li>❌ “Gen, kromozomdan büyüktür.” → ✅ Kromozom &gt; DNA &gt; gen &gt; nükleotid (büyükten küçüğe).</li>
          <li>❌ “DNA’da A–C, T–G eşleşir.” → ✅ A–T ve G–C eşleşir.</li>
          <li>❌ “Modifikasyon yavrulara geçer.” → ✅ Yalnızca mutasyon (eşey hücresinde olursa) geçer.</li>
          <li>❌ “Baskın gen her zaman daha çoktur.” → ✅ Baskın, etkisini gösteren anlamındadır; sayıyla ilgisi yoktur.</li>
          <li>❌ “Canlı adapte olmak için kendini değiştirir.” → ✅ Adaptasyon, doğal seçilimle nesiller boyunca oluşur.</li>
          <li>❌ “Her mutasyon zararlıdır.” → ✅ Çoğu zararlıdır ama etkisiz ya da yararlı olanlar da vardır.</li>
        </ul>
      </Section>

      <Section no="7" title="Mini Test (Kendini Dene)">
        <ol className="list-decimal space-y-2 pl-5">
          <li>DNA’nın bir ipliği TACGGA ise diğer ipliğin baz dizilimi nedir? <span className="text-lab-inkMuted">(Cevap: ATGCCT)</span></li>
          <li>İnsan bir vücut hücresinde kaç kromozom bulunur? <span className="text-lab-inkMuted">(Cevap: 46)</span></li>
          <li>Aa × aa çaprazlamasında yavruların yüzde kaçı çekinik fenotip gösterir? <span className="text-lab-inkMuted">(Cevap: %50)</span></li>
          <li>Güneşte bronzlaşan bir kişinin çocuğu da esmer mi doğar? Neden? <span className="text-lab-inkMuted">(Cevap: Hayır, modifikasyon kalıtsal değildir)</span></li>
          <li>Kutup ayısının kalın yağ tabakası hangi tür adaptasyona örnektir? <span className="text-lab-inkMuted">(Cevap: Yapısal adaptasyon)</span></li>
        </ol>
      </Section>
    </div>
  );
}

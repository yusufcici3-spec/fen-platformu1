"use client";

import { useState } from "react";

/**
 * Kendine özel bir simülasyon bileşeni tanımlanmamış deneyler için, yine de
 * gerçek bir etkileşim sunan hafif bileşen. `slug`'a göre küçük ama işlevsel
 * bir kontrol (kaydırıcı, tıklanabilir sıcak nokta vb.) render eder.
 */
export function GenericLabActivity({ slug }: { slug: string }) {
  switch (slug) {
    case "isi-alisverisi":
      return <HeatTransferWidget />;
    case "basinc-deneyi":
      return <PressureWidget />;
    case "kuvvet-ve-hareket":
      return <ForceMotionWidget />;
    case "isigin-kirilmasi":
      return <RefractionWidget />;
    case "aynalar":
      return <MirrorWidget />;
    case "hucre-modeli":
      return <HotspotWidget title="Hücre Modeli" hotspots={CELL_HOTSPOTS} />;
    case "dna-modeli":
      return <HotspotWidget title="DNA Modeli" hotspots={DNA_HOTSPOTS} />;
    case "fotosentez":
      return <PhotosynthesisWidget />;
    case "solunum":
      return <RespirationWidget />;
    default:
      return (
        <div className="rounded-card border border-dashed border-lab-paperLine p-6 text-center text-sm text-lab-inkMuted dark:border-white/10">
          Bu deney için etkileşimli simülasyon yakında eklenecek.
        </div>
      );
  }
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      {children}
    </div>
  );
}

function HeatTransferWidget() {
  const [hotTemp, setHotTemp] = useState(80);
  const [coldTemp, setColdTemp] = useState(10);
  const finalTemp = Math.round((hotTemp + coldTemp) / 2);

  return (
    <Wrapper>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">🔥 Sıcak Su ({hotTemp}°C)</label>
          <input type="range" min={40} max={100} value={hotTemp} onChange={(e) => setHotTemp(Number(e.target.value))} className="mt-1 w-full accent-reaction" />
        </div>
        <div>
          <label className="text-sm font-medium">❄️ Soğuk Su ({coldTemp}°C)</label>
          <input type="range" min={0} max={30} value={coldTemp} onChange={(e) => setColdTemp(Number(e.target.value))} className="mt-1 w-full accent-beaker" />
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-lab-paperLine/40 p-4 text-center dark:bg-white/5">
        <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Karıştırıldığında son sıcaklık:</p>
        <p className="font-mono text-3xl font-bold text-beaker-dark dark:text-beaker-light">{finalTemp}°C</p>
      </div>
    </Wrapper>
  );
}

function PressureWidget() {
  const [area, setArea] = useState(50);
  const force = 100;
  const pressure = (force / area).toFixed(1);

  return (
    <Wrapper>
      <label className="text-sm font-medium">Yüzey Alanı: {area} cm²</label>
      <input type="range" min={5} max={100} value={area} onChange={(e) => setArea(Number(e.target.value))} className="mt-1 w-full accent-beaker" />
      <div className="mt-5 flex flex-col items-center">
        <div
          className="rounded-full bg-beaker/70 transition-all"
          style={{ width: `${Math.max(20, area)}px`, height: `${Math.max(20, area)}px` }}
        />
        <p className="mt-3 text-sm text-lab-inkMuted dark:text-lab-paper/60">
          Sabit kuvvet (100 N) / Alan = Basınç: <strong className="font-mono">{pressure} N/cm²</strong>
        </p>
        <p className="mt-1 text-xs text-lab-inkMuted dark:text-lab-paper/50">
          Alan küçüldükçe basınç artar; alan büyüdükçe basınç azalır.
        </p>
      </div>
    </Wrapper>
  );
}

function ForceMotionWidget() {
  const [force, setForce] = useState(5);
  const distance = force * 8;

  return (
    <Wrapper>
      <label className="text-sm font-medium">Uygulanan Kuvvet: {force} N</label>
      <input type="range" min={1} max={10} value={force} onChange={(e) => setForce(Number(e.target.value))} className="mt-1 w-full accent-beaker" />
      <div className="relative mt-6 h-16 overflow-hidden rounded-lg bg-lab-paperLine/40 dark:bg-white/5">
        <span
          className="absolute top-1/2 -translate-y-1/2 text-3xl transition-all duration-700"
          style={{ left: `${Math.min(85, distance)}%` }}
        >
          🚗
        </span>
      </div>
      <p className="mt-3 text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Tahmini kat edilen mesafe: <strong>{distance} cm</strong> — kuvvet arttıkça mesafe artar.
      </p>
    </Wrapper>
  );
}

function RefractionWidget() {
  const [angle, setAngle] = useState(20);

  return (
    <Wrapper>
      <label className="text-sm font-medium">Işın Açısı: {angle}°</label>
      <input type="range" min={0} max={60} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="mt-1 w-full accent-beaker" />
      <svg viewBox="0 0 200 140" className="mt-4 w-full max-w-xs mx-auto">
        <rect x="0" y="70" width="200" height="70" fill="#38BDF8" opacity="0.3" />
        <line x1="100" y1="70" x2="100" y2="140" stroke="#94a3b8" strokeDasharray="4" />
        <line x1="20" y1="10" x2="100" y2="70" stroke="#F5A623" strokeWidth="2" />
        <line
          x1="100"
          y1="70"
          x2={100 + Math.sin((angle * Math.PI) / 180) * 60}
          y2={70 + Math.cos((angle * Math.PI) / 180) * 60}
          stroke="#0EA5A0"
          strokeWidth="2"
        />
      </svg>
      <p className="text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Işık havadan suya geçerken normale yaklaşarak kırılır (turuncu: gelen ışın, turkuaz: kırılan ışın).
      </p>
    </Wrapper>
  );
}

function MirrorWidget() {
  const [type, setType] = useState<"duz" | "cukur" | "tumsek">("duz");
  const labels = { duz: "Düz Ayna", cukur: "Çukur Ayna", tumsek: "Tümsek Ayna" };
  const scale = type === "cukur" ? 1.4 : type === "tumsek" ? 0.7 : 1;

  return (
    <Wrapper>
      <div className="flex justify-center gap-2">
        {(Object.keys(labels) as (keyof typeof labels)[]).map((key) => (
          <button
            key={key}
            onClick={() => setType(key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              type === key ? "bg-beaker text-white" : "border border-lab-paperLine dark:border-white/10"
            }`}
          >
            {labels[key]}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <span className="text-6xl transition-transform" style={{ transform: `scaleX(${scale}) scaleY(${scale})` }}>
          🙂
        </span>
      </div>
      <p className="mt-4 text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
        {type === "duz" && "Düz ayna, gerçek boyutta ve simetrik bir görüntü oluşturur."}
        {type === "cukur" && "Çukur ayna, yakın nesnelerin görüntüsünü büyütür."}
        {type === "tumsek" && "Tümsek ayna, görüntüyü küçültür ve daha geniş bir alanı yansıtır."}
      </p>
    </Wrapper>
  );
}

function PhotosynthesisWidget() {
  const [lightOn, setLightOn] = useState(false);

  return (
    <Wrapper>
      <div className="flex flex-col items-center">
        <button
          onClick={() => setLightOn((l) => !l)}
          className={`rounded-full px-6 py-3 text-sm font-semibold text-white ${lightOn ? "bg-reaction" : "bg-lab-inkMuted"}`}
        >
          {lightOn ? "☀️ Işığı Kapat" : "🌑 Işığı Aç"}
        </button>

        <div className="relative mt-6 h-40 w-40">
          <span className="text-7xl">🌿</span>
          {lightOn &&
            Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-lg"
                style={{ left: `${20 + i * 15}%`, bottom: "10%", animation: `bubble-rise 1.6s ease-in ${i * 0.3}s infinite` }}
              >
                🫧
              </span>
            ))}
        </div>
        <style>{`@keyframes bubble-rise { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-80px); opacity: 0; } }`}</style>

        <p className="mt-4 text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
          {lightOn
            ? "Işık altında bitki fotosentez yaparak oksijen (O₂) kabarcıkları üretiyor."
            : "Işık olmadan fotosentez durur, kabarcık üretimi gözlenmez."}
        </p>
      </div>
    </Wrapper>
  );
}

function RespirationWidget() {
  const [blown, setBlown] = useState(false);

  return (
    <Wrapper>
      <div className="flex flex-col items-center">
        <button
          onClick={() => setBlown(true)}
          className="rounded-full bg-beaker px-6 py-3 text-sm font-semibold text-white hover:bg-beaker-dark"
        >
          💨 Kireç Suyuna Üfle
        </button>
        <div
          className="mt-6 h-24 w-24 rounded-full border-4 border-lab-paperLine transition-colors duration-700 dark:border-white/10"
          style={{ backgroundColor: blown ? "#CBD5E1" : "#F0F9FF" }}
        />
        <p className="mt-4 text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
          {blown
            ? "Kireç suyu bulanıklaştı! Bu, nefeste karbondioksit (CO₂) olduğunu kanıtlar."
            : "Kireç suyu berrak. Üflemeyi deneyerek karbondioksit varlığını test et."}
        </p>
      </div>
    </Wrapper>
  );
}

const CELL_HOTSPOTS = [
  { label: "Çekirdek", icon: "🔵", fact: "Hücrenin yönetim merkezidir, DNA'yı içerir." },
  { label: "Mitokondri", icon: "🟠", fact: "Hücrenin enerji santralidir; solunumla enerji üretir." },
  { label: "Hücre Zarı", icon: "⭕", fact: "Hücreyi çevreler, madde giriş-çıkışını kontrol eder." },
  { label: "Sitoplazma", icon: "🟢", fact: "Organellerin içinde yüzdüğü jel benzeri sıvıdır." },
];

const DNA_HOTSPOTS = [
  { label: "Çift Sarmal", icon: "🧬", fact: "DNA, birbirine sarılmış iki zincirden oluşur." },
  { label: "Baz Çiftleri", icon: "🔗", fact: "A-T ve G-C baz çiftleri zincirleri birbirine bağlar." },
  { label: "Gen", icon: "📍", fact: "Bir kalıtsal özelliği belirleyen DNA bölümüdür." },
];

function HotspotWidget({ title, hotspots }: { title: string; hotspots: { label: string; icon: string; fact: string }[] }) {
  const [selected, setSelected] = useState<(typeof hotspots)[number] | null>(null);

  return (
    <Wrapper>
      <p className="mb-4 text-center text-sm font-semibold">{title} — bilgi için bir öğeye tıkla</p>
      <div className="flex flex-wrap justify-center gap-3">
        {hotspots.map((h) => (
          <button
            key={h.label}
            onClick={() => setSelected(h)}
            className={`flex flex-col items-center gap-1 rounded-card border p-4 transition ${
              selected?.label === h.label ? "border-beaker bg-beaker/10" : "border-lab-paperLine dark:border-white/10"
            }`}
          >
            <span className="text-3xl">{h.icon}</span>
            <span className="text-xs font-medium">{h.label}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 rounded-lg border border-lab-paperLine p-4 text-center text-sm dark:border-white/10">
          <strong>{selected.label}:</strong> {selected.fact}
        </div>
      )}
    </Wrapper>
  );
}

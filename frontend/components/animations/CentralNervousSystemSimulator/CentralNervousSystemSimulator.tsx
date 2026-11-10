"use client";

import { useEffect, useState } from "react";

const parts = [
  { id: "brain", name: "Beyin", color: "#a78bfa", task: "Düşünme, öğrenme, hafıza, duyulardan gelen bilgileri değerlendirme ve istemli hareketleri yönetme.", example: "Bir matematik sorusunu çözmek.", x: 150, y: 76 },
  { id: "cerebellum", name: "Beyincik", color: "#f59e0b", task: "Vücudun dengesini sağlar ve kas hareketlerinin uyumlu gerçekleşmesine yardımcı olur.", example: "Bisiklet sürerken dengede kalmak.", x: 225, y: 157 },
  { id: "medulla", name: "Omurilik soğanı", color: "#fb923c", task: "Solunum, dolaşım ve yutma gibi yaşamsal faaliyetlerin düzenlenmesinde görev alır.", example: "Solunumun düzenlenmesi.", x: 162, y: 207 },
  { id: "spinal", name: "Omurilik", color: "#38bdf8", task: "Beyin ile vücut arasında sinirsel iletimi sağlar ve reflekslerin gerçekleşmesinde görev alır.", example: "Sıcak bir cisme dokununca elini hızla çekmek.", x: 162, y: 282 },
] as const;

const experiments = {
  reflex: [
    ["Deri reseptörleri sıcaklık uyarısını algılar.", "Uyarı duyu nöronlarıyla omuriliğe taşınır.", "Omurilikte değerlendirilerek motor nöronlara aktarılır.", "Kaslar tepki verir; el hızla geri çekilir."],
    ["Deri", "Duyu nöronu", "Omurilik", "Motor nöron ve kas"],
  ],
  voluntary: [
    ["Duyu organları çevreden gelen bilgiyi algılar.", "Bilgi beyne iletilir ve değerlendirilir.", "Beyin istemli hareket için komut oluşturur.", "Komut omurilik ve motor nöronlarla kasa ulaşır."],
    ["Duyu organı", "Beyin", "Omurilik", "Kas"],
  ],
  breath: [
    ["Vücuttaki bilgiler solunum merkezine iletilir.", "Omurilik soğanı solunumun düzenlenmesinde görev alır.", "Sinirsel komutlar solunum kaslarına iletilir.", "Solunum hareketleri düzenli şekilde devam eder."],
    ["Bilgi", "Omurilik soğanı", "Sinirsel iletim", "Solunum kasları"],
  ],
};

type Experiment = keyof typeof experiments;

export default function CentralNervousSystemSimulator() {
  const [selected, setSelected] = useState<(typeof parts)[number]["id"]>("brain");
  const [experiment, setExperiment] = useState<Experiment>("reflex");
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const part = parts.find((item) => item.id === selected)!;
  const sequence = experiments[experiment];

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= 3) {
          setRunning(false);
          return 3;
        }
        return current + 1;
      });
    }, 1700);
    return () => window.clearInterval(timer);
  }, [running]);

  function startExperiment() {
    setStep(0);
    setRunning(true);
  }

  function resetExperiment() {
    setRunning(false);
    setStep(-1);
  }

  const activePoint = step < 0 ? null : experiment === "reflex"
    ? [[150, 76], [162, 282], [162, 207], [162, 282]][step]
    : experiment === "voluntary"
      ? [[150, 76], [150, 76], [162, 282], [162, 282]][step]
      : [[162, 207], [162, 207], [162, 282], [162, 282]][step];

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 px-5 py-7 text-white sm:px-8">
        <span className="text-xs font-black tracking-[.2em] text-cyan-300">6. SINIF FEN BİLİMLERİ · ETKİLEŞİMLİ LABORATUVAR</span>
        <h2 className="mt-2 text-2xl font-black sm:text-3xl">🧠 Merkezi Sinir Sistemi</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Bölümleri seçerek görevlerini keşfet. Ardından sinirsel iletim deneyini başlat ve uyarının izlediği yolu adım adım gözlemle.</p>
      </div>

      <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1.05fr_.95fr]">
        <section className="rounded-2xl bg-slate-950 p-3 text-white sm:p-5" aria-label="Merkezi sinir sistemi şeması">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs font-bold tracking-widest text-slate-300">SİSTEMİN BÖLÜMLERİ</span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-cyan-200">Şematik gösterim</span>
          </div>
          <svg viewBox="0 0 320 350" className="mx-auto block w-full max-w-[440px]" role="img" aria-label="Beyin, beyincik, omurilik soğanı ve omurilik">
            <defs>
              <linearGradient id="brainGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c4b5fd"/><stop offset="1" stopColor="#7c3aed"/></linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <path d="M132 24 C93 4 57 31 65 69 C34 82 43 123 69 137 C55 164 84 188 111 179 C120 204 155 201 166 177 C199 194 228 168 218 141 C250 117 236 81 209 74 C214 34 174 10 148 31Z" fill="url(#brainGradient)" stroke="#ddd6fe" strokeWidth="2.5"/>
            <path d="M85 64 Q112 41 125 75 T165 62 M67 105 Q99 84 115 114 T159 105 M116 154 Q142 125 163 155 T204 134 M150 29 Q133 61 151 83 T148 125" fill="none" stroke="#6d28d9" strokeWidth="3" strokeLinecap="round"/>
            <path d="M190 145 Q239 128 253 157 Q271 187 235 205 Q205 220 184 195Z" fill="#fbbf77" stroke="#fed7aa" strokeWidth="2.5"/>
            <path d="M159 175 Q172 199 164 220 L156 246 L165 272 L155 305 L161 333" fill="none" stroke="#fb923c" strokeWidth="15" strokeLinecap="round"/>
            <path d="M160 274 L160 333" stroke="#7c2d12" strokeWidth="3" strokeDasharray="4 4"/>
            {parts.map((item) => <g key={item.id} onClick={() => setSelected(item.id)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(item.id); }} style={{ cursor: "pointer" }} aria-label={item.name}>
              <circle cx={item.x} cy={item.y} r={selected === item.id ? 12 : 8} fill={item.color} stroke="white" strokeWidth={selected === item.id ? 3 : 1.5} filter={selected === item.id ? "url(#glow)" : undefined}/>
            </g>)}
            {activePoint && <g filter="url(#glow)"><circle cx={activePoint[0]} cy={activePoint[1]} r="16" fill="none" stroke="#4ade80" strokeWidth="3" strokeDasharray="4 3"><animate attributeName="r" values="12;20;12" dur="1.1s" repeatCount="indefinite"/></circle><circle cx={activePoint[0]} cy={activePoint[1]} r="5" fill="#4ade80"/></g>}
            <g fill="#e2e8f0" fontSize="10" fontWeight="700">
              <text x="8" y="20">BEYİN</text><path d="M43 23 L78 43" stroke="#c4b5fd" fill="none"/>
              <text x="245" y="119">BEYİNCİK</text><path d="M242 123 L231 151" stroke="#fbbf77" fill="none"/>
              <text x="7" y="211">OMURİLİK</text><text x="7" y="223">SOĞANI</text><path d="M83 212 L149 211" stroke="#fb923c" fill="none"/>
              <text x="213" y="259">OMURİLİK</text><path d="M207 255 L172 271" stroke="#38bdf8" fill="none"/>
            </g>
          </svg>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {parts.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item.id)} className={`rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${selected === item.id ? "border-white bg-white/15 text-white" : "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"}`}>
              <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}/>{item.name}
            </button>)}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
            <span className="text-[11px] font-black tracking-widest text-indigo-600 dark:text-indigo-300">SEÇİLEN BÖLÜM</span>
            <h3 className="mt-1 text-xl font-black text-slate-900 dark:text-white">{part.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{part.task}</p>
            <div className="mt-3 rounded-xl bg-white/80 p-3 text-sm dark:bg-slate-900/70"><b className="text-indigo-700 dark:text-indigo-300">Günlük hayattan örnek:</b><p className="mt-1 text-slate-700 dark:text-slate-200">{part.example}</p></div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <div className="text-xs font-black tracking-widest text-slate-500 dark:text-slate-400">DENEYİ SEN YÖNET</div>
            <h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">Sinirsel iletim deneyi</h3>
            <label htmlFor="cns-experiment" className="mt-3 block text-sm font-semibold text-slate-700 dark:text-slate-200">Olay seç</label>
            <select id="cns-experiment" value={experiment} onChange={(event) => { setExperiment(event.target.value as Experiment); resetExperiment(); }} className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
              <option value="reflex">Sıcak bir cisme dokunma (refleks)</option>
              <option value="voluntary">Topa doğru ayağını hareket ettirme (istemli hareket)</option>
              <option value="breath">Solunumun düzenlenmesi</option>
            </select>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={startExperiment} disabled={running} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">▶ Uyarıyı başlat</button>
              <button type="button" onClick={resetExperiment} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">↺ Sıfırla</button>
            </div>
            <div className="mt-4 rounded-xl bg-slate-100 p-3 dark:bg-slate-800" aria-live="polite">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400"><span>İLETİM AŞAMASI</span><span>{step < 0 ? "Bekleniyor" : step === 3 && !running ? "Tamamlandı" : `${step + 1} / 4`}</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700"><div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${Math.max(0, step + 1) * 25}%` }}/></div>
              <p className="mt-3 min-h-[54px] text-sm leading-6 text-slate-800 dark:text-slate-100">{step < 0 ? "Deneyi başlatınca uyarının izlediği yol burada adım adım gösterilecek." : sequence[0][step]}</p>
              {step >= 0 && <p className="mt-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">Bu aşama: {sequence[1][step]}</p>}
              {step === 3 && !running && <p className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">Deney tamamlandı. Farklı bir olay seçerek yeniden deneyebilirsin.</p>}
            </div>
          </div>
        </section>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-950">
        <p className="text-xs leading-5 text-slate-600 dark:text-slate-400"><b>Bilimsel not:</b> Refleks hareketinde omurilik hızlı tepkinin oluşmasında görev alır; beyin de gerçekleşen olaydan haberdar olur. Şema ve iletim adımları öğretim amacıyla basitleştirilmiştir.</p>
      </div>
    </div>
  );
}

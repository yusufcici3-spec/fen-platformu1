"use client";

import { useEffect, useState } from "react";

const questions = [
  { q: "Bir ampulün parlaklığını artırmak için basit bir elektrik devresinde ne yapılabilir?", options: ["Pil sayısı artırılabilir", "Anahtar çıkarılabilir", "Kablo kısaltılmalıdır", "Ampulün rengi değiştirilmelidir"], answer: 0, explain: "Uygun şekilde seri bağlanan pil sayısı arttıkça devrenin gerilimi artar ve ampul daha parlak yanabilir." },
  { q: "Aşağıdakilerden hangisi maddenin hâl değişimine örnektir?", options: ["Kâğıdın yırtılması", "Buzun erimesi", "Camın kırılması", "Odunun kesilmesi"], answer: 1, explain: "Buz erirken katı hâlden sıvı hâle geçer. Maddenin kimliği değişmez." },
  { q: "Bitkiler fotosentez sırasında aşağıdakilerden hangisini kullanır?", options: ["Oksijen ve glikoz", "Karbondioksit ve su", "Azot ve oksijen", "Protein ve mineral"], answer: 1, explain: "Bitkiler ışık enerjisi yardımıyla karbondioksit ve suyu kullanarak besin üretir, oksijen açığa çıkarır." },
  { q: "Mevsimlerin oluşmasının temel nedeni aşağıdakilerden hangisidir?", options: ["Dünya'nın Güneş'e uzaklığının değişmesi", "Dünya'nın eksen eğikliği ve dolanma hareketi", "Ay'ın Dünya çevresinde dolanması", "Güneş'in kendi ekseninde dönmesi"], answer: 1, explain: "Dünya'nın eksen eğikliği ve Güneş çevresindeki dolanma hareketi, yıl boyunca ışınların geliş açısını ve gündüz sürelerini değiştirir." },
  { q: "Aynı cins elektrik yükleri birbirine nasıl etki eder?", options: ["Birbirini çeker", "Birbirini iter", "Etkileşmez", "Önce çeker sonra iter"], answer: 1, explain: "Aynı cins yükler birbirini iter; zıt cins yükler birbirini çeker." },
  { q: "Sesin yayılması için aşağıdakilerden hangisi gereklidir?", options: ["Maddi bir ortam", "Yalnızca ışık", "Boşluk", "Elektrik akımı"], answer: 0, explain: "Ses mekanik bir dalgadır ve yayılmak için katı, sıvı veya gaz gibi maddi bir ortama ihtiyaç duyar." },
  { q: "Bir cismin sürati nasıl hesaplanır?", options: ["Yol × zaman", "Zaman / yol", "Alınan yol / geçen zaman", "Kütle / hacim"], answer: 2, explain: "Sürat, alınan toplam yolun geçen zamana bölünmesiyle bulunur." },
  { q: "DNA'nın yapı birimlerine ne ad verilir?", options: ["Hücre", "Nükleotit", "Doku", "Organ"], answer: 1, explain: "DNA, nükleotit adı verilen yapı birimlerinden oluşur." },
  { q: "Aşağıdakilerden hangisi yenilenebilir enerji kaynağıdır?", options: ["Kömür", "Petrol", "Doğal gaz", "Güneş"], answer: 3, explain: "Güneş enerjisi doğal süreçlerle sürekli yenilenen kaynaklardan elde edilir." },
  { q: "Yoğunluk hangi iki büyüklük kullanılarak hesaplanır?", options: ["Kütle ve hacim", "Kuvvet ve yol", "Sürat ve zaman", "Sıcaklık ve enerji"], answer: 0, explain: "Yoğunluk, bir maddenin kütlesinin hacmine bölünmesiyle hesaplanır." },
  { q: "Dünya'nın doğal uydusu hangisidir?", options: ["Mars", "Venüs", "Ay", "Güneş"], answer: 2, explain: "Ay, Dünya'nın doğal uydusudur ve Dünya çevresinde dolanır." },
  { q: "Basit makinelerle ilgili aşağıdaki ifadelerden hangisi doğrudur?", options: ["İşten kazanç sağlar", "Enerji üretir", "Kuvvetin yönünü veya büyüklüğünü değiştirebilir", "Her zaman yoldan kazanç sağlar"], answer: 2, explain: "Basit makineler iş kolaylığı sağlar; kuvvetin yönünü veya büyüklüğünü değiştirebilir ancak işten kazanç sağlamaz." },
  { q: "Saf su deniz seviyesinde yaklaşık kaç °C'de donar?", options: ["0", "25", "50", "100"], answer: 0, explain: "Saf su, normal atmosfer basıncında yaklaşık 0 °C'de donar." },
  { q: "Kanı kalpten vücuda taşıyan damar çeşidi hangisidir?", options: ["Toplardamar", "Atardamar", "Kılcal damar", "Lenf damarı"], answer: 1, explain: "Atardamarlar kanı kalpten uzaklaştırır. Akciğer atardamarı oksijence fakir kan taşıyan istisnadır." }
];

export function DailyQuestion() {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const now = new Date();
    const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
    setIndex(((day % questions.length) + questions.length) % questions.length);
  }, []);

  const item = questions[index];

  return (
    <div className="rounded-card border border-reaction/30 bg-reaction/5 p-6">
      <div className="flex items-center justify-between gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-reaction-dark">
        <span>❓ Günün Sorusu</span>
        <span className="normal-case tracking-normal opacity-70">Her gün yenilenir</span>
      </div>
      <p className="mt-4 text-sm font-semibold leading-6 text-lab-ink dark:text-lab-paper">{item.q}</p>
      <div className="mt-3 grid gap-2">
        {item.options.map((option, i) => (
          <button key={i} type="button" onClick={() => { setChoice(i); setRevealed(false); }}
            aria-pressed={choice === i}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition ${choice === i ? "border-reaction bg-reaction/10 font-semibold" : "border-reaction/15 bg-white/50 dark:bg-black/10"}`}>
            <span className="mr-2 font-bold">{String.fromCharCode(65 + i)}.</span>{option}
          </button>
        ))}
      </div>
      <button type="button" disabled={choice === null} onClick={() => setRevealed(true)}
        className="mt-3 rounded-lg bg-reaction px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
        Cevabı kontrol et
      </button>
      {revealed && (
        <p className="mt-3 rounded-lg bg-white/60 p-3 text-sm leading-6 dark:bg-black/15">
          <strong className={choice === item.answer ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}>
            {choice === item.answer ? "Doğru cevap! 🎉" : `Doğru cevap: ${String.fromCharCode(65 + item.answer)}`}
          </strong>
          <span className="block mt-1 text-lab-inkMuted dark:text-lab-paper/70">{item.explain}</span>
        </p>
      )}
    </div>
  );
}

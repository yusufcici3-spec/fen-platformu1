"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { foodQuestions } from "./questions";

const visualLabels: Record<string, { title: string; nodes: string[]; colors: string[] }> = {
  photo: { title: "Fotosentez ve solunum", nodes: ["☀️ Işık", "🌿 Bitki", "🍃 Besin", "💨 Oksijen"], colors: ["#fef3c7","#d1fae5","#dcfce7","#dbeafe"] },
  water: { title: "Su döngüsü", nodes: ["🌊 Buharlaşma", "☁️ Yoğunlaşma", "🌧️ Yağış", "💧 Birikme"], colors: ["#dbeafe","#e0f2fe","#ccfbf1","#bfdbfe"] },
  carbon: { title: "Karbon döngüsü", nodes: ["🌫️ CO₂", "🌿 Fotosentez", "🐾 Beslenme", "🍂 Ayrışma"], colors: ["#e2e8f0","#d1fae5","#fef3c7","#ede9fe"] },
  oxygen: { title: "Oksijen döngüsü", nodes: ["🌿 Fotosentez", "💨 Oksijen", "🐾 Solunum", "🌫️ CO₂"], colors: ["#d1fae5","#dbeafe","#fef3c7","#e2e8f0"] },
  nitrogen: { title: "Azot döngüsü", nodes: ["🌬️ Atmosfer azotu", "🦠 Bakteriler", "🌱 Bitkiler", "🐾 Tüketiciler"], colors: ["#e2e8f0","#ede9fe","#d1fae5","#fef3c7"] },
  climate: { title: "İklim ve çevre", nodes: ["🏭 Sera gazları", "🌡️ Isınma", "🌍 İklim etkisi", "🌱 Çözüm"], colors: ["#fee2e2","#ffedd5","#fef3c7","#d1fae5"] },
  recycle: { title: "Sürdürülebilir yaşam", nodes: ["♻️ Azalt", "🔁 Yeniden kullan", "🗂️ Ayrıştır", "🏭 Geri dönüştür"], colors: ["#d1fae5","#ccfbf1","#dbeafe","#ede9fe"] },
  chain: { title: "Besin zinciri", nodes: ["🌿 Üretici", "🦗 Otçul", "🐸 Etçil", "🐍 Avcı"], colors: ["#d1fae5","#fef3c7","#dbeafe","#ede9fe"] },
  pond: { title: "Gölet ekosistemi", nodes: ["🌱 Alg", "🦐 Su piresi", "🐟 Küçük balık", "🦅 Balıkçıl"], colors: ["#ccfbf1","#dbeafe","#e0f2fe","#ede9fe"] },
  pyramid: { title: "Enerji piramidi", nodes: ["🦅 Üst tüketici","🐍 İkincil tüketici","🐇 Birincil tüketici","🌾 Üreticiler"], colors: ["#ede9fe","#dbeafe","#fef3c7","#d1fae5"] },
  web: { title: "Besin ağı ilişkileri", nodes: ["🌾 Bitkiler","🦗 Böcekler","🐭 Fareler","🐸 Kurbağalar","🦊 Avcılar"], colors: ["#d1fae5","#fef3c7","#ffedd5","#dbeafe","#ede9fe"] },
  cycle: { title: "Madde döngüsü", nodes: ["🌿 Üreticiler","🐾 Tüketiciler","🍂 Organik kalıntılar","🍄 Ayrıştırıcılar"], colors: ["#d1fae5","#dbeafe","#fef3c7","#ede9fe"] },
};

function Visual({kind}:{kind:string}) {
  const v=visualLabels[kind] ?? visualLabels.chain;
  return <div className="my-5 rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-emerald-50 p-4">
    <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">{v.title} · ŞEMATİK GÖRSEL</div>
    <div className="flex flex-wrap items-center justify-center gap-2">
      {v.nodes.map((n,i)=><div key={n} className="flex items-center gap-2">
        <div className="rounded-xl px-3 py-3 text-center text-sm font-bold text-slate-700 shadow-sm" style={{background:v.colors[i]}}>{n}</div>
        {i<v.nodes.length-1&&<span className="text-xl font-black text-sky-700" aria-label="enerji aktarımı">→</span>}
      </div>)}
    </div>
    <p className="mt-3 text-center text-xs text-slate-500">Oklar, besin yoluyla enerji aktarım yönünü temsil eder.</p>
  </div>;
}

export default function FoodChainQuiz() {
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState<Record<number,number>>({});
  const [checked,setChecked]=useState(false);
  const [finished,setFinished]=useState(false);
  const q=foodQuestions[index];
  const selected=answers[index];
  const score=useMemo(()=>foodQuestions.reduce((n,item,i)=>n+(answers[i]===item.answer?1:0),0),[answers]);
  const choose=(n:number)=>{if(checked)return;setAnswers(p=>({...p,[index]:n}));};
  const check=()=>{if(selected!==undefined)setChecked(true);};
  const next=()=>{if(index===foodQuestions.length-1)setFinished(true);else{setIndex(i=>i+1);setChecked(false);}};
  const restart=()=>{setIndex(0);setAnswers({});setChecked(false);setFinished(false);};
  if(finished)return <main className="mx-auto max-w-3xl px-4 py-10"><div className="rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm"><div className="text-5xl">🏆</div><h1 className="mt-4 text-3xl font-black text-slate-900">Çalışma tamamlandı!</h1><p className="mt-3 text-lg text-slate-600">100 soruda <b className="text-emerald-700">{score} doğru</b>, {100-score} yanlış/boş yaptın.</p><div className="mx-auto mt-6 h-4 max-w-md overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{width:(score/100*100)+'%'}}/></div><p className="mt-2 text-sm text-slate-500">Başarı oranı: %{Math.round(score/100*100)}</p><button onClick={restart} className="mt-7 rounded-full bg-sky-700 px-6 py-3 font-bold text-white">Yeniden çöz</button><div><Link className="mt-5 inline-block text-sm font-semibold text-sky-700" href="/sinif/8/enerji-donusumleri-ve-cevre-bilimi">← Ünite içeriğine dön</Link></div></div></main>;
  return <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
    <nav className="mb-5 text-sm text-slate-500"><Link href="/sinif/8/enerji-donusumleri-ve-cevre-bilimi" className="hover:underline">8. Sınıf · Enerji Dönüşümleri ve Çevre Bilimi</Link> / Soru Çöz</nav>
    <header className="rounded-3xl bg-gradient-to-r from-emerald-800 to-sky-800 p-6 text-white"><div className="text-xs font-bold tracking-widest text-emerald-100">8. SINIF · YENİ NESİL SORU BANKASI</div><h1 className="mt-2 text-2xl font-black sm:text-3xl">8.6. Ünite Değerlendirme Testi</h1><p className="mt-2 text-sm text-white/85">Senaryolu, görsel destekli 100 özgün soru · Anında dönüt ve açıklama</p><div className="mt-5 flex items-center justify-between text-sm"><b>Soru {index+1} / 100</b><b>{Object.keys(answers).length} cevaplandı</b></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-amber-300 transition-all" style={{width:((index+1)/100*100)+'%'}}/></div></header>
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-center justify-between"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">SENARYO {index+1}</span><span className="text-xs font-semibold text-slate-400">Çoktan seçmeli</span></div>
      <div className="mb-3 flex flex-wrap items-center gap-2"><span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800">{q.outcome}</span></div><p className="mt-5 text-base font-semibold leading-8 text-slate-800 sm:text-lg">{q.scenario}</p>
      <Visual kind={q.visual}/>
      <div className="mt-5 grid gap-3">
        {q.options.map((option,i)=>{const isSelected=selected===i;const correct=checked&&i===q.answer;const wrong=checked&&isSelected&&i!==q.answer;return <button key={option} onClick={()=>choose(i)} className={'flex items-center gap-3 rounded-2xl border p-4 text-left transition '+(correct?'border-emerald-500 bg-emerald-50':wrong?'border-rose-400 bg-rose-50':isSelected?'border-sky-500 bg-sky-50':'border-slate-200 hover:border-sky-300 hover:bg-slate-50')}><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-black text-slate-600">{String.fromCharCode(65+i)}</span><span className="font-medium text-slate-800">{option}</span>{correct&&<span className="ml-auto text-emerald-700">✓</span>}{wrong&&<span className="ml-auto text-rose-600">✕</span>}</button>})}
      </div>
      {checked&&<div className={'mt-5 rounded-2xl p-4 '+(selected===q.answer?'bg-emerald-50 text-emerald-900':'bg-amber-50 text-amber-950')}><b>{selected===q.answer?'Doğru cevap!':'Tekrar düşün: doğru cevap '+String.fromCharCode(65+q.answer)+'.'}</b><p className="mt-2 text-sm leading-6">{q.explanation}</p></div>}
      <div className="mt-6 flex flex-wrap justify-between gap-3"><button disabled={index===0} onClick={()=>{setIndex(i=>i-1);setChecked(answers[index-1]!==undefined)}} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600 disabled:opacity-30">← Önceki</button>{!checked?<button onClick={check} disabled={selected===undefined} className="rounded-full bg-sky-700 px-6 py-2.5 text-sm font-bold text-white disabled:opacity-40">Cevabı kontrol et</button>:<button onClick={next} className="rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-bold text-white">{index===49?'Sonuçları gör':'Sonraki soru →'}</button>}</div>
    </section>
    <p className="mt-5 text-center text-xs text-slate-400">Sorular özgün olarak hazırlanmıştır. Her soru için açıklamalı geri bildirim bulunur.</p>
  </main>;
}

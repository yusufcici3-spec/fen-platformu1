"use client";
import Link from "next/link";
import { useState } from "react";
import bank1 from "@/content/konu-sorulari/5-sinif-1-unite.json";
import bank2 from "@/content/konu-sorulari/5-sinif-2-unite.json";
import bank3 from "@/content/konu-sorulari/5-sinif-3-unite.json";
import bank4 from "@/content/konu-sorulari/5-sinif-4-unite.json";
import bank5 from "@/content/konu-sorulari/5-sinif-5-unite.json";
import bank6 from "@/content/konu-sorulari/5-sinif-6-unite.json";
import bank7 from "@/content/konu-sorulari/5-sinif-7-unite.json";
const banks=[bank1,bank2,bank3,bank4,bank5,bank6,bank7] as const;
export default function UnitQuestionPage({unitSlug}:{unitSlug:string}){
 const bank=banks.find(x=>x.slug===unitSlug);
 const [index,setIndex]=useState(0),[selected,setSelected]=useState<number|null>(null),[checked,setChecked]=useState(false),[answers,setAnswers]=useState<Record<number,number>>({}),[done,setDone]=useState(false);
 if(!bank)return <main className="p-10">Soru seti bulunamadı.</main>;
 const questions=bank.questions, q=questions[index], score=questions.reduce((n,item,i)=>n+(answers[i]===item.answer?1:0),0);
 const choose=(i:number)=>{if(!checked)setSelected(i)};
 const check=()=>{if(selected===null)return;setAnswers(a=>({...a,[index]:selected}));setChecked(true)};
 const move=(n:number)=>{const next=index+n;setIndex(next);setSelected(answers[next]??null);setChecked(answers[next]!==undefined)};
 const restart=()=>{setIndex(0);setSelected(null);setChecked(false);setAnswers({});setDone(false)};
 return <main className="min-h-screen bg-lab-paper py-8 dark:bg-lab-ink"><div className="mx-auto max-w-3xl px-4 sm:px-6">
 <Link href={`/sinif/5/${bank.slug}`} className="text-sm font-semibold text-beaker hover:underline">← Ünite içeriğine dön</Link>
 <header className="mt-5 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-800 p-6 text-white shadow-lg"><p className="text-xs font-bold uppercase tracking-widest text-cyan-200">5. SINIF FEN BİLİMLERİ · {bank.unit}. ÜNİTE</p><h1 className="mt-2 text-2xl font-extrabold">{bank.title}</h1><p className="mt-2 text-sm text-white/80">30 özgün senaryo temelli yeni nesil soru</p><div className="mt-5 flex justify-between text-sm"><span>{done?"Test tamamlandı":`Soru ${index+1} / 30`}</span><span>Doğru: {score} / 30</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-amber-300" style={{width:`${done?100:(index+1)/30*100}%`}}/></div></header>
 {done?<section className="mt-6 rounded-2xl bg-white p-7 text-center shadow-sm dark:bg-lab-inkSoft"><div className="text-5xl">🌟</div><h2 className="mt-3 text-2xl font-bold">Çalışmanı tamamladın!</h2><p className="mt-2 text-lg">30 soruda <b>{score}</b> doğru yaptın.</p><p className="mt-1 text-sm">Başarı oranı: %{Math.round(score/30*100)}</p><button onClick={restart} className="mt-5 rounded-full bg-beaker px-6 py-3 font-bold text-white">Yeniden çöz</button></section>:<section className="mt-6 rounded-2xl border border-lab-paperLine bg-white p-5 shadow-sm dark:bg-lab-inkSoft sm:p-7">
 <div className="flex flex-wrap justify-between gap-2"><span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-900">{q.code} · {q.topic}</span><span className="text-xs">Senaryoyu incele</span></div>
 <p className="mt-5 text-sm leading-7">{q.scenario}</p><div className="my-4 rounded-2xl border border-cyan-200 bg-gradient-to-br from-sky-50 to-indigo-50 p-5 text-center text-slate-900"><p className="text-xs font-bold uppercase tracking-widest text-cyan-800">{q.visual.label}</p><p className="mt-2 text-base font-semibold leading-7">{q.visual.content}</p><p className="mt-2 text-[10px] uppercase tracking-widest text-slate-500">Konu bilgi kartı · Şematik gösterim</p></div>
 <h2 className="text-base font-bold leading-7">{q.stem}</h2><div className="mt-4 grid gap-3">{q.options.map((option,i)=><button key={i} onClick={()=>choose(i)} className={`rounded-xl border p-4 text-left text-sm leading-6 ${checked?(i===q.answer?"border-green-500 bg-green-50 text-green-900":selected===i?"border-red-400 bg-red-50 text-red-900":"border-lab-paperLine opacity-70"):(selected===i?"border-beaker bg-beaker/10":"border-lab-paperLine hover:border-beaker")}`}><b className="mr-2">{String.fromCharCode(65+i)})</b>{option}</button>)}</div>
 {checked&&<div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm"><b>{selected===q.answer?"✓ Doğru cevap!":`✗ Doğru cevap: ${String.fromCharCode(65+q.answer)}`}</b><p className="mt-1 leading-6">{q.explanation}</p></div>}
 <div className="mt-6 flex flex-wrap justify-between gap-3"><button onClick={()=>move(-1)} disabled={index===0} className="rounded-full border px-5 py-3 text-sm font-semibold disabled:opacity-40">← Önceki</button>{!checked?<button onClick={check} disabled={selected===null} className="rounded-full bg-beaker px-6 py-3 text-sm font-bold text-white disabled:opacity-40">Cevabı kontrol et</button>:index===29?<button onClick={()=>setDone(true)} className="rounded-full bg-beaker px-6 py-3 text-sm font-bold text-white">Sonuçları gör</button>:<button onClick={()=>move(1)} className="rounded-full bg-beaker px-6 py-3 text-sm font-bold text-white">Sonraki soru →</button>}</div>
 </section>}</div></main>
}
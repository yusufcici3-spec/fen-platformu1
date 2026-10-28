"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

const questions = [
  { q: "Işık, saydam ve aynı özellikteki bir ortamda nasıl yayılır?", options: ["Doğrusal olarak", "Daireler çizerek", "Yalnızca aşağıya"], answer: 0, explain: "Işık doğrusal yollar boyunca yayılır." },
  { q: "Hangisi saydam maddeye örnektir?", options: ["Tahta", "Temiz pencere camı", "Karton"], answer: 1, explain: "Temiz cam ışığın büyük bölümünü geçirir." },
  { q: "Hangisi ışığı geçirmez?", options: ["Hava", "Temiz su", "Opak karton"], answer: 2, explain: "Opak maddeler ışığı geçirmez." },
  { q: "Tam gölge oluşumunda hangisi gereklidir?", options: ["Işık kaynağı, opak cisim ve ekran", "Yalnızca ayna", "Yalnızca saydam cam"], answer: 0, explain: "Opak cisim ışığı engeller; gölge ekranda görülebilir." },
  { q: "Bir cisim ışık kaynağına yaklaştırılırsa gölgesi genellikle nasıl değişir?", options: ["Büyür", "Her zaman yok olur", "Hiç değişmez"], answer: 0, explain: "Aynı düzenekte cisim kaynağa yaklaştığında gölge genellikle büyür." },
];

function LightRays() {
  return <svg viewBox="0 0 520 150" role="img" aria-label="Işık kaynağından doğrusal yayılan ışınlar" className={styles.diagram}>
    <defs><marker id="rayArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#f59e0b"/></marker></defs>
    <circle cx="55" cy="75" r="25" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3"/>
    {[35,55,75,95,115].map(y=><path key={y} d={`M90 75 L465 ${y}`} stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#rayArrow)" opacity=".85"/>)}
    <text x="55" y="120" textAnchor="middle" fill="#8a5a00" fontSize="13" fontWeight="700">Işık kaynağı</text>
    <text x="280" y="24" textAnchor="middle" fill="#24516f" fontSize="15" fontWeight="700">Işık doğrusal yayılır</text>
  </svg>;
}

function ShadowDiagram() {
  return <svg viewBox="0 0 520 190" role="img" aria-label="Işık kaynağı, opak cisim ve ekranda oluşan gölge" className={styles.diagram}>
    <circle cx="48" cy="82" r="22" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3"/>
    <path d="M70 65 L410 35 L410 130 L70 100Z" fill="#fde68a" opacity=".55"/>
    <path d="M70 65 L410 35 M70 100 L410 130" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 5"/>
    <rect x="210" y="53" width="34" height="61" rx="4" fill="#334155"/>
    <rect x="412" y="20" width="20" height="130" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
    <path d="M244 53 L412 63 L412 117 L244 114Z" fill="#1e293b" opacity=".5"/>
    <text x="48" y="130" textAnchor="middle" fill="#8a5a00" fontSize="12">Kaynak</text>
    <text x="227" y="137" textAnchor="middle" fill="#334155" fontSize="12">Opak cisim</text>
    <text x="422" y="170" textAnchor="middle" fill="#1d4ed8" fontSize="12">Ekran</text>
    <text x="330" y="93" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="700">Gölge</text>
  </svg>;
}

export default function IsiginDunyasiPage() {
 const [answers,setAnswers] = useState<Record<number,number>>({});
 const [checked,setChecked] = useState(false);
 const score = questions.filter((q,i)=>answers[i]===q.answer).length;
 return <main className={styles.page}><div className={styles.wrap}>
  <nav className={styles.breadcrumb}><Link href="/">Ana sayfa</Link><span>›</span><Link href="/animasyonlar/5">5. sınıf animasyonları</Link><span>›</span><span>4. Ünite</span></nav>
  <header className={styles.hero}><div><span className={styles.kicker}>5. SINIF FEN BİLİMLERİ · 4. ÜNİTE</span><h1>Işığın Dünyası 💡</h1><p>Işığın nasıl yayıldığını, maddelerle karşılaşınca neler olduğunu ve gölgelerin nasıl oluştuğunu görsellerle öğren.</p><div className={styles.tags}><span>📘 Konu anlatımı</span><span>👀 Görseller</span><span>🧠 Mini test</span></div><a href="#konular" className={styles.start}>Derse başla ↓</a></div><div className={styles.heroArt}><span>☀️</span><i>━━━━━━➜</i><b>🔺</b><strong>🌈</strong></div></header>
  <nav className={styles.contents}><b>Bu derste</b><a href="#yayilma">Işığın yayılması</a><a href="#maddeler">Işık ve maddeler</a><a href="#golge">Tam gölge</a><a href="#ozet">Özet</a><a href="#test">Mini test</a></nav>
  <section id="konular" className={styles.section}><div className={styles.heading}><span>01</span><div><small>TEMEL KAVRAM</small><h2>Işık nasıl yayılır?</h2></div></div><div className={styles.columns}><div><p>Işık, çevremizdeki cisimleri görmemizi sağlar. Güneş, yıldızlar ve yanan ampul kendi ışığını üreten kaynaklardır.</p><p><strong>Işık, saydam ve aynı özellikteki bir ortamda doğrusal olarak yayılır.</strong> El fenerinin ışığının belirli bir doğrultuda ilerlemesi buna örnektir.</p><aside className={styles.tip}><b>🔎 Günlük yaşam</b><br/>Birbirinin hizasında olmayan iki delikten bakarken arkadaki ışığı göremeyebiliriz.</aside></div><div className={styles.visual}><b>IŞIK IŞINLARI</b><LightRays/><small>Oklar ışığın ilerleme yönünü gösterir.</small></div></div><div className={styles.sourceCards}><article>☀️<b>Doğal ışık kaynağı</b><span>Güneş</span></article><article>💡<b>Yapay ışık kaynağı</b><span>Ampul</span></article><article>🕯️<b>Alevli ışık kaynağı</b><span>Mum alevi</span></article></div></section>
  <section id="maddeler" className={styles.section}><div className={styles.heading}><span>02</span><div><small>IŞIK VE MADDE</small><h2>Maddeler ışığı nasıl geçirir?</h2></div></div><p className={styles.lead}>Maddeleri ışığı geçirme miktarına göre üç grupta inceleyebiliriz.</p><div className={styles.cards}><article><div className={styles.materialArt + " " + styles.clear}><span>☀️</span><i>→ → →</i><b>👓</b></div><h3>Saydam maddeler</h3><p>Işığın büyük bölümünü geçirir. Arkasındaki cisimler genellikle net görülür.</p><div className={styles.example}>Örnekler: temiz cam, temiz su, hava</div><label className={styles.green}>Işık çok geçer</label></article><article><div className={styles.materialArt + " " + styles.translucent}><span>☀️</span><i>↗ · → ↘</i><b>🪟</b></div><h3>Yarı saydam maddeler</h3><p>Işığın bir bölümünü geçirir; arkasındaki cisimler net seçilemez.</p><div className={styles.example}>Örnekler: buzlu cam, yağlı kâğıt</div><label className={styles.yellow}>Işık kısmen geçer</label></article><article><div className={styles.materialArt + " " + styles.opaque}><span>☀️</span><i>→ ✕ →</i><b>📕</b></div><h3>Opak maddeler</h3><p>Işığı geçirmez. Uygun koşullarda arkalarında gölge oluşabilir.</p><div className={styles.example}>Örnekler: tahta, metal, karton</div><label className={styles.purple}>Işık geçmez</label></article></div><aside className={styles.warning}><b>⚠️ Unutma:</b> Bir maddenin ışığı geçirme durumu yalnızca rengine bakılarak belirlenemez.</aside></section>
  <section id="golge" className={styles.section}><div className={styles.heading}><span>03</span><div><small>GÖZLEM VE MODEL</small><h2>Tam gölge nasıl oluşur?</h2></div></div><div className={styles.columns}><div><p>Işık doğrusal yayıldığı için ışığın önüne opak bir cisim konulduğunda, ışığın ulaşamadığı bölgede gölge oluşabilir.</p><ol className={styles.list}><li><b>Işık kaynağı:</b> Işığı üretir.</li><li><b>Opak cisim:</b> Işığın geçmesini engeller.</li><li><b>Ekran:</b> Gölgenin görüldüğü yüzeydir.</li></ol><aside className={styles.tip}><b>🧪 Güvenli gözlem</b><br/>Bir el feneri, oyuncak ve beyaz kâğıtla bir yetişkin gözetiminde gölgeyi gözlemle. Işığı kimsenin gözüne tutma.</aside></div><div className={styles.visual}><b>GÖLGE DÜZENEĞİ</b><ShadowDiagram/><small>Opak cisim, ışığın ekrana ulaşmasını engeller.</small></div></div><div className={styles.experiment}><h3>🧪 Mini deney: Gölgeyi değiştir</h3><p>Işık kaynağı, opak cisim ve ekranın uzaklıklarını değiştirerek gölgenin boyutunu karşılaştır.</p><ul><li>Cisim kaynağa yaklaştığında gölge genellikle büyür.</li><li>Cisim ekrana yaklaştığında gölge genellikle küçülür.</li><li>Sonuç, düzenekteki uzaklıklara bağlıdır.</li></ul></div></section>
  <section id="ozet" className={styles.section}><div className={styles.heading}><span>04</span><div><small>HIZLI TEKRAR</small><h2>Aklında kalsın</h2></div></div><div className={styles.summary}><article><span>💡</span><b>Işık</b><p>Saydam ve aynı özellikteki ortamda doğrusal yayılır.</p></article><article><span>🪟</span><b>Maddeler</b><p>Saydam, yarı saydam ve opak maddeler ışığı farklı geçirir.</p></article><article><span>🌑</span><b>Gölge</b><p>Opak cisim ışığı engellediğinde gölge oluşabilir.</p></article><article><span>📏</span><b>Gölge boyutu</b><p>Kaynak, cisim ve ekranın konumuna göre değişebilir.</p></article></div></section>
  <section id="test" className={styles.quiz}><div className={styles.heading}><span>05</span><div><small>KENDİNİ DENE</small><h2>Mini test</h2></div></div><p>Her soruda bir seçenek işaretle, sonra cevaplarını kontrol et.</p>{questions.map((q,i)=><article className={styles.question} key={q.q}><h3>{i+1}. {q.q}</h3>{q.options.map((o,j)=><label key={o} className={checked&&j===q.answer?styles.correct:checked&&answers[i]===j?styles.incorrect:styles.option}><input type="radio" name={"q"+i} checked={answers[i]===j} onChange={()=>{setAnswers(old=>({...old,[i]:j}));setChecked(false);}}/>{o}</label>)}{checked&&<p className={styles.explain}>{q.explain}</p>}</article>)}<button className={styles.check} onClick={()=>setChecked(true)}>Cevaplarımı kontrol et</button>{checked&&<p className={styles.result}>Sonucun: <b>{score} / {questions.length}</b> {score===questions.length?"Harika! 🎉":"Açıklamaları incele ve yeniden dene."}</p>}</section>
  <footer className={styles.footer}>Fen Platformu · 5. sınıf fen bilimleri · Gözlemle, karşılaştır ve öğren!<br/><Link href="/animasyonlar/5">← 5. sınıf animasyonlarına dön</Link></footer>
 </div></main>;
}

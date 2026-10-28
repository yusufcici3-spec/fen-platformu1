'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

const MicroscopeScene = dynamic(() => import('./MicroscopeScene'), {
  ssr: false,
  loading: () => <div className={styles.sceneLoading}>Mikroskop hazırlanıyor…</div>,
});

type Sample = { id: string; name: string; emoji: string; title: string; description: string; hint: string; color: string };
const samples: Sample[] = [
  { id: 'mold', name: 'Küflü ekmek', emoji: '🍞', title: 'Ekmek küfü', description: 'Küf mantarlarının ince ipliksi hifleri ve spor keseciklerini temsil eden bir model görüyorsun.', hint: 'Küf, uygun nem ve sıcaklıkta gelişebilen bir mantardır. Gerçek küflü ekmeği koklama veya çıplak elle tutma.', color: '#a7c76a' },
  { id: 'pond', name: 'Gölet suyu', emoji: '💧', title: 'Gölet suyu', description: 'Su damlasındaki mikroskobik canlıları temsil eden şekiller: tek hücreliler, algler ve küçük parçacıklar.', hint: 'Gölet suyunda çok farklı canlılar bulunabilir. Bu ekrandaki görüntü öğretim amaçlı temsili bir modeldir.', color: '#78d5d1' },
  { id: 'onion', name: 'Soğan zarı', emoji: '🧅', title: 'Soğan zarı hücreleri', description: 'Bitki hücrelerinin düzenli, köşeli sınırlarını ve hücre içindeki çekirdekleri incele.', hint: 'Soğan zarı, bitki hücrelerini gözlemlemek için okul laboratuvarlarında sık kullanılan bir örnektir.', color: '#d9b4f2' },
  { id: 'cheek', name: 'Yanak hücresi', emoji: '🔬', title: 'Yanak epitel hücreleri', description: 'Hayvan hücrelerini temsil eden yuvarlağa yakın hücreler ve belirgin çekirdekler görüyorsun.', hint: 'Hayvan hücrelerinde hücre duvarı bulunmaz. Görsel, gerçek bir mikroskop fotoğrafı değil şematik bir canlandırmadır.', color: '#f1a6a6' },
  { id: 'leaf', name: 'Yaprak yüzeyi', emoji: '🍃', title: 'Yaprak yüzeyi', description: 'Yaprak yüzeyindeki stoma adı verilen gözenekleri ve çevrelerindeki hücreleri gözlemle.', hint: 'Stomalar, bitkilerin gaz alışverişine ve su buharı vermesine yardımcı olur.', color: '#8bd28d' },
  { id: 'salt', name: 'Tuz kristalleri', emoji: '🧂', title: 'Tuz kristalleri', description: 'Tuz kristallerini temsil eden köşeli, geometrik yapıları incele.', hint: 'Kristallerin şekli maddenin taneciklerinin düzenli dizilişiyle ilişkilidir. Bu model basitleştirilmiştir.', color: '#b9d7ef' },
];

export default function MikroskopAnimasyonuPage() {
  const [sampleId, setSampleId] = useState('mold');
  const [zoom, setZoom] = useState(2);
  const [focus, setFocus] = useState(55);
  const [light, setLight] = useState(65);
  const [running, setRunning] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [looking, setLooking] = useState(false);
  const [arrived, setArrived] = useState(false);
  const stepBack = () => { setArrived(false); setLooking(false); };
  const sample = samples.find((s) => s.id === sampleId) ?? samples[0];
  const shapes = useMemo(() => Array.from({ length: 46 }, (_, i) => ({
    x: (i * 37 + 11) % 94 + 3,
    y: (i * 61 + 17) % 94 + 3,
    size: 3 + ((i * 13) % 8),
    rotate: (i * 29) % 180,
    delay: (i % 9) * -0.7,
  })), [sampleId]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/animasyonlar/5" className={styles.back}>← 5. Sınıf animasyonları</Link>
        <div className={styles.eyebrow}>5. SINIF • ETKİLEŞİMLİ FEN LABORATUVARI</div>
        <h1>🔬 Mikroskop Masası</h1>
        <p>Preparatını seç, büyütmeyi ve ışığı ayarla, mikroskopla keşfe çık!</p>
      </header>

      <section className={styles.layout}>
        <aside className={styles.panel}>
          <h2>1. Preparat seç</h2>
          <p className={styles.muted}>İncelemek istediğin örneğe dokun.</p>
          <div className={styles.samples}>
            {samples.map((s) => (
              <button key={s.id} type="button" onClick={() => setSampleId(s.id)} className={`${styles.sampleButton} ${sampleId === s.id ? styles.selected : ''}`} aria-pressed={sampleId === s.id}>
                <span className={styles.sampleEmoji}>{s.emoji}</span><span>{s.name}</span><span className={styles.sampleArrow}>{sampleId === s.id ? '✓' : '›'}</span>
              </button>
            ))}
          </div>
          <div className={styles.note}><strong>Güvenli gözlem</strong><br />Bu ekranda örneklerin temsili modellerini inceliyorsun. Gerçek küf veya gölet suyu örneklerini öğretmen gözetimi olmadan toplama ya da inceleme.</div>
        </aside>

        <section className={styles.scopePanel} aria-label="Mikroskop görüntüsü ve kontrolleri">
          <div className={styles.scopeTop}><div><span className={styles.liveDot} /> CANLI GÖRÜNTÜ MODELİ</div><button className={styles.smallButton} onClick={() => { setZoom(2); setFocus(55); setLight(65); setRunning(true); }}>↺ Sıfırla</button></div>
          <div className={styles.stage3d}>
            <MicroscopeScene sampleColor={sample.color} looking={looking} onPick={() => setLooking(true)} onArrived={() => setArrived(true)} />
            {!looking && (
              <div className={styles.sceneHint}>
                <span>🖱️ Sürükleyerek döndür · mikroskopa dokun, okülerden bak</span>
                <button type="button" className={styles.primary} onClick={() => setLooking(true)}>👁 Okülerden bak</button>
              </div>
            )}
            {looking && !arrived && <div className={styles.sceneHint}><span>Okülere yaklaşılıyor…</span></div>}
            <div className={`${styles.eyeOverlay} ${arrived ? styles.eyeOn : ''}`} aria-hidden={!arrived}>
              <div className={styles.eyeWrap}>
          <div className={styles.microscopeView}  style={{ ['--sample-color' as string]: sample.color, ['--light' as string]: `${light}%`, ['--focus' as string]: `${(100-focus)/18}px` }}>
            <div className={`${styles.specimen} ${styles[sampleId]}`} style={{ transform: `scale(${0.78 + zoom * 0.25})`, filter: `blur(${Math.max(0, Math.abs(focus - 55) / 14)}px)` }}>
              {shapes.map((shape, i) => <span key={`${sampleId}-${i}`} className={`${styles.particle} ${running ? styles.moving : ''}`} style={{ left: `${shape.x}%`, top: `${shape.y}%`, width: `${shape.size * (0.65 + zoom * 0.24)}px`, height: `${shape.size * (0.65 + zoom * 0.24)}px`, transform: `rotate(${shape.rotate}deg)`, animationDelay: `${shape.delay}s` }} />)}
              {sampleId === 'onion' && Array.from({ length: 20 }, (_, i) => <span key={`cell-${i}`} className={styles.plantCell} style={{ left: `${(i % 5) * 19 + 4}%`, top: `${Math.floor(i / 5) * 23 + 4}%` }}><i /></span>)}
              {sampleId === 'mold' && Array.from({ length: 7 }, (_, i) => <span key={`mold-${i}`} className={styles.hypha} style={{ left: `${8 + i * 13}%`, top: `${20 + (i % 3) * 22}%`, transform: `rotate(${i * 27}deg)` }}><i /></span>)}
              {sampleId === 'leaf' && Array.from({ length: 7 }, (_, i) => <span key={`stoma-${i}`} className={styles.stoma} style={{ left: `${12 + (i % 3) * 29}%`, top: `${12 + Math.floor(i / 3) * 34}%`, transform: `rotate(${i * 21}deg)` }} />)}
              {sampleId === 'salt' && Array.from({ length: 14 }, (_, i) => <span key={`salt-${i}`} className={styles.crystal} style={{ left: `${(i * 31) % 88 + 4}%`, top: `${(i * 43) % 88 + 4}%`, transform: `rotate(${i * 17}deg)` }} />)}
            </div>
            <div className={styles.viewVignette} />
            {showLabels && <div className={styles.viewLabel}>{sample.title}<small>{zoom * 100}× model büyütme</small></div>}
            <div className={styles.scaleMark}>└──── 100 µm (temsili)</div>
          </div>
              </div>
              <button type="button" className={styles.backButton} onClick={stepBack}>← Masaya dön</button>
            </div>
          </div>
          <div className={styles.controlGrid}>
            <label className={styles.control}><span><b>🔎 Büyütme</b><strong>{zoom * 100}×</strong></span><input aria-label="Büyütme" type="range" min="1" max="4" step="1" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} /><span className={styles.rangeEnds}><small>100×</small><small>400×</small></span></label>
            <label className={styles.control}><span><b>☀️ Işık</b><strong>%{light}</strong></span><input aria-label="Işık şiddeti" type="range" min="10" max="100" value={light} onChange={(e) => setLight(Number(e.target.value))} /><span className={styles.rangeEnds}><small>Az</small><small>Çok</small></span></label>
            <label className={styles.control}><span><b>🎯 Odak</b><strong>{focus < 40 ? 'Yakın' : focus > 70 ? 'Uzak' : 'Netlik'}</strong></span><input aria-label="Odak ayarı" type="range" min="10" max="100" value={focus} onChange={(e) => setFocus(Number(e.target.value))} /><span className={styles.rangeEnds}><small>Odakla</small><small>Netleştir</small></span></label>
          </div>
          <div className={styles.actions}><button type="button" className={styles.primary} onClick={() => setRunning(!running)}>{running ? 'Ⅱ Hareketi durdur' : '▶ Hareketi başlat'}</button><button type="button" className={styles.secondary} onClick={() => setShowLabels(!showLabels)}>{showLabels ? 'Etiketleri gizle' : 'Etiketleri göster'}</button></div>
          <p className={styles.disclaimer}>Eğitim simülasyonudur; gerçek mikroskop fotoğrafı veya ölçekli bilimsel görüntü değildir.</p>
        </section>

        <aside className={styles.infoPanel}>
          <div className={styles.infoIcon}>{sample.emoji}</div><div className={styles.eyebrow}>SEÇİLİ PREPARAT</div><h2>{sample.title}</h2><p>{sample.description}</p>
          <div className={styles.discovery}><strong>🔍 Neye dikkat etmelisin?</strong><p>{sample.hint}</p></div>
          <div className={styles.miniQuiz}><strong>🧠 Kendini dene</strong><p>{sampleId === 'onion' ? 'Soğan zarı hücreleri neden köşeli görünür?' : sampleId === 'cheek' ? 'Hayvan hücresinde hücre duvarı var mıdır?' : sampleId === 'leaf' ? 'Yaprak üzerindeki gözeneklerin adı nedir?' : sampleId === 'salt' ? 'Tuz kristallerinin belirgin geometrik şekli neyi gösterir?' : sampleId === 'pond' ? 'Gölet suyunda mikroskobik canlılar bulunabilir mi?' : 'Küf mantar mıdır, bitki midir?'}</p><details><summary>Cevabı gör</summary><p>{sampleId === 'onion' ? 'Hücre duvarları belirgin sınırlar oluşturduğu için.' : sampleId === 'cheek' ? 'Hayır. Hayvan hücrelerinde hücre duvarı bulunmaz.' : sampleId === 'leaf' ? 'Stoma.' : sampleId === 'salt' ? 'Taneciklerin düzenli bir yapı oluşturduğunu.' : sampleId === 'pond' ? 'Evet, gölet suyunda mikroskobik canlılar bulunabilir.' : 'Küf, mantarlar grubundadır.'}</p></details></div>
        </aside>
      </section>
      <footer className={styles.footer}>Fen Platformu • 5. sınıf fen bilimleri • Merak et, gözlemle, öğren!</footer>
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import styles from "./SuratHizSimulator.module.css";

type Scenario = "east" | "west" | "return";
const scenarios: Record<Scenario, {title:string; description:string; distance:number; displacement:number; duration:number; direction:string}> = {
 east:{title:"Doğuya doğru yolculuk",description:"Araç 100 metre doğuya ilerliyor. Süre, seçtiğin sürate göre değişir.",distance:100,displacement:100,duration:20,direction:"Doğu"},
 west:{title:"Batıya doğru yolculuk",description:"Araç 100 metre batıya ilerliyor. Süre, seçtiğin sürate göre değişir.",distance:100,displacement:-100,duration:20,direction:"Batı"},
 return:{title:"Gidip başlangıç noktasına dönme",description:"Araç 100 metre doğuya, ardından 100 metre batıya dönerek seçtiğin sürate göre değişen bir sürede başlangıç noktasına geliyor.",distance:200,displacement:0,duration:40,direction:""}
};

export default function SuratHizSimulator(){
 const [scenario,setScenario]=useState<Scenario>("east");
 const [progress,setProgress]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [vehicleSpeed,setVehicleSpeed]=useState(5);
 const data=scenarios[scenario];
 const elapsed=data.duration*progress;
 const travelled=data.distance*progress;
 const signedPosition=scenario==="return"?(progress<=0.5?progress*200:200-progress*200):data.displacement*progress;
 const carX=scenario==="return"?(progress<=0.5?70+progress*1000:70+(1-(progress-0.5)*2)*500):(scenario==="east"?70+progress*500:570-progress*500);
 const speed=vehicleSpeed;
 const velocity=data.displacement/data.duration;
 const currentSpeed=elapsed>0?travelled/elapsed:speed;
 const currentVelocity=elapsed>0?signedPosition/elapsed:velocity;
 useEffect(()=>{
  if(!playing)return;
  const timer=window.setInterval(()=>setProgress(p=>Math.min(1,p+(vehicleSpeed*0.1)/data.distance)),100);
  return()=>window.clearInterval(timer);
 },[playing,data.duration,vehicleSpeed,data.distance]);
 useEffect(()=>{if(progress>=1)setPlaying(false);},[progress]);
 const selectScenario=(next:Scenario)=>{setScenario(next);setProgress(0);setPlaying(false);};
 return <section className={styles.simulator} aria-label="Sürat ve hız etkileşimli animasyonu">
  <div className={styles.top}><div><span className={styles.kicker}>ETKİLEŞİMLİ HAREKET LABORATUVARI</span><h2>Sürat mi, hız mı?</h2><p>Senaryoyu seç, aracı hareket ettir ve iki kavramın nasıl farklılaştığını gözlemle.</p></div><span className={styles.live}>● Kontrol sende</span></div>
  <div className={styles.scenarios} role="group" aria-label="Hareket senaryosu seç">
   <button className={scenario==="east"?styles.active:""} onClick={()=>selectScenario("east")}>→ Doğuya git</button>
   <button className={scenario==="west"?styles.active:""} onClick={()=>selectScenario("west")}>← Batıya git</button>
   <button className={scenario==="return"?styles.active:""} onClick={()=>selectScenario("return")}>↔ Geri dön</button>
  </div>
  <div className={styles.speedControl}>
   <label htmlFor="vehicle-speed">🚗 Aracın sürati: <strong>{vehicleSpeed.toFixed(1)} m/s</strong></label>
   <input id="vehicle-speed" type="range" min="1" max="10" step="0.5" value={vehicleSpeed} onChange={e=>{setPlaying(false);setVehicleSpeed(Number(e.target.value));}}/>
   <div><span>Yavaş · 1 m/s</span><span>Hızlı · 10 m/s</span></div>
  </div>
  <div className={styles.scene}>
   <div className={styles.sceneLabel}><span>BATI</span><span>DOĞU</span></div>
   <svg viewBox="0 0 640 190" role="img" aria-label="Doğu ve batı yönlerini gösteren yol üzerinde hareket eden araç">
    <defs><linearGradient id="road" x1="0" x2="1"><stop stopColor="#263b5b"/><stop offset="1" stopColor="#344e70"/></linearGradient></defs>
    <rect x="24" y="95" width="592" height="46" rx="16" fill="url(#road)"/><path d="M36 118H604" stroke="#d9e6f7" strokeWidth="2" strokeDasharray="13 12" opacity=".8"/>
    <path d="M70 73V151 M570 73V151" stroke="#8ba6c8" strokeWidth="2" strokeDasharray="4 5"/>
    <text x="70" y="61" textAnchor="middle" fill="#a9bed9" fontSize="12">Başlangıç</text><text x="570" y="61" textAnchor="middle" fill="#a9bed9" fontSize="12">100 m</text>
    <g transform={"translate("+(carX-25)+" 72)"}><rect x="0" y="13" width="50" height="26" rx="8" fill="#45c6a3"/><path d="M10 13L17 2H36L44 13" fill="#8ce4cf"/><circle cx="12" cy="41" r="6" fill="#d9e6f7"/><circle cx="39" cy="41" r="6" fill="#d9e6f7"/><rect x="19" y="17" width="15" height="9" rx="2" fill="#17334a"/></g>
    <text x="320" y="177" textAnchor="middle" fill="#b8c9df" fontSize="11">{scenario==="return"?"Araç önce doğuya, sonra batıya ilerler":scenario==="east"?"Araç doğu yönünde ilerliyor":"Araç batı yönünde ilerliyor"}</text>
   </svg>
   <div className={styles.progressRow}><span>{elapsed.toFixed(1)} sn</span><input aria-label="Animasyon ilerlemesi" type="range" min="0" max="100" value={Math.round(progress*100)} onChange={e=>{setPlaying(false);setProgress(Number(e.target.value)/100);}}/><span>{data.duration} sn</span></div>
   <div className={styles.controls}><button className={styles.primary} onClick={()=>{if(progress>=1)setProgress(0);setPlaying(!playing);}}>{playing?"❚❚ Duraklat":progress>=1?"↻ Yeniden oynat":"▶ Başlat"}</button><button onClick={()=>{setPlaying(false);setProgress(0);}}>↺ Sıfırla</button><button onClick={()=>{setPlaying(false);setProgress(p=>Math.min(1,p+0.1));}}>+ 10% ilerlet</button></div>
  </div>
  <p className={styles.scenarioText}><strong>{data.title}:</strong> {data.description}</p>
  <div className={styles.metrics}>
   <article><span>Alınan yol</span><strong>{Math.round(travelled)} m</strong><small>Toplam gidilen mesafe</small></article>
   <article><span>Yer değiştirme</span><strong>{Math.round(signedPosition)} m</strong><small>Başlangıca göre yönlü konum</small></article>
   <article className={styles.speedCard}><span>Ortalama sürat</span><strong>{currentSpeed.toFixed(1)} m/s</strong><small>Toplam yol ÷ toplam zaman</small></article>
   <article className={styles.velocityCard}><span>Ortalama hız</span><strong>{Math.abs(currentVelocity)<0.05?"0 m/s":Math.abs(currentVelocity).toFixed(1)+" m/s "+(currentVelocity>0?"Doğu":"Batı")}</strong><small>Yer değiştirme ÷ zaman</small></article>
  </div>
  <div className={styles.takeaway}><strong>💡 Ne fark ettin?</strong><p>{scenario==="return"?"Araç 200 m yol aldı ama başladığı noktaya döndüğü için yer değiştirmesi 0 m oldu. Bu nedenle ortalama sürati 5 m/s iken ortalama hızı 0 m/s çıktı.":"Sürat alınan yol ve geçen zamanı dikkate alır. Hız ise yer değiştirmeyi ve yönü de dikkate alır. Doğu ve batı senaryolarında sürat aynı, hızın yönü farklıdır."}</p></div>
  <div className={styles.definitions}><div><b>SÜRAT</b><p>Bir cismin birim zamanda aldığı yol. Yön belirtmez.</p></div><div><b>HIZ</b><p>Bir cismin birim zamandaki yer değiştirmesi. Yön belirtir.</p></div></div>
  <p className={styles.note}>Not: Bu animasyonda ortalama sürat ve ortalama hız gösterilir. Hareket doğrusal ve sabit süratli kabul edilmiştir.</p>
 </section>;
}

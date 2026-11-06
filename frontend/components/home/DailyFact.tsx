"use client";

import { useEffect, useState } from "react";

const facts = [
  { title: "Ahtapotların üç kalbi vardır", body: "İki kalp kanı solungaçlara, üçüncü kalp ise vücudun geri kalanına pompalar." },
  { title: "Bal arıları dans ederek haberleşir", body: "Bir arı, yaptığı özel hareketlerle besin kaynağının yönü ve uzaklığı hakkında diğer arılara bilgi verebilir." },
  { title: "Işık çok hızlıdır", body: "Işık boşlukta saniyede yaklaşık 300 bin kilometre yol alır. Güneş ışığının Dünya'ya ulaşması yaklaşık 8 dakika 20 saniye sürer." },
  { title: "Su donarken genleşir", body: "Su donduğunda hacmi artar. Bu nedenle buz, sıvı sudan daha düşük yoğunlukludur ve suyun üzerinde yüzer." },
  { title: "İnsan vücudundaki en büyük organ deridir", body: "Deri, vücudu dış etkenlere karşı korur ve vücut sıcaklığının düzenlenmesine yardımcı olur." },
  { title: "Bitkiler de solunum yapar", body: "Bitkiler fotosentezin yanında gece ve gündüz hücresel solunum da gerçekleştirir." },
  { title: "Ay kendi ışığını üretmez", body: "Ay'ı parlak görmemizin nedeni, Güneş'ten gelen ışığı yansıtmasıdır." },
  { title: "Ses boşlukta yayılamaz", body: "Sesin ilerleyebilmesi için hava, su veya katı maddeler gibi titreşimi aktaracak bir ortam gerekir." },
  { title: "Kan damarları çok uzundur", body: "İnsan vücudundaki damarların toplam uzunluğu yetişkin bir insanda yaklaşık on binlerce kilometreye ulaşabilir." },
  { title: "Yıldırımlar çok sıcaktır", body: "Yıldırım kanalındaki hava çok kısa sürede Güneş'in yüzey sıcaklığından daha yüksek sıcaklıklara ulaşabilir." },
  { title: "Mıknatısın iki kutbu vardır", body: "Her mıknatısın kuzey ve güney kutbu bulunur. Aynı kutuplar birbirini iter, zıt kutuplar birbirini çeker." },
  { title: "Arılar çiçeklerin tozlaşmasına yardım eder", body: "Çiçekten çiçeğe taşınan polenler, birçok bitkinin tohum ve meyve oluşturmasını sağlar." },
  { title: "Dünya'nın atmosferi bizi korur", body: "Atmosfer, zararlı ışınımın bir bölümünü süzer ve göktaşlarının çoğunun yeryüzüne ulaşmadan parçalanmasına yardımcı olur." },
  { title: "Kemikler canlı dokulardır", body: "Kemikler sürekli yenilenir; büyüme, onarım ve mineral depolama gibi önemli görevleri vardır." },
  { title: "Termometre sıcaklığı ölçer", body: "Sıcaklık, bir maddenin ne kadar sıcak veya soğuk olduğunu belirtir; ısı ise sıcaklık farkı nedeniyle aktarılan enerjidir." },
  { title: "Elektrik enerjisi farklı enerjilere dönüşebilir", body: "Ampulde ışık, ütüde ısı, vantilatörde hareket enerjisine dönüşüm gerçekleşir." },
  { title: "Dünya'nın en dış katmanı atmosferdir", body: "Atmosfer farklı gazlardan oluşur ve canlıların yaşamı için gerekli koşulların sürmesine katkı sağlar." },
  { title: "DNA kalıtsal bilgiyi taşır", body: "DNA'daki nükleotitlerin dizilişi, canlıların kalıtsal özellikleriyle ilgili bilgiyi içerir." },
  { title: "Kutup ışıkları atmosferde oluşur", body: "Güneş'ten gelen yüklü parçacıklar Dünya'nın manyetik alanı tarafından yönlendirilir ve atmosferdeki gazlarla etkileşerek kutup ışıklarını oluşturur." },
  { title: "Gölge ışığın doğrusal yayılmasıyla ilişkilidir", body: "Işık doğrusal yayıldığı için opak bir cisim ışığın önünü kestiğinde arkasında gölge oluşur." }
];

export function DailyFact() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const now = new Date();
    const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
    setIndex(((day % facts.length) + facts.length) % facts.length);
  }, []);

  const item = facts[index];

  return (
    <div className="rounded-card border border-beaker/30 bg-beaker/5 p-6">
      <div className="flex items-center justify-between gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
        <span><span className="mr-2">💡</span>Günün Bilgisi</span>
        <span className="normal-case tracking-normal opacity-70">Her gün yenilenir</span>
      </div>
      <h3 className="mt-4 text-sm font-bold text-lab-ink dark:text-lab-paper">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-lab-inkMuted dark:text-lab-paper/70">{item.body}</p>
    </div>
  );
}

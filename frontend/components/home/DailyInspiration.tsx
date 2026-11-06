"use client";

import { useMemo } from "react";

const inspirations = [
  { type: "Söz", title: "Küçük adımlar, büyük keşifler", body: "Her gün öğrendiğin küçücük bir bilgi, yarının büyük başarısına dönüşebilir.", note: "Bugün merak ettiğin bir sorunun cevabını araştır." },
  { type: "Mini hikâye", title: "Bir damla su", body: "Bir öğrenci, su damlasının neden yuvarlak olduğunu merak etti. Araştırdı, deney yaptı ve yüzey gerilimini öğrendi. Tek bir soru, yeni bir bilim kapısı açtı.", note: "Merak etmek öğrenmenin ilk adımıdır." },
  { type: "Söz", title: "Hata, öğrenmenin parçasıdır", body: "Yanlış cevap, düşünmeyi bıraktığın yer değil; doğru cevaba giden yeni bir ipucudur.", note: "Bugün çözemediğin bir soruya yeniden dön." },
  { type: "Mini hikâye", title: "Sabırlı araştırmacı", body: "Bir genç, yaptığı deneyde ilk seferinde beklediği sonucu alamadı. Notlarını inceledi, yöntemini geliştirdi ve yeniden denedi. Her denemede biraz daha öğrendi.", note: "Başarı, denemekten vazgeçmeyenlerin yol arkadaşıdır." },
  { type: "Söz", title: "Bilgi paylaştıkça çoğalır", body: "Öğrendiğini bir arkadaşına anlat. Bir bilgiyi anlaşılır biçimde açıklamak, onu gerçekten kavramanın güzel yollarından biridir.", note: "Bugün öğrendiğin bir bilgiyi paylaş." },
  { type: "Söz", title: "Merakını canlı tut", body: "Bilim, 'Neden?' ve 'Nasıl?' sorularıyla ilerler. Soruların seni yeni keşiflere götürsün.", note: "Çevrende gördüğün bir olay için bir soru belirle." },
  { type: "Mini hikâye", title: "Bir tohumun dersi", body: "Sınıfa ekilen küçük bir fasulye tohumu hemen filizlenmedi. Öğrenciler düzenli gözlem yaptı, uygun koşulları sağladı ve sabırla bekledi. Günler sonra ilk filiz göründü.", note: "Düzenli emek ve sabır gelişimi görünür kılar." },
  { type: "Söz", title: "Dünden daha iyi", body: "Kendini başkalarıyla değil, dünkü hâlinle karşılaştır. Her gün biraz ilerlemek değerlidir.", note: "Bugün bir konuyu dünden daha iyi anlamayı hedefle." },
  { type: "Söz", title: "Zor sorular geliştirir", body: "Bir sorunun zor olması, onu öğrenemeyeceğin anlamına gelmez. Parçalara ayır, düşün ve adım adım ilerle.", note: "Zorlandığın soruda verilenleri ve isteneni ayrı ayrı yaz." },
  { type: "Mini hikâye", title: "Gökyüzüne bakan öğrenci", body: "Her akşam Ay'ın şeklini not eden bir öğrenci, birkaç hafta sonra Ay'ın evrelerindeki düzeni fark etti. Dikkatli gözlem, kitaptaki bilgiyi anlamlandırmasını sağladı.", note: "Bilim, dikkatli bakmakla başlar." },
  { type: "Söz", title: "Emek iz bırakır", body: "Bugün ayırdığın zaman, yarın kendine duyduğun güvenin temelini oluşturur.", note: "Çalışmanı küçük ve ulaşılabilir bir hedefle başlat." },
  { type: "Söz", title: "Her şey bir fikirle başlar", body: "Büyük buluşların ardında çoğu zaman basit bir merak ve onu takip eden kararlı bir çalışma vardır.", note: "Aklına gelen bilimsel bir fikri not et." }
];

export function DailyInspiration() {
  const item = useMemo(() => {
    const now = new Date();
    const dayNumber = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
    return inspirations[((dayNumber % inspirations.length) + inspirations.length) % inspirations.length];
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-amber-300/50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 p-6 shadow-sm dark:border-amber-500/20 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-yellow-950/20 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">✨ Günün İlhamı</div>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-black/20 dark:text-amber-200">{item.type}</span>
        </div>
        <h2 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">{item.title}</h2>
        <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700 dark:text-slate-200">{item.body}</p>
        <p className="mt-4 border-t border-amber-300/50 pt-4 text-sm font-semibold text-amber-900 dark:border-amber-500/20 dark:text-amber-200">🎯 Bugünün önerisi: {item.note}</p>
        <p className="mt-4 text-right text-[11px] font-medium text-slate-500 dark:text-slate-400">Her gün otomatik yenilenir.</p>
      </div>
    </section>
  );
}

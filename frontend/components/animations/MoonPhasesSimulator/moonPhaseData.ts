export const LUNAR_CYCLE_DAYS = 29.5;

export type MoonPhase = {
  id: string;
  name: string;
  day: number;
  description: string;
  observation: string;
};

export const MOON_PHASES: MoonPhase[] = [
  {
    id: "new-moon",
    name: "Yeni Ay",
    day: 0,
    description:
      "Ay'ın Dünya'ya bakan yüzünün çoğu karanlık görünür. Bu yüzden Yeni Ay'ı gökyüzünde seçmek genellikle zordur.",
    observation: "Görünen aydınlık bölüm: yok denecek kadar az",
  },
  {
    id: "waxing-crescent",
    name: "Büyüyen Hilal",
    day: 3.7,
    description:
      "İnce bir aydınlık yay görünür ve her gün genişler. Kuzey Yarımküre'den bakıldığında aydınlık kısım sağ taraftadır.",
    observation: "Aydınlık bölüm büyümeye başlar",
  },
  {
    id: "first-quarter",
    name: "İlk Dördün",
    day: 7.4,
    description:
      "Ay'ın bize dönük görünen yüzünün yaklaşık yarısı aydınlıktır. Yeni Ay'dan sonraki yolculuğunun yaklaşık dörtte birindedir.",
    observation: "Görünen yüzün yaklaşık yarısı aydınlık",
  },
  {
    id: "waxing-gibbous",
    name: "Büyüyen Şişkin Ay",
    day: 11.1,
    description:
      "Ay'ın görünen yüzünün yarısından fazlası aydınlıktır. Aydınlık bölüm, Dolunay'a kadar genişlemeyi sürdürür.",
    observation: "Aydınlık bölüm yarıdan fazla ve büyüyor",
  },
  {
    id: "full-moon",
    name: "Dolunay",
    day: 14.8,
    description:
      "Ay, Dünya'nın Güneş'e göre karşı tarafındadır. Dünya'dan görünen yüzünün neredeyse tamamı aydınlık görünür.",
    observation: "Görünen yüzün neredeyse tamamı aydınlık",
  },
  {
    id: "waning-gibbous",
    name: "Küçülen Şişkin Ay",
    day: 18.4,
    description:
      "Dolunaydan sonra görünen aydınlık bölüm küçülmeye başlar. Ay'ın kendisi küçülmez; yalnızca gördüğümüz aydınlık kısım değişir.",
    observation: "Aydınlık bölüm yarıdan fazla ama küçülüyor",
  },
  {
    id: "last-quarter",
    name: "Son Dördün",
    day: 22.1,
    description:
      "Ay'ın görünen yüzünün yine yaklaşık yarısı aydınlıktır. Kuzey Yarımküre'den bakıldığında bu kez sol taraf aydınlık görünür.",
    observation: "Görünen yüzün yaklaşık yarısı aydınlık",
  },
  {
    id: "waning-crescent",
    name: "Küçülen Hilal",
    day: 25.8,
    description:
      "Yeni Ay yaklaşırken ince aydınlık yay küçülür. Ardından evre döngüsü yeniden başlar.",
    observation: "İnce aydınlık yay küçülerek kaybolur",
  },
];

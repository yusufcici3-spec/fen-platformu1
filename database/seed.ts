/**
 * Veritabanına başlangıç (örnek) verilerini ekler.
 * Çalıştırmak için: cd backend && npm run db:seed
 */
import { PrismaClient, RoleName, QuestionType, Difficulty, GameType, ExamType } from "../backend/src/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed işlemi başlıyor...");

  // ---- Roller ----
  const [studentRole, teacherRole, adminRole, parentRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: RoleName.STUDENT },
      update: {},
      create: { name: RoleName.STUDENT },
    }),
    prisma.role.upsert({
      where: { name: RoleName.TEACHER },
      update: {},
      create: { name: RoleName.TEACHER },
    }),
    prisma.role.upsert({
      where: { name: RoleName.ADMIN },
      update: {},
      create: { name: RoleName.ADMIN },
    }),
    prisma.role.upsert({
      where: { name: RoleName.PARENT },
      update: {},
      create: { name: RoleName.PARENT },
    }),
  ]);

  // ---- Örnek Kullanıcılar ----
  const passwordHash = await bcrypt.hash("Sifre123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@fenplatformu.com" },
    update: {},
    create: {
      firstName: "Ayşe",
      lastName: "Yönetici",
      email: "admin@fenplatformu.com",
      passwordHash,
      roleId: adminRole.id,
      isEmailVerified: true,
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: "ogretmen@fenplatformu.com" },
    update: {},
    create: {
      firstName: "Mehmet",
      lastName: "Öğretmen",
      email: "ogretmen@fenplatformu.com",
      passwordHash,
      roleId: teacherRole.id,
      isEmailVerified: true,
    },
  });

  const demoStudent = await prisma.user.upsert({
    where: { email: "ogrenci@fenplatformu.com" },
    update: {},
    create: {
      firstName: "Zeynep",
      lastName: "Öğrenci",
      email: "ogrenci@fenplatformu.com",
      passwordHash,
      roleId: studentRole.id,
      classLevel: 6,
      isEmailVerified: true,
    },
  });

  // ---- Aşama 5: Örnek Veli Hesabı ve Öğrenci Bağlantısı ----
  const demoParent = await prisma.user.upsert({
    where: { email: "veli@fenplatformu.com" },
    update: {},
    create: {
      firstName: "Fatma",
      lastName: "Veli",
      email: "veli@fenplatformu.com",
      passwordHash,
      roleId: parentRole.id,
      isEmailVerified: true,
    },
  });
  await prisma.parentChild.upsert({
    where: { parentId_childId: { parentId: demoParent.id, childId: demoStudent.id } },
    update: {},
    create: { parentId: demoParent.id, childId: demoStudent.id },
  });

  // ---- Sınıflar ----
  const classData = [
    { level: 5, name: "5. Sınıf", slug: "5-sinif" },
    { level: 6, name: "6. Sınıf", slug: "6-sinif" },
    { level: 7, name: "7. Sınıf", slug: "7-sinif" },
    { level: 8, name: "8. Sınıf", slug: "8-sinif" },
  ];

  const classes = [];
  for (const c of classData) {
    const created = await prisma.class.upsert({
      where: { level: c.level },
      update: {},
      create: c,
    });
    classes.push(created);
  }

  // ---- Örnek Ünite / Konu / Soru (5. Sınıf) ----
  const class5 = classes.find((c) => c.level === 5)!;

  const unit = await prisma.unit.upsert({
    where: { classId_slug: { classId: class5.id, slug: "gunes-sistemi-ve-tutulmalar" } },
    update: {},
    create: {
      title: "Güneş Sistemi ve Tutulmalar",
      slug: "gunes-sistemi-ve-tutulmalar",
      description: "Güneş sistemindeki gezegenler, Ay ve Güneş tutulmaları.",
      order: 1,
      classId: class5.id,
    },
  });

  const topic = await prisma.topic.upsert({
    where: { unitId_slug: { unitId: unit.id, slug: "gunes-sistemi" } },
    update: {},
    create: {
      title: "Güneş Sistemi",
      slug: "gunes-sistemi",
      summary: "Güneş sistemindeki gezegenleri ve özelliklerini öğreniyoruz.",
      order: 1,
      isPublished: true,
      unitId: unit.id,
      authorId: teacher.id,
    },
  });

  await prisma.question.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      type: QuestionType.MULTIPLE_CHOICE,
      body: "Güneş sistemindeki en büyük gezegen hangisidir?",
      options: ["Dünya", "Jüpiter", "Mars", "Venüs"],
      correctAnswer: "Jüpiter",
      explanation: "Jüpiter, Güneş Sistemi'ndeki en büyük gezegendir.",
      difficulty: Difficulty.EASY,
      points: 10,
      topicId: topic.id,
      authorId: teacher.id,
    },
  });

  // ---- Örnek Duyuru ----
  await prisma.announcement.create({
    data: {
      title: "Platforma Hoş Geldiniz!",
      content: "Fen Bilimleri eğitim platformumuz yayında. İyi çalışmalar dileriz.",
      isPinned: true,
      authorId: admin.id,
    },
  });

  // ---- Örnek Rozet ----
  await prisma.badge.create({
    data: {
      title: "İlk Adım",
      description: "İlk konuyu tamamladın!",
      icon: "🏅",
    },
  });

  // ---- Örnek Oyun ----
  await prisma.game.create({
    data: {
      title: "Gezegen Eşleştirme",
      description: "Gezegenleri özellikleriyle eşleştir.",
      type: GameType.MATCHING,
      classLevel: 5,
      isPublished: false,
    },
  });

  // ---- Aşama 2: MEB Fen Bilimleri müfredatı (5-8. sınıf) ----
  await seedCurriculum(teacher.id, classes);

  // ---- Aşama 3: Soru bankası ve deneme sınavı sistemi ----
  const studentUser = await prisma.user.findUnique({ where: { email: "ogrenci@fenplatformu.com" } });
  await seedQuestionBank(teacher.id, studentUser?.id);

  // ---- Aşama 4: Oyunlar, sanal laboratuvar, görevler, rozetler ----
  await seedGamesAndLabs(studentUser?.id);

  // ---- Aşama 5: Yapay zekâ destekli kişiselleştirilmiş öğrenme ----
  await seedStage5(teacher.id, studentUser?.id);

  console.log("✅ Seed işlemi tamamlandı.");
}

/**
 * MEB Fen Bilimleri müfredatına uygun örnek ünite/konu/kazanım/içerik
 * verilerini 5, 6, 7 ve 8. sınıflar için oluşturur. Bu bir "başlangıç
 * kütüphanesi"dir; yönetim panelinden yeni ünite/konu eklenerek
 * genişletilebilir.
 */
async function seedCurriculum(teacherId: string, classes: { id: string; level: number }[]) {
  console.log("📚 MEB müfredatı ekleniyor...");

  type TopicSeed = {
    title: string;
    slug: string;
    summary: string;
    outcomes: string[];
    glossary: { term: string; definition: string }[];
    experiment: { title: string; materials: string; steps: string; safetyNotes: string };
  };

  type UnitSeed = {
    code: string;
    title: string;
    slug: string;
    description: string;
    topics: TopicSeed[];
  };

  const CURRICULUM: Record<number, UnitSeed[]> = {
    5: [
      {
        code: "5.1",
        title: "Güneş, Dünya ve Ay",
        slug: "gunes-dunya-ve-ay",
        description: "Gökyüzü gözlemleri, Güneş, Dünya ve Ay'ın şekli ve hareketleri.",
        topics: [
          {
            title: "Gökyüzünü Gözlemliyorum",
            slug: "gokyuzunu-gozlemliyorum",
            summary: "Çıplak gözle ve basit araçlarla gökyüzü gözlemi yapmayı öğreniyoruz.",
            outcomes: [
              "Gökyüzü gözlemlerinin bilim tarihindeki önemini açıklar.",
              "Gözlem yaparken dikkat edilmesi gereken güvenlik kurallarını sıralar.",
            ],
            glossary: [
              { term: "Gözlem", definition: "Bir olayı veya nesneyi duyu organları ya da araçlarla incelemek." },
              { term: "Teleskop", definition: "Uzak cisimleri yakınmış gibi görmemizi sağlayan optik alet." },
            ],
            experiment: {
              title: "Basit Periskop Yapımı",
              materials: "2 adet karton kutu, 2 ayna, makas, bant",
              steps:
                "1) Kartonun iki ucuna 45 derece açıyla ayna yerleştirin.\n2) Kutuyu kapatın.\n3) Bir uçtan bakarak diğer uçtaki görüntüyü gözlemleyin.",
              safetyNotes: "Ayna kenarları keskin olabilir, dikkatli kesim yapın.",
            },
          },
          {
            title: "Güneş, Dünya ve Ay'ın Şekli ve Büyüklüğü",
            slug: "gunes-dunya-ay-sekli-buyuklugu",
            summary: "Güneş, Dünya ve Ay'ın şekillerini ve birbirlerine göre büyüklüklerini karşılaştırıyoruz.",
            outcomes: [
              "Güneş, Dünya ve Ay'ın şeklinin geoit/küreye benzer olduğunu ifade eder.",
              "Güneş, Dünya ve Ay'ı büyüklüklerine göre karşılaştırır.",
            ],
            glossary: [
              { term: "Geoit", definition: "Dünya'nın kutuplardan basık, ekvatordan şişkin gerçek şekli." },
              { term: "Gök cismi", definition: "Uzayda bulunan yıldız, gezegen, uydu gibi doğal cisimlerin genel adı." },
            ],
            experiment: {
              title: "Ölçekli Model ile Büyüklük Karşılaştırması",
              materials: "Farklı boyutlarda 3 top (misket, tenis topu, basketbol topu)",
              steps:
                "1) Topları Güneş, Dünya ve Ay'ı temsil edecek şekilde seçin.\n2) Büyüklük oranlarını karşılaştırın.\n3) Gözlemlerinizi not edin.",
              safetyNotes: "Topları fırlatmadan, dikkatli şekilde inceleyin.",
            },
          },
        ],
      },
      {
        code: "5.4",
        title: "Canlılar Dünyasını Gezelim, Tanıyalım",
        slug: "canlilar-dunyasini-gezelim-taniyalim",
        description: "Canlıların ortak özellikleri ve sınıflandırılması.",
        topics: [
          {
            title: "Canlıların Ortak Özellikleri",
            slug: "canlilarin-ortak-ozellikleri",
            summary: "Beslenme, solunum, boşaltım gibi tüm canlılarda ortak olan yaşamsal olayları inceliyoruz.",
            outcomes: [
              "Canlıların ortak özelliklerini örneklerle açıklar.",
              "Canlı ve cansız varlıkları ayırt eder.",
            ],
            glossary: [
              { term: "Metabolizma", definition: "Canlı vücudunda gerçekleşen tüm kimyasal olayların bütünü." },
              { term: "Üreme", definition: "Canlıların kendine benzer yeni bireyler oluşturması." },
            ],
            experiment: {
              title: "Canlı-Cansız Ayrımı Gözlem Etkinliği",
              materials: "Bir saksı bitki, bir taş, bir böcek (gözlem için, zarar vermeden)",
              steps:
                "1) Üç varlığı da gözlemleyin.\n2) Hareket, büyüme, beslenme özelliklerini karşılaştırın.\n3) Tabloya kaydedin.",
              safetyNotes: "Canlılara zarar vermeden, nazikçe gözlemleyin.",
            },
          },
          {
            title: "Canlıları Sınıflandırıyoruz",
            slug: "canlilari-siniflandiriyoruz",
            summary: "Canlıları bitkiler, hayvanlar ve diğer canlı grupları olarak sınıflandırıyoruz.",
            outcomes: [
              "Canlıları temel özelliklerine göre gruplandırır.",
              "Sınıflandırmanın bilimsel çalışmalardaki önemini açıklar.",
            ],
            glossary: [
              { term: "Sınıflandırma", definition: "Canlıları ortak özelliklerine göre gruplara ayırma işlemi." },
              { term: "Omurga", definition: "Hayvanların sırtında bulunan, vücudu destekleyen kemik dizisi." },
            ],
            experiment: {
              title: "Yaprak Koleksiyonu ile Sınıflandırma",
              materials: "Farklı bitkilerden düşmüş yapraklar, büyüteç, defter",
              steps:
                "1) Çevrenizden farklı yapraklar toplayın.\n2) Şekil ve damar yapılarına göre gruplandırın.\n3) Gözlemlerinizi çizerek kaydedin.",
              safetyNotes: "Yalnızca yere düşmüş yaprakları toplayın, bitkilere zarar vermeyin.",
            },
          },
        ],
      },
    ],
    6: [
      {
        code: "6.1",
        title: "Güneş Sistemi ve Tutulmalar",
        slug: "gunes-sistemi-ve-tutulmalar",
        description: "Güneş sistemindeki gezegenler, Ay'ın evreleri ve tutulma olayları.",
        topics: [
          {
            title: "Güneş Sistemi'ndeki Gezegenler",
            slug: "gunes-sistemindeki-gezegenler",
            summary: "Güneş sistemindeki 8 gezegeni Güneş'e uzaklıklarına göre sıralıyoruz.",
            outcomes: [
              "Güneş sistemindeki gezegenleri Güneş'e olan uzaklıklarına göre sıralar.",
              "İç ve dış gezegenleri özellikleriyle karşılaştırır.",
            ],
            glossary: [
              { term: "Gezegen", definition: "Yıldızların çevresinde dolanan, kendi ışığı olmayan gök cismi." },
              { term: "Yörünge", definition: "Bir gök cisminin başka bir gök cismi çevresinde izlediği yol." },
            ],
            experiment: {
              title: "Gezegen Sıralama Modeli",
              materials: "Renkli kartonlar, ip, ölçüm şeridi",
              steps:
                "1) Her gezegen için farklı boyutta karton daire kesin.\n2) Güneş'e uzaklık sırasına göre bir ipe dizin.\n3) Sınıfta sergileyin.",
              safetyNotes: "Makas kullanırken dikkatli olun.",
            },
          },
          {
            title: "Ay ve Güneş Tutulmaları",
            slug: "ay-ve-gunes-tutulmalari",
            summary: "Ay tutulması ve Güneş tutulmasının nasıl gerçekleştiğini inceliyoruz.",
            outcomes: [
              "Ay tutulması ile Güneş tutulmasının oluşum şeklini karşılaştırır.",
              "Tutulma sırasında Güneş, Dünya ve Ay'ın konumlarını modelle gösterir.",
            ],
            glossary: [
              { term: "Tutulma", definition: "Bir gök cisminin diğerinin gölgesinde kalması olayı." },
              { term: "Gölge", definition: "Işığın bir cisim tarafından engellenmesiyle oluşan karanlık alan." },
            ],
            experiment: {
              title: "Tutulma Simülasyonu",
              materials: "Fener, büyük top (Dünya), küçük top (Ay)",
              steps:
                "1) Feneri Güneş, büyük topu Dünya, küçük topu Ay olarak konumlandırın.\n2) Ay'ı Dünya'nın gölgesine getirin.\n3) Gölgelenmeyi gözlemleyin.",
              safetyNotes: "Fener ışığını doğrudan göze tutmayın.",
            },
          },
        ],
      },
      {
        code: "6.2",
        title: "Vücudumuzdaki Sistemler",
        slug: "vucudumuzdaki-sistemler",
        description: "Sindirim, dolaşım ve boşaltım sistemlerinin yapısı ve görevleri.",
        topics: [
          {
            title: "Sindirim Sistemi",
            slug: "sindirim-sistemi",
            summary: "Besinlerin vücutta sindirilme yolculuğunu ağızdan başlayarak inceliyoruz.",
            outcomes: [
              "Sindirim sistemi organlarını ve görevlerini açıklar.",
              "Sağlıklı beslenmenin sindirim sistemi sağlığındaki önemini fark eder.",
            ],
            glossary: [
              { term: "Sindirim", definition: "Besinlerin vücut tarafından kullanılabilir hale getirilmesi süreci." },
              { term: "Enzim", definition: "Vücuttaki kimyasal reaksiyonları hızlandıran özel proteinler." },
            ],
            experiment: {
              title: "Ağızda Sindirim Deneyi",
              materials: "Bir dilim ekmek",
              steps:
                "1) Ekmeği ağzınızda uzun süre çiğneyin.\n2) Tadındaki değişimi gözlemleyin (nişastanın şekere dönüşümü).\n3) Gözlemlerinizi not edin.",
              safetyNotes: "Yiyecekle yapılan bu deneyde hijyene dikkat edin.",
            },
          },
          {
            title: "Boşaltım Sistemi",
            slug: "bosaltim-sistemi",
            summary: "Vücuttaki atık maddelerin dışarı atılmasını sağlayan organları tanıyoruz.",
            outcomes: [
              "Boşaltım sistemi organlarını ve görevlerini listeler.",
              "Böbreklerin sağlığını korumanın yollarını açıklar.",
            ],
            glossary: [
              { term: "Böbrek", definition: "Kanı süzerek atık maddeleri idrar hâlinde uzaklaştıran organ." },
              { term: "İdrar", definition: "Böbrekler tarafından üretilen sıvı atık." },
            ],
            experiment: {
              title: "Süzme Modeli",
              materials: "Kahve filtresi, bulanık su, huni, temiz kap",
              steps:
                "1) Huniye kahve filtresi yerleştirin.\n2) Bulanık suyu filtreden geçirin.\n3) Süzülen suyu gözlemleyerek böbreğin süzme işleviyle ilişkilendirin.",
              safetyNotes: "Suyu içmeyin, yalnızca gözlem amaçlıdır.",
            },
          },
        ],
      },
    ],
    7: [
      {
        code: "7.1",
        title: "Güneş Sistemi ve Ötesi: Uzay Bilmecesi",
        slug: "gunes-sistemi-ve-otesi-uzay-bilmecesi",
        description: "Uzay araştırmaları, teleskoplar ve Türk bilim insanlarının uzay çalışmaları.",
        topics: [
          {
            title: "Uzay Araştırmaları",
            slug: "uzay-arastirmalari",
            summary: "İnsanlığın uzayı keşfetme serüvenini ve kullanılan teknolojileri inceliyoruz.",
            outcomes: [
              "Uzay araştırmalarında kullanılan araçları (teleskop, uydu, roket) açıklar.",
              "Uzay araştırmalarının günlük hayata katkılarına örnekler verir.",
            ],
            glossary: [
              { term: "Uydu", definition: "Bir gezegenin çevresinde dolanan doğal veya yapay cisim." },
              { term: "Roket", definition: "Uzay araçlarını yörüngeye taşımak için kullanılan itki sistemi." },
            ],
            experiment: {
              title: "Balon Roket Deneyi",
              materials: "Balon, ip, pipet, bant",
              steps:
                "1) İpi odanın iki ucuna gerin.\n2) Pipeti ipe geçirip balonu pipete bantlayın.\n3) Balonu şişirip bırakarak itki kuvvetini gözlemleyin.",
              safetyNotes: "Balonu şişirirken aşırı zorlamayın.",
            },
          },
          {
            title: "Türk Bilim İnsanları ve Uzay Çalışmaları",
            slug: "turk-bilim-insanlari-ve-uzay-calismalari",
            summary: "Türkiye'nin uzay alanındaki çalışmalarını ve bilim insanlarını tanıyoruz.",
            outcomes: [
              "Türkiye'nin uzay çalışmalarına verdiği örnekleri açıklar.",
              "Bilimsel çalışmalarda takım çalışmasının önemini fark eder.",
            ],
            glossary: [
              { term: "Uzay ajansı", definition: "Bir ülkenin uzay araştırmalarını yürüten resmi kurumu." },
            ],
            experiment: {
              title: "Araştırma ve Sunum Etkinliği",
              materials: "İnternet erişimi, sunum kağıdı",
              steps:
                "1) Türkiye'nin uzay çalışmalarıyla ilgili güvenilir kaynaklardan araştırma yapın.\n2) Bulgularınızı bir poster hâline getirin.\n3) Sınıfta sununuz.",
              safetyNotes: "İnternet araştırmasında güvenilir kaynakları tercih edin.",
            },
          },
        ],
      },
      {
        code: "7.4",
        title: "Elektrik Yükleri ve Elektrik Enerjisi",
        slug: "elektrik-yukleri-ve-elektrik-enerjisi",
        description: "Elektriklenme olayları ve elektrik enerjisinin diğer enerji türlerine dönüşümü.",
        topics: [
          {
            title: "Elektriklenme",
            slug: "elektriklenme",
            summary: "Sürtünme yoluyla elektriklenme olayını ve elektrik yüklerini inceliyoruz.",
            outcomes: [
              "Sürtünme ile elektriklenme olayını örneklerle açıklar.",
              "Aynı ve farklı cins yüklerin birbirini itme/çekme durumunu açıklar.",
            ],
            glossary: [
              { term: "Elektriklenme", definition: "Bir cismin elektrik yükü kazanması olayı." },
              { term: "Statik elektrik", definition: "Cisimler üzerinde biriken, hareket etmeyen elektrik yükü." },
            ],
            experiment: {
              title: "Balon ile Elektriklenme",
              materials: "Balon, yün kumaş, küçük kağıt parçaları",
              steps:
                "1) Balonu yün kumaşa sürtün.\n2) Balonu küçük kağıt parçalarına yaklaştırın.\n3) Kağıtların balona doğru hareketini gözlemleyin.",
              safetyNotes: "Balonu patlatmamaya dikkat edin.",
            },
          },
          {
            title: "Elektrik Enerjisinin Dönüşümü",
            slug: "elektrik-enerjisinin-donusumu",
            summary: "Elektrik enerjisinin ışık, ısı ve harekete nasıl dönüştüğünü inceliyoruz.",
            outcomes: [
              "Elektrik enerjisinin diğer enerji türlerine dönüşümüne örnekler verir.",
              "Enerji tasarrufunun önemini açıklar.",
            ],
            glossary: [
              { term: "Enerji dönüşümü", definition: "Bir enerji türünün başka bir enerji türüne dönüşmesi." },
            ],
            experiment: {
              title: "Basit Devre ile Enerji Dönüşümü",
              materials: "Pil, ampul, bağlantı kabloları",
              steps:
                "1) Pil, ampul ve kabloları kullanarak basit bir devre kurun.\n2) Ampulün yanmasını gözlemleyin.\n3) Elektrik enerjisinin ışık enerjisine dönüştüğünü tartışın.",
              safetyNotes: "Yalnızca düşük voltajlı piller kullanın, kabloları ıslak elle tutmayın.",
            },
          },
        ],
      },
    ],
    8: [
      {
        code: "8.1",
        title: "Mevsimler ve İklim",
        slug: "mevsimler-ve-iklim",
        description: "Mevsimlerin oluşumu, iklim ve hava olayları arasındaki farklar.",
        topics: [
          {
            title: "Mevsimlerin Oluşumu",
            slug: "mevsimlerin-olusumu",
            summary: "Dünya'nın eksen eğikliğinin mevsimlerin oluşumundaki rolünü inceliyoruz.",
            outcomes: [
              "Mevsimlerin oluşumunu Dünya'nın hareketleriyle ilişkilendirir.",
              "Kuzey ve güney yarım kürede mevsimlerin neden farklı yaşandığını açıklar.",
            ],
            glossary: [
              { term: "Eksen eğikliği", definition: "Dünya'nın dönme ekseninin yörünge düzlemine göre eğik olması." },
              { term: "Gündönümü", definition: "Gece ve gündüz süresinin en uzun/en kısa olduğu gün." },
            ],
            experiment: {
              title: "Eksen Eğikliği Modeli",
              materials: "Küçük top (Dünya modeli), şiş/çubuk, fener",
              steps:
                "1) Çubuğu topun içinden eğik açıyla geçirin.\n2) Feneri Güneş gibi sabit tutup topu döndürün.\n3) Işığın farklı bölgelere geliş açısını gözlemleyin.",
              safetyNotes: "Çubuğu batırırken dikkatli olun.",
            },
          },
          {
            title: "İklim ve Hava Olayları",
            slug: "iklim-ve-hava-olaylari",
            summary: "İklim ile hava durumu arasındaki farkı ve iklim türlerini inceliyoruz.",
            outcomes: [
              "İklim ve hava olayı kavramlarını ayırt eder.",
              "İklim değişikliğinin olası sonuçlarını açıklar.",
            ],
            glossary: [
              { term: "İklim", definition: "Bir bölgede uzun yıllar boyunca gözlenen ortalama hava koşulları." },
              { term: "Hava olayı", definition: "Kısa süreli, günlük atmosfer koşulları." },
            ],
            experiment: {
              title: "Basit Hava İstasyonu Kurulumu",
              materials: "Termometre, şeffaf kap (yağmur ölçer için), pusula",
              steps:
                "1) Okul bahçesine basit ölçüm araçlarını yerleştirin.\n2) Bir hafta boyunca günlük sıcaklık ve yağış verilerini kaydedin.\n3) Verileri grafiğe dökerek yorumlayın.",
              safetyNotes: "Ölçüm araçlarını güvenli, sabit bir yere yerleştirin.",
            },
          },
        ],
      },
      {
        code: "8.2",
        title: "DNA ve Genetik Kod",
        slug: "dna-ve-genetik-kod",
        description: "DNA'nın yapısı, kalıtım ve genetik mühendisliğine giriş.",
        topics: [
          {
            title: "DNA'nın Yapısı",
            slug: "dnanin-yapisi",
            summary: "DNA'nın hücredeki yerini ve çift sarmal yapısını inceliyoruz.",
            outcomes: [
              "DNA'nın hücre içindeki yerini belirtir.",
              "DNA'nın genel yapısını (çift sarmal) model üzerinde açıklar.",
            ],
            glossary: [
              { term: "DNA", definition: "Canlıların kalıtsal bilgisini taşıyan çift sarmal molekül." },
              { term: "Kromozom", definition: "DNA'nın sıkıca paketlenmiş hâli, hücre çekirdeğinde bulunur." },
            ],
            experiment: {
              title: "Meyveden DNA Eldesi",
              materials: "Muz, deterjan, tuz, alkol, süzgeç, şeffaf bardak",
              steps:
                "1) Muzu ezip deterjan-tuz karışımıyla karıştırın.\n2) Süzün.\n3) Süzüntünün üzerine soğuk alkol ekleyerek DNA ipliklerinin çökmesini gözlemleyin.",
              safetyNotes: "Alkolü bir yetişkin gözetiminde kullanın, ateşten uzak tutun.",
            },
          },
          {
            title: "Kalıtım ve Genetik Mühendisliği",
            slug: "kalitim-ve-genetik-muhendisligi",
            summary: "Kalıtsal özelliklerin nesilden nesile aktarılmasını ve genetik mühendisliği uygulamalarını inceliyoruz.",
            outcomes: [
              "Kalıtsal özelliklere örnekler verir.",
              "Genetik mühendisliğinin tarım ve tıptaki uygulamalarına örnekler verir.",
            ],
            glossary: [
              { term: "Kalıtım", definition: "Özelliklerin ebeveynlerden yavrulara aktarılması." },
              { term: "Gen", definition: "Kalıtsal bir özelliği belirleyen DNA parçası." },
            ],
            experiment: {
              title: "Aile Ağacında Özellik Takibi",
              materials: "Kağıt, kalem",
              steps:
                "1) Aile bireylerinizin göz/saç rengi gibi özelliklerini listeleyin.\n2) Bir aile ağacı çizerek özelliklerin dağılımını inceleyin.\n3) Ortak özellikleri tartışın.",
              safetyNotes: "Kişisel aile bilgilerini sınıfta paylaşırken mahremiyete saygılı olun.",
            },
          },
        ],
      },
    ],
  };

  for (const grade of [5, 6, 7, 8] as const) {
    const classItem = classes.find((c) => c.level === grade);
    if (!classItem) continue;

    const unitSeeds = CURRICULUM[grade];

    for (let unitIndex = 0; unitIndex < unitSeeds.length; unitIndex++) {
      const unitSeed = unitSeeds[unitIndex];

      const unit = await prisma.unit.upsert({
        where: { classId_slug: { classId: classItem.id, slug: unitSeed.slug } },
        update: {},
        create: {
          classId: classItem.id,
          code: unitSeed.code,
          title: unitSeed.title,
          slug: unitSeed.slug,
          description: unitSeed.description,
          order: unitIndex,
        },
      });

      for (let topicIndex = 0; topicIndex < unitSeed.topics.length; topicIndex++) {
        const topicSeed = unitSeed.topics[topicIndex];

        const topic = await prisma.topic.upsert({
          where: { unitId_slug: { unitId: unit.id, slug: topicSeed.slug } },
          update: {},
          create: {
            unitId: unit.id,
            title: topicSeed.title,
            slug: topicSeed.slug,
            summary: topicSeed.summary,
            order: topicIndex,
            isPublished: true,
            authorId: teacherId,
          },
        });

        // Kazanımlar
        for (let i = 0; i < topicSeed.outcomes.length; i++) {
          const existing = await prisma.learningOutcome.findFirst({
            where: { topicId: topic.id, description: topicSeed.outcomes[i] },
          });
          if (!existing) {
            await prisma.learningOutcome.create({
              data: {
                topicId: topic.id,
                code: `${unitSeed.code}.${i + 1}`,
                description: topicSeed.outcomes[i],
                order: i,
              },
            });
          }
        }

        // İçerik blokları (zengin metin editöründen gelmiş gibi basit HTML)
        const existingContent = await prisma.topicContent.findFirst({ where: { topicId: topic.id } });
        if (!existingContent) {
          await prisma.topicContent.create({
            data: {
              topicId: topic.id,
              type: "EXPLANATION",
              title: "Konu Anlatımı",
              bodyHtml: `<p>${topicSeed.summary}</p><p>Bu konuda ${topicSeed.title.toLowerCase()} ile ilgili temel kavramları, örnekleri ve günlük hayattaki yansımalarını birlikte keşfedeceğiz.</p>`,
              order: 0,
            },
          });
          await prisma.topicContent.create({
            data: {
              topicId: topic.id,
              type: "IMPORTANT_INFO",
              title: "Önemli Bilgiler",
              bodyHtml: `<ul><li>${topicSeed.outcomes.join("</li><li>")}</li></ul>`,
              order: 1,
            },
          });
          await prisma.topicContent.create({
            data: {
              topicId: topic.id,
              type: "DAILY_LIFE",
              title: "Günlük Yaşamdan Örnekler",
              bodyHtml: `<p>${topicSeed.title}, günlük hayatımızda karşılaştığımız birçok olayla yakından ilişkilidir. Çevrenizde bu konuyla ilgili örnekler bulmaya çalışın.</p>`,
              order: 2,
            },
          });
        }

        // Kavramlar (sözlük)
        for (let i = 0; i < topicSeed.glossary.length; i++) {
          const term = topicSeed.glossary[i];
          const existing = await prisma.glossaryTerm.findFirst({
            where: { topicId: topic.id, term: term.term },
          });
          if (!existing) {
            await prisma.glossaryTerm.create({
              data: { topicId: topic.id, term: term.term, definition: term.definition, order: i },
            });
          }
        }

        // Deney
        const existingExperiment = await prisma.experiment.findFirst({
          where: { topicId: topic.id, title: topicSeed.experiment.title },
        });
        if (!existingExperiment) {
          await prisma.experiment.create({
            data: {
              topicId: topic.id,
              title: topicSeed.experiment.title,
              materials: topicSeed.experiment.materials,
              steps: topicSeed.experiment.steps,
              safetyNotes: topicSeed.experiment.safetyNotes,
              order: 0,
            },
          });
        }

        // Örnek video (YouTube arama sonucu linki - gerçek bir video eklendiğinde güncellenmelidir)
        const existingVideo = await prisma.topicVideo.findFirst({ where: { topicId: topic.id } });
        if (!existingVideo) {
          await prisma.topicVideo.create({
            data: {
              topicId: topic.id,
              title: `${topicSeed.title} - Konu Anlatım Videosu`,
              source: "YOUTUBE",
              url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topicSeed.title + " fen bilimleri")}`,
              order: 0,
            },
          });
        }
      }
    }
  }

  console.log("✅ MEB müfredatı eklendi.");
}

/**
 * Soru bankasını (kategoriler, etiketler, çeşitli tipte sorular, şıklar,
 * çözümler) ve deneme sınavlarını (konu/ünite/genel/LGS) oluşturur.
 * Konu başına, o konunun kazanım ve kavramlarından türetilen 2 örnek soru
 * eklenir; bu sayede her sorunun müfredatla anlamlı bir bağlantısı olur.
 */
async function seedQuestionBank(teacherId: string, studentId: string | undefined) {
  console.log("🧠 Soru bankası ve denemeler ekleniyor...");

  // ---- Kategoriler ----
  const categoryData = [
    { name: "Genel Tarama", slug: "genel-tarama", description: "Konunun temel kavramlarını ölçen genel sorular." },
    { name: "LGS Tipi", slug: "lgs-tipi", description: "LGS formatına uygun, senaryo temelli sorular." },
    { name: "Yeni Nesil", slug: "yeni-nesil", description: "Beceri temelli, yorum gerektiren yeni nesil sorular." },
  ];
  const categories: Record<string, { id: string }> = {};
  for (const c of categoryData) {
    categories[c.slug] = await prisma.questionCategory.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  // ---- Etiketler ----
  const tagNames = ["gezegenler", "sindirim", "elektrik", "mevsimler", "dna", "deney", "günlük-yaşam", "kazanım-testi"];
  const tags: Record<string, { id: string }> = {};
  for (const name of tagNames) {
    const slug = name;
    tags[name] = await prisma.questionTag.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
  }

  // ---- Tüm konuları (kazanım ve kavramlarıyla) çek ----
  const topics = await prisma.topic.findMany({
    where: { isPublished: true },
    include: {
      unit: { include: { class: true } },
      learningOutcomes: true,
      glossaryTerms: true,
    },
    orderBy: { order: "asc" },
  });

  const createdQuestionsByTopic: Record<string, string[]> = {};

  for (const topic of topics) {
    const questionIds: string[] = [];
    const outcome = topic.learningOutcomes[0];
    const term = topic.glossaryTerms[0];

    // ---- Soru 1: Çoktan seçmeli (kazanıma dayalı) ----
    if (outcome) {
      const existing = await prisma.question.findFirst({
        where: { topicId: topic.id, body: { contains: topic.title } },
      });

      if (!existing) {
        const correctText = outcome.description;
        const distractors = [
          "Bu konu ile ilgisi olmayan rastgele bir bilgi ifadesi.",
          "Kısmen doğru olsa da eksik bir açıklama.",
          "Yaygın bir kavram yanılgısını yansıtan yanlış ifade.",
        ];

        const question = await prisma.question.create({
          data: {
            type: QuestionType.MULTIPLE_CHOICE,
            body: `"${topic.title}" konusuyla ilgili aşağıdakilerden hangisi doğrudur?`,
            correctAnswer: correctText,
            explanation: `Doğru cevap, "${topic.title}" konusunun temel kazanımıyla ilişkilidir.`,
            difficulty: Difficulty.MEDIUM,
            points: 10,
            estimatedTimeSec: 60,
            topicId: topic.id,
            learningOutcomeId: outcome.id,
            categoryId: categories["genel-tarama"].id,
            authorId: teacherId,
            tags: { connect: [{ id: tags["kazanım-testi"].id }] },
            choiceOptions: {
              create: shuffle([correctText, ...distractors]).map((text, i) => ({
                text,
                isCorrect: text === correctText,
                order: i,
              })),
            },
            solution: {
              create: {
                explanationHtml: `<p>${correctText}</p><p>Bu kazanım, <strong>${topic.title}</strong> konusunun ana hedeflerinden biridir.</p>`,
              },
            },
          },
        });
        questionIds.push(question.id);
      }
    }

    // ---- Soru 2: Doğru/Yanlış (kavrama dayalı) ----
    if (term) {
      const existing = await prisma.question.findFirst({
        where: { topicId: topic.id, body: { contains: term.term } },
      });

      if (!existing) {
        const question = await prisma.question.create({
          data: {
            type: QuestionType.TRUE_FALSE,
            body: `"${term.term}" kavramı şu şekilde tanımlanır: "${term.definition}" (Doğru / Yanlış)`,
            correctAnswer: "Doğru",
            explanation: `Bu, "${term.term}" kavramının ders kitabındaki tanımıdır.`,
            difficulty: Difficulty.EASY,
            points: 5,
            estimatedTimeSec: 30,
            topicId: topic.id,
            categoryId: categories["genel-tarama"].id,
            authorId: teacherId,
            choiceOptions: {
              create: [
                { text: "Doğru", isCorrect: true, order: 0 },
                { text: "Yanlış", isCorrect: false, order: 1 },
              ],
            },
            solution: {
              create: {
                explanationHtml: `<p>${term.term}: ${term.definition}</p>`,
              },
            },
          },
        });
        questionIds.push(question.id);
      }
    }

    createdQuestionsByTopic[topic.id] = questionIds.length > 0
      ? questionIds
      : (await prisma.question.findMany({ where: { topicId: topic.id }, select: { id: true } })).map((q) => q.id);
  }

  // ---- Denemeler ----
  const class6 = await prisma.class.findUnique({ where: { level: 6 } });
  const class7 = await prisma.class.findUnique({ where: { level: 7 } });
  const class8 = await prisma.class.findUnique({ where: { level: 8 } });

  // 1) Konu Denemesi (6. sınıf - Güneş Sistemi'ndeki Gezegenler)
  const gezegenTopic = topics.find((t) => t.slug === "gunes-sistemindeki-gezegenler");
  if (gezegenTopic && class6) {
    await createExamIfMissing({
      title: "Güneş Sistemi'ndeki Gezegenler - Konu Denemesi",
      description: "Bu konu denemesi yalnızca Güneş Sistemi'ndeki Gezegenler konusunu kapsar.",
      type: ExamType.TOPIC,
      classLevel: 6,
      durationMin: 15,
      topicId: gezegenTopic.id,
      questionIds: createdQuestionsByTopic[gezegenTopic.id] ?? [],
    });
  }

  // 2) Ünite Denemesi (6. sınıf - Güneş Sistemi ve Tutulmalar)
  const gunesUnit = await prisma.unit.findFirst({ where: { slug: "gunes-sistemi-ve-tutulmalar" } });
  if (gunesUnit && class6) {
    const unitTopics = topics.filter((t) => t.unitId === gunesUnit.id);
    const unitQuestionIds = unitTopics.flatMap((t) => createdQuestionsByTopic[t.id] ?? []);
    await createExamIfMissing({
      title: "Güneş Sistemi ve Tutulmalar - Ünite Denemesi",
      description: "Bu deneme, ünitedeki tüm konuları kapsar.",
      type: ExamType.UNIT,
      classLevel: 6,
      durationMin: 25,
      unitId: gunesUnit.id,
      questionIds: unitQuestionIds,
    });
  }

  // 3) Genel Deneme (7. sınıf - birden fazla üniteden karma sorular)
  if (class7) {
    const grade7Topics = topics.filter((t) => t.unit.class.level === 7);
    const generalQuestionIds = grade7Topics.flatMap((t) => createdQuestionsByTopic[t.id] ?? []);
    await createExamIfMissing({
      title: "7. Sınıf Genel Deneme - 1",
      description: "Birden fazla üniteyi kapsayan karma genel deneme sınavı.",
      type: ExamType.GENERAL,
      classLevel: 7,
      durationMin: 30,
      questionIds: generalQuestionIds,
    });
  }

  // 4) LGS Tarzı Deneme (8. sınıf)
  if (class8) {
    const grade8Topics = topics.filter((t) => t.unit.class.level === 8);
    const lgsQuestionIds = grade8Topics.flatMap((t) => createdQuestionsByTopic[t.id] ?? []);
    await createExamIfMissing({
      title: "8. Sınıf LGS Tarzı Fen Bilimleri Denemesi - 1",
      description: "LGS formatına uygun, süreli genel tarama denemesi.",
      type: ExamType.LGS,
      classLevel: 8,
      durationMin: 40,
      questionIds: lgsQuestionIds,
    });
  }

  // ---- Örnek öğrenci etkileşimi: favori + yanlış soru + tamamlanmış deneme sonucu ----
  if (studentId && gezegenTopic) {
    const firstQuestionId = createdQuestionsByTopic[gezegenTopic.id]?.[0];
    if (firstQuestionId) {
      await prisma.favoriteQuestion.upsert({
        where: { userId_questionId: { userId: studentId, questionId: firstQuestionId } },
        update: {},
        create: { userId: studentId, questionId: firstQuestionId },
      });
    }

    const secondQuestionId = createdQuestionsByTopic[gezegenTopic.id]?.[1];
    if (secondQuestionId) {
      await prisma.wrongQuestion.upsert({
        where: { userId_questionId: { userId: studentId, questionId: secondQuestionId } },
        update: {},
        create: { userId: studentId, questionId: secondQuestionId, wrongCount: 1 },
      });
    }

    const topicExam = await prisma.exam.findFirst({ where: { topicId: gezegenTopic.id } });
    if (topicExam) {
      const existingResult = await prisma.studentExamResult.findFirst({
        where: { userId: studentId, examId: topicExam.id },
      });
      if (!existingResult) {
        await prisma.studentExamResult.create({
          data: {
            userId: studentId,
            examId: topicExam.id,
            finishedAt: new Date(),
            correctCount: 1,
            wrongCount: 1,
            blankCount: 0,
            totalScore: 10,
            successPercent: 50,
          },
        });
      }
    }
  }

  console.log("✅ Soru bankası ve denemeler eklendi.");
}

/** İki tarih arası fark olmadan basit bir Fisher-Yates karıştırma. */
function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface ExamSeedInput {
  title: string;
  description: string;
  type: ExamType;
  classLevel: number;
  durationMin: number;
  topicId?: string;
  unitId?: string;
  questionIds: string[];
}

async function createExamIfMissing(input: ExamSeedInput) {
  if (input.questionIds.length === 0) return;

  const existing = await prisma.exam.findFirst({ where: { title: input.title } });
  if (existing) return;

  await prisma.exam.create({
    data: {
      title: input.title,
      description: input.description,
      type: input.type,
      classLevel: input.classLevel,
      durationMin: input.durationMin,
      isPublished: true,
      topicId: input.topicId,
      unitId: input.unitId,
      examQuestions: {
        create: input.questionIds.map((questionId, index) => ({ questionId, order: index })),
      },
    },
  });
}

/**
 * Rozet kataloğunu (8 rozet), 10 eğitsel oyunu, 5 etkileşimli simülasyonu ve
 * bu simülasyonlarla ilişkili/ilişkisiz toplam 14 sanal laboratuvar deneyini
 * oluşturur. Ayrıca örnek öğrenciye birkaç oyun skoru ve tamamlanmış deney
 * kaydı ekleyerek istatistiklerin/panelin dolu görünmesini sağlar.
 */
async function seedGamesAndLabs(studentId: string | undefined) {
  console.log("🎮 Oyunlar, simülasyonlar ve sanal laboratuvar ekleniyor...");

  // ---- Rozet Kataloğu ----
  const badgeData = [
    { title: "İlk Adım", description: "İlk sorunu çözdün!", icon: "🏅" },
    { title: "Fen Ustası", description: "5 konuyu tamamladın veya bir oyunda 90+ puan aldın.", icon: "🔬" },
    { title: "Bilim Kâşifi", description: "15 konu tamamladın veya 10 oyun oynadın.", icon: "🧭" },
    { title: "Deney Uzmanı", description: "5 farklı sanal deneyi tamamladın.", icon: "🧪" },
    { title: "Soru Şampiyonu", description: "100 soru çözdün.", icon: "🏆" },
    { title: "LGS Hazır", description: "3 LGS tarzı denemede %70+ başarı gösterdin.", icon: "🎓" },
    { title: "100 Günlük Seri", description: "100 gün boyunca kesintisiz aktif oldun.", icon: "🔥" },
    { title: "Haftanın Birincisi", description: "Haftalık etkinlikte sınıfının birincisi oldun.", icon: "👑" },
  ];
  for (const b of badgeData) {
    const existing = await prisma.badge.findFirst({ where: { title: b.title } });
    if (!existing) await prisma.badge.create({ data: b });
  }

  // ---- Örnek konu ve ünite referansları (oyun/simülasyon bağlamak için) ----
  const gunesTopic = await prisma.topic.findFirst({ where: { slug: "gunes-sistemindeki-gezegenler" } });
  const sindirimTopic = await prisma.topic.findFirst({ where: { slug: "sindirim-sistemi" } });
  const dnaTopic = await prisma.topic.findFirst({ where: { slug: "dnanin-yapisi" } });
  const elektrikTopic = await prisma.topic.findFirst({ where: { slug: "elektriklenme" } });

  // ---- 10 Eğitsel Oyun ----
  const gameData: {
    title: string;
    slug: string;
    type: GameType;
    description: string;
    classLevel?: number;
    topicId?: string;
  }[] = [
    { title: "Fen Bilgisi Yarışması", slug: "fen-bilgisi-yarismasi", type: GameType.QUIZ, description: "Soru bankasından art arda sorularla puan topla.", classLevel: 6 },
    { title: "Kavram Eşleştirme", slug: "kavram-eslestirme", type: GameType.MATCHING, description: "Kavramları doğru tanımlarıyla eşleştir.", topicId: sindirimTopic?.id },
    { title: "Hafıza Kartları", slug: "hafiza-kartlari", type: GameType.MEMORY, description: "Kart çiftlerini bularak hafızanı test et.", topicId: gunesTopic?.id },
    { title: "Kelime Avı", slug: "kelime-avi", type: GameType.WORD_SEARCH, description: "Harf tablosunda fen bilimleri kavramlarını bul.", topicId: dnaTopic?.id },
    { title: "Adam Asmaca", slug: "adam-asmaca", type: GameType.HANGMAN, description: "Harf tahmin ederek gizli kavramı bul.", topicId: elektrikTopic?.id },
    { title: "Sürükle-Bırak Etkinlikleri", slug: "surukle-birak-etkinlikleri", type: GameType.DRAG_DROP, description: "Kavramları doğru kutucuklara sürükle.", topicId: sindirimTopic?.id },
    { title: "Doğru-Yanlış Maratonu", slug: "dogru-yanlis-maratonu", type: GameType.TRUE_FALSE_MARATHON, description: "Art arda doğru/yanlış sorularıyla seri yap.", classLevel: 7 },
    { title: "Çarkıfelek", slug: "carkifelek", type: GameType.WHEEL_OF_FORTUNE, description: "Çarkı çevir, çıkan soruyu cevapla.", classLevel: 8 },
    { title: "Bilim Macerası", slug: "bilim-macerasi", type: GameType.SCIENCE_ADVENTURE, description: "Adım adım ilerleyen bilim macerasında bölümleri tamamla.", classLevel: 5 },
    { title: "Rozet Avı", slug: "rozet-avi", type: GameType.BADGE_HUNT, description: "Kazanılacak rozetleri keşfet ve nasıl kazanılacağını öğren.", classLevel: 5 },
  ];

  const games: Record<string, { id: string }> = {};
  for (const g of gameData) {
    const game = await prisma.game.upsert({
      where: { slug: g.slug },
      update: {},
      create: {
        title: g.title,
        slug: g.slug,
        type: g.type,
        description: g.description,
        classLevel: g.classLevel,
        topicId: g.topicId,
        isPublished: true,
        hasSound: true,
      },
    });
    games[g.slug] = game;

    const existingLevel = await prisma.gameLevel.findFirst({ where: { gameId: game.id } });
    if (!existingLevel) {
      await prisma.gameLevel.createMany({
        data: [
          { gameId: game.id, levelNumber: 1, title: "Başlangıç", difficulty: Difficulty.EASY, timeLimitSec: 120, order: 0 },
          { gameId: game.id, levelNumber: 2, title: "Orta Seviye", difficulty: Difficulty.MEDIUM, timeLimitSec: 90, minScoreToUnlock: 50, order: 1 },
          { gameId: game.id, levelNumber: 3, title: "Uzman", difficulty: Difficulty.HARD, timeLimitSec: 60, minScoreToUnlock: 80, order: 2 },
        ],
      });
    }
  }

  // ---- 5 Etkileşimli Simülasyon (gerçek interaktif bileşenlerle eşleşir) ----
  const simulationData = [
    { slug: "elektrik-devresi", title: "Basit Elektrik Devresi Kurma", componentKey: "circuit-builder", classLevel: 6 },
    { slug: "asit-baz", title: "Asit ve Bazların Özellikleri", componentKey: "acid-base-lab", classLevel: 7 },
    { slug: "hal-degisimi", title: "Maddenin Hâl Değişimleri", componentKey: "state-of-matter", classLevel: 5 },
    { slug: "yogunluk-deneyi", title: "Yoğunluk Deneyi", componentKey: "density-tank", classLevel: 6 },
    { slug: "gunes-sistemi-simulasyonu", title: "Güneş Sistemi Simülasyonu", componentKey: "solar-system", classLevel: 6 },
  ];

  const simulations: Record<string, { id: string }> = {};
  for (const s of simulationData) {
    const sim = await prisma.simulation.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        title: s.title,
        componentKey: s.componentKey,
        classLevel: s.classLevel,
        description: `${s.title} ile ilgili etkileşimli sanal laboratuvar simülasyonu.`,
        isPublished: true,
        order: 0,
      },
    });
    simulations[s.slug] = sim;
  }

  // ---- 14 Sanal Laboratuvar Deneyi ----
  type LabSeed = {
    slug: string;
    title: string;
    purpose: string;
    materials: string;
    steps: string;
    resultExplanation: string;
    safetyWarnings: string;
    classLevel: number;
    simulationSlug?: string;
  };

  const labData: LabSeed[] = [
    {
      slug: "basit-elektrik-devresi",
      title: "Basit Elektrik Devresi Kurma",
      purpose: "Pil, ampul ve anahtar kullanarak kapalı bir devre oluşturup elektrik akımının nasıl sağlandığını gözlemlemek.",
      materials: "Pil\nAmpul\nBağlantı kabloları\nAnahtar (switch)",
      steps: "1) Pili devreye ekleyin.\n2) Ampulü bağlayın.\n3) Anahtarı kapatarak devreyi tamamlayın.\n4) Ampulün yanıp yanmadığını gözlemleyin.",
      resultExplanation: "Devre kapalı olduğunda elektrik akımı akar ve ampul yanar; devre açık olduğunda akım kesilir.",
      safetyWarnings: "Gerçek deneyde yalnızca düşük voltajlı piller kullanın, kabloları ıslak elle tutmayın.",
      classLevel: 6,
      simulationSlug: "elektrik-devresi",
    },
    {
      slug: "asit-baz-ozellikleri",
      title: "Asit ve Bazların Özellikleri",
      purpose: "Farklı maddelerin asit mi baz mı olduğunu turnusol kâğıdı ile belirlemek.",
      materials: "Turnusol kâğıdı\nLimon suyu\nSabunlu su\nSaf su",
      steps: "1) Her sıvıdan bir örnek alın.\n2) Turnusol kâğıdını örneğe batırın.\n3) Renk değişimini gözlemleyin (kırmızı=asit, mavi=baz).",
      resultExplanation: "Asidik maddeler turnusolü kırmızıya, bazik maddeler maviye çevirir; nötr maddeler rengi değiştirmez.",
      safetyWarnings: "Kimyasalları cilde ve göze temas ettirmeyin, deney sonrası ellerinizi yıkayın.",
      classLevel: 7,
      simulationSlug: "asit-baz",
    },
    {
      slug: "maddenin-hal-degisimleri",
      title: "Maddenin Hâl Değişimleri",
      purpose: "Sıcaklık değiştikçe maddenin katı-sıvı-gaz hâlleri arasında nasıl geçiş yaptığını gözlemlemek.",
      materials: "Buz küpü\nIsıtıcı/ocak\nTermometre\nBeher",
      steps: "1) Buzu behere koyun.\n2) Yavaşça ısıtın ve sıcaklığı ölçün.\n3) Erime ve kaynama noktalarını not edin.",
      resultExplanation: "Buz ısındıkça 0°C'de erir (sıvı), su ısındıkça 100°C'de kaynar (gaz).",
      safetyWarnings: "Sıcak yüzeylere ve buhara doğrudan temas etmeyin.",
      classLevel: 5,
      simulationSlug: "hal-degisimi",
    },
    {
      slug: "isi-alisverisi",
      title: "Isı Alışverişi",
      purpose: "Sıcak ve soğuk maddeler bir araya geldiğinde ısının nasıl aktarıldığını gözlemlemek.",
      materials: "Sıcak su\nSoğuk su\nİki termometre\nKarışım kabı",
      steps: "1) Sıcak ve soğuk suyun sıcaklığını ayrı ayrı ölçün.\n2) İki suyu karıştırın.\n3) Karışımın son sıcaklığını ölçün.",
      resultExplanation: "Isı, sıcak sudan soğuk suya aktarılır; sonunda ikisi ortak bir sıcaklıkta dengeye ulaşır.",
      safetyWarnings: "Sıcak suyla çalışırken dikkatli olun, cilde temas ettirmeyin.",
      classLevel: 6,
    },
    {
      slug: "yogunluk-deneyi-lab",
      title: "Yoğunluk Deneyi",
      purpose: "Farklı maddelerin yoğunluklarını karşılaştırarak neden bazılarının battığını bazılarının yüzdüğünü keşfetmek.",
      materials: "Su\nYağ\nBal\nKüçük nesneler (mantar, taş, plastik)",
      steps: "1) Sıvıları yoğunluk sırasına göre bir kaba dökün.\n2) Nesneleri sıvıya bırakın.\n3) Hangi katmanda durduklarını gözlemleyin.",
      resultExplanation: "Yoğunluğu daha az olan maddeler üstte kalır/yüzer; yoğunluğu fazla olanlar batar.",
      safetyWarnings: "Sıvıları dökerken etrafa sıçratmamaya dikkat edin.",
      classLevel: 6,
      simulationSlug: "yogunluk-deneyi",
    },
    {
      slug: "basinc-deneyi",
      title: "Basınç Deneyi",
      purpose: "Yüzey alanının basınç üzerindeki etkisini gözlemlemek.",
      materials: "Farklı uçlu iki nesne (kalem ucu, düz tahta)\nYumuşak zemin (sünger/kum)",
      steps: "1) Sivri ucu zemine bastırın, izini gözlemleyin.\n2) Düz yüzeyi aynı kuvvetle bastırın.\n3) İzleri karşılaştırın.",
      resultExplanation: "Aynı kuvvet daha küçük bir yüzey alanına uygulandığında basınç artar; iz daha derin olur.",
      safetyWarnings: "Sivri uçlu nesneleri dikkatli kullanın, kendinize veya başkalarına yöneltmeyin.",
      classLevel: 7,
    },
    {
      slug: "kuvvet-ve-hareket",
      title: "Kuvvet ve Hareket",
      purpose: "Uygulanan kuvvetin bir cismin hareketi (hız ve yön) üzerindeki etkisini incelemek.",
      materials: "Tekerlekli araba modeli\nLastik bant/yay\nÖlçüm şeridi",
      steps: "1) Arabayı sabit bir noktadan bırakın.\n2) Farklı kuvvetlerle itin.\n3) Kat ettiği mesafeyi ölçün.",
      resultExplanation: "Uygulanan kuvvet arttıkça cismin hızı ve kat ettiği mesafe de artar.",
      safetyWarnings: "Fırlatılan nesnelerin kimseye çarpmamasına dikkat edin.",
      classLevel: 7,
    },
    {
      slug: "isigin-kirilmasi",
      title: "Işığın Kırılması",
      purpose: "Işığın bir ortamdan diğerine geçerken yön değiştirmesini (kırılma) gözlemlemek.",
      materials: "Şeffaf bardak\nSu\nKalem veya pipet",
      steps: "1) Bardağı suyla doldurun.\n2) Kalemi suya eğik olarak batırın.\n3) Kalemin su içindeki görüntüsünü gözlemleyin.",
      resultExplanation: "Işık, havadan suya geçerken yön değiştirir; bu yüzden kalem kırılmış gibi görünür.",
      safetyWarnings: "Cam bardak kullanılıyorsa kırılma riskine karşı dikkatli olun.",
      classLevel: 8,
    },
    {
      slug: "aynalar",
      title: "Aynalar",
      purpose: "Düz, tümsek ve çukur aynalarda görüntü oluşumunu karşılaştırmak.",
      materials: "Düz ayna\nKaşık (iç ve dış yüzeyi)",
      steps: "1) Düz aynada yüzünüzü gözlemleyin.\n2) Kaşığın iç (çukur) yüzeyine bakın.\n3) Kaşığın dış (tümsek) yüzeyine bakın.",
      resultExplanation: "Düz ayna gerçek boyutta görüntü oluşturur; çukur yüzey büyütülmüş, tümsek yüzey küçültülmüş görüntü oluşturur.",
      safetyWarnings: "Cam aynalarla dikkatli çalışın, kırılma riskine karşı uyarılın.",
      classLevel: 8,
    },
    {
      slug: "dna-modeli",
      title: "DNA Modeli",
      purpose: "DNA'nın çift sarmal yapısını üç boyutlu bir modelle anlamak.",
      materials: "Renkli boncuklar/pipetler\nTel veya ip\nMakas",
      steps: "1) İki uzun ipi sarmal şeklinde bükün.\n2) Boncukları baz çiftlerini temsil edecek şekilde dizin.\n3) Modeli birleştirin.",
      resultExplanation: "Model, DNA'nın iki zincirinin birbirine sarılarak çift sarmal oluşturduğunu gösterir.",
      safetyWarnings: "Makas kullanırken dikkatli olun.",
      classLevel: 8,
    },
    {
      slug: "hucre-modeli",
      title: "Hücre Modeli",
      purpose: "Hücrenin temel organellerini ve görevlerini üç boyutlu bir modelle öğrenmek.",
      materials: "Jelatin veya kil\nFarklı meyveler/şekerlemeler (organeller için)\nKarton tabak",
      steps: "1) Hücre zarını temsil eden bir sınır oluşturun.\n2) Organelleri yerleştirin.\n3) Her organelin adını etiketleyin.",
      resultExplanation: "Model, çekirdek, mitokondri gibi organellerin hücre içindeki konumunu ve göreceli boyutunu gösterir.",
      safetyWarnings: "Yiyecek malzemesi kullanılıyorsa hijyene dikkat edin.",
      classLevel: 6,
    },
    {
      slug: "fotosentez",
      title: "Fotosentez",
      purpose: "Bitkilerin ışık enerjisini kullanarak oksijen ürettiğini gözlemlemek.",
      materials: "Su bitkisi (Elodea)\nŞeffaf kap\nSu\nIşık kaynağı",
      steps: "1) Bitkiyi suyla dolu şeffaf kaba yerleştirin.\n2) Işık kaynağının altına koyun.\n3) Yapraklardan çıkan hava kabarcıklarını gözlemleyin.",
      resultExplanation: "Işık altındaki bitki fotosentez yaparak oksijen kabarcıkları üretir; karanlıkta bu azalır.",
      safetyWarnings: "Elektrikli ışık kaynaklarını suyla temas ettirmeyin.",
      classLevel: 7,
    },
    {
      slug: "solunum",
      title: "Solunum",
      purpose: "Solunum sırasında karbondioksit üretildiğini kireç suyu deneyiyle göstermek.",
      materials: "Kireç suyu\nPipet\nŞeffaf bardak",
      steps: "1) Bardağa kireç suyu koyun.\n2) Pipetle nefesinizi suya üfleyin.\n3) Suyun bulanıklaşmasını gözlemleyin.",
      resultExplanation: "Nefesteki karbondioksit kireç suyuyla tepkimeye girip suyu bulanıklaştırır; bu solunumun kanıtıdır.",
      safetyWarnings: "Kireç suyunu içmeyin, yalnızca üfleme amacıyla kullanın.",
      classLevel: 6,
    },
    {
      slug: "gunes-sistemi-lab",
      title: "Güneş Sistemi",
      purpose: "Gezegenlerin Güneş etrafındaki dizilimini ve göreceli uzaklıklarını keşfetmek.",
      materials: "Bilgisayar/tablet (simülasyon için)\nKarton, boncuk (fiziksel model alternatifi)",
      steps: "1) Simülasyonu açın.\n2) Gezegenleri sırasıyla inceleyin.\n3) Her gezegenin Güneş'e uzaklığını karşılaştırın.",
      resultExplanation: "Gezegenler Güneş'ten uzaklaştıkça yörünge süreleri uzar ve sıcaklıkları genelde düşer.",
      safetyWarnings: "Fiziksel model yapılıyorsa küçük parçalara (boncuk vb.) dikkat edin.",
      classLevel: 6,
      simulationSlug: "gunes-sistemi-simulasyonu",
    },
  ];

  for (const [index, lab] of labData.entries()) {
    await prisma.labExperiment.upsert({
      where: { slug: lab.slug },
      update: {},
      create: {
        slug: lab.slug,
        title: lab.title,
        purpose: lab.purpose,
        materials: lab.materials,
        steps: lab.steps,
        resultExplanation: lab.resultExplanation,
        safetyWarnings: lab.safetyWarnings,
        classLevel: lab.classLevel,
        simulationId: lab.simulationSlug ? simulations[lab.simulationSlug]?.id : undefined,
        isPublished: true,
        order: index,
      },
    });
  }

  // ---- Örnek öğrenci etkileşimi: oyun skoru + tamamlanmış deney ----
  if (studentId) {
    const quizGame = games["fen-bilgisi-yarismasi"];
    if (quizGame) {
      const existingScore = await prisma.gameScore.findFirst({ where: { userId: studentId, gameId: quizGame.id } });
      if (!existingScore) {
        await prisma.gameScore.create({
          data: { userId: studentId, gameId: quizGame.id, score: 80, correctCount: 8, wrongCount: 2, durationSec: 95 },
        });
        await prisma.user.update({ where: { id: studentId }, data: { points: { increment: 80 } } });
      }
    }

    const firstLab = await prisma.labExperiment.findUnique({ where: { slug: "maddenin-hal-degisimleri" } });
    if (firstLab) {
      const existingAttempt = await prisma.labExperimentAttempt.findFirst({
        where: { userId: studentId, labExperimentId: firstLab.id },
      });
      if (!existingAttempt) {
        await prisma.labExperimentAttempt.create({ data: { userId: studentId, labExperimentId: firstLab.id } });
      }
    }

    // "İlk Adım" rozetini örnek öğrenciye ver
    const ilkAdimBadge = await prisma.badge.findFirst({ where: { title: "İlk Adım" } });
    if (ilkAdimBadge) {
      await prisma.gameAchievement.upsert({
        where: { userId_badgeId: { userId: studentId, badgeId: ilkAdimBadge.id } },
        update: {},
        create: { userId: studentId, badgeId: ilkAdimBadge.id, source: "milestone" },
      });
    }
  }

  console.log("✅ Oyunlar, simülasyonlar ve sanal laboratuvar eklendi.");
}

/**
 * Yapay zekâ destekli kişiselleştirilmiş öğrenme sistemine ait örnek veriler:
 * bir ödev, bir öğretmen notu, birkaç bildirim ve bir çalışma süresi kaydı.
 * Günlük çalışma planı ve haftalık hedef, öğrenci ilk kez ilgili sayfaya
 * girdiğinde otomatik oluşturulduğu için burada seed edilmez.
 */
async function seedStage5(teacherId: string, studentId: string | undefined) {
  console.log("🤖 Aşama 5: kişiselleştirilmiş öğrenme verileri ekleniyor...");

  if (!studentId) {
    console.log("⚠️  Örnek öğrenci bulunamadığı için Aşama 5 örnek verileri atlandı.");
    return;
  }

  // ---- Örnek Ödev ----
  const gunesTopic = await prisma.topic.findFirst({ where: { slug: "gunes-sistemindeki-gezegenler" } });
  const existingAssignment = await prisma.assignment.findFirst({ where: { title: "Güneş Sistemi Araştırma Ödevi" } });
  let assignment = existingAssignment;
  if (!assignment) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    assignment = await prisma.assignment.create({
      data: {
        title: "Güneş Sistemi Araştırma Ödevi",
        description: "Güneş sistemindeki gezegenlerden birini seçip özelliklerini araştırın ve konu sayfasındaki soruları çözün.",
        classLevel: 6,
        dueDate,
        teacherId,
        topicId: gunesTopic?.id,
      },
    });
  }

  // ---- Örnek Öğretmen Notu ----
  const existingNote = await prisma.teacherNote.findFirst({ where: { studentId, teacherId } });
  if (!existingNote) {
    await prisma.teacherNote.create({
      data: {
        teacherId,
        studentId,
        note: "Zeynep, Güneş Sistemi konusunda çok başarılı ilerliyor. Sindirim sistemi konusunu tekrar etmesi faydalı olacaktır.",
      },
    });
  }

  // ---- Örnek Bildirimler ----
  const notificationCount = await prisma.notification.count({ where: { userId: studentId } });
  if (notificationCount === 0) {
    await prisma.notification.createMany({
      data: [
        {
          userId: studentId,
          type: "DAILY_REMINDER",
          title: "📅 Günlük çalışma zamanı!",
          message: "Bugünkü çalışma planını tamamlamayı unutma.",
          relatedUrl: "/ogrenci/takvim",
        },
        {
          userId: studentId,
          type: "WEEKLY_SUMMARY",
          title: "📊 Haftalık Özet",
          message: "Bu hafta 12 soru çözdün, başarı oranın %75! Harika gidiyorsun.",
          relatedUrl: "/ogrenci/analiz",
        },
      ],
    });
  }

  // ---- Örnek Çalışma Süresi Kaydı (son birkaç gün) ----
  const studyLogCount = await prisma.studyTimeLog.count({ where: { userId: studentId } });
  if (studyLogCount === 0) {
    const sources = ["question", "exam", "game", "experiment", "topic"];
    const logs = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setUTCHours(0, 0, 0, 0);
      logs.push({
        userId: studentId,
        date,
        minutes: 10 + Math.floor(Math.random() * 20),
        source: sources[i % sources.length],
      });
    }
    await prisma.studyTimeLog.createMany({ data: logs });
  }

  console.log("✅ Aşama 5 örnek verileri eklendi.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

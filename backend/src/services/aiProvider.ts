/**
 * AI Assistant sağlayıcısı. `ANTHROPIC_API_KEY` ortam değişkeni tanımlıysa
 * gerçek bir LLM (Claude) çağrısı yapılır; tanımlı değilse (ör. yerel
 * geliştirme veya API anahtarı olmayan bir dağıtım) aşağıdaki kural tabanlı
 * yedek moda düşülür. Böylece özellik, harici bir servise bağımlı olmadan
 * da eksiksiz çalışır durumda teslim edilir.
 *
 * Her iki modda da SİSTEM KURALI aynıdır: asistan soruların cevabını
 * doğrudan vermez; ipucu verir, adım adım düşünmeye yönlendirir ve
 * öğrenciyi ilgili konu/kaynağa yönlendirir.
 */

const SYSTEM_PROMPT = `Sen, Türkiye'de 5-8. sınıf öğrencileri için bir Fen Bilimleri eğitim platformunun
yapay zekâ destekli yardımcısısın. Görevin:
- Konuları anlaşılır, yaşına uygun bir dille açıklamak,
- Sorulara DOĞRUDAN CEVAP VERMEK YERİNE ipucu vermek ve öğrenciyi adım adım düşünmeye yönlendirmek,
- Çözümleri adım adım anlatmak (ama öğrenci önce kendi denemeden),
- Öğrenciyi platformdaki ilgili konu/deney/soru kaynağına yönlendirmek,
- Kısa, cesaretlendirici ve pozitif bir tonda, Türkçe yanıt vermek.
ASLA bir sorunun nihai/kesin cevabını doğrudan yazma; bunun yerine "Bir sonraki adımı sen dene, hatırlatayım: ..." gibi rehberlik et.`;

interface AssistantContext {
  studentClassLevel?: number | null;
  questionBody?: string;
  questionTopic?: string;
}

export async function getAssistantReply(userMessage: string, context: AssistantContext, history: { role: string; content: string }[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (apiKey) {
    try {
      return await callAnthropic(apiKey, userMessage, context, history);
    } catch (err) {
      console.error("AI Assistant (Anthropic) çağrısı başarısız, kural tabanlı yedek moda geçiliyor:", err);
      return getRuleBasedReply(userMessage, context);
    }
  }

  return getRuleBasedReply(userMessage, context);
}

async function callAnthropic(
  apiKey: string,
  userMessage: string,
  context: AssistantContext,
  history: { role: string; content: string }[]
): Promise<string> {
  const contextNote = context.questionBody
    ? `\n\n(Öğrenci şu soruyla ilgili yardım istiyor: "${context.questionBody}"${context.questionTopic ? ` — konu: ${context.questionTopic}` : ""}. Cevabı doğrudan verme, ipucu ver.)`
    : "";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: SYSTEM_PROMPT + (context.studentClassLevel ? `\nÖğrenci ${context.studentClassLevel}. sınıfta.` : ""),
      messages: [
        ...history.slice(-6).map((h) => ({ role: h.role === "assistant" ? "assistant" : "user", content: h.content })),
        { role: "user", content: userMessage + contextNote },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API hatası: ${response.status}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find((c: { type: string }) => c.type === "text");
  return textBlock?.text ?? "Şu anda yanıt veremiyorum, lütfen tekrar dene.";
}

/**
 * API anahtarı olmadan çalışan, sorunun/mesajın içeriğine göre şablonlanmış
 * ama gerçekten yardımcı ipuçları üreten basit bir kural motoru. Doğrudan
 * cevap vermez; Sokratik yönlendirme yapar.
 */
function getRuleBasedReply(userMessage: string, context: AssistantContext): string {
  const lower = userMessage.toLocaleLowerCase("tr");

  if (context.questionBody) {
    return (
      `Bu soruyu birlikte adım adım düşünelim 🤔\n\n` +
      `1) Önce soruda sana ne verildiğini ve ne istendiğini ayrı ayrı yaz.\n` +
      `2) "${context.questionTopic ?? "bu konu"}" ile ilgili öğrendiğin temel kuralı hatırlamaya çalış — konu sayfasındaki "Önemli Bilgiler" bölümüne göz atabilirsin.\n` +
      `3) Şıklardan/olası cevaplardan hangilerinin kesinlikle yanlış olduğunu ele; bu, doğru cevaba yaklaşmanı kolaylaştırır.\n\n` +
      `Cevabı bulduğunda kontrol etmek istersen "cevapla" butonunu kullanabilirsin — ben sana doğrudan cevabı vermeyeceğim, çünkü asıl önemli olan senin bulman! 💪`
    );
  }

  if (lower.includes("nasıl çalış") || lower.includes("nasıl ders çalış")) {
    return (
      `Verimli çalışmak için birkaç öneri:\n` +
      `• Günde 15-20 dakikalık kısa bloklar hâlinde çalış, uzun aralıksız çalışmaktan daha etkilidir.\n` +
      `• Önce konuyu oku, sonra mutlaka soru çöz — sadece okumak kalıcı öğrenmeyi sağlamaz.\n` +
      `• Yanlış yaptığın soruları "Yanlışlarım" bölümünden birkaç gün sonra tekrar çöz.\n` +
      `• Panelindeki "Günlük Çalışma Planı"nı takip edersen düzenli bir tekrar sistemi kurmuş olursun.`
    );
  }

  if (lower.includes("ipucu") || lower.includes("yardım")) {
    return `Sana yardımcı olmak isterim! Hangi konuda veya hangi soruda takıldığını biraz daha anlatır mısın? Konunun adını veya sorunun kısa bir özetini yazarsan daha net bir ipucu verebilirim.`;
  }

  return (
    `Merhaba! Ben fen bilimleri çalışma arkadaşınım 🔬 Sana bir konuyu açıklayabilir, bir soruda ipucu verebilir ya da ` +
    `çalışma önerileri sunabilirim. Ne hakkında konuşmak istersin?`
  );
}

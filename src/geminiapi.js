import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = process.env.REACT_APP_API_KEY;
const genAI = new GoogleGenerativeAI(api_key);

async function generateFilmRecommendations(film, rating, genre, year) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

    const prompt = `
Görev: Film Önerisi Uzmanı

Giriş Bilgileri:
- Film: ${film}
- Puan: ${rating}
- Tür: ${genre}
- Yıl: ${year}

Bu filme benzer 3 film önerisi yap. Her öneri için şu bilgileri içer:
1. Film Adı
2. Yayın Yılı
3. IMDb Puanı (10 üzerinden)
4. Tür
5. Yönetmen
6. Başrol Oyuncuları (en fazla 3)
7. Kısa Özet (1-2 cümle)
8. Benzerlik Nedeni (orijinal filmle karşılaştırarak)

Öneriler için format:
---
🎬 [Film Adı] (Yıl)
⭐ IMDb: [Puan]/10
🎭 Tür: [Türler]
🎬 Yönetmen: [Yönetmen Adı]
🌟 Oyuncular: [Oyuncu 1], [Oyuncu 2], [Oyuncu 3]

📝 Özet: [Kısa film özeti]

🔗 Benzerlik: [Bu filmin "${film}" ile benzerliğinin kısa açıklaması]
---

Önerileri verdikten sonra:
1. Bu üç öneriyi, "${film}" filmine olan benzerliklerine göre sırala.
2. En çok önerdiğin filmi belirt ve nedenini açıkla.
3. Kullanıcıya bu önerileri beğenip beğenmediğini sor ve farklı öneriler için nasıl geri bildirim verebileceğini belirt.

Not:
- Önerilerin çeşitli ve ilgi çekici olmasına dikkat et.
- Sadece gerçek ve var olan filmleri öner.
- Önerilerin doğruluğundan emin değilsen, bunu belirt.
- Film önerilerinde olumsuz bir yanıt verme, her zaman pozitif ve yardımcı ol.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Film önerileri alınırken bir hata oluştu:', error);
    throw error;
  }
}

export { generateFilmRecommendations };
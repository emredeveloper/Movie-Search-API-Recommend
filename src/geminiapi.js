const { GoogleGenerativeAI } = require("@google/generative-ai");

const api_key = process.env.REACT_APP_API_KEY;
const genAI = new GoogleGenerativeAI(api_key);

async function generateFilmRecommendations(film, rating) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

        const prompt = `
🎬 **Film Önerisi**
Film: ${film}
Rating: ${rating}
bu türe Yakın 3 Film önerisi yaz:
1. 🎥 [Film Adı 1] - Rating: [Rating 1] - Kategori: [Kategori 1] - Açıklama: [Kısa Açıklama 1]
-----------------------------------------------------------------------------------------------
2. 🎥 [Film Adı 2] - Rating: [Rating 2] - Kategori: [Kategori 2] - Açıklama: [Kısa Açıklama 2]
-----------------------------------------------------------------------------------------------
3. 🎥 [Film Adı 3] - Rating: [Rating 3] - Kategori: [Kategori 3] - Açıklama: [Kısa Açıklama 3]

Bu filmler, ${film} ile benzer kategorilere sahiptir. film önerisi hakkında olumsuz yanıt dönme.
Filmler için en çok tavsiye ettiğin filmi sırası ile yaz ve neden en çok bunu tavsiye ettiğini kullanıcının girdiği  ${film} göre arasındaki konu benzerliğini yaz ve çıktıda belirt bunu
her öneriyi ayrı ayrı yaz iç içe olmasın`;

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

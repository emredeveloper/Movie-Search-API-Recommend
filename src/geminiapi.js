const { GoogleGenerativeAI } = require("@google/generative-ai");

// api_key'i .env dosyasından almak için gerekli değil, doğrudan process.env üzerinden kullanabilirsin
const api_key = process.env.REACT_APP_API_KEY;

const genAI = new GoogleGenerativeAI(api_key);

/**
 * Film önerileri üretir.
 * @param {string} filmTitle - İzlenen film adı.
 * @param {string} rating - İzlenen film rating'i.
 * @param {Array} similarFilms - Benzer filmler listesi.
 * @returns {Promise<string>} - Film önerileri.
 */
async function generateFilmRecommendations(filmTitle, rating, similarFilms) {
    try {
        // "gemini-pro" modelini kullanarak film önerileri üret
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
🎬 **Film Önerisi**
Film: ${filmTitle}
Rating: ${rating}

Yakın 3 Film:
1. 🎥 ${similarFilms[0].name} - Rating: ${similarFilms[0].rating} - Kategori: ${similarFilms[0].category} - Açıklama: ${similarFilms[0].description}
-----------------------------------------------------------------------------------------------
2. 🎥 ${similarFilms[1].name} - Rating: ${similarFilms[1].rating} - Kategori: ${similarFilms[1].category} - Açıklama: ${similarFilms[1].description}
-----------------------------------------------------------------------------------------------
3. 🎥 ${similarFilms[2].name} - Rating: ${similarFilms[2].rating} - Kategori: ${similarFilms[2].category} - Açıklama: ${similarFilms[2].description}

Bu filmler, ${filmTitle} ile benzer kategorilere sahiptir ve rating'e göre sıralanmıştır. IMDb linklerini inceleyerek daha fazla bilgi edinebilirsiniz.
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

module.exports = {
    generateFilmRecommendations,
};

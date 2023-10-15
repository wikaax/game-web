import axios from 'axios';

const API_KEY = '43fd7f229c9943a9819afc2eea30863c';
const API_URL = 'https://api.rawg.io/api/games';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000', // Adres Twojego serwera pośredniczącego
  timeout: 10000,
});

export default apiClient;


export async function fetchGamesFromRawg() {
    try {
        const response = await apiClient.get('/rawg-api', {
            params: {
                key: '43fd7f229c9943a9819afc2eea30863c',
                // inne parametry zapytań, jeśli są wymagane
            },
        });
        const games = response.data.results;
        // przetwarzaj dane gier tutaj
        return games;
    } catch (error) {
        console.error('Błąd podczas pobierania danych z API RAWG', error);
        throw error;
    }
}

import axios from 'axios';

const client_id = '9f6gy9d28792qang0hxswp3gw6hexi';
const client_secret = '5y7yapttxqz93341sp70tkfbeijutr';
const tokenEndpoint = 'https://id.twitch.tv/oauth2/token';
const igdbEndpoint = 'https://api.igdb.com/v4/games';

export const fetchDataFromIGDB = async () => {
    try {
        // get token
        const tokenResponse = await axios.post(`${tokenEndpoint}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`);
        const accessToken = tokenResponse.data.access_token;
        console.log('Token:', accessToken);

        // get data from IGDB
        const igdbResponse = await axios.get(igdbEndpoint, {
            headers: {
                'Client-ID': client_id,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
            }
        });

        const igdbData = igdbResponse.data;
        console.log('Dane z IGDB:', igdbData);
        return igdbData;
    } catch (error) {
        console.error('Błąd podczas pobierania danych z IGDB API:', error);
        throw error;
    }
};
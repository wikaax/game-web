// server.js

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/api/igdb/games', async (req, res) => {
    try {
        const tokenResponse = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: '9f6gy9d28792qang0hxswp3gw6hexi',
                client_secret: '5y7yapttxqz93341sp70tkfbeijutr',
                grant_type: 'client_credentials',
            },
        });
        const accessToken = tokenResponse.data.access_token;

        const igdbResponse = await axios.post('https://api.igdb.com/v4/games', null, {
            headers: {
                'Client-ID': '9f6gy9d28792qang0hxswp3gw6hexi',
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
            },
            data: "fields name,genres.name,involved_companies.company.name;"
        });

        res.json(igdbResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

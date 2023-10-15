const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Konfiguracja serwera pośredniczącego dla API RAWG
const rawgApiProxy = createProxyMiddleware({
    target: 'https://api.rawg.io', // Adres URL API RAWG
    changeOrigin: true,
    pathRewrite: {
        '^/rawg-api': '', // Przekierowanie ścieżki /rawg-api do głównego API RAWG
    },
});

// Dodaj middleware serwera pośredniczącego do ścieżki /rawg-api
app.use('/rawg-api', rawgApiProxy);

// Uruchom serwer pośredniczący na porcie 5000
app.listen(4000, () => {
    console.log('Serwer pośredniczący nasłuchuje na porcie 4000');
});

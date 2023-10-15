// export const fetchData = async () => {
    

//     const getToken = async () => {
//         try {
//             const response = await fetch(`${tokenEndpoint}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`, {
//                 method: 'POST'
//             });

//             const data = await response.json();
//             const accessToken = data.access_token;
//             return accessToken;
//         } catch (error) {
//             console.error('Błąd podczas uzyskiwania tokena dostępu', error);
//             throw error;
//         }
//     };

//     const accessToken = await getToken();

//     try {
//         const response = await fetch('https://api.igdb.com/v4/games', {
//             method: 'POST',
//             headers: {
//                 'Client-ID': client_id,
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//             body: 'fields name,summary; limit 10;',
//         });

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Błąd podczas pobierania danych z IGDB API', error);
//         throw error;
//     }
// };

import { fetchGamesFromRawg } from '../actions/fetchGames';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const fetchData = async () => {
    // const client_id = '9f6gy9d28792qang0hxswp3gw6hexi';
    // const client_secret = 'qntumlg9ga4bggng006m7ye8bwuo3g';
    // const tokenEndpoint = 'https://id.twitch.tv/oauth2/token';

    // const getToken = async () => {
    //             try {
    //                 const response = await fetch(`${tokenEndpoint}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`, {
    //                     method: 'POST'
    //                 });
        
    //                 const data = await response.json();
    //                 const accessToken = data.access_token;
    //                 return accessToken;
    //             } catch (error) {
    //                 console.error('Błąd podczas uzyskiwania tokena dostępu', error);
    //                 throw error;
    //             }
    //         };

    // const accessToken = await getToken();

    // // Pobieranie danych z IGDB
    // const igdbResponse = await fetch('https://api.igdb.com/v4/games', {
    //     method: 'POST',
    //     headers: {
    //         'Client-ID': '9f6gy9d28792qang0hxswp3gw6hexi',
    //         'Authorization': `Bearer ${accessToken}`,
    //         'Content-Type': 'application/json',
    //     },
    //     body: 'fields name,summary; limit 10;',
    // });

    // const igdbData = await igdbResponse.json();

    // Pobieranie danych z RAWG
    const rawgData = await fetchGamesFromRawg();

    // Przetwarzanie danych z IGDB i RAWG
    // ...

    return {
        // igdbData,
        rawgData,
        // inne dane, które chcesz zwrócić
    };
};

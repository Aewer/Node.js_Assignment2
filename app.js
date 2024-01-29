const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const OPENWEATHERMAP_API_KEY = 'be087a09b46822e7a2d3e6d142f28810';
const NEWSAPI_KEY = '741a2f0b5176445b8baf2bea0bd734b1';

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const {location} = req.query;

    if (!location) {
        return res.status(400);
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod !== 200) {
            return res.status(data.cod).json({ error: data.message });
        }

        const weatherData = {
            location: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            longitude: data.coord.lon,
            latitude: data.coord.lat,
            feels_like_temperature: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            country_code: data.sys.country,
        };

        return res.json(weatherData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Failed to fetch data'});
    }
});

app.get('/news', async (req, res) => {
    const country = "us";

    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${encodeURIComponent(country)}&apiKey=${NEWSAPI_KEY}`;

    try {
        const response = await fetch(newsApiUrl);
        const data = await response.json();

        if (data.status !== 'ok') {
            return res.status(500).json({error: 'Failed to fetch data'});
        }

        const newsData = data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            imageUrl: article.urlToImage,
            publishedAt: article.publishedAt,
        }));

        return res.json(newsData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Failed to fetch data'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
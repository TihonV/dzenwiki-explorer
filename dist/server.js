const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Маршрут для поиска видео Яндекса (замените на нужный API)
app.get('/api/youtube-search', async (req, res) => {
  const { q } = req.query;
  const API_KEY = process.env.YOUTUBE_API_KEY; // Используем YouTube API как альтернативу
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(q)}&type=video&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка поиска видео' });
  }
});

// Маршрут для поиска Википедии
app.get('/api/wiki-search', async (req, res) => {
  const { q } = req.query;
  const url = `https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка поиска статьи' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

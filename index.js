import express from 'express';
import bodyParser from 'body-parser';
import appSrc from './app.js';

// Инициализируем приложение
const app = appSrc(express, bodyParser);

// Render передает порт в переменной окружения PORT
const PORT = process.env.PORT || 8080;

// Слушаем порт
app.listen(PORT, '0.0.0.0', () => {
    // Пусто, без console.log
});

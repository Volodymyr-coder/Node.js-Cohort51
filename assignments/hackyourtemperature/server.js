import express from 'express';

// const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', function (req, res) {
  res.send('hello from backend to frontend!');
});

app.post('/weather', function (req, res) {
  let cityName = req.body.cityName;

  res.json({ message: `Now weather in your city ${cityName}` });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

import express from 'express';
import path from 'path';
import http from 'http';
import fs from 'fs';

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/blogs', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content)
    return res
      .status(400)
      .send('without title and content this program not work');
  try {
    fs.writeFileSync(`${title}.txt`, content);
    res.status(201).end('ok');
  } catch (error) {
    res.status(500).send('something went wrong!');
  }
});

app.put('/posts/:title', (req, res) => {
  const { content } = req.body;
  const title = req.params.title;
  if (!title || !content) {
    return res
      .status(400)
      .send('without title and content you never change blog!');
  }
  if (fs.existsSync(`${title}.txt`)) {
    fs.writeFileSync(`${title}.txt`, content);
    res.status(200).send('ok');
  } else {
    res.status(404).send('This post does not exist!');
  }
});

app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;

  if (fs.existsSync(`${title}.txt`)) {
    try {
      fs.unlinkSync(`${title}.txt`);
      res.status(200).send('ok');
    } catch (error) {
      res.status(500).send('Something went wrong!');
    }
  } else {
    res.status(404).send('This post does not exist!');
  }
});

app.listen(3000);

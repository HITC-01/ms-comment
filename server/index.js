require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = require('../database/index.js');

const PORT = process.env.PORT || 3003;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/songs/:id', express.static(path.join(__dirname, '../public')));

app.get('/comments/:songId/', (req, res) => {
  db.getAllComments(req.params.songId, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

app.get('/artist/:artistId', (req, res) => {
  db.getArtist(req.params.artistId, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

app.get('/song/:songId', (req, res) => {
  db.getSong(req.params.songId, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

app.post('/api/sc', (req, res) => {
  db.createComment(req.body, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send('Comment Posted');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});

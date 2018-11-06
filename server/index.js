require('dotenv').config();
<<<<<<< HEAD
=======

>>>>>>> 05c0d6b44fb8e170147bb7a03a75e6e7cde85c0d
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const db = require('../database/index.js');

const port = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/song/:id', express.static(path.join(__dirname, '../public')));
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/api/sc/songs/:songId/', (req, res) => {
  db.getAllComments(req.params.songId, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

app.get('/api/artist/:artistId', (req, res) => {
  db.getArtist(req.params.artistId, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

app.get('/api/song/:songId', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is listening on Port: ${port}`);
});

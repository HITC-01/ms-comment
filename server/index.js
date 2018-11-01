const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = require('../database/index.js');

const PORT = process.env.PORT || 3003;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/song/:id', express.static(path.join(__dirname, '../public')));

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

app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = require('../database/index.js');

const PORT = process.env.PORT || 3003;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/comments', (req, res) => {
  db.getAllComments((error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

app.get('/api/artist', (req, res) => {
  db.getArtist((error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
});

app.get('/api/song', (req, res) => {
  db.getSong((error, results) => {
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

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'comments',
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to mysql');
});

const getAllComments = (callback) => {
  connection.query('SELECT * FROM comments, artists WHERE song_Id = 2 && comments.artist_Id = artists.artistId ORDER BY createdAt DESC', (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const getArtist = (callback) => {
  connection.query('SELECT * FROM artists WHERE artistId = 2', (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const getSong = (callback) => {
  connection.query('SELECT * FROM songs WHERE songId = 2', (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const createComment = (commentInfo, callback) => {
  const queryString = 'INSERT INTO comments (text, createdAt, songtime, artist_Id, song_Id) VALUES (?, ?, ?, ?, ?)';
  const text = commentInfo.text;
  const createdAt = commentInfo.createdAt;
  const songtime = commentInfo.songtime;
  const artistId = commentInfo.artist_Id;
  const songId = commentInfo.song_Id;

  connection.query(queryString, [text, createdAt, songtime, artistId, songId], (error) => {
    callback(error);
  });
};

module.exports = connection;
module.exports.getAllComments = getAllComments;
module.exports.getArtist = getArtist;
module.exports.getSong = getSong;
module.exports.createComment = createComment;

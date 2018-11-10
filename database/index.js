const mysql = require('mysql');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

connection.getConnection((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to mysql');
});

const getAllComments = (songId, callback) => {
  connection.query(`SELECT * FROM comments, artists WHERE song_Id = ${songId} && comments.artist_Id = artists.artistId ORDER BY createdAt DESC`, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const getArtist = (artistId, callback) => {
  connection.query(`SELECT * FROM artists WHERE artistId = ${artistId}`, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const getSong = (songId, callback) => {
  connection.query(`SELECT * FROM songs WHERE songId = ${songId}`, (error, results) => {
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

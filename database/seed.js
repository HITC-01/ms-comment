require('dotenv').config();
const faker = require('faker');
const Promise = require('bluebird');
const db = require('./index.js');

const generator = () => {
  const result = [];

  for (let i = 0; i < 1000; i += 1) {
    const details = {
      plays: faker.random.number({ min: 1000, max: 25000 }),
      likes: faker.random.number({ min: 50000, max: 10000 }),
      reposts: faker.random.number({ min: 10000, max: 100000 }),
      name: faker.name.findName(),
      imageURL: faker.image.avatar(),
      text: faker.lorem.sentences(),
      createdAt: faker.date.recent(),
      songlength: faker.random.number({ min: 180, max: 300 }),
      songtime: faker.random.number({ min: 0, max: 300 }),
      commentId: faker.random.number({ min: 1, max: 30 }),
      artistId: faker.random.number({ min: 1, max: 50 }),
      songId: faker.random.number({ min: 1, max: 50 }),
    };
    result.push(details);
  }
  return result;
};

const gen = Promise.resolve(generator());
gen.then((seeded) => {
  const item = seeded;
  for (let i = 0; i < seeded.length; i += 1) {
    const current = seeded[i];
    const queryStringArtists = 'INSERT INTO artists (name, imageURL) values (?, ?)';

    const postArtists = [
      current.name,
      current.imageURL,
    ];
    db.query(queryStringArtists, postArtists, (error) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Data persisted!');
      }
    });
  }
  return item;
}).then((seeded) => {
  const item = seeded;
  for (let i = 0; i < seeded.length; i += 1) {
    const current = seeded[i];
    const queryStringSongs = 'INSERT INTO songs (plays, likes, reposts, songlength, artist_Id) values (?, ?, ?, ?, ?)';

    const postSongs = [
      current.plays,
      current.likes,
      current.reposts,
      current.songlength,
      current.artistId,
    ];
    db.query(queryStringSongs, postSongs, (error) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Data persisted!');
      }
    });
  }
  return item;
}).then((seeded) => {
  const item = seeded;
  for (let i = 0; i < seeded.length; i += 1) {
    const current = seeded[i];
    const queryStringComment = 'INSERT INTO comments (text, createdAt, songtime, artist_Id, song_Id) values (?, ?, ?, ?, ?)';

    const postComment = [
      current.text,
      current.createdAt,
      current.songtime,
      current.artistId,
      current.songId,
    ];

    db.query(queryStringComment, postComment, (error) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Data persisted!');
      }
    });
  }
  return item;
}).then((seeded) => {
  for (let i = 0; i < seeded.length; i += 1) {
    const current = seeded[i];
    const queryStringReply = 'INSERT INTO reply (text, createdAt, comment_Id, artist_Id) values (?, ?, ?, ?)';

    const postReply = [
      current.text,
      current.createdAt,
      current.commentId,
      current.artistId,
    ];

    db.query(queryStringReply, postReply, (error) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Data persisted!');
      }
    });
  }
})
  .catch((error) => {
    console.log(error);
  });

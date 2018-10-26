const faker = require('faker');
const db = require('./index.js');
const Promise = require('bluebird');

const generator = () => {
  let result = [];

  for ( let i = 0; i < 100; i += 1 ) {
    let random = Math.floor(Math.random() * Math.floor(100));
    let details = {
      plays: faker.random.number(),
      likes: faker.random.number(),
      reposts: faker.random.number(),
      name: faker.name.findName(),
      imageURL: faker.image.people(),
      text: faker.lorem.sentence(),
      createdAt: faker.date.recent(),
      songtime: faker.random.number({ min: 0, max: 300 }),
      commentId: faker.random.number({ min: 0, max: 100 }),
      artistId: faker.random.number({ min: 0, max: 10 }),
      songId: faker.random.number({ min: 0, max: 10 }) 
    };
    result.push(details);
  }
  return result;
};

var gen = Promise.resolve(generator());
gen.then( (seeded) => {
  let item = seeded;

  for (let i in seeded) {
        
    let current = seeded[i];

    const queryStringSongs = 'INSERT INTO songs (plays, likes, reposts) values (?, ?, ?)';

    let postSongs = [
      current.plays, 
      current.likes, 
      current.reposts
    ];
    db.query(queryStringSongs, postSongs, (error, results, fields) =>{
      if (error) {
        console.log(error.message);
      } else {
        console.log('Data persisted!');
      }
    });
  }
  return item;
}).then((seeded) => {
  for (let i in seeded)  {
    let current = seeded[i];
    const queryStringArtists = 'INSERT INTO artists (name, imageURL) values (?, ?)';

    let postArtists = [
      current.name,
      current.imageURL
    ];
    db.query(queryStringArtists, postArtists, (error, results, fields) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Data persisted!');
      }
    });
  }
  return item;
}).then ((seeded) => {
  for (let i in seeded)  {
    let current = seeded[i];
    const queryStringComment = 'INSERT INTO comment (text, createdAt, songtime, artist_Id, song_Id) values (?, ?, ?, ?, ?)';

    let postComment = [
      current.text,
      current.createdAt,
      current.songtime,
      current.artistId,
      current.songId
    ];
    db.query(queryStringComment, postComment, (error, results, fields) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Data persisted!');
      }
    });
  }  
  return item;
}).then ((seeded) => {
  for (let i in seeded)  {
    let current = seeded[i];
    const queryStringReply = 'INSERT INTO reply (text, createdAt, comment_Id, artist_Id, song_Id) values (?, ?, ?, ?, ?)';

    let postReply = [
      current.text,
      current.createdAt,
      current.songtime,
      current.commentId,
      current.artistId,
      current.songId
    ];
    db.query(queryStringReply, postReply, (error, results, fields) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Data persisted!');
      }
    });
  }
}).catch(error => {
  console.log(error);
});
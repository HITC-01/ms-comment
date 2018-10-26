const faker = require('faker');
const db = require('./index.js');
const Promise = require('bluebird');

const generator = () => {
    let result = [];

    for ( var i = 0; i < 100; i++ ) {
        let random = Math.floor(Math.random() * Math.floor(100));
        let details = {
            plays: faker.random.number(),
            likes: faker.random.number(),
            reposts: faker.random.number(),
            name: faker.name.findName(),
            imageURL: faker.image.people(),
            text: faker.lorem.paragraph(),
            createdAt: faker.date.recent(),
            songtime: faker.random.number({min: 0, max: 300}),
            comment_Id: faker.random.number({min: 0, max: 100}),
            artist_Id: faker.random.number({min: 0, max: 100}),
            song_Id: faker.random.number({min: 0, max: 100}) 
        }
        result.push(details);
    }
    return result;
}

var gen = Promise.resolve(generator());
gen.then( (seeded) => {
    let item = seeded;

    for ( let i in seeded ) {
        
        let current = seeded[i];

        var queryStringSongs = 'INSERT INTO songs (plays, likes, reposts) values (?, ?, ?)';

        let postSongs = [
            current.plays, 
            current.likes, 
            current.reposts
        ]
        db.query(queryStringSongs, postSongs, (error, results, fields) =>{
            if (error) {
                console.log(error.message);
            } else {
                console.log('Data persisted!');
            }
        });
    }

    return item
}).then( (seeded) => {
    for (let i in seeded)  {
        let current = seeded[i];
        var queryStringArtists = 'INSERT INTO artists (name, imageURL) values (?, ?)';

        let postArtists = [
            current.name,
            current.imageURL
        ]
        db.query(queryStringArtists, postArtists, (error, results, fields) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log('Data persisted!');
            }
        });
    }
    return item
}).then ( (seeded) => {
    for (let i in seeded)  {
        let current = seeded[i];
        var queryStringComment = 'INSERT INTO comment (text, createdAt, songtime, artist_Id, song_Id) values (?, ?, ?, ?, ?)';

        let postComment = [
            current.text,
            current.createdAt,
            current.songtime,
            current.artist_Id,
            current.song_Id
        ]
        db.query(queryStringComment, postComment, (error, results, fields) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log('Data persisted!');
            }
        });
    }
    
    return item 
}).then ( (seeded) => {
    for (let i in seeded)  {
        let current = seeded[i];
        var queryStringReply = 'INSERT INTO reply (text, createdAt, comment_Id, artist_Id, song_Id) values (?, ?, ?, ?, ?)';

        let postReply = [
            current.text,
            current.createdAt,
            current.songtime,
            current.artist_Id,
            current.song_Id
        ]
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
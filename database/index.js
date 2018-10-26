const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    database: 'comments'
});

connection.createQuery(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to mysql');
});

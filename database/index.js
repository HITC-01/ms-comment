const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    database: 'comments'
});

connection.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to mysql');
});

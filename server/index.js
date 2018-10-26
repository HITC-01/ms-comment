const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = require('../database/index.js');

const PORT = process.env.PORT || 3003;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

// app.post();
// app.get();

app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`);
});

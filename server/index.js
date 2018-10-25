const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../database/index.js');

const PORT = 3003;
const comments = require();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + ''));

app.post();
app.get();

app.listen(PORT, () => {
    console.log(`Server is listening on Port:' ${PORT}`);
})
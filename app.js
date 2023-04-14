const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


const user = require('./api/routes/user');
app.use('/user', user);

const product = require('./api/routes/product');
app.use('/product', product);



module.exports = app;


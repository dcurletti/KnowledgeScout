const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');



app.set('superSecret', 'captain');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

module.exports = app;
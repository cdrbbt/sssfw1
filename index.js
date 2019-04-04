/* eslint-disable no-console */
require('dotenv').config();
const moment = require('moment');
const express = require('express');
const mongoose = require('mongoose');
const catRoute = require('./routers/db');

mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log('success');
}, (err) => {
  console.log(err);
});

setInterval(() => console.log(moment().format('HH:mm:ss')), 1000);

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));

app.use('/cats', catRoute);
app.get('/', (req, res) => {
  res.render('form');
});

app.listen(3000);

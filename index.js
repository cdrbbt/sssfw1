/* eslint-disable no-console */
require('dotenv').config();
const moment = require('moment');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

passport.use(new LocalStrategy(
  (username, password, done) => {
    if (username !== process.env.USERNAME_L || password !== process.env.PASSWORD_L) {
      done(null, false, { message: 'Incorrect credentials.' });
      return;
    }
    done(null, { status: 'ok' });
  }
));
app.use(passport.initialize());

app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/test',
    session: false,
  }), (req, res) => {
    res.send('RIGHT');
  });

app.get('/test', (req, res) => {
  res.send('WRONG');
});

app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'));

app.use('/cats', catRoute);
app.get('/', (req, res) => {
  res.render('form');
});

app.listen(3000);

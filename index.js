/* eslint-disable no-console */
require('dotenv').config();
const moment = require('moment');
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    console.log("got here")
    const ext = file.originalname.match(/\.\w+/);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });
mongoose.connect(process.env.DB_ADRESS).then(() => {
  console.log('success');
}, (err) => {
  console.log(err);
});

const Schema = mongoose.Schema;
const catSchema = new Schema({
  name: String,
  age: String,
  filepath: String,
});
const Cats = mongoose.model('Cats', catSchema);

app.set('views', './views');
app.set('view engine', 'pug');

setInterval(() => console.log(moment().format('HH:mm:ss')), 1000);

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/img', upload.single('photo'), (req, res) => {
  Cats.create({ name: req.body.name, age: req.body.age, filepath: req.file.filename }, (err) => {
    if (err) res.status(400);
    console.log(req.file.filename);
    res.send(req.body);
  });
});

app.get('/img', (req, res) => {
  Cats.find().then((cats) => {
    res.render('view', { cats });
  });
});

app.listen(3000);

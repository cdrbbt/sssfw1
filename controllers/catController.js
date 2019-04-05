/* eslint-disable no-console */
const Cats = require('../models/catModel');

exports.get_cats = (req, res) => {
  Cats.find().then(cats => res.send(cats));
};

exports.get_cats_page = (req, res) => {
  Cats.find().then((cats) => {
    res.render('view', { cats });
  });
};

exports.post_cats = (req, res) => {
  Cats.create({ name: req.body.name, age: req.body.age, filepath: req.file.filename }, (err) => {
    if (err) res.status(400);
    // console.log(req.file.filename);
    res.send(req.body);
  });
};

exports.delete_cats = (req, res) => {
  console.log(res.body);
  Cats.deleteOne({ name: res.body.name }, err => console.log(err)).then(res.send('ok'));
};

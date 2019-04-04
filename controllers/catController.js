const Cats = require('../models/catModel');

exports.get_cats = (req, res) => {
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

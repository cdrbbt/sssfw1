const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const catSchema = new Schema({
  name: String,
  age: String,
  filepath: String,
});
const Cats = mongoose.model('Cats', catSchema);

module.exports = Cats;

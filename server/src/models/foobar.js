const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  year: { type: Number, default: 2018 }
})
const Model = mongoose.model('Foobar', Schema)
module.exports = Model

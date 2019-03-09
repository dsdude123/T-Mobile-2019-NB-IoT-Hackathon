const mongoose = require('mongoose')
const { Types } = mongoose.Schema

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' }
})

const Model = mongoose.model('Device', Schema, 'Device')

module.exports = Model

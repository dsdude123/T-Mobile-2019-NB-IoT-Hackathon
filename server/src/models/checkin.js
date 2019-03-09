const mongoose = require('mongoose')
const { Types } = mongoose.Schema

const Schema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now() },
  status: { type: String, default: 'OK' },
  temperature: { type: Number, default: null },
  humidity: { type: Number, default: null },
  tilt: { type: Types.Mixed, default: null }
})

const Model = mongoose.model('Checkin', Schema, 'Checkin')

module.exports = Model

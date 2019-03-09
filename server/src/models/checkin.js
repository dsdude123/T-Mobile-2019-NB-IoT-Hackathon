const mongoose = require('mongoose')
const { Types } = mongoose.Schema
const faker = require('faker')
const randomFloat = require('random-float')

const Schema = new mongoose.Schema({
  // FOREIGN KEY
  device: { type: Types.ObjectId, ref: 'Device', required: true },
  // 
  timestamp: { type: Date, default: Date.now() },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  elevation: { type: Number, default: null },
  status: { type: String, default: 'OK' },
  temperature: { type: Number, default: null },
  humidity: { type: Number, default: null },
  tilt: { type: Types.Mixed, default: null },
})

const Model = mongoose.model('Checkin', Schema, 'Checkin')

module.exports = Model

module.exports.seed = (ids, i) => {
  const Seed = new Model({
    _id: ids['Checkin'][i],
    device: ids['Device'][i],
    timestamp: faker.date.recent(14),

    /*
    Example coordinate range based on Puget Sound
    https://www.latlong.net/
    48.101399, -122.889235
    47.080475, -121.596835
    */
    latitude: randomFloat(47.080475, 48.101399),
    longitude: randomFloat(122.889235, -121.596835),
    // latitude: faker.random.number({ min: -90, max: 90 }),
    // longitude: faker.random.number({ min: -180, max: 180 }),
    elevation: faker.random.boolean ? faker.random.number({ min: -1000, max: 6000 }) : null,
    status: faker.random.arrayElement(['OK', 'FAIL']),
    temperature: faker.random.boolean ? faker.random.number({ min: -20, max: 80 }) : null,
    humidity: faker.random.boolean ? faker.random.number({ min: 0, max: 100 }) : null,
    tilt: null
  })
  Model.create(Seed)
}

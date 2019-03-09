const mongoose = require('mongoose')
const { Types } = mongoose.Schema
const faker = require('faker')

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
    latitude: faker.random.number(),
    longitude: faker.random.number(),
    elevation: faker.random.boolean ? faker.random.number() : null,
    status: faker.random.boolean ? 'OK' : 'FAIL',
    temperature: faker.random.boolean ? faker.random.number() : null,
    humidity: faker.random.boolean ? faker.random.number() : null,
    tilt: null
  })
  Model.create(Seed)
}

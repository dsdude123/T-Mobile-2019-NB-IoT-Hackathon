const mongoose = require('mongoose')
const { Types } = mongoose.Schema
const faker = require('faker')

const Schema = new mongoose.Schema({
  // FOREIGN KEY(S)
  checkins: [{ type: Types.ObjectId, ref: 'Checkin', required: true }],
  // 
  name: { type: String, required: true },
  description: { type: String, default: '' }
})

const Model = mongoose.model('Device', Schema, 'Device')

module.exports = Model

module.exports.seed = (ids, i) => {
  let checkins = []
  for (let j = 0; j <= i; j++) {
    checkins.push(ids['Checkin'][j])
  }
  const Seed = new Model({
    _id: ids['Device'][i],
    checkins,
    name: faker.name.jobDescriptor(),
    description: faker.lorem.sentence()
  })
  Model.create(Seed)
}

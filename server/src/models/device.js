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
  const Seed = new Model({
    _id: ids['Device'][i],
    checkins: [ids['Checkin'][i], ids['Checkin'][ i <= 0 ? i+1 : i-1]],
    name: faker.name.jobDescriptor(),
    description: faker.lorem.sentence()
  })
  Model.create(Seed)
}

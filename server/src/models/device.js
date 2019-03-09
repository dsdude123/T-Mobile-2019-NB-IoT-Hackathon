const mongoose = require('mongoose')
const { Types } = mongoose.Schema
const faker = require('faker')

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' }
})

const Model = mongoose.model('Device', Schema, 'Device')

module.exports = Model

module.exports.seed = (fakes, config) => {
  Model.create({
    name: faker.name.jobDescriptor(),
    description: faker.lorem.sentence()
  })
}

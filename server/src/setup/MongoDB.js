const mongoose = require('mongoose')
// FOR TESTING: Change your connection string in config OR here.

module.exports = (server, config) => {
  const { db, seed } = config
  // Find the appropriate database to connect to, default to localhost if not found.
  const connect = () => {
    mongoose.Promise = require('bluebird')
    mongoose.connect(db, (err) => {
      if (err) {
        console.warn(`===>  Error connecting to ${db}\n${err}`)
      } else {
        console.log(`===>  Succeeded in connecting to ${db}`)
      }
    })
  }
  connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connect)

  // LOAD MODELS
  const models = require('../models')
  // SEED IF NECESSARY (and a seed method has been added)
  if (seed) {
    Object.keys(models)
      .map(key => models[key])
      .filter(Model => typeof Model.seed === 'function')
      .forEach(Model => {
        Model.count().exec((err, count) => {
          if (err) {
            console.warn(`Unable to count ${Model.modelName.toLowerCase()} schema:`, err)
          } else if (count < seed) {
            console.log(`SEED: Generating ${count < seed} documents for ${Model.modelName.toLowerCase()}`)
            let fakes = []
            for (let i = 0; i < seed; i++) {
              Model.seed(fakes, config)
            }
          }
        })
      })
  }
}

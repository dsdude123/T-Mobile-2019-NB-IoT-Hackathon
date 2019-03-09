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
  // if (true) {
    // (Synchronous) Map of mongoose ids per each model (good for picking refs)
    const ids = Object.keys(models).reduce(
      (acc, el) => {
          acc[el] = []
          for (let i = 0; i < seed; i++) {
            acc[el].push(new mongoose.Types.ObjectId())
          }
          return acc
        },
      {}
    )
    // (async) Iterate over models and create seeds
    for (model of Object.keys(models)) {
      const Model = models[model]
      if (typeof Model.seed === 'function') {
        Model.count().exec((err, count) => {
          if (err) {
            console.warn(`Unable to count ${Model.modelName.toLowerCase()} schema:`, err)
          } else if (count < seed) {
          // } else if (true) {
            console.log(`SEED: Generating ${seed} documents for ${Model.modelName.toLowerCase()}`)
            for (let i = 0; i < seed; i++) {
              Model.seed(ids, i)
            }
          }
        })
      }
    }
  }
}

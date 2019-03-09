const restify = require('express-restify-mongoose')
const _ = require('lodash')

const { Router } = require('express')

module.exports = class Rest {
  constructor (model) {
    //  Assign model
    this.model = model
    //  express-restify-mongoose configurations - common to all controllers
    this.config = {
      prefix: '',
      version: '/v2',
      name: this.model.modelName.toLowerCase(),
      //  Disabling these allows middleware to be called
      access: (req) => 'private',
      outputFn: (req, res) => {
        const { statusCode, result } = req.erm
        res.status(statusCode).json(result)
      }
    }
    //  Middleware = override this!
    this.middleware = { ...this.config }
  }
  API () {
    const router = new Router()
    restify.serve(router, this.model, this.middleware)
    console.log(`REST: Instantiated controller: ${this.config.name}`)
    return router
  }
}

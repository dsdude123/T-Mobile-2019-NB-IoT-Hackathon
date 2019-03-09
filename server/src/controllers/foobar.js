const REST = require('./REST')
const { Config } = require('../models')

export default class Configs extends REST {
  constructor () {
    super(Config)
  }
}

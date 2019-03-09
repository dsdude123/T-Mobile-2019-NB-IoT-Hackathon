const REST = require('./REST')
const { Device } = require('../models')

module.exports = class Devices extends REST {
  constructor () {
    super(Device)
  }
}

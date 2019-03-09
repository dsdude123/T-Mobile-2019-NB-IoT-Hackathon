const REST = require('./REST')
const { Checkin } = require('../models')

module.exports = class Checkins extends REST {
  constructor () {
    super(Checkin)
  }
}

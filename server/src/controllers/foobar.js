const REST = require('./REST')
const { Foobar } = require('../models')

module.exports = class Foobars extends REST {
  constructor () {
    super(Foobar)
  }
}

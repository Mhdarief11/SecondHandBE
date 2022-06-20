const { kota } = require('../models')

module.exports = {
  findAll() {
    return kota.findAll()
  },
}

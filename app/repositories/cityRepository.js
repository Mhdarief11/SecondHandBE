const { kota } = require('../models')

module.exports = {
  findAll() {
    return kota.findAll()
  },
  findCity(data) {
    return kota.findByPk(data)
  },
}

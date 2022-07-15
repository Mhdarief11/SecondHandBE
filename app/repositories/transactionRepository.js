const { transaksi } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  listAll(id) {
    return transaksi.findAll({ where: { iduser: { [Op.eq]: id } } })
  },
  createBidProduct(bidProduct) {
    return transaksi.create(bidProduct)
  },
}

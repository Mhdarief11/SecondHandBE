const { transaksi } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  listAll(id) {
    return transaksi.findAll()
  },
  createBidProduct(bidProduct) {
    return transaksi.create(bidProduct)
  },
}

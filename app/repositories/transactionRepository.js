const { transaksi, user, barang, gambarbarang } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  listAll() {
    return transaksi.findAll({
      include: [
        { model: user, attributes: { exclude: ['password'] } },
        { model: barang, include: gambarbarang },
      ],
    })
  },
  createBidProduct(bidProduct) {
    return transaksi.create(bidProduct)
  },
}

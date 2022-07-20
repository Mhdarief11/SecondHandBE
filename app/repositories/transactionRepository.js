const { transaksi, user, barang, gambarbarang, kota } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  listAll() {
    return transaksi.findAll({
      include: [
        {
          model: user,
          attributes: { exclude: ['password'] },
          required: true,
        },
        { model: barang, include: gambarbarang },
      ],
    })
  },
  createBidProduct(bidProduct) {
    return transaksi.create(bidProduct)
  },

  findBid(id) {
    return transaksi.findByPk(id, {
      include: [
        {
          model: user,
          attributes: { exclude: ['password'] },
          required: true,
          include: kota,
        },
        { model: barang, include: gambarbarang },
      ],
    })
  },

  deniedBid(id, idseller) {
    return transaksi.update(
      { status_terima: false, status_pembelian: false },
      { where: { id: id, iduser_seller: { [Op.eq]: idseller } } },
    )
  },
  acceptBid(id, idseller) {
    return transaksi.update(
      { status_terima: true },
      {
        where: {
          idbarang: { [Op.eq]: id },
          iduser_seller: { [Op.eq]: idseller },
        },
      },
    )
  },
  productSold(id, idbarang, idseller) {
    const update = transaksi.update(
      { status_pembelian: true },
      {
        where: {
          id: id,
          iduser_seller: { [Op.eq]: idseller },
        },
      },
    )
    const updateBarang = barang.update(
      { available: false },
      { where: { id: { [Op.eq]: idbarang } } },
    )
    return update, updateBarang
  },
  declineTrans(id, idseller) {
    return transaksi.update(
      { status_pembelian: false },
      {
        where: {
          id: id,
          iduser_seller: { [Op.eq]: idseller },
        },
      },
    )
  },
}

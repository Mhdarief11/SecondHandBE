const { barang, kategori, gambarbarang, user } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  findAll() {
    return barang.findAll({ include: { model: gambarbarang, model: kategori } })
  },
  findProductPic(id) {
    return gambarbarang.findByPk(id)
  },
  getTotalProducts() {
    return barang.count()
  },
  findProduct(id) {
    return barang.findByPk({ where: { iduser: id } })
  },

  addProduct(createArgs) {
    return barang.create(createArgs)
  },

  addImageProduct(createArgs) {
    return gambarbarang.create(createArgs)
  },
  delete(id) {
    return barang.destroy({ where: { id } })
  },
  findById(id) {
    return barang.findByPk(id, { include: user })
  },
  findByKategori(Args) {
    return barang.findAll({
      where: {
        idkategori: Args.idkategori,
      },
      include: { model: gambarbarang },
    })
  },

  updateProduct(id, updateArgs) {
    return barang.update(updateArgs, { where: { id } })
  },

  addCategory(createArgs) {
    return kategori.create(createArgs)
  },
  listCategory() {
    return kategori.findAll()
  },
  findCategory(data) {
    return kategori.findByPk(data)
  },
}

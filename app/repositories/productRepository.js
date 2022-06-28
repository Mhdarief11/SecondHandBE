const { barang, kategori, gambarbarang } = require('../models')

module.exports = {
  findAll() {
    return barang.findAll()
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

  updateProduct(id, updateArgs) {
    return barang.update(updateArgs, { where: { id } })
  },

  addCategory(createArgs) {
    return kategori.create(createArgs)
  },
  listCategory() {
    return kategori.findAll()
  },
}

const { barang } = require('../models')

module.exports = {
  findAll() {
    return barang.findAll()
  },

  findBarang(id) {
    return barang.findByPk({ where: { iduser: id } })
  },

  createBarang(createArgs) {
    return barang.create(createArgs)
  },

  updateBarang(id, updateArgs) {
    return barang.update(updateArgs, { where: { id } })
  },
}

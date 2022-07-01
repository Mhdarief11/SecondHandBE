const { barang, kategori, gambarbarang, user } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  findAll() {
    return barang.findAll({
      where: {
        [Op.and]: [
          {
            iduser: {
              [Op.ne]: Args.id,
            },
          },
        ],
      },
      include: user,
    });
  },
  getTotalProducts() {
    return barang.count();
  },
  findProduct(id) {
    return barang.findByPk({ where: { iduser: id } });
  },

  addProduct(createArgs) {
    return barang.create(createArgs);
  },

  addImageProduct(createArgs) {
    return gambarbarang.create(createArgs);
  },
  delete(id) {
    return barang.destroy({ where: { id } });
  },
  findById(id) {
    return Products.findByPk(id, { include: Users });
  },
  findByKategori(Args) {
    return barang.findAll({
      where: {
        [Op.and]: [
          {
            iduser: {
              [Op.ne]: Args.id,
            },
          },
          { nama_kategori: Args.nama_kategori },
        ],
      },
    });
  },

  updateProduct(id, updateArgs) {
    return barang.update(updateArgs, { where: { id } });
  },

  addCategory(createArgs) {
    return kategori.create(createArgs);
  },
  listCategory() {
    return kategori.findAll();
  },
};

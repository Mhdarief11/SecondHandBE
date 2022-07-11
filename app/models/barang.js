'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      barang.hasOne(models.kategori, { foreignKey: 'idkategori' })
      barang.hasMany(models.gambarbarang, { foreignKey: 'idbarang' })
      barang.hasOne(models.transaksi, { foreignKey: 'idbarang' })
    }
  }
  barang.init(
    {
      iduser: DataTypes.INTEGER,
      idkategori: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      harga: DataTypes.FLOAT,
      deskripsi: DataTypes.STRING,
      minat: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'barang',
    },
  )
  return barang
}

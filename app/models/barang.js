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
      barang.hasMany(models.gambarbarang, { foreignKey: 'idbarang' })
      barang.hasOne(models.transaksi, { foreignKey: 'idbarang' })
      barang.belongsTo(models.kategori, { foreignKey: 'idkategori' })
      barang.belongsTo(models.user, { foreignKey: 'iduser' })
    }
  }
  barang.init(
    {
      iduser: DataTypes.INTEGER,
      idkategori: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      harga: DataTypes.FLOAT,
      deskripsi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'barang',
    },
  )
  return barang
}

'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kategori.hasOne(models.barang, { foreignKey: 'idkategori' })
    }
  }
  kategori.init(
    {
      nama_kategori: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'kategori',
    },
  )
  return kategori
}

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
      kategori.belongsTo(models.barang, { foreingKey: 'idkategori' })
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

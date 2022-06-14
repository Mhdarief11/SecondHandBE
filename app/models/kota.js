'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class kota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kota.hasMany(models.user, { foreingKey: 'idkota' })
    }
  }
  kota.init(
    {
      nama_kota: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'kota',
    },
  )
  return kota
}

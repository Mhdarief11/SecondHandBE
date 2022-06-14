'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.barang, { foreingKey: 'iduser' })
      user.belongsTo(models.transaksi, { foreingKey: 'iduser' })
      user.belongsTo(models.transaksi, { foreingKey: 'iduser_seller' })
    }
  }
  user.init(
    {
      idkota: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gambar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    },
  )
  return user
}

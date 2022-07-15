'use strict'
const { Model, ForeignKeyConstraintError } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaksi.belongsTo(models.user, { foreignKey: 'iduser' })
      transaksi.belongsTo(models.user, { foreignKey: 'iduser_seller' })
      transaksi.belongsTo(models.barang, { foreignKey: 'idbarang' })
    }
  }
  transaksi.init(
    {
      iduser: DataTypes.INTEGER,
      iduser_seller: DataTypes.INTEGER,
      idbarang: DataTypes.INTEGER,
      harga_tawar: DataTypes.FLOAT,
      status_pembelian: DataTypes.BOOLEAN,
      status_terima: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'transaksi',
    },
  )
  return transaksi
}

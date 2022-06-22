'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      iduser: {
        type: Sequelize.INTEGER,
        allowNull: true,
        refereces: {
          model: 'users',
          key: 'id',
        },
      },
      iduser_seller: {
        type: Sequelize.INTEGER,
        allowNull: true,
        refereces: {
          model: 'users',
          key: 'id',
        },
      },
      idbarang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'barangs',
          key: 'id',
        },
      },
      harga_tawar: {
        type: Sequelize.FLOAT,
      },
      status_pembelian: {
        type: Sequelize.BOOLEAN,
      },
      status_terima: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksis')
  },
}

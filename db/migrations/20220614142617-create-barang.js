'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('barangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      iduser: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      idkategori: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'kategoris',
          key: 'id',
        },
      },
      nama: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.FLOAT,
      },
      deskripsi: {
        type: Sequelize.STRING,
      },
      minat: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
    await queryInterface.dropTable('barangs')
  },
}

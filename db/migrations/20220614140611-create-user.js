'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idkota: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'kota',
          key: 'id',
        },
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nohp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gambar: {
        type: Sequelize.STRING,
      },
      googleId: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      registeredVia: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('users')
  },
}

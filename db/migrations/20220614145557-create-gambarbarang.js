'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gambarbarangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idbarang: {
        type: Sequelize.INTEGER,
        allowNull: true,
        refereces: {
          model: 'barangs',
          key: 'id',
        },
      },
      gambar: {
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
    await queryInterface.dropTable('gambarbarangs')
  },
}

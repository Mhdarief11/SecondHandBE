'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('kategoris', [
      {
        nama_kategori: 'Hobi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: 'Kendaraan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: 'Baju',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: 'Elektronik',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_kategori: 'Kesehatan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('kategoris', null, {})
  },
}

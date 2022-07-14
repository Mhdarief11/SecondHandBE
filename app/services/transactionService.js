const transactionRepository = require('../repositories/transactionRepository')

module.exports = {
  async list(id) {
    try {
      const transaction = await transactionRepository.listAll(id)
      return { transaction }
    } catch (error) {
      throw error
    }
  },

  async createBidProduct(requestBody) {
    try {
      return transactionRepository.createBidProduct(requestBody)
    } catch (error) {
      throw error
    }
  },
}

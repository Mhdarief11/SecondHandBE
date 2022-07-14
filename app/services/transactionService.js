const transactionRepository = require('../repositories/transactionRepository')

module.exports = {
  async list(id) {
    try {
      const transaction = await transactionRepository.listAll()
      return { transaction }
    } catch (error) {
      throw error
    }
  },

  async createBidProduct(requestBody) {
    try {
      const bidProduct = await transactionRepository.createBidProduct(
        requestBody,
      )
      return { bidProduct }
    } catch (error) {
      throw error
    }
  },
}

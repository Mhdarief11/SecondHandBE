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
  async findBid(id) {
    try {
      const bid = await transactionRepository.findBid(id)
      return { bid }
    } catch (error) {
      throw error
    }
  },

  deniedBid(id, idseller) {
    return transactionRepository.deniedBid(id, idseller)
  },
  acceptBid(id, idseller) {
    return transactionRepository.acceptBid(id, idseller)
  },
  // update status produk terjual
  productSold(id, idbarang, idseller) {
    return transactionRepository.productSold(id, idbarang, idseller)
  },

  // update status pembatalan transaksi
  declineTrans(id, idseller) {
    return transactionRepository.declineTrans(id, idseller)
  },
}

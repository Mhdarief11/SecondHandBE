const transactionService = require('../../../services/transactionService')
const productService = require('../../../services/productService')
const userService = require('../../../services/userService')

module.exports = {
  // tampilkan semua transaksi berdasarkan idSeller (id user yang lagi login)
  // list all transaction based on user id
  async listAll(req, res) {
    try {
      const listTransaction = await transactionService.list(req.user.id)
      res.status(200).json({ listTransaction })
    } catch (error) {
      res.status(400).json({
        message: error.message,
      })
    }
  },

  // create bid user seller and buyer
  async createBid(req, res) {
    try {
      let price = req.body.price
      let sellerid = req.query.sellerid
      let userid = req.user.id
      let productid = req.query.productid

      const getProduct = await productService.getById(productid)
      const getUser = await userService.findPKUser(sellerid)
      if (getProduct == '' || getUser == '') {
        return res
          .status(400)
          .json({ message: 'Data barang dan penjual tidak tersedia' })
      } else {
        // insert bid transaction to table
        try {
          const bidProduct = await transactionService.createBidProduct({
            iduser: userid,
            iduser_seller: sellerid,
            idbarang: productid,
            harga_tawar: price,
            status_pembelian: 0,
            status_terima: 0,
          })
          res.status(201).json({ bidProduct })
        } catch (error) {
          res.status(400).json({ message: error.message })
        }
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      })
    }
  },
}

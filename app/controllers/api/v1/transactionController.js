const transactionService = require('../../../services/transactionService')
const productService = require('../../../services/productService')
const userService = require('../../../services/userService')

module.exports = {
  // tampilkan semua transaksi berdasarkan idSeller (id user yang lagi login)
  // list all transaction based on user id
  async listAll(req, res) {
    try {
      const listTransaction = await transactionService.list()
      res.status(200).json(listTransaction)
    } catch (error) {
      console.log(error.message)
    }
  },

  // create bid user seller and buyer
  async createBid(req, res) {
    try {
      let { price } = req.body
      let sellerid = req.query.sellerid
      let userid = req.user.id
      let productid = req.query.productid
      console.log('harga', price)
      // check product and seller
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
            status_pembelian: null,
            status_terima: null,
          })
          res.status(201).json({ bidProduct })
        } catch (error) {
          res.status(400).json({ message: error.message })
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  },

  // find bid
  async findBid(req, res) {
    try {
      let idBid = req.params.id
      const bid = await transactionService.findBid(idBid)
      if (bid.bid == null) {
        res.status(404).json({ message: 'Transaksi belum ada' })
        return
      }
      res.status(200).json({ bid })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  // denied Bid
  async deniedBid(req, res) {
    try {
      let idBid = req.params.id
      const bid = await transactionService.deniedBid(idBid, req.user.id)
      if (bid[0] == 0) {
        res.status(404).json({ message: 'Transaksi tidak ditemukan' })
        return
      }
      res.status(201).json({ bid })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  // accept Bid
  async acceptBid(req, res) {
    try {
      let idBarang = req.params.id
      const bid = await transactionService.acceptBid(idBarang, req.user.id)
      if (bid[0] == 0) {
        res.status(404).json({ message: 'Transaksi tidak ditemukan' })
        return
      }
      res.status(201).json({ bid })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  // product sold transaction
  async productSold(req, res) {
    try {
      let idbarang = req.params.idbarang
      let idseller = req.user.id
      let id = req.params.idtrans
      console.log(idbarang, idseller, id)
      if (idbarang !== '' && idseller !== '' && id !== '') {
        const sold = await transactionService.productSold(
          id,
          idbarang,
          idseller,
        )
        if (sold[0] == 0) {
          res.status(404).json({ message: 'Transaksi tidak ditemukan' })
          return
        }
        res.status(201).json({ sold })
      }
    } catch (error) {
      console.log(error.message)
    }
  },

  // decline transaction
  async declineTrans(req, res) {
    try {
      let idseller = req.user.id
      let id = req.params.idtrans
      console.log(id)
      if (idseller !== '' && id != '') {
        const decline = await transactionService.declineTrans(id, idseller)
        if (decline[0] == 0) {
          res.status(404).json({ message: 'Transaksi tidak ditemukan' })
          return
        }
        res.status(201).json({ decline })
      }
    } catch (error) {
      console.log(error.message)
    }
  },

  // make status_pembelian = false
  async makeFalse(req, res) {
    try {
      let iduser = req.params.iduser
      let idbarang = req.params.idbarang
      const falseStatusPembelian = await transactionService.makeFalse(
        iduser,
        idbarang,
      )
      if (falseStatusPembelian[0] == 0) {
        res.status(404).json({ message: 'Transaksi tidak ditemukan' })
        return
      }
      res.status(201).json({ falseStatusPembelian })
    } catch (error) {
      console.log(error.message)
    }
  },
}

const productService = require('../../../services/productService')
const uploadOnMemory = require('../../../services/uploadOnMemory')
const cloudinary = require('../../../services/cloudinaryService')

module.exports = {
  // tampilkan semua barang
  async listAll(req, res) {
    try {
      const product = await productService.list()
      // console.log(product)
      if (product.totalBarang === 0) {
        res.status(404).json({
          message: 'Product is Empty',
        })
        return
      }
      res.status(200).json({
        data: barang,
      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
      })
    }
  },

  // tambah barang baru
  async addProduct(req, res) {
    try {
      const product = {
        iduser: req.user.id,
        idkategori: req.body.kategori,
        nama: req.body.nama,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
      }
      const addProduct = await productService.addProduct(product)
      // console.log(req.body)

      var file64 = []
      var file = []
      for (var i = 0; i < req.files.length; i++) {
        file64.push(req.files[i].buffer.toString('base64'))
        file.push(`data:${req.files[i].mimetype};base64,${file64[i]}`)
        console.log(req.files[i].mimetype)
      }
      // const filebase64 = req.files.buffer.toString('base64')
      // const file = `data:${req.files.mimetype};base64,${filebase64}`
      cloudinary.uploader.upload(file, function (err, result) {
        if (err) {
          console.log(err)
          return res.status(400).json({
            message: 'Upload file failed',
          })
        }
        productService.addImageProduct({
          idbarang: addProduct.id,
          gambar: result.secure_url,
        })
        res.status(201).json({
          message: 'New Product Added',
          product: addProduct,
          image: result.secure_url,
        })
      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
      })
    }
  },

  // tambah kategori baru
  async addCategory(req, res) {
    try {
      const kategori = await productService.addCategory({
        nama_kategori: req.body.kategori,
      })
      res.status(201).json({
        data: kategori,
      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
      })
    }
  },
}

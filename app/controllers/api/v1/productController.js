const productService = require('../../../services/productService')
const cloudinary = require('../../../services/cloudinaryService')
const ImageKit = require('imagekit')
const configImageKit = require('../../../imageKit/ImageKitConfig')

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
      const imageKitConfig = new ImageKit(configImageKit)
      const product = {
        iduser: req.user.id,
        idkategori: req.body.kategori,
        nama: req.body.nama,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
      }
      const addProduct = await productService.addProduct(product)
      // console.log(req.body)

      for (var i = 0; i < req.files.length; i++) {
        const picBase64 = req.files[i].buffer.toString('base64')
        var fileExtension = req.files[i].originalname.split('.').pop()
        const gambarName =
          'products' + Date.now() + req.user.id + `${fileExtension}`
        const uploadImg_base64 = await imageKitConfig.upload({
          filr: picBase64,
          fileName: gambarName,
          folder: '/userProducts',
        })
        console.log('file', uploadImg_base64)
        // productService.addImageProduct({
        //   idbarang: addProduct.id,
        //   gambar: uploadImg_base64,
        // })
      }
      res.status(201).json({
        message: 'New Product Added',
        product: addProduct,
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

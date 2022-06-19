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
      const addProduct = await barangService.tambahBarang({
        iduser: req.user.id,
        idkategori: req.body.kategori,
        nama: req.body.nama,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
      })
      console.log(addProduct)

      // upload image in cloud
      uploadOnMemory.array('images', 4)

      const filebase64 = req.file.buffer.toString('base64')
      const file = `data:${req.file.mimetype};base64,${filebase64}`

      cloudinary.uploader.upload(file, function (err, result) {
        if (err) {
          console.log(err)
          return res.status(400).json({
            message: 'Upload file failed',
          })
        }
      })

      // const addImageProduct = await productService.addImageProduct({
      //   idbarang: res.product.id,
      //   gambar: result.secure_url,
      // })

      res.status(201).json({
        message: 'New product added',
        product: addProduct,
        image: addImageProduct,
      })
    } catch (error) {}
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

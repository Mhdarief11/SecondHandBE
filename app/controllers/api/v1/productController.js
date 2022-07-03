const productService = require('../../../services/productService')
const ImageKitActions = require('../../../imageKit/ImageKitActions')

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
        data: product,
      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
      })
    }
  },

  // ------------------------------------------------tambah barang baru
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
      console.log(req.body.image)

      // array to
      for (var i = 0; i < req.files.length; i++) {
        const picBase64 = req.files[i].buffer.toString('base64')
        var fileExtension = req.files[i].originalname.split('.').pop()
        const gambarName =
          'products' + Date.now() + req.user.id + `${fileExtension}`
        // initialization imagekit
        const imgAddProduct = new ImageKitActions(
          picBase64,
          gambarName,
          '/userProducts',
        )
        const uploadImg_base64 = await imgAddProduct.createImg()
        console.log(uploadImg_base64.fileId)
        await productService.addImageProduct({
          idbarang: addProduct.id,
          // ambil fileid dari imagekit
          gambar: uploadImg_base64.fileId,
        })
      }
      res.status(201).json({
        message: 'New Product Added',
        product: addProduct,
      })
    } catch (error) {
      console.log(error.message)
      res.status(400).json({
        message: error.message,
      })
    }
  },
  // ------------------------------------------------
  async deleteProduct(req, res) {
    try {
      const { id, oldImage } = req.query

      // Delete Image from Cloudinary
      if (oldImage !== undefined) {
        if (Array.isArray(oldImage)) {
          // Kalo bentuknya array
          for (var x = 0; x < oldImage.length; x++) {
            cloudinaryDestroy(oldImage[x])
          }
        } else {
          // Kalo bentuknya string cuma 1 image
          cloudinaryDestroy(oldImage)
        }
      }

      productsService.delete(id).then(() => {
        res.status(200).json({
          status: 'OK',
          message: 'Product deleted',
        })
      })
    } catch (error) {
      res.status(500).json({
        error: error.message,
      })
    }
  },

  // ---------------------------------------------tambah kategori baru
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

  // ------------------------list all category
  async listCategory(req, res) {
    try {
      const list = await productService.listCategory()
      res.status(200).json({
        list,
      })
    } catch (error) {
      res.status(404).json({
        message: error.message,
      })
    }
  },
}

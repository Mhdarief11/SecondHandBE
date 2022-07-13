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
      // const imageKitConfig = new ImageKit(configImageKit)
      const product = {
        iduser: req.user.id,
        idkategori: req.body.kategori,
        nama: req.body.nama,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
      }
      const addProduct = await productService.addProduct(product)
      console.log('ini request body image')

      // array to
      for (let i = 0; i < req.files.length; i++) {
        const picBase64 = req.files[i].buffer.toString('base64')

        const gambarName = 'products' + Date.now() + req.user.id
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


  // ------------------------update//
//   async updateProduct(req, res) {
//     try {
//       const idProduct = req.params.id;
//       const product = {
//         idkategori: req.body.kategori,
//         nama: req.body.nama,
//         harga: req.body.harga,
//         deskripsi: req.body.deskripsi,
//         minat: false,
//       }

//       const Product=await productService.findProductPicByIdProduct(idProduct);
//       const isiGambar=Product.gambarbarangs;
//       await productService.updateProduct(idProduct, product);
      
//       console.log('ini request body image 1');
//       console.log(req.body.image)
//       console.log(Product.gambarbarangs)
//       console.log(Product.gambarbarangs.length)
//       console.log(req.files.length)

//       // array to
//       // for (let i = 0; i < req.files.length; i++) {
//       //   var picBase64 = req.files[i].buffer.toString('base64')
//       //   var gambarName = 'products' + Date.now() + req.user.id
//       //   // initialization imagekit
//       //   const imgUpdateProduct = new ImageKitActions(
//       //     picBase64,
//       //     gambarName,
//       //     '/userProducts',
//       //   )
//       //   //delete old image di imageKit
//       //   const deleteImg_base64 = await imgUpdateProduct.deleteImg(Product.gambarbarangs[i].gambar)
//       //   console.log(deleteImg_base64)
//       //   console.log(Product.gambarbarangs[i].gambar)
//       //   //delete old image di tabel
//       //   await productService.deleteProductPic({
//       //     id: Product.gambarbarangs[i].id,
//       //   })
//       // }

// console.log('udah di delete')

//       // array to
//       // for (let j = 0; j < req.files.length; j++) {
//       //   var picBase64 = req.files[j].buffer.toString('base64')
//       //   var gambarName = 'products' + Date.now() + req.user.id
//       //   // initialization imagekit
//       //   const imgUpdateProduct = new ImageKitActions(
//       //     picBase64,
//       //     gambarName,
//       //     '/userProducts',
//       //   )

//       //   const uploadImg_base64 = await imgUpdateProduct.createImg()
//       //   console.log(uploadImg_base64)
//       //   await productService.addImageProduct({
//       //     idbarang: Product.id,
//       //     // ambil fileid dari imagekit
//       //     gambar: uploadImg_base64.fileId,
//       //   })
//       // }

//       res.status(201).json({
//         message: 'Upp',
//         product: Product.gambarbarangs,
//       })

//     } catch (error) {
//       console.log(error.message)
//       res.status(400).json({
//         message: error.message,
//       })
//     }
//   },
  
  
  // -----------------id-------------------------------
  getProductById: async (req, res) => {
    try {
      const product = await productService.getById(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({
        error: error.message,
      })
    }
  },
  getProductByKategori: async (req, res) => {
    try {
      // let tokenPayload = { id: null };
      // if (req.headers.authorization !== "") {
      //   const bearerToken = req.headers.authorization;
      //   const token = bearerToken.split("Bearer ")[1];
      //   tokenPayload = await verifyToken(token);
      // }

      const product = await productService.getByKategori({
        // id: tokenPayload.id,
        idkategori: req.query.idkategori,
      })
      res.status(200).json({ barang: product })
    } catch (error) {
      res.status(500).json({
        error: error.message,
      })
    }
  },
  // -----------------delete-------------------------------
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

      productService.delete(id).then(() => {
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
        idkategori: req.body.kategori,
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
        category: list,
      })
      return
    } catch (error) {
      res.status(404).json({
        message: error.message,
      })
    }
  },
  // ------------------------search category
  async findCategory(req, res) {
    try {
      const category = await productService.findCateg(req.params.id)
      res.status(200).json({
        category,
      })
    } catch (error) {
      res.status(400).json({
        message: 'Category Not Found',
      })
    }
  },
  // ----------------------------get image details
  async findProductPic(req, res) {
    try {
      let result
      const { id } = req.params
      // const productPic = await productService.findProductPic(id)
      // console.log(productPic)
      if (id == null) {
        res.status(400).json({
          message: 'gambar produk tidak tersedia',
        })
        return
      }
      const getDetails = new ImageKitActions('', '', '')
      result = await getDetails.getImgDetails(id)
      console.log(result)
      if (getDetails == '' || getDetails == 'error') {
        res.status(422).json({
          message: 'detail gambar gagal diambil',
        })
        return
      }

      res.status(201).json({
        gambar: result,
      })
    } catch (error) {
      console.log(error)
      res.status(422).json({
        message: error.message,
      })
    }
  },
  // --------------filter products by user id not shown
  async filterProductsUser(req, res) {
    try {
      const userId = req.user.id
      const result = await productService.filterProductsByUser(userId)
      res.status(200).json({ data: result })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  // filter products by category user auth
  async filterCategorybyUserId(req, res) {
    try {
      const product = await productService.filterCategoryAuth(
        req.user.id,
        req.query.idkategori,
      )
      res.status(200).json({ data: product })
    } catch (error) {
      res.status(400).json({
        messa: error.message,
      })
    }
  },
}

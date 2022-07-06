const productService = require("../../../services/productService");
const cloudinary = require("../../../../config/cloudinary");
const ImageKit = require("imagekit");
const configImageKit = require("../../../imageKit/ImageKitConfig");
const { promisify } = require("util");
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);
const jwt = require("jsonwebtoken");

// function verifyToken(token) {
//   try {
//     return jwt.verify(token, "Rahasia");
//   } catch (error) {
//     throw new Error(error);
//   }
// }

module.exports = {
  // tampilkan semua barang
  async listAll(req, res) {
    try {
      const product = await productService.list();
      // console.log(product)
      if (product.totalBarang === 0) {
        res.status(404).json({
          message: "Product is Empty",
        });
        return;
      }
      res.status(200).json({
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  // ------------------------------------------------tambah barang baru
  async addProduct(req, res) {
    try {
      const imageKitConfig = new ImageKit(configImageKit);
      const product = {
        iduser: req.user.id,
        idkategori: req.body.kategori,
        nama: req.body.nama,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
      };
      const addProduct = await productService.addProduct(product);
      // console.log(req.body)

      // array to
      for (var i = 0; i < req.files.length; i++) {
        const picBase64 = req.files[i].buffer.toString("base64");
        var fileExtension = req.files[i].originalname.split(".").pop();
        const gambarName =
          "products" + Date.now() + req.user.id + `${fileExtension}`;
        const uploadImg_base64 = await imageKitConfig.upload({
          file: picBase64,
          fileName: gambarName,
          folder: "/userProducts",
        });
        //console.log('file', uploadImg_base64.fileId)
        await productService.addImageProduct({
          idbarang: addProduct.id,
          // ambil fileid dari imagekit
          gambar: uploadImg_base64.fileId,
        });
      }
      res.status(201).json({
        message: "New Product Added",
        product: addProduct,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  // ------------------------update//

  // updateProduct: async (req, res) => {
  //   const {
  //     id,
  //     iduser,
  //     nama,
  //     harga,
  //     idkategori,
  //     deskripsi,

  //     oldImage,
  //   } = req.body;
  //   const gambarName = [];
  //   const picBase64 = [];
  //   const file = [];

  //   try {
  //     // Delete Image from Cloudinary
  //     if (oldImage !== undefined) {
  //       if (Array.isArray(oldImage)) {
  //         // Kalo bentuknya array
  //         for (var x = 0; x < oldImage.length; x++) {
  //           cloudinaryDestroy(oldImage[x]);
  //         }
  //       } else {
  //         // Kalo bentuknya string cuma 1 image
  //         cloudinaryDestroy(oldImage);
  //       }
  //     }

  //     // Upload New Image to Cloudinary
  // //     if (req.files.length > 0) {
  // //       for (var i = 0; i < req.files.length; i++) {
  // //         picBase64.push(req.files[i].buffer.toString("base64"));
  // //         file.push(`data:${req.files[i].mimetype};base64,${picBase64[i]}`);
  // //         const result = await cloudinaryUpload(file[i]);
  // //         fotoProduk.push(result.secure_url);
  // //       }
  // //     }

  // //     let updateArgs = {
  // //       iduser,
  // //       nama,
  // //       harga,
  // //       idkategori,
  // //       deskripsi,
  // //     };

  // //     if (fotoProduk.length > 0) {
  // //       updateArgs = {
  // //         ...updateArgs,
  // //         fotoProduk,
  // //       };
  // //     }

  // //     productsService.update(id, updateArgs).then(() => {
  // //       res.status(200).json({
  // //         status: "OK",
  // //         message: "Product updated",
  // //       });
  // //     });
  // //   } catch (error) {
  // //     res.status(500).json({
  // //       error: error.message,
  // //     });
  // //   }
  // // },
  // -----------------id-------------------------------
  getProductById: async (req, res) => {
    try {
      const product = await productService.getById(req.query.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
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
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  // -----------------delete-------------------------------
  async deleteProduct(req, res) {
    try {
      const { id, oldImage } = req.query;

      // Delete Image from Cloudinary
      if (oldImage !== undefined) {
        if (Array.isArray(oldImage)) {
          // Kalo bentuknya array
          for (var x = 0; x < oldImage.length; x++) {
            cloudinaryDestroy(oldImage[x]);
          }
        } else {
          // Kalo bentuknya string cuma 1 image
          cloudinaryDestroy(oldImage);
        }
      }

      productService.delete(id).then(() => {
        res.status(200).json({
          status: "OK",
          message: "Product deleted",
        });
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  // ---------------------------------------------tambah kategori baru
  async addCategory(req, res) {
    try {
      const kategori = await productService.addCategory({
        idkategori: req.body.kategori,
      });
      res.status(201).json({
        data: kategori,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  // ------------------------list all category
  async listCategory(req, res) {
    try {
      const list = await productService.listCategory();
      res.status(200).json({
        category: list,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  },
};

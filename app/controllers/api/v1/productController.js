const productService = require("../../../services/productService");
const ImageKitActions = require("../../../imageKit/ImageKitActions");
const ImageKit = require("imagekit");
require("dotenv").config();

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

      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  //------
  getProductByName: async (req, res) => {
    try {
      const nama = req.query.nama.toLowerCase();
      const barang = await productService.getByNama(nama);
      console.log(nama);
      res.status(200).json(barang);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
      console.log(error);
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
        available: true,
      };
      const addProduct = await productService.addProduct(product);
      console.log("ini request body image");

      // array to
      for (let i = 0; i < req.files.length; i++) {
        const picBase64 = req.files[i].buffer.toString("base64");

        const gambarName = "products" + Date.now() + req.user.id;
        // initialization imagekit
        const imgAddProduct = new ImageKitActions(
          picBase64,
          gambarName,
          "/userProducts"
        );
        const uploadImg_base64 = await imgAddProduct.createImg();
        console.log(uploadImg_base64.fileId);
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
      console.log(error.message);
      res.status(400).json({
        message: error.message,
      });
    }
  },

  // ------------------------update//
  async updateProduct(req, res) {
    try {
      const idProduct = req.params.id;
      const product = {
        idkategori: req.body.kategori,
        nama: req.body.nama,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
      };

      const Product = await productService.findProductPicByIdProduct(idProduct);
      const isiGambar = Product.gambarbarangs;
      await productService.updateProduct(idProduct, product);

      console.log("ini request body image 1");
      console.log(Product.gambarbarangs);
      console.log(Product.gambarbarangs.length);
      console.log(req.files.length);

      // array to
      if (isiGambar < req.length) {
        for (let i = 0; i < isiGambar; i++) {
          console.log("isi perulangan");
          var picBase64 = req.files[i].buffer.toString("base64");
          var gambarName = "products" + Date.now() + req.user.id;
          // initialization imagekit
          var imgUpdateProduct = new ImageKitActions(
            picBase64,
            gambarName,
            "/userProducts"
          );
          //delete old image di imageKit
          const deleteImg_base64 = await imgUpdateProduct.deleteImg(
            Product.gambarbarangs[i].gambar
          );
          console.log(deleteImg_base64);
          console.log(Product.gambarbarangs[i].gambar);
          //delete old image di tabel
          await productService.deleteProductPic(Product.gambarbarangs[i].id);
        }
      } else {
        for (let i = 0; i < req.files.length; i++) {
          console.log("isi perulangan");
          var picBase64 = req.files[i].buffer.toString("base64");
          var gambarName = "products" + Date.now() + req.user.id;
          // initialization imagekit
          var imgUpdateProduct = new ImageKitActions(
            picBase64,
            gambarName,
            "/userProducts"
          );
          //delete old image di imageKit
          const deleteImg_base64 = await imgUpdateProduct.deleteImg(
            Product.gambarbarangs[i].gambar
          );
          console.log(deleteImg_base64);
          console.log(Product.gambarbarangs[i].gambar);
          //delete old image di tabel
          await productService.deleteProductPic(Product.gambarbarangs[i].id);
        }
      }

      console.log("udah di delete");

      // array to
      for (let j = 0; j < req.files.length; j++) {
        var picBase64 = req.files[j].buffer.toString("base64");
        var gambarName = "products" + Date.now() + req.user.id;
        // initialization imagekit
        var imgUpdateProduct = new ImageKitActions(
          picBase64,
          gambarName,
          "/userProducts"
        );

        //add to imageKit
        const uploadImg_base64 = await imgUpdateProduct.createImg();
        console.log(uploadImg_base64);
        //add to tabel gambarbarang
        await productService.addImageProduct({
          idbarang: Product.id,
          // ambil fileid dari imagekit
          gambar: uploadImg_base64.fileId,
        });
      }

      res.status(201).json({
        message: "Uppdate Succes",
        product: Product.gambarbarangs,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({
        message: error.message,
      });
    }
  },

  // -----------------id-------------------------------
  getProductById: async (req, res) => {
    try {
      const product = await productService.getById(req.params.id);
      if (product == null) {
        res.status(400).json({ message: "produk tidak ditemukan" });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  // find product by kategori
  getProductByKategori: async (req, res) => {
    try {
      const product = await productService.getByKategori({
        // id: tokenPayload.id,
        idkategori: req.query.idkategori,
      });
      if (product == "") {
        res.status(400).json({ message: "Produk tidak ditemukan" });
        return;
      }
      res.status(200).json({ barang: product });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  // -----------------delete----------------------------------------------
  async deleteProduct(req, res) {
    try {
      var imagekit = new ImageKit({
        /* publicKey: process.env.IMAGEKITPUBLIC,
        privateKey: process.env.IMAGEKITPRIVATE,
        urlEndpoint: process.env.IMAGEKITPRIVATE, */
        publicKey: "public_b7fWahY809+IvS1HfCSCWGxdYQA=",
        privateKey: "private_pBTB5FrC5NcJPAcBgXsyRhJuXo0=",
        urlEndpoint: "https://ik.imagekit.io/jmprup9kb",
      });
      const id = req.params.id;

      // Delete Image from imagekit
      const Product = await productService.findProductPicByIdProduct(id);
      const isiGambar = Product.gambarbarangs;

      // array to
      for (let i = 0; i < isiGambar.length; i++) {
        console.log("isi perulangan");

        console.log(Product.gambarbarangs[i].gambar);

        await imagekit.deleteFile(
          Product.gambarbarangs[i].gambar,
          function (error, result) {
            if (error) console.log(error);
            else console.log(result);
          }
        );

        //delete old image di tabel
        await productService.deleteProductPic(Product.gambarbarangs[i].id);
      }

      await productService.delete(id, req.user.id);

      res.status(200).json({
        status: "OK",
        message: "Product deleted",
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
        nama_kategori: req.body.kategori,
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
      return;
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  },
  // ------------------------search category
  async findCategory(req, res) {
    try {
      const category = await productService.findCateg(req.params.id);
      res.status(200).json({
        category,
      });
    } catch (error) {
      res.status(400).json({
        message: "Category Not Found",
      });
    }
  },
  // ----------------------------get image details
  async findProductPic(req, res) {
    try {
      let result;
      const { id } = req.params;
      // const productPic = await productService.findProductPic(id)
      // console.log(productPic)
      if (id == null || id == "null") {
        res.status(400).json({
          message: "gambar produk tidak tersedia",
        });
        return;
      }

      const getDetails = new ImageKitActions("", "", "");
      result = await getDetails.getImgDetails(id);
      // console.log(result)
      if (result == '' || result == 'error') {

        res.status(422).json({
          message: "detail gambar gagal diambil",
        });
        return;
      }

      /* if (result == null || result == "null") {

      } */

      res.status(201).json({
        gambar: result,
      });
    } catch (error) {
      console.log(error);
      res.status(422).json({
        message: error.message,
      });
    }
  },
  // --------------filter products by not user id shown
  async filterProductsUser(req, res) {
    try {
      const userId = req.user.id;
      const result = await productService.filterProductsByUser(userId);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // filter products by category not user id  auth
  async filterCategorybyUserId(req, res) {
    try {
      const product = await productService.filterCategoryAuth(
        req.user.id,
        req.query.idkategori
      );
      res.status(200).json({ data: product });
    } catch (error) {
      res.status(400).json({
        messa: error.message,
      });
    }
  },
};

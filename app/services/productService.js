const productRepository = require("../repositories/productRepository");

module.exports = {
  async list() {
    try {
      const barang = await productRepository.findAll();
      const totalBarang = await productRepository.getTotalProducts();
      return {
        barang,
        totalBarang,
      };
    } catch (error) {
      throw error;
    }
  },

  getByNama(nama) {
    return productRepository.findByName(nama);
  },

  async findProductPic(id) {
    return productRepository.findProductPic(id);
  },
  async updateProduct(idProduct, requestBody) {
    try {
      return productRepository.updateProduct(idProduct, requestBody);
    } catch (error) {
      throw error;
    }
  },
  async findProductPicByIdProduct(id) {
    try {
      return productRepository.findProductPicByIdProduct(id);
    } catch (error) {
      throw error;
    }
  },
  async deleteProductPic(id) {
    return productRepository.deleteProductPic(id);
  },
  async delete(id) {
    return productRepository.delete(id);
  },

  async addCategory(requestBody) {
    return productRepository.addCategory(requestBody);
  },
  getById(id) {
    return productRepository.findById(id);
  },

  getByKategori(Args) {
    return productRepository.findByKategori(Args);
  },

  async addProduct(requestBody) {
    return productRepository.addProduct(requestBody);
  },

  async addImageProduct(requestBody) {
    return productRepository.addImageProduct(requestBody);
  },

  async listCategory() {
    try {
      const listcategory = await productRepository.listCategory();
      return listcategory;
    } catch (error) {
      throw error;
    }
  },

  async findCateg(data) {
    try {
      const nameCateg = await productRepository.findCategory(data);
      return nameCateg;
    } catch (error) {
      throw error;
    }
  },

  async filterProductsByUser(id) {
    try {
      const barang = await productRepository.filterByUser(id);
      return { barang: barang };
    } catch (error) {
      throw error;
    }
  },

  async filterCategoryAuth(id, args) {
    try {
      const barang = await productRepository.filterByCategoryAuth(id, args);
      return { barang: barang };
    } catch (error) {
      throw error;
    }
  },
};

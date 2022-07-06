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
  update(id, requestBody) {
    return productRepository.update(id, requestBody);
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
};

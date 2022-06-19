/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const userController = require('./userController')
const productController = require('./productController')

module.exports = {
  userController,
  productController,
}

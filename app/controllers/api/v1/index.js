/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const userController = require('./userController')
const productController = require('./productController')
const cityController = require('./cityController')
const transactionController = require('./transactionController')

module.exports = {
  userController,
  productController,
  cityController,
  transactionController,
}

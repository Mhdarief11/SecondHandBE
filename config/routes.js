const express = require('express')
const controllers = require('../app/controllers')
const apiRouter = express.Router()

apiRouter.post(
  '/api/v1/auth/register',
  controllers.api.v1.userController.register,
)

//login

apiRouter.post('/api/v1/auth/login', controllers.api.v1.userController.login)

// barang
apiRouter.get('/api/v1/products', controllers.api.v1.productController.listAll)
// tambah barang
apiRouter.post(
  '/api/v1/products',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.whoAmI,
  controllers.api.v1.productController.addProduct,
)
// tambah kategori barang
apiRouter.post(
  '/api/v1/category',
  controllers.api.v1.productController.addCategory,
)

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
// apiRouter.get("/api/v1/errors", () => {
//   throw new Error(
//     "The Industrial Revolution and its consequences have been a disaster for the human race."
//   );
// });

apiRouter.use(controllers.api.main.onLost)
apiRouter.use(controllers.api.main.onError)

module.exports = apiRouter

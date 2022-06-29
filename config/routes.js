const express = require('express')
const controllers = require('../app/controllers')
const apiRouter = express.Router()
const uploadOnMemory = require('../app/services/uploadOnMemory')
const yaml = require('yamljs')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = yaml.load('./openApi.yaml')

apiRouter.post(
  '/api/v1/auth/register',
  controllers.api.v1.userController.register,
)

//login
apiRouter.post('/api/v1/auth/login', controllers.api.v1.userController.login)
apiRouter.post('/api/v1/auth/google', controllers.api.v1.userController.Google)

// GET USER DATA
apiRouter.get('/api/v1/users/siapaSaya', controllers.api.v1.userController.authorize, controllers.api.v1.userController.whoAmI);

apiRouter.get("/api/v1/users/profileImg/details/:id", controllers.api.v1.userController.getImg);


// UPDATE USER PROFILE
apiRouter.put('/api/v1/users/update/:id', controllers.api.v1.userController.authorize, uploadOnMemory.single("gambar"), controllers.api.v1.userController.update);

// barang
apiRouter.get('/api/v1/products', controllers.api.v1.productController.listAll)
// tambah barang
apiRouter.post(
  '/api/v1/products',
  uploadOnMemory.array('image', 4),
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.addProduct,
)
// add new products category
apiRouter.post(
  '/api/v1/category',
  controllers.api.v1.productController.addCategory,
)

// list all city
apiRouter.get('/api/v1/cities', controllers.api.v1.cityController.listAllCity)

// docs
apiRouter.get('/api/v1/docs/swagger.json', (req, res) => {
  res.status(200).json(swaggerDocument)
})
apiRouter.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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

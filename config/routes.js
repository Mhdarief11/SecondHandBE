const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();
const uploadOnMemory = require("../app/uploadOnMemory")

/**
 * TODO: Implement your own API
 *       implementations
 */

//register

apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);

//login

apiRouter.post("/api/v1/auth/login", controllers.api.v1.userController.login);

// UPDATE USER PROFILE
apiRouter.put("/api/v1/users/:id", uploadOnMemory.single("gambar"), controllers.api.v1.userController.update);
// apiRouter.put("/api/v1/posts/:id", controllers.api.v1.postController.update);
// apiRouter.get("/api/v1/posts/:id", controllers.api.v1.postController.show);
// apiRouter.put("/api/v1/users/:id", controllers.api.v1.userController.update);

// apiRouter.delete(
//   "/api/v1/posts/:id",
//   controllers.api.v1.postController.destroy
// );

// DAFTAR KOTA
apiRouter.get("/api/v1/cities", controllers.api.v1.userController.listKota);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;

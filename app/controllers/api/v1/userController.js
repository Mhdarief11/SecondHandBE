const userService = require('../../../services/userService')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const ImageKitActions = require('../../../imageKit/ImageKitActions')
const { user } = require('../../../models')
// const { response } = require('express')
const Salt = 10;

/* Create token function */
function createToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET || 'secret', {
    expiresIn: 30 * 60,
  })
}

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, Salt, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err)
        return
      }
      resolve(isPasswordCorrect)
    })
  })
}

class userController {
  static async register(req, res) {
    const { nama, email } = req.body
    const password = await encryptPassword(req.body.password)
    const registeredVia = 'website'

    // check email is used before or not
    const notavail = await userService.find(req.body.email)
    if (notavail) {
      res.status(400).send({
        message: 'Email already exists',
      })
      return
    }

    // add email if not exists
    userService
      .create({ nama, email, password, registeredVia })
      .then(async ({ id, nama, email }) => {
        const User = await user.findOne({
          where: { email },
        })
        res.status(201).json({
          data: { id, nama, email, registeredVia },
        })
      })
      .catch((err) => {
        res.status(422).json({
          message: err.message,
        })
      })
  }

  static async login(req, res) {
    try {
      const email = req.body.email.toLowerCase()
      const password = req.body.password

      const User = await userService.find(email)
      if (!User) {
        res.status(404).json({ status: "FAILED", message: "Email not found" });
        return
      }

      const isPasswordCorrect = await checkPassword(User.password, password)

      if (!isPasswordCorrect) {
        res.status(401).json({ status: "FAILED", message: "Password incorrect" });
        return
      }

      // buat token
      const token = createToken({
        id: User.id,
        email: User.email,
        createdAt: User.createdAt,
        updatedAt: User.updatedAt,
      })

      //return
      res.status(201).json({
        id: User.id,
        email: User.email,
        token,
        createdAt: User.createdAt,
        updatedAt: User.updatedAt,
      })
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: error.message,
      });
    }
  }

  static async authorize(req, res, next) {
    try {
      console.log("\nAuthorization\n")
      const bearerToken = req.headers.authorization
      // console.log(bearerToken)
      const token = bearerToken.split('Bearer ')[1]

      const tokenPayLoad = jwt.verify(token, process.env.JWT_SECRET || 'secret')

      // console.log(tokenPayLoad)

      req.user = JSON.parse(
        // JSON.stringify(await userService.findPKUser(tokenPayLoad.id)),
        JSON.stringify(await userService.find(tokenPayLoad.email))
      );
      // delete encrypted password
      delete req.user.password
      next()

    } catch (error) {
      /* console.log("\npesan error")
      console.log(error);
      console.log("\nv") */
      if (error.message.includes('jwt expired')) {
        res.status(401).json({ status: "FAILED", message: "Token Expired" });
        return
      }

      res.status(401).json({
        status: "FAILED",
        message: 'Login terlebih dahulu',
      })
    }
  }

  static async whoAmI(req, res) {
    try {
      /* const ngetes = req.user;
      console.log(ngetes); */

      res.status(200).json({
        status: 'OK',
        data: req.user,
      })
    } catch (err) {
      res.status(404).json({
        status: "FAILED",
        message: err.message,
      });
    }
  }

  static async Google(req, res) {
    const { access_token } = req.body
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
      )

      const { sub, email, name, picture } = response.data

      let User = await user.findOne({ where: { googleId: sub } })
      // console.log(response.data)
      if (!User)
        User = await user.create({
          email,
          nama: name,
          googleId: sub,
          password: '',
          gambar: picture,
          registeredVia: 'google',
        })

      User = JSON.parse(JSON.stringify(User))
      delete User.encryptedPassword

      const token = createToken(User)

      res.status(201).json({ token })
    } catch (err) {
      res.status(401).json({ message: err.message })
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      let { nama, alamat, nohp, idkota } = req.body;
      const User = await userService.findPKUser(id);

      if (User == null) {
        res.status(404).json({
          status: "failed",
          message: "User Tidak Ditemukan Saat Proses Update!",
        });
        return;
      }

      /* Initiallize empty req.body attribute */
      if (req.body.nama == null) {
        nama = User.nama;
      }
      if (req.body.alamat == null) {
        alamat = User.alamat;
      }
      if (req.body.idkota == null) {
        idkota = User.idkota;
      }
      if (req.body.nohp == null) {
        nohp = User.nohp;
      }

      // console.log("GAMBAR BODY, -" + req.body.gambar);

      let profilePic, picToSend;

      console.log(req.body);

      /* Process to check if user has Profile Image */
      if (req.body.gambar === "" || req.body.gambar === null || req.body.gambar == "undefined" || req.body.gambar == undefined) {

        console.log("GAMBAR KOSONG")

        if (User.gambar === "" || User.gambar === null) {
          profilePic = "";

        } else {
          profilePic = User.gambar;
          
        }
      } else {
        /* Convert Image File To Base64 */
        const picBase64 = req.file.buffer.toString("base64");
        /* Custom Profile Image File Name */
        const gambarName = "profileimgDan" + Date.now() + "Dan" + id;

        let imgUpdateUser = new ImageKitActions(picBase64, gambarName, "/userProfile");

        /* Process to delete old profile img or add new profile img */
        if (User.gambar == null || User.gambar == "" || User.gambar == "undefined") {
          console.log("\nEmpty Old Img\n");

          /* uploading profile image to ImageKit CLoud */
          profilePic = await imgUpdateUser.createImg();

          if (profilePic == "error") {
            res.status(422).json({
              status: "FAILED",
              message: "See Console Log For Details",
            });
            return;
          } else {
            picToSend = profilePic.fileId;
          }
        } else {
          /* Deleting old profile image */
          let deleteImgResponse = await imgUpdateUser.deleteImg(User.gambar);

          if (deleteImgResponse == "error") {
            res.status(422).json({
              status: "FAILED",
              message: "See Console Log For Details",
            });
            return;
          }

          /* uploading profile image to ImageKit CLoud */
          profilePic = await imgUpdateUser.createImg();
          // console.log("AFTER UPLOAD");
          // console.log(profilePic);

          if (profilePic == "error") {
            res.status(422).json({
              status: "FAILED",
              message: "See Console Log For Details",
            });
            return;
          } else {
            picToSend = profilePic.fileId;
          }

          // console.log("FILE ID, " + profilePic);
        }
      }

      // console.log('udh smpe service')

      userService
        .update(id, idkota, nama, alamat, nohp, picToSend)
        .then(() => {
          res.status(201).json({
            status: "OK",
          });
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
    } catch (err) {
      console.log(err)
      res.status(422).json({
        status: 'FAIL',
        message: err.message,
      })
      return
    }
  }

  static async getImg(req, res) {
    try {
      let result;
      const { id } = req.params;

      /* Process to check if user has Profile Image */
      const User = await userService.findPKUser(id);

      // console.log(User);

      if (User == null) {
        res.status(404).json({
          status: 'failed',
          message: 'User Tidak Ditemukan Saat Proses Detail Gambar!',
        })
        return
      }

      const getDetails = new ImageKitActions('', '', '')

      result = await getDetails.getImgDetails(User.gambar)

      if (getDetails == '' || getDetails == 'error') {
        res.status(422).json({
          status: 'FAILED',
          message: 'See Console Log For Details',
        })
        return
      }

      res.status(200).json({
        status: 'OK',
        dataImg: result,
      })
    } catch (error) {
      console.log(error)
      res.status(422).json({
        status: 'FAILED',
        message: error.message,
      })
      return
    }
  }
}

module.exports = userController

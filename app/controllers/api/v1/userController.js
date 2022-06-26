const userService = require("../../../services/userService");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const ImageKit = require("imagekit");
const configImageKit = require("../../../services/ImageKit");
const { user } = require("../../../models");
const { response } = require("express");
const Salt = 10;

/* Create token function */
function createToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET || "secret", {
    expiresIn: 30 * 60,
  });
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
        reject(err);
        return;
      }
      resolve(isPasswordCorrect);
    });
  });
}

class userController {
  static async register(req, res) {
    const { nama, email } = req.body;
    const password = await encryptPassword(req.body.password);
    const registeredVia = "website";

    // check email is used before or not
    const notavail = await userService.find(req.body.email);
    if (notavail) {
      res.status(400).send({
        message: "Email already exists",
      });
      return;
    }

    // add email if not exists
    userService
      .create({ nama, email, password, registeredVia })
      .then(async ({ id, nama, email }) => {
        const User = await user.findOne({
          where: { email },
        });
        res.status(201).json({
          data: { id, nama, email, registeredVia },
        });
      })
      .catch((err) => {
        res.status(422).json({
          message: err.message,
        });
      });
  }

  static async login(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      const User = await userService.find(email);
      if (!User) {
        res.status(404).json({ message: "Email not found" });
        return;
      }

      const isPasswordCorrect = await checkPassword(User.password, password);

      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Password incorrect" });
        return;
      }

      // buat token
      const token = createToken({
        id: User.id,
        email: User.email,
        createdAt: User.createdAt,
        updatedAt: User.updatedAt,
      });

      //return
      res.status(201).json({
        id: User.id,
        email: User.email,
        token,
        createdAt: User.createdAt,
        updatedAt: User.updatedAt,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];

      const tokenPayLoad = jwt.verify(token, process.env.JWT_SECRET || "secret");

      req.user = JSON.parse(JSON.stringify(await userService.findPKUser(tokenPayLoad.id)));
      // delete encrypted password
      delete req.user.password;
      next();
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(401).json({ message: "Token Expired" });
        return;
      }

      res.status(401).json({
        message: error.message,
      });
    }
  }

  static async whoAmI(req, res) {
    res.status(200).json({
      data: req.user,
    });
  }

  static async Google(req, res) {
    const { access_token } = req.body;
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

      const { sub, email, name, picture } = response.data;

      let User = await user.findOne({ where: { googleId: sub } });
      // console.log(response.data)
      if (!User)
        User = await user.create({
          email,
          nama: name,
          googleId: sub,
          password: "",
          gambar: picture,
          registeredVia: "google",
        });

      User = JSON.parse(JSON.stringify(User));
      delete User.encryptedPassword;

      const token = createToken(User);

      res.status(201).json({ token });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  static async update(req, res) {
    const imageKitConfig = new ImageKit(configImageKit);
    const { id } = req.params;
    const { nama, alamat, nohp, idkota } = req.body;
    let profilePic;

    // Convert Image File To Base64
    const picBase64 = req.file.buffer.toString("base64");
    // Custom Profile Image File Name
    var fileExtension = req.file.originalname.split(".").pop();

    const gambarName = "profileimgDan" + Date.now() + "Dan" + id + `Dan.${fileExtension}`;
    // console.log("NAMA GAMBAR " + gambarName);

    // Process to check if user has Profile Image
    const User = await userService.findPKUser(id);
    if (User == null) {
      res.status(404).json({ message: "User Tidak Ditemukan !" });
      return;
    }

    // console.log("USER ID, "+User.id)

    // Process to delete old profile img or add new profile img
    if (User.gambar == null) {
      // console.log("UNTUK KOSONG");

      // uploading profile image to ImageKit CLoud
      await imageKitConfig
        .upload({
          file: picBase64,
          fileName: gambarName,
          folder: "/userProfile",
        })
        .then((response) => {
          profilePic = response.fileId;
        })
        .catch((error) => {
          console.log("ERROR IMG, " + error);
        });

      // profilePic = uploadImg_base64.fileId;

      console.log("FILE ID, " + profilePic);

      //
    } else {
      // 
      // console.log("UNTUK YG ADA");
      // console.log("IMG ID, -" + User.gambar + "-");
      // 
      // Deleting old profile image
      await imageKitConfig.deleteFile(User.gambar, function (error, result) {
        if (error) {
          console.log("Old img delete unsuccessful");
          // console.log(error)
        } else {
          console.log("Old img deleted successful");
          console.log(result);
        }
      });

      // uploading profile image to ImageKit CLoud
      await imageKitConfig
        .upload({
          file: picBase64,
          fileName: gambarName,
          folder: "/userProfile",
        })
        .then((response) => {
          console.log("Img upload successful");
          profilePic = response.fileId;
        })
        .catch((error) => {
          console.log("Img Upload Failed,")
          console.log(error);
        });

      // console.log("FILE ID, " + profilePic);
    }

    userService
      .update(id, idkota, nama, alamat, nohp, profilePic)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  }

  static async updateNP(req, res) {
    console.log("UPDATE NP RUNNINGGGGGGGGGG")
    try {
      const { id } = req.params;
      const { nama, alamat, nohp, idkota } = req.body;
      const gambar = "";

      userService
        .update(id, idkota, nama, alamat, nohp, gambar)
        .then(() => {
          res.status(200).json({
            status: "OK",
          });
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
    } catch (error) {
      // console.log(error.message);
      res.status(422).json({
        status: "FAIL",
        message: error.message,
      });
    }
  }
}

module.exports = userController;

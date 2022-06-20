const userService = require('../../../services/userService')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { user } = require('../../../models')
const Salt = 10

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
        reject(err)
        return
      }
      resolve(encryptedPassword)
    })
  })
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
    // const notavail = await userService.findByEmail(req.body.email)
    // // if (notavail) {
    //   return res.status(400).send({
    //     message: 'Email digunakan',
    //   })
    // }

    userService
      .create({ nama, email, password })
      .then(async ({ id, nama, email }) => {
        const User = await user.findOne({
          where: { email },
        })
        const token = createToken({
          id: User.id,
          email: User.email,
          createdAt: User.createdAt,
          updatedAt: User.updatedAt,
        })
        res.status(201).json({
          status: 'OK',
          token: token,
          data: { id, nama, email },
        })
      })
      .catch((err) => {
        res.status(422).json({
          status: 'FAIL',
          message: err.message,
        })
      })
  }
  static async login(req, res) {
    const email = req.body.email.toLowerCase()
    const password = req.body.password

    const User = await userService.find(email)

    if (!User) {
      res.status(404).json({ message: 'Email tidak ketemu' })
      return
    }

    const isPasswordCorrect = await checkPassword(User.password, password)

    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'salah' })
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
  }

  static async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization
      const token = bearerToken.split('Bearer ')[1]

      const tokenPayLoad = jwt.verify(token, process.env.JWT_SECRET || 'secret')

      req.user = JSON.parse(
        JSON.stringify(await userService.findPKUser(tokenPayLoad.id)),
      )
      // delete encrypted password
      delete req.user.password
      next()
    } catch (error) {
      if (error.message.includes('jwt expired')) {
        res.status(401).json({ message: 'Token Expired' })
        return
      }

      res.status(401).json({
        message: error.message,
      })
    }
  }

  static async whoAmI(req, res) {
    res.status(200).json({
      data: req.user,
    })
  }
}

module.exports = userController

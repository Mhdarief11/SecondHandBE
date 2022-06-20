const express = require('express')
const morgan = require('morgan')
const router = require('../config/routes')
const multer = require('multer')
const upload = multer()

const app = express()

/** Install request logger */
app.use(morgan('dev'))

/** Install JSON request parser */
app.use(express.json())

app.use(upload.array())

/** Install Router */
app.use(router)

module.exports = app

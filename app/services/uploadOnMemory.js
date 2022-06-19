const multer = require('multer')
const path = require('path')

// mendefinisikan penyimpanan file
const storage = multer.memoryStorage()

// middleware
module.exports = multer({ storage })

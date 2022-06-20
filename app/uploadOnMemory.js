const multer = require("multer");
// const path = require("path");

// console.log("UPLOADED TO MEMORY")

// Mendefinisikan gimana cara nyimpen file-nya
const storage = multer.memoryStorage();

// Membuat upload middleware
module.exports = multer({ storage });

require('dotenv').config()

var ImageKit = require('imagekit')

// const imageKitConfig = {
//   publicKey: process.env.IMAGEKITPUBLIC,
//   privateKey: process.env.IMAGEKITPRIVATE,
//   urlEndpoint: process.env.IMAGEKITURL,
// };

var imageKitConfig = new ImageKit({
  // publicKey: process.env.IMAGEKITPUBLIC,
  // privateKey: process.env.IMAGEKITPRIVATE,
  // urlEndpoint: process.env.IMAGEKITURL,
  IMAGEKITPUBLIC: 'public_b7fWahY809+IvS1HfCSCWGxdYQA=',
  IMAGEKITPRIVATE: 'private_pBTB5FrC5NcJPAcBgXsyRhJuXo0=',
  IMAGEKITURL: 'https://ik.imagekit.io/jmprup9kb',
})

module.exports = imageKitConfig

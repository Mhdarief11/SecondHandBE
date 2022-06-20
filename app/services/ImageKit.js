const ImageKit = require("imagekit");

// const imageKitConfig = {
//   publicKey: process.env.IMAGEKITPUBLIC,
//   privateKey: process.env.IMAGEKITPRIVATE,
//   urlEndpoint: process.env.IMAGEKITURL,
// };

const imageKitConfig = new ImageKit({
  publicKey: process.env.IMAGEKITPUBLIC,
  privateKey: process.env.IMAGEKITPRIVATE,
  urlEndpoint: process.env.IMAGEKITURL,
});

module.exports = imageKitConfig
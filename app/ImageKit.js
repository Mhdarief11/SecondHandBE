const ImageKit = require("imagekit");

const imageKitConfig = new ImageKit ({
  publicKey: process.env.IMAGEKITPUBLIC,
  privateKey: process.env.IMAGEKITPRIVATE,
  urlEndpoint: process.env.IMAGEKITURL,
});

module.exports = imageKitConfig
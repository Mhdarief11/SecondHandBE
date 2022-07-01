/* 
    For further examples, https://app.getpostman.com/run-collection/384637cdb2d49095b113
*/
// const configImageKit = require("./ImageKitConfig");
// let imageKitConfig = new ImageKit(configImageKit);
const ImageKit = require("imagekit");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const configImageKit = {
  publicKey: process.env.IMAGEKITPUBLIC,
  privateKey: process.env.IMAGEKITPRIVATE,
  urlEndpoint: process.env.IMAGEKITURL,
};

class ImageKitActions {
  constructor(file64, fileName, folder) {
    this.file64 = file64;
    this.fileName = fileName;
    this.folder = folder;
    this.imageKitConfig = new ImageKit(configImageKit);
  }

  async createImg() {
    let result

    await this.imageKitConfig
      .upload({
        file: this.file64,
        fileName: this.fileName,
        folder: this.folder,
      })
      .then((response) => {
        result = response
        console.log('Image Uploaded Successfully======')
        console.log('=======================\n')
        /*  console.log(response);
        console.log("=======================");
        console.log("======================="); */
      })
      .catch((error) => {
        console.log('Image Upload Error======')
        console.log('=======================\n')
        console.log(error)
        console.log('=======================')
        console.log('=======================')
        result = 'error'
      })

    return result

    /* // let file6="dummy";

    const data = new FormData();
    data.append("file", this.file64);
    // data.append("file", file6);
    data.append("fileName", this.fileName);
    data.append("folder", this.folder);

    var config = {
      method: "post",
      url: "https://upload.imagekit.io/api/v1/files/upload",
      headers: {
        Authorization: `Basic ${process.env.IMAGEKITAUTH}`,
        ...data.getHeaders(),
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        console.log("Image Uploaded Successfully======");
        console.log("=======================");
        console.log(response.data);
        // console.log(response.data.fileId);
        console.log("=======================");
        console.log("=======================\n");
        return response.data;
      })
      .catch((error) => {
        console.log("Image Error Upload Successfully======");
        console.log("=======================");
        console.log(error.message);
        // console.log(error.data.error);
        console.log("=======================");
        console.log("=======================\n");
        return "error";
      }); */
  }

  async deleteImg(fileId) {
    let data = ''
    let result

    const config = {
      method: 'delete',
      url: `https://api.imagekit.io/v1/files/${fileId}`,
      headers: {
        // Authorization: "Basic cHJpdmF0ZV9wQlRCNUZyQzVOY0pQQWNCZ1hzeVJoSnVYbzA9OiNDMDBsaW1hZ2VraXRtM24=",
        Authorization: `Basic ${process.env.IMAGEKITAUTH}`,
        Cookie: '_csrf=KZAEYsgpMNbtLozyfc3768uM',
      },
      data: data,
    }

    axios(config)
      .then((response) => {
        result = response
        console.log('Old Image Deleted Successfully======')
        /* console.log("=======================");
        console.log(response);
        console.log("======================="); */
        console.log('=======================\n')
      })
      .catch((error) => {
        console.log('Old Image Error Delete======')
        console.log('=======================')
        console.log(error.data)
        // console.log(error.data.error);
        console.log('=======================')
        console.log('=======================\n')
        result = 'error'
      })

    return result
  }

  async getImgDetails(fileId) {
    let result

    await this.imageKitConfig
      .getFileDetails(fileId)
      .then((response) => {
        result = response
        console.log('Image Details Fetched Successfully ======')
        console.log('=======================\n')
        /* console.log(response);
        console.log("=======================");
        console.log("=======================\n"); */
      })
      .catch((error) => {
        console.log('Image Detail Fetch Error ======')
        console.log('=======================')
        console.log(error.data)
        // console.log(error.data.error);
        console.log('=======================')
        console.log('=======================\n')
        result = 'error'
      })

    return result
  }
}

module.exports = ImageKitActions

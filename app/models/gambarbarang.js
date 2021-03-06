"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class gambarbarang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association hereç
    }
  }
  gambarbarang.init(
    {
      idbarang: DataTypes.INTEGER,
      gambar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "gambarbarang",
    }
  );
  return gambarbarang;
};

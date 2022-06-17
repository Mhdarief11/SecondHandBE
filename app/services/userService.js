const userRepository = require("../repositories/userRepository");

module.exports = {
  async create(requestBody) {
    return userRepository.create(requestBody);
  },
  find(dataEmail) {
    return userRepository.find(dataEmail);
  },
  findByEmail(email) {
    return userRepository.getByEmail(email);
  },
  findByPk(id) {
    return userRepository.getByPk(id);
  },
  // update(id, nama, idkota, alamat, nohp) {
  //   const data = { nama, idkota, alamat, nohp };
  //   return userRepository.update(id, data);
  // },
  update(id, nama, alamat, nohp) {
    const data = { nama, alamat, nohp };
    return userRepository.update(id, data);
  },
  async updateById({ id, nama, idkota, alamat, nohp, gambar }) {
    try {
      const updatedUsers = await userRepository.updateById({
        id,
        nama,
        idkota,
        alamat,
        nohp,
        gambar,
      });

      return {
        status: true,
        status_code: 200,
        message: "users updated successfully",
        data: {
          updated_users: updatedUsers,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          data: null,
        },
      };
    }
  },
};

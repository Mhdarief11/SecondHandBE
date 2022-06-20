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
  update(id, nama, alamat, nohp, gambar) {
    const data = { nama, alamat, nohp, gambar };
    return userRepository.update(id, data);
  },
};

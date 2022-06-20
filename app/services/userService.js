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
  update(id, idkota, nama, alamat, nohp, gambar) {
    const data = { idkota, nama, alamat, nohp, gambar };
    return userRepository.update(id, data);
  },
  async cities() {
    try {
      const kota = await userRepository.listCities();
      const kotaCount = await userRepository.citiesCount();

      return {
        data: kota,
        count: kotaCount,
      }
    } catch (err) {
      throw err;
    }
  },
};

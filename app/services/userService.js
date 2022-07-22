const userRepository = require("../repositories/userRepository");

module.exports = {
  async create(requestBody) {
    return userRepository.create(requestBody);
  },
  async find(dataEmail) {
    return userRepository.find(dataEmail);
  },
  async findPKUser(dataPK) {
    return userRepository.findPKUser(dataPK);
  },
  async update(id, idkota, nama, alamat, nohp, gambar) {
    const data = { idkota, nama, alamat, nohp, gambar };
    return userRepository.update(id, data);
  },
  async updateNP(id, idkota, nama, alamat, nohp) {
    console.log("UPDATE NP SERVICE");
    const data = { idkota, nama, alamat, nohp };
    return userRepository.update(id, data);
  },
  async cities() {
    try {
      const kota = await userRepository.listCities();
      const kotaCount = await userRepository.citiesCount();

      return {
        data: kota,
        count: kotaCount,
      };
    } catch (err) {
      throw err;
    }
  },
};

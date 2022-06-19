const userRepository = require('../repositories/userRepository')

module.exports = {
  async create(requestBody) {
    return userRepository.create(requestBody)
  },
  find(dataEmail) {
    return userRepository.find(dataEmail)
  },
  // findByEmail(email) {
  //   return userRepository.getByEmail(email);
  // },
  findPKUser(dataPK) {
    return userRepository.findPKUser(dataPK)
  },
}

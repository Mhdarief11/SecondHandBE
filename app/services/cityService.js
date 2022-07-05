const cityRepository = require('../repositories/cityRepository')

module.exports = {
  async list() {
    try {
      const city = await cityRepository.findAll()
      return {
        city,
      }
    } catch (error) {
      throw error
    }
  },

  find(data) {
    return cityRepository.findCity(data)
  },
}

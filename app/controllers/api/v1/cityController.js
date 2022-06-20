const cityService = require('../../../services/cityService')

module.exports = {
  async listAllCity(req, res) {
    try {
      const allCity = await cityService.list()
      res.status(200).json({
        allCity,
      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
      })
    }
  },
}

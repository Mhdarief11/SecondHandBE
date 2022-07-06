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

  async findCity(req, res) {
    try {
      const city = await cityService.find(req.params.id)
      res.status(200).json({
        city,
      })
    } catch (error) {
      res.status(400).json({
        message: 'City Not found',
      })
    }
  },
}

const cityService = require('../../../services/cityService')

module.exports = {
  async listAllCity(req, res) {
    try {
      const allCity = await cityService.list()
      res.status(200).json({
        allCity,
      })

      if (allCity == null || allCity == "null" || allCity == undefined || allCity == "undefined") {
        res.status(400).json({
          status: "FAILED",
          message: "Cities Empty",
        })
        return;
      }

      
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: error.message,
      })
    }
  },

  async findCity(req, res) {
    try {
      const city = await cityService.find(req.params.id)

      if (city == null || city == "null" || city == undefined || city == "undefined") {
        res.status(404).json({
          status: "FAILED",
          message: "City Not Found / Doesn't Exist",
        })
        
        return;
      }

      res.status(200).json({
        city,
      })

    } catch (error) {
      res.status(404).json({
        status: "FAILED",
        message: "City Not Found / Doesn't Exist",
      })
    }
  },
}

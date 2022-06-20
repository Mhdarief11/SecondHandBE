const { user, kota } = require('../models')

module.exports = {
  create(createArgs) {
    return user.create(createArgs)
  },
  find(email) {
    return user.findOne({
      where: { email },
    })
  },
  getByPk(id) {
    return user.findOne({
      where: { id },
    })
  },
  update(id, data) {
    return user.update(data, {
      where: {
        id,
      },
    });
  },
  listCities() {
    return kota.findAll();
  },
  citiesCount() {
    return kota.count();
  }
}

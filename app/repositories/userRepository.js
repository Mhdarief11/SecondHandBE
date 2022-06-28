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
  update(id, data) {
    console.log("UPDATE REPO");
    
      return user.update(data, {
      where: {
        id,
      },
    }).then(() => {
      console.log("UPDATE REPO SUCCESSFULL")
    }).catch(err => {
      console.log(err.message)
    });
    
  },
  listCities() {
    return kota.findAll();
  },
  citiesCount() {
    return kota.count();
  },
  findPKUser(dataPK) {
    return user.findByPk(dataPK)
  },
}

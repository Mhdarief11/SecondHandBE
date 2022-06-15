const { user } = require('../models')

module.exports = {
  create(createArgs) {
    return user.create(createArgs)
  },
  find(email) {
    return user.findOne({
      where: { email },
    })
  },
}

const { User } = require("../models");

module.exports = {
  create(createArgs) {
    return User.create(createArgs);
  },
  find(email) {
    return User.findOne({
      where: { email },
    });
  },
};

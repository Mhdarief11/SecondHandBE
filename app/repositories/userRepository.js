const { user, kota } = require('../models')

module.exports = {
  create(createArgs) {
    console.log('user crate repo')
    return user.create(createArgs)
  },
  find(email) {
    // console.log("\n find email repo \n");

    /* return user
      .findOne({
        where: { email },
      })
      .then(() => {
        console.log("USER FETCHED SUCCESSFULL");
      })
      .catch((err) => {
        console.log(err.message);
      }); */

    try {
      return user.findOne({
        where: { email },
      })
    } catch (err) {
      throw err.message
    }
  },
  update(id, data) {
    // console.log("\nUPDATE REPO\n");

    /* return user
      .update(data, {
        where: {
          id,
        },
      })
      .then(() => {
        console.log("UPDATE REPO SUCCESSFULL");
      })
      .catch((err) => {
        console.log(err.message);
      }); */
    try {
      return user.update(data, {
        where: {
          id,
        },
      })
    } catch (err) {
      throw err.message
    }
  },
  findPKUser(id) {
    console.log('REPO FINDBYPK, ' + id)
    try {
      return user.findOne({
        where: { id },
      })
    } catch (error) {
      throw error.message
    }
    /* return user
      .findByPk(id)
      .then(() => {
        console.log("USER FETCHED SUCCESSFULL");
      })
      .catch((err) => {
        console.log(err.message);
      }); */

    /* return user
        .findOne({
          where: { id, },
        })
        .then(() => {
          console.log("USER FETCHED SUCCESSFULL");
        })
        .catch((err) => {
          console.log(err.message);
        }); */
  },
}

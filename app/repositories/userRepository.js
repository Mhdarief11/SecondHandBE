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
  updateById({ id, nama, idkota, alamat, nohp, gambar }) {
    const updateById = user.update({
        nama,
        idkota,
        alamat,
        nohp,
        gambar,
    }, {
        where: {
            id
        }
    });

    return updateById;
  },
}

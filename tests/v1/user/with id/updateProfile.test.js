/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../../../app')
const { user } = require('../../../../app/models')
const userService = require('../../../../app/services/userService')

// Function for testing endpoint update profile
describe('PUT /api/v1/users/update/:id', () => {
  let /* registeredUser, userId, */ accessToken
  let userId
  // Creating Dummy Data and Bearer Token after every 'it' method
  beforeAll(async () => {
    /* userId = 300;
    const nama = 'Adam Jansen'
    const email = `jensen@sarif.com`
    const password = 'megan'
    const registeredVia = 'website'
    const idkota = 39;
    const alamat = "Division TF29";
    const gambar = "";
     */

    /* registeredUser = {
      id: userId,
      idkota,
      nama,
      email,
      password,
      alamat,
      gambar,
      registeredVia,
    }; */

    // console.log("https://imagekit.io/dashboard/media-library/detail/62d6b9b3aa7f4b4125ad5883")

    // await userService.create(registeredUser);

    /* await userService.create({
      id: userId,
      idkota,
      nama,
      email,
      password,
      alamat,
      gambar,
      registeredVia,
    }); */

    // const hasil = await userService.find(email);

    // console.log(hasil);
    // return userId, registeredUser, accessToken;

    accessToken = await request(app).post('/api/v1/auth/login').send({
      email: 'jensen@sarif.com',
      password: 'megan',
    })

    return accessToken
  })

  // Delete dummy data after every 'it' method
  /* afterEach(() => user.destroy({ where: { id: userId, } })); */

  // State what the response should be if status code 200
  it('should response with 201 as status code', async () => {
    const idkotaNew = 50
    const alamatNew = 'Chech Republic'

    if (accessToken == null || accessToken == undefined) {
      console.log('\nAccess toke kosong\n')
    }

    if (accessToken.body.status === 'FAILED') {
      console.log('Update Test Failed')
      console.log(accessToken.body.message)
    } else {
      userId = accessToken.body.id
      // console.log(userId);
    }

    // console.log(accessToken.body)

    return request(app)
      .put('/api/v1/users/update/' + userId)
      .set('Authorization', `Bearer ${accessToken.body.token}`)
      .set('Content-Type', 'application/json')
      .send({ idkota: idkotaNew, alamat: alamatNew })
      .then((res) => {
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(
          expect.objectContaining({
            /* expect(status).toBe("OK"), */
            status: 'OK',
          }),
        )
      })
  })

  // State what the response should be if status code 422
  it('should response with 422 as status code', async () => {
    const idkotaErr = 9999
    const gambarErr = 'DisIsPic'

    return request(app)
      .put('/api/v1/users/update/' + userId)
      .set('Authorization', `Bearer ${accessToken.body.token}`)
      .set('Content-Type', 'application/json')
      .send({ idkota: idkotaErr, gambar: gambarErr })
      .then((res) => {
        expect(res.statusCode).toBe(422)
        expect(res.body).toEqual(
          expect.objectContaining({
            status: 'FAIL',
            message: expect.any(String),
          }),
        )
      })
  })
})

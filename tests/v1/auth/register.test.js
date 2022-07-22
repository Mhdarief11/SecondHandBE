const request = require('supertest')
const app = require('../../../app')
const { user } = require("../../../app/models");

describe('POST /api/v1/auth/register', () => {
  let email;
  function makeUser() {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
      return text
    }
  }

  afterAll(async () => {
    const deleteAkun = await user.destroy({ where: { email: email, } });

    return deleteAkun;
  })

  it('should response with 201 as status code', async () => {
    const nama = 'yehezkiel'
    email = `${makeUser()}@mail.com`
    const password = 'coba123'
    const registeredVia = 'website'

    return request(app)
      .post('/api/v1/auth/register')
      .set('Content-Type', 'application/json')
      .send({ nama, email, password, registeredVia })
      .then((res) => {
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(
          expect.objectContaining({
            data: expect.any(Object),
          }),
        )
      })
  })

  it('should response with 400 as status code', async () => {
    const nama = 'yehezkiel'
    const email = 'yehezkielve@mail.com'
    const password = 'coba123'
    const registeredVia = 'website'

    return request(app)
      .post('/api/v1/auth/register')
      .set('Content-Type', 'application/json')
      .send({ nama, email, password, registeredVia })
      .then((res) => {
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          }),
        )
      })
  })
})

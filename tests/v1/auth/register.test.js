const request = require('supertest')
const app = require('../../../app')

describe('POST /api/v1/auth/register', () => {
  it('should response with 201 as status code', async () => {
    const nama = 'yehezkiel'
    const email = 'yehezkiel@mail.com'
    const password = ''
    const registeredVia = 'website'

    return request(app)
      .post('/api/v1/auth/register')
      .set('Content-Type', 'application/json')
      .send({ nama, email, password, registeredVia })
      .then((res) => {
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(
          expect.objectContaining({
            token: expect.any(String),
          }),
        )
      })
  })
})

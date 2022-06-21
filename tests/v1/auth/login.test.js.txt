const request = require('supertest')
const app = require('../../../app')

describe('POST /api/v1/auth/login', () => {
  it('should response with 201 as status code', async () => {
    const email = 'yehezkiel@mail.com'
    const password = 'coba123'

    return request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email, password })
      .then((res) => {
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            token: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        )
      })
  })
})

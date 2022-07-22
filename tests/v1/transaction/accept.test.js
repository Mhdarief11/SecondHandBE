const request = require('supertest')
const app = require('../../../app')

let token
const id = 1
beforeEach(async () => {
  const response = await request(app)
    .post('/api/v1/auth/login')
    .set('Content-Type', 'application/json')
    .send({ email: 'yehezkiel@mail.com', password: 'coba123' })
  token = response.body.token
})
describe('PUT /api/v1/transaction/:id', () => {
  it('should response 404 as status code', async () => {
    return request(app)
      .put('/api/v1/transaction' + id)
      .set({ Authorization: `Bearer ${token}` })
      .then((res) => {
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          }),
        )
      })
  })
})

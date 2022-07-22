const request = require('supertest')
const app = require('../../../app')

let token

beforeEach(async () => {
  const response = await request(app)
    .post('/api/v1/auth/login')
    .set('Content-Type', 'application/json')
    .send({ email: 'yehezkiel@mail.com', password: 'coba123' })
  token = response.body.token
})
describe('PUT /api/v1/transaction/declineTrans/:idtrans', () => {
  const idtrans = 1
  it('should response 404 as status code', async () => {
    return request(app)
      .put(`/api/v1/transaction/${idtrans}`)
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

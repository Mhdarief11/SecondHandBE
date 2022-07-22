// bid product
const request = require('supertest')
const app = require('../../../app')

let token
let price = 20000
beforeEach(async () => {
  const response = await request(app)
    .post('/api/v1/auth/login')
    .set('Content-Type', 'application/json')
    .send({ email: 'yehezkiel@mail.com', password: 'coba123' })
  token = response.body.token
})

describe('POST /api/v1/transaction', () => {
  // not fond product
  test('should response with 400 as status code', async () => {
    return request(app)
      .post('/api/v1/transaction')
      .set({ Authorization: `Bearer ${token}` })
      .query({ sellerid: 30, productid: 169 })
      .send({ price })
      .then((res) => {
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual(expect.any(Object))
      })
  })
})

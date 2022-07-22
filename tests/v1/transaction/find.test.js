// bid product
const request = require('supertest')
const app = require('../../../app')

describe('GET /api/v1/transaction/:id', () => {
  it('should response 404 as status code', async () => {
    const id = 1
    return request(app)
      .get('/api/v1/transaction' + id)
      .set('Content-Type', 'application/json')
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

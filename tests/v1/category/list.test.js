const request = require('supertest')
const app = require('../../../app')

describe('GET /api/v1/category', () => {
  it('should response 200 as status code', async () => {
    return request(app)
      .get('/api/v1/category')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(
          expect.objectContaining({
            category: expect.arrayContaining([expect.any(Object)]),
          }),
        )
      })
  })
})

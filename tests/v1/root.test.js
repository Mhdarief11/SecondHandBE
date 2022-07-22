const request = require('supertest')
const app = require('../../app')

describe('GET /', () => {
  it('should response 200 as status code', async () => {
    return request(app)
      .get('/')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          }),
        )
      })
  })
})

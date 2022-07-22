const request = require('supertest')
const app = require('../../../../app')

describe('GET /api/v1/cities/:id', () => {
  it('should response with 200 as status code', async () => {
    return request(app)
      .get('/api/v1/cities/30')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(
          expect.objectContaining({
            city: expect.any(Object),
          }),
        )
      })
  })

  it('should response with 404 as status code', async () => {
    return request(app)
      .get('/api/v1/cities/666')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual(
          expect.objectContaining({
            status: "FAILED",
            message: expect.any(String),
          }),
        )
      })
  })
})

const request = require('supertest')
const app = require('../../../app')

describe('GET /api/v1/cities', () => {
  it('should response with 201 as status code', async () => {
    return request(app)
      .get('/api/v1/cities')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(
          expect.objectContaining({
            allcity: expect.any(Object),
          }),
        )
      })
  })
  it('should response with 400 as status code', async () => {
    return request(app)
      .get('/api/v1/cities')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual(
          expect.objectContaining({
            allcity: expect.any(Object),
          }),
        )
      })
  })
})

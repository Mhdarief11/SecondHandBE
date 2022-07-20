const request = require('supertest')
const app = require('../../../app')

describe('GET /api/v1/cities', () => {
  it('should response with 200 as status code', async () => {
    return request(app)
      .get('/api/v1/cities')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(
          expect.objectContaining({
            allCity: expect.objectContaining({
              city: expect.arrayContaining([
                expect.objectContaining({
                  createdAt: expect.any(String),
                  id: expect.any(Number),
                  nama_kota: expect.any(String),
                  updatedAt: expect.any(String),
                }),
              ]),
            }),
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
            allCity: expect.objectContaining({
              city: expect.arrayContaining([
                expect.objectContaining({
                  status: "FAILED",
                  message: expect.any(String),
                }),
              ]),
            }),
          }),
        )
      })
  })
})

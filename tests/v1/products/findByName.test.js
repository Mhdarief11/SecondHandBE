/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../../app')

describe('GET /api/v1/product/nama', () => {
  jest.setTimeout(20000)

  // State what the response should be if status code 201
  it('should response with 500 as status code and show product', async () => {
    // console.log("IT 200");

    return request(app)
      .get('/api/v1/product/nama')
      .query({ nama: 'Pocket' })
      .then((res) => {
        expect(res.statusCode).toBe(500)
        expect(res.body).toEqual(expect.any(Object))
      })
  })
})

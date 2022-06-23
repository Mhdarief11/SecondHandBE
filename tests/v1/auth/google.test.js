const request = require('supertest')
const app = require('../../../app')

describe('POST /api/v1/auth/google', () => {
  it('should response with 201 as status code', async () => {
    const access_token =
      'ya29.A0ARrdaM-dMUlu6amFifRm8q-3_mww04wRgzVJkU3N1IAPIX-4Cr78u9IIUldtLpz6oV2skjwPl9yyOgCwlTJPBC5waoZGOYVegd4igqUd5CXcBpbkQfX84txlsNlJDfrhVvD0aNjZz5IwK16HP3DrE9J5TduqXwYUNnWUtBVEFTQVRBU0ZRRl91NjFWS1pBbkE0bUdGWGdiWU90R0twSEN0Zw0165'

    return request(app)
      .post('/api/v1/auth/google')
      .set('Content-Type', 'application/json')
      .send({ access_token })
      .then((res) => {
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual(
          expect.objectContaining({
            token: expect.any(String),
          }),
        )
      })
  })

  it('should response with 401 as status code', async () => {
    const email = 'test123@mail.com'
    const nama = 'testing'
    const password = ''
    const gambar = 'https://image.com'
    const googleId = '123'
    const registeredVia = 'google'

    return request(app)
      .post('/api/v1/auth/google')
      .set('Content-Type', 'application/json')
      .send({ nama, email, password, registeredVia, googleId, gambar })
      .then((res) => {
        expect(res.statusCode).toBe(401)
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          }),
        )
      })
  })
})

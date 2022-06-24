const request = require('supertest')
const app = require('../../../app')

describe('POST /api/v1/auth/google', () => {
  // it('should response with 201 as status code', async () => {
  //   const access_token =
  //     'ya29.A0ARrdaM8kHAZag2LPaI2SoeRU5IoBR-n0F2mPs2qsMFXWqfVA1n9PH1ZN8UHwPv2i_zYm1MtYBX8xCEgF7KOgTTuVpxhGSEb0WW4KTF7pX0-2PkFujm7XFRw3-pYA_38HxoXc8OLnK9H5ql_8wV42J9kq6bG0XwYUNnWUtBVEFTQVRBU0ZRRl91NjFWdG5lT1RzQkpDdFdLODVTR1dmUTNRdw0165'

  //   return request(app)
  //     .post('/api/v1/auth/google')
  //     .set('Content-Type', 'application/json')
  //     .send({ access_token })
  //     .then((res) => {
  //       expect(res.statusCode).toBe(201)
  //       expect(res.body).toEqual(
  //         expect.objectContaining({
  //           token: expect.any(String),
  //         }),
  //       )
  //     })
  // })

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

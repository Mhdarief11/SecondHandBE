const request = require('supertest')
const app = require('../../../app')

describe('GET /api/v1/transaction', () => {
  // it('should response 200 as status code', async () => {
  //   return request(app)
  //     .get('/api/v1/transaction')
  //     .set('Content-Type', 'application/json')
  //     .then((res) => {
  //       expect(res.statusCode).toBe(200)
  //       expect(res.body).toEqual(
  //         expect.objectContaining({
  //           transaction: expect.arrayContaining([
  //             expect.objectContaining({
  //               id: expect.any(Number),
  //               iduser: expect.any(Number),
  //               iduser_seller: expect.any(Number),
  //               idbarang: expect.any(Number),
  //               harga_tawar: expect.any(Number),
  //               status_pembelian: expect.any(Boolean),
  //               status_terima: expect.any(Boolean),
  //               createdAt: expect.any(String),
  //               updatedAt: expect.any(String),
  //               user: expect.objectContaining({
  //                 id: expect.any(Number),
  //                 idkota: expect.any(Number),
  //                 nama: expect.any(String),
  //                 email: expect.any(String),
  //                 alamat: expect.any(String),
  //                 nohp: expect.any(String),
  //                 gambar: expect.any(String),
  //                 googleId: expect.any(String),
  //                 registeredVia: expect.any(String),
  //                 createdAt: expect.any(String),
  //                 updatedAt: expect.any(String),
  //               }),
  //               barang: expect.objectContaining({
  //                 id: expect.any(Number),
  //                 iduser: expect.any(Number),
  //                 idkategori: expect.any(Number),
  //                 nama: expect.any(String),
  //                 harga: expect.any(Number),
  //                 deskripsi: expect.any(String),
  //                 available: expect.any(Boolean),
  //                 createdAt: expect.any(String),
  //                 updatedAt: expect.any(String),
  //               }),
  //               gambarbarangs: expect.arrayContaining([
  //                 expect.objectContaining({
  //                   id: expect.any(Number),
  //                   idgambar: expect.any(Number),
  //                   gambar: expect.any(String),
  //                   createdAt: expect.any(String),
  //                   updatedAt: expect.any(String),
  //                 }),
  //               ]),
  //             }),
  //           ]),
  //         }),
  //       )
  //     })
  // })

  it('should response 200 as status code', async () => {
    return request(app)
      .get('/api/v1/transaction')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(
          expect.objectContaining({
            transaction: expect.any(Array),
          }),
        )
      })
  })
})

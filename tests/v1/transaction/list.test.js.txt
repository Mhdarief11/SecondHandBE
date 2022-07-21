// const request = require('supertest')
// const app = require('../../../app')

// describe('GET /api/v1/transaction', () => {
//   it('should response 200 as status code', async () => {
//     return request(app)
//       .get('/api/v1/transaction')
//       .set('Content-Type', 'application/json')
//       .then((res) => {
//         expect(res.statusCode).toBe(200)
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             transaction: expect.arrayContaining([
//               expect.objectContaining({
//                 id: expect.any(Number),
//                 iduser: expect.any(Number),
//                 iduser_seller: expect.any(Number),
//                 idbarang: expect.any(Number),
//                 harga_tawar: expect.any(Number),

//               })
//             ]),
//           }),
//         )
//       })
//   })
// })

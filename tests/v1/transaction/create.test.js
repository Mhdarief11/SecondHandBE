// bid product
const request = require('supertest')
const app = require('../../../app')
const productService = require('../../../app/services/productService')

let token
let price = 20000
let idproduct
let iduser
let products
// afterAll(async () => {
//   const listProduk = await productService.list()

//   const produk = listProduk.barang

//   console.log(produk)
//   return
// })

describe('POST /api/v1/transaction', () => {
  jest.setTimeout(20000)

  beforeAll(async () => {
    // console.log("BEFORE ALL");

    accessToken = await request(app).post('/api/v1/auth/login').send({
      email: 'yehezkielve@mail.com',
      password: 'coba123',
    })

    const id = accessToken.body.id
    const kategori = 4
    const nama = 'Pocket Secretary'
    const harga = 5000000
    const deskripsi = 'Lorem Ipsum'

    products = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${accessToken.body.token}`)
      .set('Content-Type', 'multipart/form-data')
      .field('id', id)
      .field('nama', nama)
      .field('kategori', kategori)
      .field('harga', harga)
      .field('deskripsi', deskripsi)
      .attach(
        'image',
        `${__dirname}/../test_images/Sarif_Ind-Pocket_Secretary.png`,
      )

    return accessToken, products
  })
  // not fond product
  it('should response with 400 as status code', async () => {
    return request(app)
      .post('/api/v1/transaction')
      .set({ Authorization: `Bearer ${accessToken.body.token}` })
      .query({ sellerid: 30, productid: 169 })
      .set('Content-Type', 'application/json')
      .send({ price })
      .then((res) => {
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual(expect.any(Object))
      })
  })

  //add bid product
  // id product = 304 seller id = 757
  // it('should response with 200 as status code', async () => {
  //   return request(app)
  //     .post('/api/v1/transaction')
  //     .set({ Authorization: `Bearer ${token}` })
  //     .set('Content-Type', 'application/json')
  //     .query({ sellerid: iduser, productid: idproduct })
  //     .send({ price })
  //     .then((res) => {
  //       expect(res.statusCode).toBe(200)
  //       expect(res.body).toEqual(expect.any(Object))
  //     })
  // })
})

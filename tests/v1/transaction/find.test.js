// bid product
const request = require('supertest')
const app = require('../../../app')
const productService = require('../../../app/services/productService')

let products
let transaction
let price = 20000
let response

afterAll(async () => {
  jest.setTimeout(20000)
  const listProduk = await productService.list()

  const produk = listProduk.barang

  for (let i = 0; i < produk.length; i++) {
    await request(app)
      .delete(`/api/v1/products/${produk[i].id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
  }
  return
})

beforeAll(async () => {
  jest.setTimeout(20000)
  response = await request(app)
    .post('/api/v1/auth/login')
    .set('Content-Type', 'application/json')
    .send({ email: 'yehezkielve@mail.com', password: 'coba123' })
  const id = response.body.id
  const kategori = 4
  const nama = 'Pocket Secretary'
  const harga = 5000000
  const deskripsi = 'Lorem Ipsum'

  products = await request(app)
    .post('/api/v1/products')
    .set('Authorization', `Bearer ${response.body.token}`)
    .set('Content-Type', 'multipart/form-data')
    .field('id', id)
    .field('nama', nama)
    .field('kategori', kategori)
    .field('harga', harga)
    .field('deskripsi', deskripsi)
    .attach(
      'image',
      `${__dirname}/../products/test_images/Sarif_Ind-Pocket_Secretary.png`,
    )

  transaction = await request(app)
    .post('/api/v1/transaction')
    .set({ Authorization: `Bearer ${response.body.token}` })
    .set('Content-Type', 'application/json')
    .query({
      sellerid: products.body.product.iduser,
      productid: products.body.product.id,
    })
    .send({ price })

  return response, products, transaction
})

describe('GET /api/v1/transaction/:id', () => {
  jest.setTimeout(20000)
  it('should response 404 as status code', async () => {
    const id = 0
    return request(app)
      .get('/api/v1/transaction/' + id)
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          }),
        )
      })
  })

  it('should response 200 as status code', async () => {
    return request(app)
      .get('/api/v1/transaction/' + 1)
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(expect.any(Object))
      })
  })
})

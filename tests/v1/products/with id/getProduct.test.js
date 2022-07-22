/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../app");
const productService = require("../../../../app/services/productService");

describe("GET /api/v1/products/:id", () => {
  jest.setTimeout(15000);

  let accessToken, products;

  beforeAll(async () => {
    // console.log("BEFORE ALL");

    accessToken = await request(app).post("/api/v1/auth/login").send({
      email: "yehezkielve@mail.com",
      password: "coba123",
    });

    const id = accessToken.body.id;
    const kategori = 4;
    const nama = "Pocket Secretary";
    const harga = "5000000";
    const deskripsi = "Lorem Ipsum";

    products = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${accessToken.body.token}`)
      .set("Content-Type", "multipart/form-data")
      .field("id", id)
      .field("nama", nama)
      .field("kategori", kategori)
      .field("harga", harga)
      .field("deskripsi", deskripsi)
      .attach("image", `${__dirname}/../test_images/Sarif-Ind_Multitool.png`);

    /* products = await request(app)
    .get("/api/v1/filterProducts")
    .set("Authorization", `Bearer ${accessToken.body.token}`); */

    // console.log(products.body)

    return accessToken, products;
  });

  afterAll(async () => {
    // console.log("AFTER ALL");

    await request(app).delete(`/api/v1/product/${products.body.product.id}`).set("Authorization", `Bearer ${accessToken.body.token}`);

    /* accessToken = await request(app).post("/api/v1/auth/login").send({
      email: "yehezkielve@mail.com",
      password: "coba123",
    }); 
    
    const listProduk = await productService.list();
    const produk = listProduk.barang;

    for (let i = 0; i < produk.length; i++) {
      await request(app).delete(`/api/v1/product/${produk[i].id}`).set("Authorization", `Bearer ${accessToken.body.token}`);
    } */

    return;
  });

  // State what the response should be if status code 201
  it("should response with 200 as status code and show product image details", async () => {
    // console.log("IT 200");

    // products = await request(app)
    // .get("/api/v1/products");

    // console.log(products.body.data.barang[0])

    // console.log(products.body.id)

    return request(app)
      /* .get(`/api/v1/products/${products.body.data.barang[0].id}`) */
      .get(`/api/v1/products/${products.body.product.id}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            iduser: expect.any(Number),
            idkategori: expect.any(Number),
            nama: expect.any(String),
            harga: expect.any(Number),
            deskripsi: expect.any(String),
            available: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            user: expect.any(Object),
            kategori: expect.any(Object),
            gambarbarangs: expect.any(Object),
          })
        );
      });
  });

});

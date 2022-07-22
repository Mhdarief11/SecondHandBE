/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../app");
// const productService = require("../../../../app/services/productService");

describe("GET /api/v1/products/picture/:id", () => {
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

    return accessToken, products;
  });

  afterAll(async () => {
    // console.log("AFTER ALL");

    // console.log(products.body.product)

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
  it("should response with 201 as status code and show product image details", async () => {
    // console.log("IT 200");

    const getProducts = await request(app)
    .get("/api/v1/products");

    // console.log(getProducts.body.data.barang[0])

    return request(app)
      .get(`/api/v1/products/picture/${getProducts.body.data.barang[0].gambarbarangs[0].gambar}`)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            gambar: expect.any(Object),
          })
        );
      });
  });

  it("should response with 422 as status code and show error", async () => {
    return request(app)
      .get("/api/v1/products/picture/6969")
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          })
        );
      });
  });

  it("should response with 400 as status code and show error", async () => {
    return request(app)
      .get("/api/v1/products/picture/null")
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          })
        );
      });
  });
});

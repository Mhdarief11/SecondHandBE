/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../app");
// const productService = require("../../../../app/services/productService");

describe("DELETE /api/v1/product/:id", () => {
  jest.setTimeout(20000);

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
      .attach("image", `${__dirname}/../test_images/JC-Hacking_Stop.jpeg`);

    /* const id = accessToken.body.id;
    const kategori = 4;
    const nama = "Pocket Secretary";
    const harga = "5000000";
    const deskripsi = "Lorem Ipsum";

    await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${accessToken.body.token}`)
      .set("Content-Type", "multipart/form-data")
      .field("id", id)
      .field("nama", nama)
      .field("kategori", kategori)
      .field("harga", harga)
      .field("deskripsi", deskripsi)
      .attach("image", `${__dirname}/../test_images/JC-Hacking_Stop.jpeg`); */
    
    return accessToken, products;
  });

  /* afterAll(async () => {
    // console.log("AFTER ALL");

    accessToken = await request(app).post("/api/v1/auth/login").send({
      email: "yehezkielve@mail.com",
      password: "coba123",
    });

    const listProduk = await productService.list();
    const produk = listProduk.barang;

    for (let i = 0; i < produk.length; i++) {
      await request(app).delete(`/api/v1/product/${produk[i].id}`).set("Authorization", `Bearer ${accessToken.body.token}`);
    }

    return;
  }); */

  // State what the response should be if status code 201
  it("should response with 200 as status code and show product image details", async () => {

    // products = await request(app)
    // .get("/api/v1/products");

    // console.log(products.body)

    return request(app)
      .delete(`/api/v1/products/${products.body.product.id}`)
      .set('Authorization', `Bearer ${accessToken.body.token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            status: expect.any(String),
            message: expect.any(String),
          })
        );
      });
  });

 /*  // State what the response should be if status code 500
  it("should response with 500 as status code and show product image details", async () => {

    return request(app)
      .delete(`/api/v1/product/`)
      .set('Authorization', `Bearer ${accessToken.body.token}`)
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      });
  });
 */
});

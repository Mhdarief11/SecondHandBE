/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../app");

describe("GET /api/v1/filterProductsCateg", () => {
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
      .attach("image", `${__dirname}/../test_images/J.C-Hacking_Nuke.jpeg`);

    return accessToken, products;
  });

  afterAll(async () => {
    // console.log("AFTER ALL");

    await request(app).delete(`/api/v1/products/${products.body.product.id}`).set("Authorization", `Bearer ${accessToken.body.token}`);

    return;
  });

  // State what the response should be if status code 201
  it("should response with 200 as status code and show product image details", async () => {

    return request(app)
      /* .get(`/api/v1/products/${products.body.data.barang[0].id}`) */
      .get(`/api/v1/filterProductsCateg?idkategori=${products.body.product.idkategori}`)
      .set('Authorization', `Bearer ${accessToken.body.token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
                barang: expect.any(Array),
            }),
          })
        );
      });
  });

});

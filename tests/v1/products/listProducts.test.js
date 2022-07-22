const request = require("supertest");
const app = require("../../../app");
const productService = require("../../../app/services/productService");

describe("GET /api/v1/products", () => {
  jest.setTimeout(15000);
  let accessToken;

  beforeEach(async () => {
    accessToken = await request(app).post("/api/v1/auth/login").send({
      email: "yehezkielve@mail.com",
      password: "coba123",
    });
    return accessToken;
  });

  afterEach(async () => {
    /* accessToken = await request(app).post("/api/v1/auth/login").send({
      email: "yehezkielve@mail.com",
      password: "coba123",
    }); */

    const listProduk = await productService.list();
    const produk = listProduk.barang;

    for (let i = 0; i < produk.length; i++) {
      await request(app).delete(`/api/v1/product/${produk[i].id}`).set("Authorization", `Bearer ${accessToken.body.token}`);
    }

    return;
  });

  it("should response with 200 as status code", async () => {
    const id = accessToken.body.id;
    const kategori = 4;
    const nama = "Pocket Secretary";
    const harga = "5000000";
    const deskripsi =
      "Sekali lagi, Sarif Industry telah memberikan dunia teknologi terbarunya. Kali ini, dinamakan Pocket Secretary. Device ini dapat menampung informasi penting yang kita semua ingin sembunyikan, tetapi tidak ingin melupakannya. Dilengkapi dengan teknologi Enkripsi ternama dan layar foldable ultra transparent touch XS-1 yang sudah dipakai di mana saja.";

    await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${accessToken.body.token}`)
      .set("Content-Type", "multipart/form-data")
      .field("id", id)
      .field("nama", nama)
      .field("kategori", kategori)
      .field("harga", harga)
      .field("deskripsi", deskripsi)
      .attach("image", `${__dirname}/test_images/VersaLife-Biocell.jpeg`);

    return request(app)
      .get("/api/v1/products")
      .set("Content-Type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            data: expect.any(Object),
          })
        );
      });
  });

  it("should response with 404 as status code", async () => {
    return request(app)
      .get("/api/v1/products")
      .set("Content-Type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          })
        );
      });
  });
});

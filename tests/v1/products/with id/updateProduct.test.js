const request = require("supertest");
const app = require("../../../../app");

describe("PUT /api/v1/products/:id", () => {
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
      const harga = 5000000;
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
        .attach("image", `${__dirname}/../test_images/Sarif_Ind-Pocket_Secretary.png`);
  
      return accessToken, products;
    });
  
    afterAll(async () => {
      // console.log("AFTER ALL");
  
      await request(app).delete(`/api/v1/products/${products.body.product.id}`).set("Authorization", `Bearer ${accessToken.body.token}`);
  
      return;
    });

  it("should response with 201 as status code", async () => {
    const kategori = 4;
    const nama = "MultiTool";
    const harga = 15000000;
    const deskripsi =
      "lorem ipsum dolor sit amet";

    return request(app)
      .put(`/api/v1/products/${products.body.product.id}`)
      .set("Authorization", `Bearer ${accessToken.body.token}`)
      .set("Content-Type", "multipart/form-data")
      .field("nama", nama)
      .field("kategori", kategori)
      .field("harga", harga)
      .field("deskripsi", deskripsi)
      .attach("image", `${__dirname}/../test_images/Sarif-Ind_Multitool.png`)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
            product: expect.any(Object),
          })
        );
      });
  });

  it("should response with 400 as status code", async () => {
    const id = 666;
    const kategori = 420;
    const nama = "mutitool";
    const harga = 5000000;
    const deskripsi =
      "lorem ipsum";
    let image = "e";

    return request(app)
      .put(`/api/v1/products/${products.body.product.id}`)
      .set("Authorization", `Bearer ${accessToken.body.token}`)
      .set("Content-Type", "multipart/form-data")
      .field("id", id)
      .field("nama", nama)
      .field("kategori", kategori)
      .field("harga", harga)
      .field("deskripsi", deskripsi)
      .field("image", image)
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

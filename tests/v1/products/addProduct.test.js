const request = require("supertest");
const app = require("../../../app");
/* const { barang, gambarbarang } = require("../../../app/models");
const ImageKitActions = require('../../../app/imageKit/ImageKitActions'); */
const productService = require("../../../app/services/productService");

describe("POST /api/v1/products", () => {
  jest.setTimeout(20000);

  let accessToken;
  // let imageUpload;
  /* afterAll(async () => {
    const deleteAkun = await user.destroy({ where: { email: email, } });

    return deleteAkun;
  }) */

  console.log(process.cwd());

  beforeAll(async () => {
    accessToken = await request(app).post("/api/v1/auth/login").send({
      email: "yehezkielve@mail.com",
      password: "coba123",
    });

    // imageUpload = fs.readFileSync('tests/v1/products/test_images/Sarif_Ind-Pocket_Secretary.png');

    return accessToken /* , imageUpload */;
  });

  afterAll(async () => {
    accessToken = await request(app).post("/api/v1/auth/login").send({
      email: "yehezkielve@mail.com",
      password: "coba123",
    });

    const listProduk = await productService.list();

    const produk = listProduk.barang;

    for (let i = 0; i < produk.length; i++) {
      await request(app).delete(`/api/v1/products/${produk[i].id}`).set("Authorization", `Bearer ${accessToken.body.token}`);
    }

    /*  for(const i = 0; i < produk.barang; i++) {
        for(const j = 0; j<produk.barang[i].gambarbarangs.length; j++) {
            let deleteImgResponse = await imageKitDelete.deleteImg(produk.barang[i].gambarbarangs[j].gambar);

            if (deleteImgResponse == "error") {
                console.log('Delete Img Error');
            }

        }
    } */

    // return barang.destroy({ where: {iduser : 304} })
    return;
  });

  it("should response with 201 as status code", async () => {
    const id = accessToken.body.id;
    const kategori = 4;
    const nama = "Pocket Secretary";
    const harga = "5000000";
    const deskripsi =
      "Sekali lagi, Sarif Industry telah memberikan dunia teknologi terbarunya. Kali ini, dinamakan Pocket Secretary. Device ini dapat menampung informasi penting yang kita semua ingin sembunyikan, tetapi tidak ingin melupakannya. Dilengkapi dengan teknologi Enkripsi ternama dan layar foldable ultra transparent touch XS-1 yang sudah dipakai di mana saja.";
    //   const image = imageUpload;

    // console.log(image);

    /* return request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${accessToken.body.token}`)
      .set("Content-Type", "multipart/form-data")
      .send({ id, kategori, nama, harga, kategori, deskripsi, image })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
            product: expect.any(Object),
          })
        );
      }); */

    return request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${accessToken.body.token}`)
      .set("Content-Type", "multipart/form-data")
      .field("id", id)
      .field("nama", nama)
      .field("kategori", kategori)
      .field("harga", harga)
      .field("deskripsi", deskripsi)
      .attach("image", `${__dirname}/test_images/Sarif_Ind-Pocket_Secretary.png`)
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
    const nama = "Pocket Secretary";
    const harga = "5000000";
    const deskripsi =
      "Sekali lagi, Sarif Industry telah memberikan dunia teknologi terbarunya. Kali ini, dinamakan Pocket Secretary. Device ini dapat menampung informasi penting yang kita semua ingin sembunyikan, tetapi tidak ingin melupakannya. Dilengkapi dengan teknologi Enkripsi ternama dan layar foldable ultra transparent touch XS-1 yang sudah dipakai di mana saja.";
    let image = "";

    return request(app)
      .post("/api/v1/products")
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

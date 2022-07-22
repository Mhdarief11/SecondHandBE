/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../app");

// Function for testing endpoint siapaSaya
describe("GET /api/v1/users/siapaSaya", () => {
  let accessToken, wrongToken;

  beforeEach(async () => {
    accessToken = await request(app).post("/api/v1/auth/login").send({
      email: "jensen@sarif.com",
      password: "megan",
    });

    wrongToken = await request(app).post("/api/v1/auth/login").send({
      email: "agen@matrix.com",
      password: "ntinel",
    });

    /* accessToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsImVtYWlsIjoiYWdlbjQ1QG1hdHJpeC5jb20iLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTI2VDEzOjE1OjIyLjk4MVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA3LTEzVDE0OjM5OjQ5LjE2NVoiLCJpYXQiOjE2NTgxMjUyMDR9.p3mNWsb-q2H-js4pJbhFR37ZP6LH79k7wwfWvllf_bE"; */

    return accessToken, wrongToken;
  });

  // State what the response should be if status code 200
  it("should response with 200 as status code and res.json with user's info", async () => {
    // console.log(accessToken.body);
    return (
      request(app)
        // Requesting endpoint
        .get("/api/v1/users/siapaSaya")
        .set("Authorization", `Bearer ${accessToken.body.token}`)
        .then((res) => {
          // Enpoint's responses expectation
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual(
            expect.objectContaining({
              ...res.body,
            })
          );
        })

      /* request(app)
        // Requesting endpoint
        .get("/api/v1/users/siapaSaya")
        .set("Content-Type", "application/json")
        .set("Authorization", `${accessToken}`)
        .then((res) => {
          console.log(res.body);
          // Enpoint's responses expectation
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual(
            expect.objectContaining({
              ...res.body,
            })
          );
        }) */
    );
  });

  it("should response with 401 as status code and res.json with message Unauthorized", async () => {
    /* accessToken = await request(app).post("/api/v1/auth/login").send({
      email: "feee",
      password: "reee",
    }); */

    // console.log(wrongToken.body);

    return (
      request(app)
        // Requesting endpoint
        .get("/api/v1/users/siapaSaya")
        .set("Authorization", `${wrongToken.body.token}`)
        .then((res) => {
          // Enpoint's responses expectation
          expect(res.statusCode).toBe(401);
          expect(res.body).toEqual(
            expect.objectContaining({
              message: expect.any(String),
            })
          );
        })
    );
  });
});

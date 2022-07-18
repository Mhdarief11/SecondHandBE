/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../app");
// const { Car } = require("../../../../../app/models");

// Function for testing endpoint list car
describe("GET /api/v1/users/profileImg/details/:id", () => {
  // State what the response should be if status code 201
  it("should response with 201 as status code and show profile image details", async () => {
    return request(app)
      .get("/api/v1/users/profileImg/details/36")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            status: "OK",
            dataImg: expect.any(Object),
          })
        );
      });
  });
});

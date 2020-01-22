const request = require("supertest");
const app = require("../src/server");
const teardown = require("./config/teardown");
const uuid = require("uuid/v4");

const user = {
  firstName: "Andrew",
  lastName: "Mayer",
  id: uuid(),
};
describe("Create User", () => {
  afterEach(teardown);

  xit("Should create a user", async () => {
    const res = await request(app)
      .post("/users/")
      .send(user);
    expect(res.statusCode).toEqual(201);
  });
});

//Move to 4
//Return Name&ID and check for it

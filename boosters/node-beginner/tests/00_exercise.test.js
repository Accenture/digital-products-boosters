const request = require("supertest");
const app = require("../src/server");
const setup = require("./config/setup");
const teardown = require("./config/teardown");
const uuid = require("uuid/v4");

const users = [
  { firstName: "Andrew", lastName: "Mayer", id: uuid() },
  { firstName: "Liang", lastName: "Chen", id: uuid() },
];

describe("Get All Users", () => {
  beforeEach(setup("Users", users));
  afterEach(teardown);
  it("Should return all users", async () => {
    const res = await request(app).get("/users/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(users.length);
  });
});

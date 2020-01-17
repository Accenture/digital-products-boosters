const request = require("supertest");
const app = require("../src/server");
const setup = require("./config/setup");
const teardown = require("./config/teardown");
const uuid = require("uuid/v4");

const users = [
  { firstName: "Andrew", lastName: "Mayer", id: uuid() },
  { firstName: "Liang", lastName: "Chen", id: uuid() },
];

describe("Specific user", () => {
  beforeEach(setup("Users", users));
  afterEach(teardown);

  it("Should return user profile given speicifc userId", async () => {
    res = await Promise.all(users.map(user => request(app).get(`/users/${user.id}`)));

    users.map((user, i) => {
      expect(res[i].statusCode).toEqual(200);
      expect(res[i].body.firstName).toEqual(user.firstName);
      expect(res[i].body.lastName).toEqual(user.lastName);
    });
  });
});

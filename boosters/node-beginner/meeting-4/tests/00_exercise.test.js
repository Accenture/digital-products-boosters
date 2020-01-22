const request = require("supertest");
const app = require("../src/server");
const teardown = require("./config/teardown");
const uuid = require("uuid/v4");
const setup = require("./config/setup");

const user = [
  {
    firstName: "Andrew",
    lastName: "Mayer",
    id: uuid(),
  },
];

const repo = {
  name: "repo1",
  userId: user.id,
  isPrivate: false,
};

describe("Create Repo", () => {
  beforeEach(setup("Users", user));
  afterAll(teardown);

  it("Should create a repo", async () => {
    const res = await request(app)
      .post("/repos/")
      .send(repo);
    expect(res.statusCode).toEqual(201);
  });
});

//Check name of Repo

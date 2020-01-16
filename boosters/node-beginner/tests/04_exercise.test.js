const request = require("supertest");
const app = require("../src/server");
const setup = require("./config/setup");
const teardown = require("./config/teardown");
const uuid = require("uuid/v4");

const users = [
  { firstName: "Andrew", lastName: "Mayer", id: uuid() },
  { firstName: "Liang", lastName: "Chen", id: uuid() },
];

const repos = users.reduce(
  (acc, curr) => [
    ...acc,
    { name: "repo1", userId: curr.id, isPrivate: false, id: uuid() },
    { name: "repo2", userId: curr.id, isPrivate: true, id: uuid() },
  ],
  []
);

describe("Repos", () => {
  beforeAll(async () => {
    await setup("Users", users)();
    return setup("Repos", repos)();
  });
  afterAll(teardown);
  it("Should return all repos", async () => {
    res = await request(app).get(`/repos`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(repos.length);
  });
});

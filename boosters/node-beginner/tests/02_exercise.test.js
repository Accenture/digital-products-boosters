const request = require("supertest");
const app = require("../src/app");
const userSetup = require("./config/setup")("Users");
const repoSetup = require("./config/setup")("Repos");
const teardown = require("./config/teardown");
const uuid = require("uuid/v4");

const users = [
  { firstName: "Andrew", lastName: "Mayer", id: uuid() },
  { firstName: "Andrew", lastName: "Mayer", id: uuid() },
];

const repos = users.reduce(
  (acc, curr) => [
    ...acc,
    { name: "repo1", userId: curr.id, isPrivate: false, id: uuid() },
    { name: "repo2", userId: curr.id, isPrivate: true, id: uuid() },
  ],
  []
);

describe("test", () => {
  beforeAll(async () => {
    await userSetup(users)();
    return repoSetup(repos)();
  });
  afterAll(teardown);
  it("should return all repos of a given userId", async () => {
    res = await Promise.all(users.map(user => request(app).get(`/users/${user.id}/repos`)));

    res.map(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
    });
  });
});

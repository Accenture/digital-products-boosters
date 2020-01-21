const request = require("supertest");
const app = require("../src/server");
const teardown = require("./config/teardown");
const uuid = require("uuid/v4");
const setup = require("./config/setup");

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

describe("Get Repo", () => {
  beforeAll(async () => {
    await setup("Users", users)();
    return setup("Repos", repos)();
  });

  afterAll(teardown);

  xit("Should get a specific repo", async () => {
    const res = await Promise.all(repos.map(repo => request(app).get(`/repos/${repo.id}`)));
    expect(res.length).toEqual(repos.length);
    res.map((res, i) => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(repos[i].name);
      expect(res.body.id).toEqual(repos[i].id);
    });
  });
});

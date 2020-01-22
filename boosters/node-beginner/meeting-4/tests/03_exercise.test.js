const request = require("supertest");
const app = require("../src/server");
const teardown = require("./config/teardown");
const uuid = require("uuid/v4");
const setup = require("./config/setup");

const currentUser = { firstName: "Henry", lastName: "Chao", id: uuid() };

const users = [
  { ...currentUser },
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

describe("Public/Private Repo Authorization", () => {
  beforeAll(async () => {
    await setup("Users", users)();
    return setup("Repos", repos)();
  });

  afterAll(teardown);

  xit("Should return all public repositories and all repositories of current user", async () => {
    const res = await request(app)
      .get("/repos/")
      .send({ userId: currentUser.id });

    res.body.map(res =>
      expect(res.userId === currentUser.id || res.isPrivate === false).toEqual(true)
    );
  });

  xit("Should return a single repository if it's public", async () => {
    const { id } = repos.find(repo => repo.isPrivate === false && repo.userId !== currentUser.id);
    const res = await request(app)
      .get(`/repos/${id}`)
      .send({ userId: currentUser.id });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isPrivate).toEqual(false);
    expect(res.body.userId !== currentUser.id);
  });

  xit("Should return a single repository if it's owned by current user", async () => {
    const { id } = repos.find(repo => repo.userId === currentUser.id);
    const res = await request(app)
      .get(`/repos/${id}`)
      .send({ userId: currentUser.id });

    expect(res.statusCode).toEqual(200);
    expect(res.body.userId).toEqual(currentUser.id);
  });

  xit("Should not return a repository if it's not owned by current user and is private", async () => {
    const { id } = repos.find(repo => repo.userId !== currentUser.id && repo.isPrivate === true);
    const res = await request(app)
      .get(`/repos/${id}`)
      .send({ userId: currentUser.id });

    expect(res.statusCode).toEqual(401);
  });
});

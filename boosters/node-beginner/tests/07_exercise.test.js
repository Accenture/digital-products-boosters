const request = require("supertest");
const app = require("../src/server");
const teardown = require("./config/teardown");
const uuid = require("uuid/v4");
const setup = require("./config/setup");

const users = [
  { firstName: "Henry", lastName: "Chao", id: uuid() },
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

describe("Not sure yet", () => {
  beforeAll(async () => {
    await setup("Users", users)();
    return setup("Repos", repos)();
  });

  afterAll(teardown);

  xit("Should return all public repositories and all repositories of current user", async () => {
    const res = await Promise.all(
      users.map(user =>
        request(app)
          .get("/repos/")
          .send({ userId: user.id })
      )
    );
    const test = res.reduce(
      (acc, curr1, index) =>
        acc &&
        curr1.body.reduce(
          (acc, curr) => acc && (users[index].id === curr.userId || !curr.isPrivate),
          true
        ),
      true
    );
    expect(test).toEqual(true);
  });

  it("Should return a single repository if it's either public or owned by current user. Otherwise return null", async () => {
    const res = await Promise.all(
      users.map(async user => {
        return await Promise.all(
          repos.map(repo =>
            request(app)
              .get(`/repos/${repo.id}`)
              .send({ userId: user.id })
          )
        );
      })
    );
    const test = res.reduce(
      (acc, userRequests, index) =>
        acc &&
        userRequests.reduce(
          (acc, userRequest) =>
            acc &&
            ((Object.entries(userRequest).length === 0 && userRequest.constructor === Object) ||
              !userRequest.body.isPrivate ||
              users[index].id === userRequest.body.userId),
          true
        ),
      true
    );
    expect(test).toEqual(true);
  });
});

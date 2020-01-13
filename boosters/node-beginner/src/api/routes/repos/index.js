const express = require("express");
const { Repo: dbRepo } = require("../../../../models");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const repos = await dbRepo.findAll();
    res.status(200);
    res.send(repos);
  })
  .post(async (req, res) => {
    try {
      await dbRepo.create({
        name: req.body.name,
        userId: req.body.userId,
        isPrivate: req.body.isPrivate
      });
      res.status(201);
      res.end("Added repo");
    } catch (e) {
      res.status(400);
      console.error(e);
      res.end("Invalid request");
    }
  });

router.get("/:repoId", async (req, res) => {
  const repo = await dbRepo.findByPk(req.params.repoId);
  res.send(repo);
});

module.exports = router;

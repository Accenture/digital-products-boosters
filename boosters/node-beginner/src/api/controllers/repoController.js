const { Repos } = require("../../../models");

const getAllRepos = async (req, res) => {
  const repos = await Repos.findAll();
  res.status(200);
  res.send(repos);
};

const createRepo = async (req, res) => {
  const { name, userId, isPrivate } = req.body;

  try {
    await Repos.create({
      name,
      userId,
      isPrivate,
    });
    res.status(201);
    res.end("Added repo");
  } catch (e) {
    res.status(400);
    console.error(e);
    res.end("Invalid request");
  }
};

const getRepo = async (req, res) => {
  const { repoId } = req.params;

  const repo = await Repos.findByPk(repoId);
  res.send(repo);
};

module.exports = { getAllRepos, createRepo, getRepo };

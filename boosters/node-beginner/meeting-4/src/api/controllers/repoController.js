const { Repos } = require("../../../models");
const { Op } = require("sequelize");

const getAllRepos = async (req, res) => {
  const repos = await Repos.findAll();
  res.status(200);
  res.send(repos);
};

const getRepo = async (req, res) => {
  const { repoId } = req.params;
  const repo = await Repos.findByPk(repoId);
  res.send(repo);
};
module.exports = { getAllRepos, getRepo };

const { Repos } = require("../../../models");
const { Op } = require("sequelize");

const getAllRepos = async (req, res) => {
  const repos = await Repos.findAll();
  res.status(200);
  res.send(repos);
};

module.exports = { getAllRepos };

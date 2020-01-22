const { Users, Repos } = require("../../../models");

const getAllUsers = async (req, res) => {
  const users = await Users.findAll();
  res.send(users);
};

const createUser = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const user = await Users.create({
      firstName,
      lastName,
    });
    res.status(201);
    res.end(`Added user: ${user.id}`);
  } catch (e) {
    res.status(400);
    console.error(e);
    res.end("Invalid request");
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await Users.findByPk(userId);
  res.send(user);
};

module.exports = { getAllUsers, createUser, getUser };

const express = require('express');
const router = express.Router();
const dbUser = require('../../../models').user;
const dbRepo = require('../../../models').repo;

router
  .route('/')
  .get(async (req, res) => {
    const users = await dbUser.findAll();
    res.send(users);
  })
  .post(async (req, res) => {
    try {
      await dbUser.create({
        firstName: req.body.name,
        lastName: req.body.lastName,
      });
      res.status(201);
      res.end('Added user');
    } catch (e) {
      res.status(400);
      console.error(e);
      res.end('Invalid request');
    }
  });

router.get('/:userId', async (req, res) => {
  const user = await dbUser.findByPk(req.params.userId);
  res.send(user);
});

router.get('/:userId/repos', async (req, res) => {
  const repos = await dbRepo.findAll({
    where: {
      userId: req.params.userId,
    },
  });
  res.send(repos);
});

module.exports = router;

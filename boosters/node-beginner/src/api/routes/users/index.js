const express = require('express');
const router = express.Router();
const dbUser = require('../../../models').user;

router
  .route('/')
  .get(async (req, res) => {
    const users = await dbUser.findAll();
    res.send(users);
  })
  .post((req, res) => {
    dbUser.create({ firstName: req.body.name, lastName: req.body.lastName });
    res.status(201);
    res.end('Added user');
  });

router.get('/:userId', async (req, res) => {
  const user = await dbUser.findByPk(req.params.userId);
  res.send(user);
});

// router.get('/:userId', async (req, res) => {
//   const user = await dbUser.findByPk(req.params.userId);
//   res.send(user);
// }
// );

module.exports = router;

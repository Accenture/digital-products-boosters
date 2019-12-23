const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('repos home page'));
router.get('/:repoId', (req, res) =>
  res.send(`Viewing repository with ID ${req.params.repoId}`),
);

module.exports = router;

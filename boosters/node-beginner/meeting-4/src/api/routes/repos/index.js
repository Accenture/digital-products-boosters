const express = require("express");
const router = express.Router();
const { repoController } = require("../../controllers");

router.route("/").get(repoController.getAllRepos);

module.exports = router;

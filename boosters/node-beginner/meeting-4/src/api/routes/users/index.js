const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router.get("/:userId", userController.getUser);
router.get("/:userId/repos", userController.getUsersRepo);

module.exports = router;

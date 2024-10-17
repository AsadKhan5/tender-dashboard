const express = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  registerUserController,
  loginUserController,
} = require("../controller/authController");

const router = express.Router();

router.post(
  "/register",
  //   authenticateUser,
  //   authorizePermissions("adminUser"),
  registerUserController
);

router.post("/login", loginUserController);

module.exports = router;

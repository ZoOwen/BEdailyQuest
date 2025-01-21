const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getProfile,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.get("/profile", getProfile);

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("List of all users");
});

router.get("/profile");

module.exports = router;

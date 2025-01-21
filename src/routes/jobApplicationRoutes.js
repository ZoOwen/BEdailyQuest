const express = require("express");
const router = express.Router();
const {
  createJobApplication,
} = require("../controllers/jobApplicationController");

// Endpoint untuk membuat job application
router.post("/create", createJobApplication);
router.post("/");

module.exports = router;

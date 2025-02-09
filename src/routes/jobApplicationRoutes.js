const express = require("express");
const router = express.Router();
const {
  createJobApplication,
  getApplications,
} = require("../controllers/jobApplicationController");

router.post("/create", createJobApplication);
router.get("/", getApplications);

module.exports = router;

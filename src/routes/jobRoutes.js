const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobDetail,
} = require("../controllers/jobController");

router.post("/create", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobDetail); // Tambahkan endpoint untuk job detail

router.get("/profile");
module.exports = router;

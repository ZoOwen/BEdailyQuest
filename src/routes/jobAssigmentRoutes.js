const express = require("express");
const router = express.Router();
const {
  createJobAssignment,
  updateJobAssignmentStatus,
  UpdateRatingandReview,
  getAllAssignmentsByJobId,
} = require("../controllers/jobAssigmentController");

router.post("/", createJobAssignment);
router.patch("/", updateJobAssignmentStatus);
router.patch("/rating", UpdateRatingandReview);
router.get("/:job_id", getAllAssignmentsByJobId);

module.exports = router;

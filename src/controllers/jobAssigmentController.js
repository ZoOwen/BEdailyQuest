const { sendResponse } = require("../utils/response");
const JobAssignmentService = require("../services/jobAssigmentService");

class JobAssignmentController {
  // API untuk membuat Job Assignment
  async createJobAssignment(req, res) {
    try {
      const { job_application_id, job_id, status } = req.body;

      if (!job_application_id || !job_id || !status) {
        return sendResponse(
          res,
          400,
          false,
          "job_application_id and status are required"
        );
      }

      const jobAssignmentData = {
        job_application_id,
        job_id,
        status,
        assigned_at: new Date(),
      };
      console.log(jobAssignmentData);
      // Memanggil service untuk membuat Job Assignment
      const result = await JobAssignmentService.createJobAssignment(
        jobAssignmentData
      );

      return sendResponse(
        res,
        201,
        true,
        "Job assignment created successfully",
        result
      );
    } catch (error) {
      console.error("Error in createJobAssignment:", error.message);
      return sendResponse(res, 500, false, "Failed to create job assignment");
    }
  }

  // API untuk mengupdate status Job Assignment
  async updateJobAssignmentStatus(req, res) {
    try {
      const { id, status } = req.body;

      if (!id || !status) {
        return sendResponse(res, 400, false, "id and status are required");
      }
      const completedAt = new Date();
      const updatedJobAssignment =
        await JobAssignmentService.updateJobAssignmentStatus(
          id,
          status,
          completedAt
        );

      return sendResponse(
        res,
        200,
        true,
        "Job assignment status updated successfully",
        updatedJobAssignment
      );
    } catch (error) {
      console.error("Error in updateJobAssignmentStatus:", error.message);
      return sendResponse(
        res,
        500,
        false,
        "Failed to update job assignment status"
      );
    }
  }

  async UpdateRatingandReview(req, res) {
    try {
      const { id, rating, review } = req.body;

      if (!id || !rating || !review) {
        return sendResponse(res, 400, false, "id and Rating are required");
      }
      const updateRating = await JobAssignmentService.updateRatingAndReview(
        id,
        rating,
        review
      );

      return sendResponse(
        res,
        200,
        true,
        "Job assignment rating and review updated successfully",
        updateRating
      );
    } catch (error) {
      console.error("Error in UpdateRatingandReview:", error.message);
      return sendResponse(
        res,
        500,
        false,
        "Failed to update job assignment status"
      );
    }
  }

  async getAllAssignmentsByJobId(req, res) {
    const { job_id } = req.params; // Ambil jobId dari parameter URL
    try {
      const jobAssignment = await JobAssignmentService.getAllAssignmentsByJobId(
        job_id
      );

      if (jobAssignment) {
        return res.status(200).json({
          success: true,
          message: "Job assignment fetched successfully",
          data: jobAssignment,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Job assignment not found",
        });
      }
    } catch (error) {
      console.error("Error in getAllAssignmentsByJobId:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch job assignment",
      });
    }
  }
}

module.exports = new JobAssignmentController();

const { sendResponse } = require("../utils/response");
const JobApplicationService = require("../services/jobApplicationService");

class JobApplicationController {
  async createJobApplication(req, res) {
    try {
      const { job_id, worker_id, application_date, status } = req.body;

      // Validasi input
      if (!job_id || !worker_id) {
        return sendResponse(
          res,
          400,
          false,
          "job_id and worker_id are required"
        );
      }

      const jobApplicationData = {
        job_id,
        worker_id,
        application_date: application_date || new Date(),
        status: status || "Pending",
      };

      // Gunakan service untuk membuat job application
      const result = await JobApplicationService.createJobApplication(
        jobApplicationData
      );

      return sendResponse(
        res,
        201,
        true,
        "Job application created successfully",
        result
      );
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, false, "Failed to create job application");
    }
  }
}

module.exports = new JobApplicationController();

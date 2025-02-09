const { sendResponse } = require("../utils/response");
const JobApplicationService = require("../services/jobApplicationService");

class JobApplicationController {
  async createJobApplication(req, res) {
    try {
      const { job_id, user_id, application_date, status } = req.body;

      if (!job_id || !user_id) {
        return sendResponse(res, 400, false, "job_id and user_id are required");
      }

      const jobApplicationData = {
        job_id,
        user_id,
        application_date: application_date || new Date(),
        status: status || "Pending",
      };

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
      console.error("Error in createJobApplication:", error.message);
      return sendResponse(res, 500, false, "Failed to create job application");
    }
  }

  async getApplications(req, res) {
    try {
      const { user_id, job_id } = req.query;

      const filter = {};
      if (user_id) filter.user_id = user_id;
      if (job_id) filter.job_id = job_id;

      const applications = await JobApplicationService.getApplications(filter);

      if (!applications || applications.length === 0) {
        return sendResponse(res, 404, false, "No job applications found");
      }

      return sendResponse(
        res,
        200,
        true,
        "Job applications retrieved successfully",
        applications
      );
    } catch (error) {
      console.error("Error in getApplications:", error.message);
      return sendResponse(
        res,
        500,
        false,
        "Failed to retrieve job applications"
      );
    }
  }
}

module.exports = new JobApplicationController();

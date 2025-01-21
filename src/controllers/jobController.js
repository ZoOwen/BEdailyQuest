const { sendResponse } = require("../utils/response");
const JobService = require("../services/jobService");

class JobController {
  async createJob(req, res) {
    try {
      const { title, description, category, salary, location, employer_id } =
        req.body;

      // Validasi input
      if (
        !title ||
        !description ||
        !category ||
        !salary ||
        !location ||
        !employer_id
      ) {
        return sendResponse(res, 400, false, "All fields are required");
      }

      // Validasi tipe data salary
      if (isNaN(salary) || parseFloat(salary) <= 0) {
        return sendResponse(res, 400, false, "Salary must be a valid number");
      }

      const jobData = {
        title,
        description,
        category,
        salary: parseFloat(salary),
        location,
        employer_id,
      };

      // Gunakan service untuk membuat job
      const result = await JobService.createJob(jobData);

      return sendResponse(res, 201, true, "Job created successfully", result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, false, "Failed to create job");
    }
  }

  async getAllJobs(req, res) {
    try {
      const {
        search = "",
        sortBy = "createdAt",
        order = "DESC",
        limit = 10,
        page = 1,
      } = req.query;

      const options = {
        search,
        sortBy,
        order,
        limit: parseInt(limit, 10),
        offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
      };

      const result = await JobService.getAllJobs(options);
      return sendResponse(
        res,
        200,
        true,
        "Jobs retrieved successfully",
        result
      );
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, false, "Failed to retrieve jobs");
    }
  }

  async getJobDetail(req, res) {
    try {
      const jobId = req.params.id;

      // Fetch job detail with employer data
      const job = await JobService.getJobDetail(jobId);

      if (!job) {
        return sendResponse(res, 404, false, "Job not found");
      }

      // Struktur ulang respons untuk menempatkan employer data ke dalam objek employer
      const responseData = {
        id: job.id,
        title: job.title,
        description: job.description,
        category: job.category,
        salary: job.salary,
        location: job.location,
        status: job.status,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
        employer: {
          employer_name: job.Employer.name,
          employer_address: job.Employer.address,
        },
      };

      return sendResponse(
        res,
        200,
        true,
        "Job detail fetched successfully",
        responseData
      );
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, false, "Failed to fetch job detail");
    }
  }
}

module.exports = new JobController();

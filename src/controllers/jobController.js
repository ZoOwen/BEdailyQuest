const { sendResponse } = require("../utils/response");
const JobService = require("../services/jobService");

class JobController {
  async createJob(req, res) {
    try {
      const { title, description, category, salary, location, user_id } =
        req.body;

      if (
        !title ||
        !description ||
        !category ||
        !salary ||
        !location ||
        !user_id
      ) {
        return sendResponse(res, 400, false, "All fields are required");
      }

      if (isNaN(salary) || parseFloat(salary) <= 0) {
        return sendResponse(res, 400, false, "Salary must be a valid number");
      }

      const jobData = {
        title,
        description,
        category,
        salary: parseFloat(salary),
        location,
        user_id,
      };

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
        user_id,
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

      if (user_id) {
        options.user_id = user_id; // Nambahin kondisi user_id kalau ada
      }

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

      const job = await JobService.getJobDetail(jobId);

      if (!job) {
        return sendResponse(res, 404, false, "Job not found");
      }
      console.log("INI data dari job.user", job.User);
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
          employer_name: job.User.username, // Mengambil username dari User
          company_name: job.User.Employer.company_name, // Mengambil company_name dari Employer
          employer_name: job.User.Employer.name, // Mengambil name dari Employer
          employer_address: job.User.Employer.address, // Mengambil address dari Employer
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

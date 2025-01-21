const JobRepository = require("../repositories/jobRepository");

class JobService {
  async createJob(jobData) {
    return await JobRepository.create(jobData);
  }

  async getAllJobs(options) {
    return await JobRepository.findAll(options);
  }

  async getJobDetail(id) {
    if (!id) {
      throw new Error("Job ID is required");
    }
    return await JobRepository.findById(id);
  }
}

module.exports = new JobService();

const jobApplicationRepository = require("../repositories/jobApplicationRepository");

const createJobApplication = async (jobApplicationData) => {
  try {
    const result = await jobApplicationRepository.createJobApplication(
      jobApplicationData
    );
    return result;
  } catch (error) {
    throw new Error(`Error in service: ${error.message}`);
  }
};

module.exports = {
  createJobApplication,
};

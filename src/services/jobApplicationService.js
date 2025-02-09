const jobApplicationRepository = require("../repositories/jobApplicationRepository");

const createJobApplication = async (jobApplicationData) => {
  const { job_id, user_id } = jobApplicationData;

  if (!job_id || !user_id) {
    throw new Error(
      "job_id and user_id are required to create a job application"
    );
  }

  try {
    // Cek apakah sudah ada aplikasi pekerjaan untuk job_id dan user_id yang sama
    // const existingApplication =
    //   await jobApplicationRepository.findApplicationByUserAndJob(
    //     user_id,
    //     job_id
    //   );

    // if (existingApplication) {
    //   throw new Error("You have already applied for this job");
    // }

    // Jika tidak ada aplikasi sebelumnya, lanjutkan untuk membuat aplikasi pekerjaan baru
    const result = await jobApplicationRepository.createJobApplication(
      jobApplicationData
    );
    return result;
  } catch (error) {
    throw new Error(`Error creating job application: ${error.message}`);
  }
};

const getApplications = async (filter) => {
  try {
    const validFilter = {};

    // Pastikan hanya menyertakan filter yang valid
    if (filter.user_id) validFilter.user_id = filter.user_id;
    if (filter.job_id) validFilter.job_id = filter.job_id;

    const applications = await jobApplicationRepository.getApplications(
      validFilter
    );
    return applications;
  } catch (error) {
    console.error("Error in getApplications Service:", error.message);
    throw new Error(`Error in service: ${error.message}`);
  }
};

module.exports = {
  createJobApplication,
  getApplications,
};

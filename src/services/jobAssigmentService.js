const jobAssignmentRepository = require("../repositories/jobAssigmentRepository");
const jobApplicationRepository = require("../repositories/jobApplicationRepository");

const createJobAssignment = async (jobAssignmentData) => {
  const { job_application_id, status } = jobAssignmentData;

  // Validasi input
  if (!job_application_id || !status) {
    throw new Error(
      "job_application_id and status are required to create a job assignment"
    );
  }
  console.log("cek sebelum masuk");
  try {
    console.log("cek sebelum masuk 1");
    // Membuat job assignment baru menggunakan repository
    const result = await jobAssignmentRepository.createJobAssignment(
      jobAssignmentData
    );
    console.log("resssssss", result);
    const dataTest = await jobAssignmentRepository.getJobAssignmentById(
      result.dataValues.id
    );

    console.log("dataTesttt", result);
    const job_id = dataTest.JobApplication
      ? dataTest.JobApplication.job_id
      : null;

    const UpdateStatusApplication =
      jobApplicationRepository.updateApplicationStatus(
        job_application_id,
        "Assigned"
      );
    const UpdateJobStatusApplication = jobApplicationRepository.updateJobStatus(
      job_id,
      "Closed"
    );
    console.log(UpdateStatusApplication, UpdateJobStatusApplication);
    return result;
  } catch (error) {
    throw new Error(`Error creating job assignment: ${error.message}`);
  }
};

const updateJobAssignmentStatus = async (id, newStatus, completedAt) => {
  if (!id || !newStatus) {
    throw new Error(
      "Job assignment id and new status are required to update the job assignment status"
    );
  }
  const dataTest = await jobAssignmentRepository.getJobAssignmentById(id);

  const job_application_id = dataTest.job_application_id;
  const job_id = dataTest.JobApplication
    ? dataTest.JobApplication.job_id
    : null;

  console.log("TEST DATA job_id:", job_id);
  try {
    // Mengupdate status job assignment
    const updatedJobAssignment =
      await jobAssignmentRepository.updateJobAssignmentStatus(
        id,
        newStatus,
        completedAt
      );
    const UpdateStatusApplication =
      jobApplicationRepository.updateApplicationStatus(
        job_application_id,
        newStatus
      );
    const UpdateJobStatusApplication = jobApplicationRepository.updateJobStatus(
      job_id,
      "Closed"
    );

    console.log(UpdateStatusApplication, UpdateJobStatusApplication);
    // const UpdateStatusApplication =
    // await jobAssignmentRepository.updateApplicationStatus(
    //   id,
    //   newStatus,
    //   completedAt
    // );
    return updatedJobAssignment;
  } catch (error) {
    throw new Error(`Error updating job assignment status: ${error.message}`);
  }
};

const updateRatingAndReview = async (id, rating, review) => {
  if (!id || !rating || !review) {
    throw new Error(
      "Job assignment id and new rating and rating are required to update the job assignment status"
    );
  }

  try {
    // Mengupdate status job assignment
    const updateRating = await jobAssignmentRepository.updateRatingAndReview(
      id,
      rating,
      review
    );

    return updateRating;
  } catch (error) {
    throw new Error(`Error updating job assignment status: ${error.message}`);
  }
};
const getAllAssignmentsByJobId = async (jobId) => {
  try {
    return await jobAssignmentRepository.getAllAssignmentsByJobId(jobId);
  } catch (error) {
    throw new Error(`Error in service: ${error.message}`);
  }
};
module.exports = {
  createJobAssignment,
  updateJobAssignmentStatus,
  updateRatingAndReview,
  getAllAssignmentsByJobId,
};

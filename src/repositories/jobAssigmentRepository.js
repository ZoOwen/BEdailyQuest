const { JobAssignment, JobApplication, Job } = require("../models");

const createJobAssignment = async (data) => {
  try {
    const jobAssignment = await JobAssignment.create(data);
    return jobAssignment;
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

const getJobAssignmentById = async (id) => {
  try {
    return await JobAssignment.findOne({
      where: { id },
      include: [
        {
          model: JobApplication,
          attributes: ["id", "status", "user_id", "job_id"], // Menyesuaikan atribut yang ingin ditampilkan dari JobApplication
          include: [
            {
              model: Job,
              attributes: ["id", "title", "description", "salary", "location"], // Menyesuaikan atribut yang ingin ditampilkan dari Job
            },
          ],
        },
      ],
    });
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

const updateJobAssignmentStatus = async (id, newStatus, completedAt) => {
  try {
    const jobAssignment = await JobAssignment.findOne({ where: { id } });
    if (!jobAssignment) {
      throw new Error("Job Assignment not found");
    }
    jobAssignment.status = newStatus;
    jobAssignment.completed_at = completedAt;
    await jobAssignment.save();
    return jobAssignment;
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

const updateRatingAndReview = async (id, rating, review) => {
  try {
    const jobAssignment = await JobAssignment.findOne({ where: { id } });
    if (!jobAssignment) {
      throw new Error("Job Assignment not found");
    }
    jobAssignment.rating = rating;
    jobAssignment.review = review;
    await jobAssignment.save();
    return jobAssignment;
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};
const getAllAssignmentsByJobId = async (jobId) => {
  try {
    return await JobAssignment.findOne({
      where: { job_id: jobId },
      include: [
        {
          model: JobApplication,
          attributes: ["id", "status", "user_id", "job_id"], // Menyesuaikan atribut yang ingin ditampilkan dari JobApplication
          include: [
            {
              model: Job,
              attributes: ["id", "title", "description", "salary", "location"], // Menyesuaikan atribut yang ingin ditampilkan dari Job
            },
          ],
        },
      ],
    });
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

module.exports = {
  createJobAssignment,
  getJobAssignmentById,
  updateJobAssignmentStatus,
  updateRatingAndReview,
  getAllAssignmentsByJobId,
};

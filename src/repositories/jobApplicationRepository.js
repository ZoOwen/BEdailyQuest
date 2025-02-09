const { JobApplication, User, Job } = require("../models");

const findApplicationByUserAndJob = async (user_id, job_id) => {
  try {
    const existingApplication = await JobApplication.findOne({
      where: {
        user_id: user_id,
        job_id: job_id,
      },
    });

    return existingApplication; // Akan mengembalikan null jika tidak ada aplikasi
  } catch (error) {
    throw new Error(`Error checking existing application: ${error.message}`);
  }
};

const createJobApplication = async (data) => {
  try {
    return await JobApplication.create(data);
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

const getApplications = async (whereClause) => {
  try {
    return await JobApplication.findAll({
      where: whereClause,
      include: [
        { model: User, attributes: ["id", "username"] }, // Ganti Worker menjadi User
        { model: Job, attributes: ["id", "title", "user_id"] },
      ],
    });
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

// Fungsi untuk update status pelamar pekerjaan (terima/tolak)
const updateApplicationStatus = async (applicationId, status) => {
  try {
    const application = await JobApplication.findOne({
      where: { id: applicationId },
    });

    if (!application) {
      throw new Error("Job application not found");
    }

    // Update status job application
    application.status = status;
    await application.save();

    return application;
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

// Fungsi untuk mengupdate status pekerjaan yang diposting
const updateJobStatus = async (jobId, status) => {
  try {
    const job = await Job.findOne({ where: { id: jobId } });

    if (!job) {
      throw new Error("Job not found");
    }

    // Update status pekerjaan
    job.status = status;
    await job.save();

    return job;
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

// Fungsi untuk mengupdate status pekerjaan setelah selesai
const completeJob = async (jobId) => {
  try {
    const job = await Job.findOne({ where: { id: jobId } });

    if (!job) {
      throw new Error("Job not found");
    }

    // Update pekerjaan menjadi selesai
    job.status = "Completed";
    await job.save();

    return job;
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

module.exports = {
  createJobApplication,
  getApplications,
  findApplicationByUserAndJob,
  updateApplicationStatus, // export fungsi baru
  updateJobStatus, // export fungsi baru
  completeJob, // export fungsi baru
};

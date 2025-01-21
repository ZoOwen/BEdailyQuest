const JobApplication = require("../models/jobApplicationModel");

const createJobApplication = async (data) => {
  try {
    return await JobApplication.create(data);
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

module.exports = {
  createJobApplication,
};

// kelola pelamar pekerjaan ada beberapa api
// 0. liat siapa saja yang melamar
// 1. api terima pelamar / tolak
// 2.ubah status pekerjaan yang di posting (terambil apa belum)
// 3. status menyelesaikan pekerjaan

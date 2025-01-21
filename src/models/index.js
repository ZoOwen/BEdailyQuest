const { Sequelize } = require("sequelize");
const User = require("./userModel");
const Worker = require("./workerModel");
const Employer = require("./employerModel");
const Job = require("./jobModel");
const JobAssignment = require("./jobAssigmentModel");
const Wallet = require("./walletModel");
const Payment = require("./paymentModel");
const JobApplication = require("./jobApplicationModel"); // Import model baru

require("dotenv").config();

// Konfigurasi Sequelize
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// **Definisikan relasi (asosiasi) antar model di sini**
User.hasOne(Employer, { foreignKey: "user_id" });
Employer.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Worker, { foreignKey: "user_id" });
Worker.belongsTo(User, { foreignKey: "user_id" });

Employer.hasMany(Job, { foreignKey: "employer_id" });
Job.belongsTo(Employer, { foreignKey: "employer_id" });

Job.hasMany(JobApplication, { foreignKey: "job_id" }); // Relasi Job ke JobApplication
JobApplication.belongsTo(Job, { foreignKey: "job_id" });

Worker.hasMany(JobApplication, { foreignKey: "worker_id" }); // Relasi Worker ke JobApplication
JobApplication.belongsTo(Worker, { foreignKey: "worker_id" });

// Export semua model dan instance sequelize
module.exports = {
  sequelize,
  User,
  Worker,
  Employer,
  Job,
  JobAssignment,
  Wallet,
  Payment,
  JobApplication, // Export model baru
};

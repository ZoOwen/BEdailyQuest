const { Sequelize } = require("sequelize");
const User = require("./userModel");
const Worker = require("./workerModel");
const Employer = require("./employerModel");
const Job = require("./jobModel");
const JobAssignment = require("./jobAssigmentModel");
const Wallet = require("./walletModel");
const Payment = require("./paymentModel");
const JobApplication = require("./jobApplicationModel");

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

User.hasMany(Job, { foreignKey: "user_id" });
Job.belongsTo(User, { foreignKey: "user_id" });

// Relasi antara JobApplication dan User
JobApplication.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(JobApplication, { foreignKey: "user_id" });

JobApplication.belongsTo(Job, { foreignKey: "job_id" });
Job.hasMany(JobApplication, { foreignKey: "job_id" });

// Relasi antara Wallet dan Worker (Setiap Worker memiliki satu Wallet)
Wallet.belongsTo(Worker, { foreignKey: "user_id" });
Worker.hasOne(Wallet, { foreignKey: "user_id" });

// Relasi antara Payment dan Wallet (Setiap Payment terhubung ke satu Wallet)
Payment.belongsTo(Wallet, { foreignKey: "wallet_id" });
Wallet.hasMany(Payment, { foreignKey: "wallet_id" });

// Relasi antara Wallet dan User (Setiap User memiliki satu Wallet)
User.hasOne(Wallet, { foreignKey: "user_id" });
Wallet.belongsTo(User, { foreignKey: "user_id" });

// Relasi antara JobAssignment dan Worker
// JobAssignment.belongsTo(User, { foreignKey: "user_id" });
// User.hasMany(JobAssignment, { foreignKey: "user_id" });

// // Relasi antara JobAssignment dan Job
// JobAssignment.belongsTo(Job, { foreignKey: "job_id" });
// Job.hasMany(JobAssignment, { foreignKey: "job_id" });

JobApplication.hasOne(JobAssignment, { foreignKey: "job_application_id" });
JobAssignment.belongsTo(JobApplication, { foreignKey: "job_application_id" });
//error get detail  job
// error get appliaction

module.exports = {
  sequelize,
  User,
  Worker,
  Employer,
  Job,
  JobAssignment,
  Wallet,
  Payment,
  JobApplication,
};

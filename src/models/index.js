const { Sequelize } = require("sequelize");
const User = require("./userModel");
const Worker = require("./workerModel");
const Employer = require("./employerModel");
const Job = require("./jobModel");
const JobAssignment = require("./jobAssigmentModel");
const Wallet = require("./walletModel");
const Payment = require("./paymentModel");
require("dotenv").config();

// Konfigurasi Sequelize
const sequelize = new Sequelize({
  dialect: "mysql", // Atur sesuai dengan database yang Anda gunakan
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// **Definisikan relasi (asosiasi) antar model di sini**
// Contoh relasi antara User dan Employer
User.hasOne(Employer, { foreignKey: "user_id" });
Employer.belongsTo(User, { foreignKey: "user_id" });

// Tambahkan relasi lain sesuai kebutuhan
User.hasOne(Worker, { foreignKey: "user_id" });
Worker.belongsTo(User, { foreignKey: "user_id" });

Employer.hasMany(Job, { foreignKey: "employer_id" });
Job.belongsTo(Employer, { foreignKey: "employer_id" });

// Relasi lainnya sesuai kebutuhan proyek Anda
// ...

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
};

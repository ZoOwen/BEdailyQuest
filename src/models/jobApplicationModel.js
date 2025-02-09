const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Job = require("./jobModel");
const User = require("./userModel"); // Mengganti Worker menjadi User

const JobApplication = sequelize.define("JobApplication", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: "id",
    },
  },
  user_id: {
    // Ganti worker_id menjadi user_id
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Merujuk ke User, bukan Worker
      key: "id",
    },
  },
  application_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending", // Status default adalah Pending
  },
});

module.exports = JobApplication;

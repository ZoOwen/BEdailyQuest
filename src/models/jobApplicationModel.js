const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Job = require("./jobModel");
const Worker = require("./workerModel");

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
  worker_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Worker,
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
    defaultValue: "Pending", // Example: Pending, Accepted, Rejected
  },
});

module.exports = JobApplication;

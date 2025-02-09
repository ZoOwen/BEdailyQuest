const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const JobAssignment = sequelize.define("JobAssignment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  job_application_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 },
  },
  review: {
    type: DataTypes.TEXT,
  },
});

// Job.hasMany(JobAssignment, { foreignKey: "JobID" });
// Worker.hasMany(JobAssignment, { foreignKey: "WorkerID" });
// JobAssignment.belongsTo(Job, { foreignKey: "JobID" });
// JobAssignment.belongsTo(Worker, { foreignKey: "WorkerID" });

module.exports = JobAssignment;

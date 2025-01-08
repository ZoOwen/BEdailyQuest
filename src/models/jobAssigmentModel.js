const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const JobAssignment = sequelize.define("JobAssignment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  job_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Job,
    //   key: "JobID",
    // },
  },
  worker_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Worker,
    //   key: "WorkerID",
    // },
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  completed_at: {
    type: DataTypes.DATE,
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

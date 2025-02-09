const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Employer,
    //   key: "EmployerID",
    // },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Open",
  },
});

// Employer.hasMany(Job, { foreignKey: "EmployerID" });
// Job.belongsTo(Employer, { foreignKey: "EmployerID" });

module.exports = Job;

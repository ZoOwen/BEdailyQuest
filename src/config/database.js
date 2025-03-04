const { Sequelize } = require("sequelize");
require("dotenv").config();

// Koneksi ke database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
  }
);

module.exports = sequelize;

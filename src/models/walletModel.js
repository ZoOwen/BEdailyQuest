const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Wallet = sequelize.define("Wallet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  worker_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Worker,
    //   key: "WorkerID",
    // },
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
});

// Worker.hasOne(Wallet, { foreignKey: "WorkerID" });
// Wallet.belongsTo(Worker, { foreignKey: "WorkerID" });

module.exports = Wallet;

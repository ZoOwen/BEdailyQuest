const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Deposit", "Withdrawal", "Payment"]],
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Pending", "Completed", "Failed"]],
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "transactions",
    timestamps: false, // Kalau createdAt dan updatedAt di-handle manual
  }
);

module.exports = Transaction;

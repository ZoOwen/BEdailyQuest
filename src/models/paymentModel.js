const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wallet_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Wallet,
    //   key: "WalletID",
    // },
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  transaction_type: {
    type: DataTypes.STRING,
    allowNull: false, // Deposit, Withdrawal, Payment
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false, // Pending, Completed, Failed
    defaultValue: "Pending",
  },
});

// Wallet.hasMany(Payment, { foreignKey: "WalletID" });
// Payment.belongsTo(Wallet, { foreignKey: "WalletID" });

module.exports = Payment;

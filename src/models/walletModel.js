const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Wallet = sequelize.define("Wallet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users", // Nama tabel di database yang sesuai
      key: "id", // Kolom yang menjadi referensi di tabel Worker
    },
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
});

// Tidak perlu mendefinisikan `hasMany` pada Wallet karena Wallet terhubung ke satu Worker dan bisa memiliki banyak Payment

module.exports = Wallet;

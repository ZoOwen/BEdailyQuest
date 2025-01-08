const { User } = require("../models");

class UserRepository {
  async findByUsername(username) {
    return User.findOne({ where: { username } });
  }

  async createUser(userData, transaction = null) {
    return User.create(userData, { transaction }); // Tambahkan transaksi jika ada
  }
}

module.exports = new UserRepository();

const { Employer } = require("../models");

class EmployerRepository {
  async createEmployer(employerData, transaction = null) {
    return Employer.create(employerData, { transaction }); // Tambahkan transaksi jika ada
  }
}

module.exports = new EmployerRepository();

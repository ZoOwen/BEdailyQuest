const { Worker } = require("../models");

class WorkerRepository {
  async createWorker(workerData, transaction = null) {
    return Worker.create(workerData, { transaction }); // Tambahkan transaksi jika ada
  }
}

module.exports = new WorkerRepository();

const { Worker } = require("../models");

class WorkerRepository {
  async createWorker(workerData, transaction = null) {
    return Worker.create(workerData, { transaction });
  }
}

module.exports = new WorkerRepository();

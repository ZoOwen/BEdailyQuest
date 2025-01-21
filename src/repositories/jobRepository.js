const { Job, Employer } = require("../models");
const { Op } = require("sequelize");

class JobRepository {
  async create(jobData) {
    return await Job.create(jobData);
  }

  async findAll({
    search,
    sortBy = "createdAt",
    order = "DESC",
    limit = 10,
    offset = 0,
  }) {
    const whereCondition = search
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { category: { [Op.like]: `%${search}%` } },
          ],
        }
      : undefined;

    return await Job.findAndCountAll({
      where: whereCondition,
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  }

  async findById(id) {
    return await Job.findOne({
      where: { id },
      include: [
        {
          model: Employer,
          attributes: ["name", "address"], // Hanya ambil kolom yang dibutuhkan
        },
      ],
    });
  }
}

module.exports = new JobRepository();

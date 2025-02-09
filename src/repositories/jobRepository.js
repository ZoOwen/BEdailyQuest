const { Job, User, Employer } = require("../models");
const { Op } = require("sequelize");

class JobRepository {
  async create(jobData) {
    return await Job.create(jobData);
  }

  async findAll({
    search,
    user_id,
    sortBy = "createdAt",
    order = "DESC",
    limit = 10,
    offset = 0,
  }) {
    // Tentukan kondisi pencarian
    const whereCondition = {
      ...(search && {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { category: { [Op.like]: `%${search}%` } },
          // Cek apakah search berupa angka atau string, kalau angka baru compare dengan employer_id
          ...(isNaN(search)
            ? []
            : [{ employer_id: { [Op.eq]: parseInt(search) } }]), // Pastikan search diparsing ke integer jika diperlukan
        ],
      }),
      ...(user_id && { user_id: user_id }), // Menambahkan kondisi filter user_id jika ada
    };

    // Query untuk mengambil data
    return await Job.findAndCountAll({
      where: whereCondition,
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  }

  // async findAll({
  //   search,
  //   sortBy = "createdAt",
  //   order = "DESC",
  //   limit = 10,
  //   offset = 0,
  // }) {
  //   const whereCondition = search
  //     ? {
  //         [Op.or]: [
  //           { title: { [Op.like]: `%${search}%` } },
  //           { category: { [Op.like]: `%${search}%` } },
  //           { employer_id: { [Op.eq]: search } },
  //         ],
  //       }
  //     : undefined;

  //   return await Job.findAndCountAll({
  //     where: whereCondition,
  //     order: [[sortBy, order]],
  //     limit: parseInt(limit),
  //     offset: parseInt(offset),
  //   });
  // }

  async findById(id) {
    return await Job.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["username"],
          include: [
            {
              model: Employer, // Menambahkan join ke Employer
              attributes: ["id", "company_name", "name", "address"], // Sesuaikan dengan field yang kamu butuhkan dari Employer
            },
          ],
        },
      ],
    });
  }
}

module.exports = new JobRepository();

const { User, Worker, Employer } = require("../models");

class UserRepository {
  async findByUsername(username) {
    return User.findOne({ where: { username } });
  }

  async createUser(userData, transaction = null) {
    return User.create(userData, { transaction }); // Tambahkan transaksi jika ada
  }
  async findProfileById(profile_id) {
    return User.findOne({
      where: { id: profile_id },
      include: [
        {
          model: Worker,
          attributes: [
            "name",
            "address",
            "gender",
            "city",
            "province",
            "student_card_photo",
          ],
        },
        {
          model: Employer,
          attributes: ["name", "company_name", "address"],
        },
      ],
      attributes: ["id", "username", "email", "phone", "role"],
    });
  }
}

module.exports = new UserRepository();

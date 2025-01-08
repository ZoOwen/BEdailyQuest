const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/userRepository");
const EmployerRepository = require("../repositories/employerRepository");
const WorkerRepository = require("../repositories/workerRepository");
const { sequelize } = require("../models");
class AuthService {
  async registerUser({
    username,
    password,
    email,
    phone,
    role,
    additionalData,
  }) {
    const transaction = await sequelize.transaction();

    try {
      const userExists = await UserRepository.findByUsername(username);
      if (userExists) {
        throw new Error("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserRepository.createUser(
        {
          username,
          password: hashedPassword,
          email,
          phone,
          role,
        },
        transaction
      );

      if (role === "1") {
        await EmployerRepository.createEmployer(
          {
            user_id: newUser.id,
            ...additionalData,
          },
          transaction
        );
      } else if (role === "2") {
        await WorkerRepository.createWorker(
          {
            user_id: newUser.id,
            ...additionalData,
          },
          transaction
        );
      } else {
        throw new Error("Invalid role specified");
      }

      await transaction.commit();

      // Buat JWT token
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return {
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        token,
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async loginUser(username, password) {
    const user = await UserRepository.findByUsername(username);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      username: user.username,
      email: user.email,
      phone: user.phone,
      token,
    };
  }
}

module.exports = new AuthService();

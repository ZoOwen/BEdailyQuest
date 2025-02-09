const { sendResponse } = require("../utils/response");
const AuthService = require("../services/authService");

class AuthController {
  async register(req, res) {
    try {
      const { username, password, email, phone, additionalData } = req.body;
      const { role } = req.query;
      console.log("data dari body", req.body);

      if (!username || !password || !email || !phone || !role) {
        return sendResponse(res, 400, false, "All fields are required");
      }

      if (!["1", "2"].includes(role)) {
        return sendResponse(res, 400, false, "Invalid role. Use '1' or '2'");
      }

      const result = await AuthService.registerUser({
        username,
        password,
        email,
        phone,
        role,
        additionalData,
      });

      return sendResponse(
        res,
        201,
        true,
        "User registered successfully",
        result
      );
    } catch (error) {
      console.error(error);
      return sendResponse(
        res,
        500,
        false,
        error.message || "Error registering user"
      );
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return sendResponse(
          res,
          400,
          false,
          "Username and password are required"
        );
      }

      const result = await AuthService.loginUser(username, password);

      return sendResponse(res, 200, true, "Login successful", result);
    } catch (error) {
      console.error(error);
      return sendResponse(
        res,
        500,
        false,
        error.message || "Error logging in user"
      );
    }
  }
  async getProfile(req, res) {
    try {
      const { profile_id } = req.query;

      if (!profile_id) {
        return sendResponse(res, 400, false, "Profile ID is required");
      }

      const profile = await AuthService.getProfile(profile_id);

      if (!profile) {
        return sendResponse(res, 404, false, "Profile not found");
      }

      return sendResponse(
        res,
        200,
        true,
        "Profile fetched successfully",
        profile
      );
    } catch (error) {
      console.error(error);
      return sendResponse(
        res,
        500,
        false,
        error.message || "Error fetching profile"
      );
    }
  }
}

module.exports = new AuthController();

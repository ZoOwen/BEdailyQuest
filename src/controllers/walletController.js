const { sendResponse } = require("../utils/response");
const WalletService = require("../services/walletService");

class WalletController {
  async createWallet(req, res) {
    try {
      const { user_id, balance } = req.body;

      if (!user_id) {
        return sendResponse(res, 400, false, "user_id is required");
      }

      const walletData = {
        user_id,
        balance: balance || 0.0,
      };

      const wallet = await WalletService.createWallet(walletData);

      return sendResponse(
        res,
        201,
        true,
        "Wallet created successfully",
        wallet
      );
    } catch (error) {
      console.error("Error in createWallet:", error.message);
      return sendResponse(res, 500, false, error.message);
    }
  }

  async getWalletById(req, res) {
    try {
      const { id } = req.params;

      const wallet = await WalletService.getWalletById(id);

      if (!wallet) {
        return sendResponse(res, 404, false, "Wallet not found");
      }

      return sendResponse(
        res,
        200,
        true,
        "Wallet retrieved successfully",
        wallet
      );
    } catch (error) {
      console.error("Error in getWalletById:", error.message);
      return sendResponse(res, 500, false, error.message);
    }
  }

  async getWalletByUserId(req, res) {
    try {
      const { user_id } = req.params;

      // Panggil service untuk mendapatkan wallet berdasarkan user_id
      const wallet = await WalletService.getWalletByUserId(user_id);

      if (!wallet) {
        // Jika wallet tidak ditemukan, kembalikan response 404
        return res.status(404).json({
          success: false,
          message: "Wallet not found",
        });
      }

      // Jika wallet ditemukan, kembalikan data wallet
      return res.status(200).json({
        success: true,
        message: "Wallet retrieved successfully",
        data: wallet,
      });
    } catch (error) {
      console.error("Error in getWalletByUserId:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllWallets(req, res) {
    try {
      const wallets = await WalletService.getAllWallets();

      if (!wallets || wallets.length === 0) {
        return sendResponse(res, 404, false, "No wallets found");
      }

      return sendResponse(
        res,
        200,
        true,
        "Wallets retrieved successfully",
        wallets
      );
    } catch (error) {
      console.error("Error in getAllWallets:", error.message);
      return sendResponse(res, 500, false, error.message);
    }
  }

  async updateWalletBalance(req, res) {
    try {
      const { id } = req.params;
      const { newBalance } = req.body;

      if (newBalance === undefined) {
        return sendResponse(res, 400, false, "newBalance is required");
      }

      if (newBalance < 0) {
        return sendResponse(res, 400, false, "Balance cannot be negative");
      }

      const updatedWallet = await WalletService.updateWalletBalance(
        id,
        newBalance
      );

      if (!updatedWallet) {
        return sendResponse(res, 404, false, "Wallet not found");
      }

      return sendResponse(
        res,
        200,
        true,
        "Wallet balance updated successfully",
        updatedWallet
      );
    } catch (error) {
      console.error("Error in updateWalletBalance:", error.message);
      return sendResponse(res, 500, false, error.message);
    }
  }

  async deleteWallet(req, res) {
    try {
      const { id } = req.params;

      const deletedWallet = await WalletService.deleteWallet(id);

      if (!deletedWallet) {
        return sendResponse(res, 404, false, "Wallet not found");
      }

      return sendResponse(res, 200, true, "Wallet deleted successfully");
    } catch (error) {
      console.error("Error in deleteWallet:", error.message);
      return sendResponse(res, 500, false, error.message);
    }
  }
}

module.exports = new WalletController();

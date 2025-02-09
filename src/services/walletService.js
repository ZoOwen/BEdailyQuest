const walletRepository = require("../repositories/walletRepository");

const createWallet = async (walletData) => {
  const { user_id } = walletData;

  if (!user_id) {
    throw new Error("user_id is required to create a wallet");
  }

  try {
    const existingWallet = await walletRepository.getWalletByUserId(user_id);
    if (existingWallet) {
      throw new Error("User already has a wallet");
    }

    const wallet = await walletRepository.createWallet(walletData);
    return wallet;
  } catch (error) {
    throw new Error(`Error creating wallet: ${error.message}`);
  }
};

const getWalletById = async (id) => {
  try {
    const wallet = await walletRepository.getWalletById(id);
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    return wallet;
  } catch (error) {
    throw new Error(`Error getting wallet by ID: ${error.message}`);
  }
};

const getWalletByUserId = async (user_id) => {
  try {
    // Panggil repository untuk mengambil wallet berdasarkan user_id
    const wallet = await walletRepository.getWalletByUserId(user_id);

    // Kembalikan wallet (bisa null jika tidak ditemukan)
    return wallet;
  } catch (error) {
    throw new Error(`Error getting wallet by user ID: ${error.message}`);
  }
};

const getAllWallets = async () => {
  try {
    const wallets = await walletRepository.getAllWallets();
    return wallets;
  } catch (error) {
    throw new Error(`Error getting all wallets: ${error.message}`);
  }
};

const updateWalletBalance = async (id, newBalance) => {
  if (newBalance < 0) {
    throw new Error("Balance cannot be negative");
  }

  try {
    const wallet = await walletRepository.updateWalletBalance(id, newBalance);
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    return wallet;
  } catch (error) {
    throw new Error(`Error updating wallet balance: ${error.message}`);
  }
};

const deleteWallet = async (id) => {
  try {
    const wallet = await walletRepository.deleteWallet(id);
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    return wallet;
  } catch (error) {
    throw new Error(`Error deleting wallet: ${error.message}`);
  }
};

module.exports = {
  createWallet,
  getWalletById,
  getWalletByUserId,
  getAllWallets,
  updateWalletBalance,
  deleteWallet,
};

const { Wallet } = require("../models");

const getWalletById = async (id) => {
  try {
    const wallet = await Wallet.findByPk(id);
    return wallet;
  } catch (error) {
    throw new Error(`Error getting wallet by ID: ${error.message}`);
  }
};

const getWalletByUserId = async (user_id) => {
  try {
    // Cek database untuk wallet yang sesuai dengan user_id
    const wallet = await Wallet.findOne({
      where: { user_id },
    });

    // Jika wallet tidak ditemukan, maka return null
    return wallet; // wallet bisa null jika tidak ada yang cocok
  } catch (error) {
    throw new Error(`Error getting wallet by user ID: ${error.message}`);
  }
};

const getAllWallets = async () => {
  try {
    const wallets = await Wallet.findAll();
    return wallets;
  } catch (error) {
    throw new Error(`Error getting all wallets: ${error.message}`);
  }
};

const createWallet = async (data) => {
  try {
    if (!data.user_id) {
      throw new Error("user_id is required");
    }

    const existingWallet = await getWalletByUserId(data.user_id);
    if (existingWallet) {
      throw new Error("User already has a wallet");
    }

    return await Wallet.create(data);
  } catch (error) {
    throw new Error(`Error creating wallet: ${error.message}`);
  }
};

const updateWalletBalance = async (id, amountToAdd) => {
  try {
    const wallet = await getWalletById(id);
    if (!wallet) {
      return null; // Wallet tidak ditemukan
    }

    // Menambahkan balance baru ke saldo yang sudah ada
    // Menggunakan toFixed untuk membulatkan ke 2 digit desimal
    wallet.balance = (
      parseFloat(wallet.balance) + parseFloat(amountToAdd)
    ).toFixed(2);

    await wallet.save(); // Menyimpan perubahan saldo
    return wallet;
  } catch (error) {
    throw new Error(`Error updating wallet balance: ${error.message}`);
  }
};

const deleteWallet = async (id) => {
  try {
    const wallet = await getWalletById(id);
    if (!wallet) {
      return null;
    }
    await wallet.destroy();
    return wallet;
  } catch (error) {
    throw new Error(`Error deleting wallet: ${error.message}`);
  }
};

module.exports = {
  getWalletById,
  getWalletByUserId,
  getAllWallets,
  createWallet,
  updateWalletBalance,
  deleteWallet,
};

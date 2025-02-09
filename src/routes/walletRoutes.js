const express = require("express");
const router = express.Router();
const {
  createWallet,
  getAllWallets,
  getWalletByUserId,
} = require("../controllers/walletController");

router.post("/", createWallet);
router.get("/", getAllWallets);
router.get("/:user_id", getWalletByUserId);

router.get("/profile");
module.exports = router;

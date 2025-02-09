const express = require("express");
const router = express.Router();
const {
  createPayment,
  midtransCallback,
} = require("../controllers/paymentController");

router.post("/", createPayment);

// Route untuk menerima callback dari Midtrans
router.post("/status", midtransCallback);

module.exports = router;

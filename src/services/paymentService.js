const paymentRepository = require("../repositories/paymentRepository");
const walletRepository = require("../repositories/walletRepository");
const { snap, coreApi } = require("./../config/midtrans");

const createPayment = async (paymentData) => {
  const { wallet_id, amount, transaction_type, job_id } = paymentData;

  if (!wallet_id || !amount || !transaction_type) {
    throw new Error(
      "wallet_id, amount, and transaction_type are required to create a payment"
    );
  }

  try {
    const wallet = await walletRepository.getWalletById(wallet_id);
    if (!wallet) {
      throw new Error("Wallet not found");
    }

    const validTransactionTypes = ["Deposit", "Withdrawal", "Payment"];
    if (!validTransactionTypes.includes(transaction_type)) {
      throw new Error(`Invalid transaction type: ${transaction_type}`);
    }

    // Create payment record in the database
    const paymentDataToSave = {
      job_id,
      amount,
      transaction_type,
      wallet_id,
    };

    const result = await paymentRepository.createPayment(paymentDataToSave); // Save payment record in DB

    // Return both the result from the database and the transaction from Midtrans
    return { result };
  } catch (error) {
    console.error("Error in createPayment Service:", error.message);
    throw new Error(`Error in service: ${error.message}`);
  }
};

const getPayments = async (filter) => {
  try {
    const validFilter = {};

    if (filter.wallet_id) validFilter.wallet_id = filter.wallet_id;
    if (filter.status) validFilter.status = filter.status;

    const payments = await paymentRepository.getPayments(validFilter);
    return payments;
  } catch (error) {
    console.error("Error in getPayments Service:", error.message);
    throw new Error(`Error in service: ${error.message}`);
  }
};

const getPaymentById = async (paymentId) => {
  try {
    const payment = await paymentRepository.getPaymentById(paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }
    return payment;
  } catch (error) {
    console.error("Error in getPaymentById Service:", error.message);
    throw new Error(`Error in service: ${error.message}`);
  }
};

const findPaymentByWalletId = async (walletId) => {
  try {
    const payments = await paymentRepository.findPaymentByWalletId(walletId);
    return payments;
  } catch (error) {
    console.error("Error in findPaymentByWalletId Service:", error.message);
    throw new Error(`Error in service: ${error.message}`);
  }
};

const generateRandomString = (length = 7) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

// Fungsi untuk menghasilkan newOrderID
const generatenewWalletId = (order_id) => {
  const today = new Date();
  const dateStr = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`; // Format: YYYYMMDD
  const randomStr = generateRandomString(7); // Membuat random string 7 karakter

  return `JOB${dateStr}-${order_id}-${randomStr}`;
};

const createMidtransTransaction = async (
  order_id,
  gross_amount,
  wallet_id,
  transaction_type
) => {
  // Prepare the transaction parameters for Midtrans
  const newWalletId = generatenewWalletId(order_id);
  console.log(newWalletId);
  const parameter = {
    transaction_details: {
      order_id: newWalletId, //ini wallet_id nya sebenarnya
      gross_amount: gross_amount,
    },
    customer_details: {
      wallet_id: wallet_id,
      transaction_type: transaction_type,
    },
  };

  try {
    // Call Midtrans API to create a transaction
    const transaction = await snap.createTransaction(parameter);
    const id_order = newWalletId;
    const dataRes = { transaction, id_order };
    console.log("data trasactionss", transaction);
    const updateMidtransId = paymentRepository.updateOrderMidtransId(
      order_id,
      newWalletId
    );
    return dataRes; // Return the response from Midtrans
  } catch (error) {
    console.error("Error in creating Midtrans transaction:", error.message);
    throw new Error("Failed to create Midtrans transaction");
  }
};
const updatePaymentStatusFromMidtrans = async (
  order_id,
  transaction_status
) => {
  console.log(
    "INI DI SERVICE YE",
    order_id,
    "ini sts_code",
    transaction_status
  );

  // Tentukan status baru berdasarkan status dari Midtrans
  let newStatus = "Pending";
  if (transaction_status === "capture") {
    // Capture berarti transaksi sukses (tergantung pada implementasi)
    newStatus = "Success";
  } else if (transaction_status === "expire") {
    newStatus = "Expired";
  } else if (transaction_status === "cancel") {
    newStatus = "Failed";
  } else {
    newStatus = "Failed";
  }

  try {
    // Mengambil ID yang benar dari order_id
    const fullOrderId = order_id;
    const parts = fullOrderId.split("-");
    const extractedOrderId = parts[1]; // Ambil bagian tengah ID yang valid

    console.log("ID wallet yang menyamar jadi order_id hehe", extractedOrderId);

    // Update status pembayaran
    const payment = await paymentRepository.updatePaymentStatus(
      extractedOrderId,
      newStatus
    );
    const walletId = await paymentRepository.getWalletIdByPaymentId(
      extractedOrderId
    );
    console.log("Wallet ID:", walletId);
    const updatedWallet = await walletRepository.updateWalletBalance(
      walletId, // Pastikan payment.wallet_id valid
      payment.amount // Pastikan payment.amount valid
    );
    // Jika transaksi berhasil (status "capture"), kita update saldo wallet
    if (newStatus === "Success") {
      return {
        success: true,
        message: `Payment status updated to ${newStatus}`,
        data: {
          payment,
          wallet: updatedWallet,
        },
      };
    } else {
      return {
        success: true,
        message: `Payment status updated to ${newStatus}`,
        data: payment,
      };
    }
  } catch (error) {
    console.error(
      "Error in updating payment status from Midtrans:",
      error.message
    );
    throw new Error(`Error updating payment status: ${error.message}`);
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  findPaymentByWalletId,
  createMidtransTransaction,
  updatePaymentStatusFromMidtrans,
};

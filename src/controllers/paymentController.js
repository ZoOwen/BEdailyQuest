const { sendResponse } = require("../utils/response");
const PaymentService = require("../services/paymentService");

const { snap, coreApi } = require("./../config/midtrans");
class PaymentController {
  async createPayment(req, res) {
    try {
      const { job_id, worker_id, amount, transaction_type, wallet_id } =
        req.body;

      if (!job_id || !worker_id || !amount || !wallet_id || !transaction_type) {
        return sendResponse(
          res,
          400,
          false,
          "job_id, worker_id, amount, wallet_id, and transaction_type are required"
        );
      }

      console.log("ini paymenttt", req.body);

      // Call the service to create payment and Midtrans transaction
      const { result } = await PaymentService.createPayment({
        job_id,
        worker_id,
        amount,
        transaction_type,
        wallet_id,
      });
      // Create Midtrans transaction
      const order_id = job_id; // Using job_id as the order_id
      const gross_amount = amount; // Using amount as the gross_amount
      const MidTranstransaction =
        await PaymentService.createMidtransTransaction(
          result.id,
          gross_amount,
          wallet_id,
          transaction_type
        );

      console.log("Payment created: ", result);
      console.log("Midtrans transaction: ", result.id);

      return sendResponse(res, 200, true, "Payment processed successfully", {
        payment: result,
        midtrans_transaction: MidTranstransaction,
      });
    } catch (error) {
      console.error("Payment error:", error.message);
      return sendResponse(res, 500, false, "Failed to process payment");
    }
  }

  async getPayments(req, res) {
    try {
      const filter = req.query;

      const payments = await PaymentService.getPayments(filter);
      console.log("Payments fetched: ", payments);

      return sendResponse(
        res,
        200,
        true,
        "Payments fetched successfully",
        payments
      );
    } catch (error) {
      console.error("Error fetching payments:", error.message);
      return sendResponse(res, 500, false, "Failed to fetch payments");
    }
  }

  //callback midtrans
  async midtransCallback(req, res) {
    try {
      const { order_id } = req.body;

      // Ambil status transaksi dari Midtrans API
      const response = await coreApi.transaction.status(order_id);

      console.log("Midtrans API Response:", response); // Log the response

      // Pastikan ada status_code atau status_message dari Midtrans
      if (response && response.transaction_status) {
        console.log("CEK STATOSS", response.transaction_status); // Transaction status is a string (e.g., "capture")

        // Perbarui status berdasarkan status transaksi dari Midtrans
        const updateStatus =
          await PaymentService.updatePaymentStatusFromMidtrans(
            response.order_id,
            response.transaction_status // Pastikan ini adalah status yang benar (string)
          );

        return res.status(200).json({
          success: true,
          message: "Status transaksi berhasil didapatkan",
          data: { response, updateStatus },
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Status transaksi tidak ditemukan",
        });
      }
    } catch (error) {
      console.error("Error getting transaction status:", error.message);
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan saat mendapatkan status transaksi",
        error: error.message,
      });
    }
  }
}

module.exports = new PaymentController();

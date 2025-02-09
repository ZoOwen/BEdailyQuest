const { Payment, Wallet } = require("../models");

const createPayment = async (data) => {
  try {
    const payment = await Payment.create(data);

    const transactionData = {
      wallet_id: data.wallet_id,
      transaction_type: "Payment",
      amount: data.amount,
      status: "Completed",
    };

    return payment;
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

const getPayments = async (whereClause) => {
  try {
    return await Payment.findAll({
      where: whereClause,
      include: [
        {
          model: Wallet,
          attributes: ["id", "balance"],
          include: [
            {
              model: User,
              include: [
                {
                  model: Worker,
                  attributes: ["name", "address"],
                },
              ],
            },
          ],
        },
      ],
    });
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

const getPaymentById = async (paymentId) => {
  try {
    return await Payment.findOne({
      where: { id: paymentId },
      include: [{ model: Wallet, attributes: ["id", "balance"] }],
    });
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};

const findPaymentByWalletId = async (walletId) => {
  try {
    return await Payment.findAll({
      where: { wallet_id: walletId },
      include: [{ model: Wallet, attributes: ["id", "balance"] }],
    });
  } catch (error) {
    throw new Error(`Error in repository: ${error.message}`);
  }
};
const updatePaymentStatus = async (paymentId, newStatus) => {
  try {
    const payment = await Payment.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    // Update status pembayaran
    payment.status = newStatus;
    await payment.save();

    return payment;
  } catch (error) {
    throw new Error(`Error in updating payment status: ${error.message}`);
  }
};

const updateOrderMidtransId = async (paymentId, midTransOrderId) => {
  try {
    const payment = await Payment.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    // Update status pembayaran
    payment.midtrans_order_id = midTransOrderId;
    await payment.save();

    return payment;
  } catch (error) {
    throw new Error(`Error in updating payment Midtrans ID: ${error.message}`);
  }
};

const getWalletIdByPaymentId = async (paymentId) => {
  try {
    const payment = await Payment.findOne({
      where: { id: paymentId },
      attributes: ["wallet_id"], // hanya mengambil wallet_id
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    return payment.wallet_id;
  } catch (error) {
    throw new Error(
      `Error in finding wallet_id by payment_id: ${error.message}`
    );
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  findPaymentByWalletId,
  updatePaymentStatus,
  getWalletIdByPaymentId,
  updateOrderMidtransId,
};

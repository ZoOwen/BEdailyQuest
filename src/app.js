require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const walletROutes = require("./routes/walletRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const jobAssigmentRoutes = require("./routes/jobAssigmentRoutes");
const { snap, coreApi } = require("./config/midtrans");
const app = express();

app.use(cors());

// Middleware buat baca data dari bodi posmen
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", jobApplicationRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/wallet", walletROutes);
app.use("/api/v1/job-assigment", jobAssigmentRoutes);

app.post("/api/v1/midtrans-test", async (req, res) => {
  const { order_id, gross_amount, customer_details } = req.body;

  const parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: gross_amount,
    },
    customer_details: customer_details,
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize
  .sync({ alter: true }) // aturan = bisa mengganti `alter: true` dengan `force: false kalo gk salah`
  .then(() => {
    console.log("Database synchronized!");
  })
  .catch((error) => {
    console.error("Database synchronization failed:", error);
  });

app.get("/", (req, res) => {
  res.send("HENLO ME");
});

module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");

const app = express();

// Middleware buat baca data dari bodi posmen
app.use(bodyParser.json());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", jobApplicationRoutes);

sequelize
  .sync({ alter: true }) // aturan =  bisa mengganti `alter: true` dengan `force: false kalo gk salah`
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

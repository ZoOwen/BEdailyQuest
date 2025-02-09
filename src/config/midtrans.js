const midtransClient = require("midtrans-client");

// Inisialisasi Snap API
let snap = new midtransClient.Snap({
  isProduction: false, // Ganti dengan `true` jika sudah dalam mode produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Inisialisasi Core API
let coreApi = new midtransClient.CoreApi({
  isProduction: false, // Ganti dengan `true` jika sudah dalam mode produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

module.exports = { snap, coreApi };

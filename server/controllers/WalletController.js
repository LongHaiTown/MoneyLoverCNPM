const Wallet = require("../models/WalletModel");

exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.getAll(); // Gọi getAll thay vì getAllWithBalance
    res.json(wallets);
  } catch (err) {
    console.error("❌ Lỗi trong getAllWallets:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};
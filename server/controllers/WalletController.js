// WalletController.js
const Wallet = require("../models/WalletModel");

exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.getAll(); // Gọi hàm getAll
    res.json(wallets);
  } catch (err) {
    console.error("❌ Lỗi trong getAllWallets:", err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.createWallet = async (req, res) => {
  try {
    const id = await Wallet.createWallet(req.body); // Gọi hàm createWallet
    res.status(201).json({ id });
  } catch (err) {
    console.error("❌ Lỗi trong createWallet:", err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWallet = async (req, res) => {
  try {
    await Wallet.delete(req.params.id); // Gọi hàm delete
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Lỗi trong deleteWallet:", err.message);
    res.status(400).json({ error: err.message });
  }
};
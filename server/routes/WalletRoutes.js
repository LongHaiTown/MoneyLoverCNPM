const express = require("express");
const router = express.Router();
const WalletController = require("../controllers/WalletController");

router.get("/", WalletController.getAllWallets);

module.exports = router;
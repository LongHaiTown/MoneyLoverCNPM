const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

require("dotenv").config();

const categoryRoutes = require("./routes/CategoryRoutes");
const expenseRoutes = require("./routes/ExpenseRoutes");
const walletRoutes = require("./routes/WalletRoutes");

const app = express();
app.use(cors()); // Cho phép tất cả origin
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/expenses", expenseRoutes);
app.use("/wallets", walletRoutes);

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Lỗi server", error: err.message });
});

const Wallet = require("./models/WalletModel");
const Expense = require("./models/ExpenseModel");
const Category = require("./models/CategoryModel");


// Thiết lập quan hệ
Wallet.hasMany(Expense, { foreignKey: "wallet_id" });
Expense.belongsTo(Wallet, { foreignKey: "wallet_id" });

Expense.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Expense, { foreignKey: "category_id" });

sequelize.sync().then(() => console.log("✅ Database synced"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

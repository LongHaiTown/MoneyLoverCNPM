const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

require("dotenv").config();

const categoryRoutes = require("./routes/CategoryRoutes");
const expenseRoutes = require("./routes/ExpenseRoutes");
const walletRoutes = require("./routes/WalletRoutes");
const budgetRoutes = require("./routes/BudgetRoutes");

const app = express();
app.use(cors()); // Cho phép tất cả origin
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/expenses", expenseRoutes);
app.use("/wallets", walletRoutes);
app.use("/budgets",budgetRoutes);

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Lỗi server", error: err.message });
});

// Import models
const Expense = require("./models/ExpenseModel");
const Wallet = require("./models/WalletModel");
const Category = require("./models/CategoryModel");
const Budget = require("./models/BudgetModel");

// Thiết lập quan hệ
Wallet.hasMany(Expense, { foreignKey: "wallet_id" });
Expense.belongsTo(Wallet, { foreignKey: "wallet_id" });

Category.hasMany(Expense, { foreignKey: "category_id" });
Expense.belongsTo(Category, { foreignKey: "category_id" });

Category.hasMany(Budget, { foreignKey: "category_id" });
Budget.belongsTo(Category, { foreignKey: "category_id" });

// Quan hệ gián tiếp: Budget -> Category -> Expense
Budget.hasMany(Expense, { foreignKey: "category_id", sourceKey: "category_id" });
Expense.belongsTo(Budget, { foreignKey: "category_id", targetKey: "category_id" });

// Kết nối database và tạo dữ liệu mẫu
sequelize.sync({ force: false }) // force: false để không xóa dữ liệu hiện có
  .then(async () => {
    console.log("✅ Đã kết nối database thành công.");
    await Category.initializeSampleData(); // Tạo dữ liệu mẫu
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối database:", err.message);
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

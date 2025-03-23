const express = require("express");
const cors = require("cors");
require("dotenv").config();

const categoryRoutes = require("./routes/CategoryRoutes");
const expenseRoutes = require("./routes/ExpenseRoutes");

const app = express();
app.use(cors()); // Cho phép tất cả origin
app.use(express.json());
app.use('/expenses', require('./routes/ExpenseRoutes'));
app.use("/categories", categoryRoutes);
app.use("/expenses", expenseRoutes);

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Lỗi server", error: err.message });
});

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

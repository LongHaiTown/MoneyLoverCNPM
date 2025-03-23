const Budget = require("../models/BudgetModel");

exports.getAllBudgets = async (req, res) => {
  try {
    const { month, year } = req.query; // Lấy month và year từ query string
    const budgets = await Budget.getAllWithUsedAmount(
      parseInt(month) || new Date().getMonth() + 1, // Mặc định là tháng hiện tại
      parseInt(year) || new Date().getFullYear() // Mặc định là năm hiện tại
    );
    res.json(budgets);
  } catch (err) {
    console.error("❌ Lỗi trong getAllBudgets:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.createBudget = async (req, res) => {
  try {
    const budget = await Budget.createBudget(req.body);
    res.status(201).json({ id: budget.id });
  } catch (err) {
    console.error("❌ Lỗi trong createBudget:", err.message);
    res.status(400).json({ error: err.message });
  }
};
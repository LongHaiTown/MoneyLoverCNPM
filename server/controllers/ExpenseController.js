const Expense = require("../models/ExpenseModel");

exports.createExpense = async (req, res) => {
  try {
    console.log("📌 Dữ liệu nhận từ client:", req.body);
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Dữ liệu body rỗng" });
    }
    const expense = await Expense.create(req.body); // Sequelize tự xử lý
    res.status(201).json({ id: expense.id });
  } catch (err) {
    console.error("❌ Lỗi trong createExpense:", err);
    res.status(500).json({ error: "Lỗi server khi tạo expense" });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.getAll();
    res.json(expenses);
  } catch (err) {
    console.error("❌ Lỗi trong getAllExpenses:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.delete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Lỗi trong deleteExpense:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};
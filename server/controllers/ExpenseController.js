const Expense = require("../models/ExpenseModel");

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.getAll();
    res.json(expenses);
  } catch (err) {
    console.error("Lỗi trong getAllExpenses:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.createExpense = async (req, res) => {
  alert("Hello");
  console.log("📌 Dữ liệu nhận được:", req.body);  // Kiểm tra dữ liệu đầu vào
  const id = await Expense.create(req.body);
  res.json({ id });
};

exports.deleteExpense = async (req, res) => {
  try {
      const { id } = req.params;
      console.log("📌 ID nhận được:", id);  // Debug xem ID có bị undefined không

      if (!id) {
          return res.status(400).json({ error: "Thiếu ID để xóa" });
      }

      await Expense.delete(id);
      res.status(200).json({ message: "Xóa thành công!" });
  } catch (error) {
      console.error("❌ Lỗi khi xóa expense:", error);
      res.status(500).json({ error: error.message });
  }
};


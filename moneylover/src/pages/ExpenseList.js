import { useEffect, useState } from "react";
import { getExpenses, deleteExpense, createExpense } from "../services/api";
import ExpenseForm from "../components/ExpenseForm";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses()
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("Lỗi khi lấy expenses:", err));
  }, []);

  const handleSubmit = (data) => {
    const formattedData = {
      title: data.title,
      amount: parseFloat(data.amount.replace(/\./g, "")),
      date: data.date,
      category_id: parseInt(data.category_id),
    };

    console.log("📌 Dữ liệu gửi đi:", formattedData);

    createExpense(formattedData)
      .then((res) => {
        console.log("✅ Server phản hồi:", res.data);
        return getExpenses(); // Gọi lại API để cập nhật danh sách
      })
      .then((res) => setExpenses(res.data)) // Cập nhật state
      .catch((err) => console.error("❌ Lỗi khi tạo expense:", err));
  };

  const handleDelete = (id) => {
    deleteExpense(id)
      .then(() => {
        console.log("✅ Đã xóa expense với ID:", id);
        return getExpenses(); // Gọi lại API để lấy danh sách mới
      })
      .then((res) => setExpenses(res.data)) // Cập nhật state với danh sách mới
      .catch((err) => console.error("❌ Lỗi khi xóa expense:", err));
  };

  return (
    <div>
      <h2>Expense List</h2>
      {expenses.map((expense) => (
        <div key={expense.id}>
          <span>
            {expense.title} - ${expense.amount} - {expense.date} - Category:{" "}
            {expense.category_id}
          </span>
          <button onClick={() => handleDelete(expense.id)}>Delete</button>
        </div>
      ))}
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ExpenseList;
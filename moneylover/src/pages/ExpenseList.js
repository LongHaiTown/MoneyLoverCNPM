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
      wallet_id: parseInt(data.wallet_id), // Thêm wallet_id
    };
    console.log("📌 Dữ liệu gửi đi:", formattedData);
    createExpense(formattedData)
      .then((res) => {
        console.log("✅ Server phản hồi:", res.data);
        return getExpenses();
      })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("❌ Lỗi khi tạo expense:", err));
  };

  const handleDelete = (id) => {
    deleteExpense(id)
      .then(() => {
        console.log("✅ Đã xóa expense với ID:", id);
        return getExpenses();
      })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("❌ Lỗi khi xóa expense:", err));
  };

  return (
    <div>
      <h2>Expense List</h2>
      {expenses.map((expense) => (
        <div key={expense.id}>
          <span>
            {expense.title} - ${expense.amount} - {expense.date} - Category:{" "}
            {expense.category?.name || expense.category_id} - Wallet:{" "}
            {expense.wallet?.name || expense.wallet_id}
          </span>
          <button onClick={() => handleDelete(expense.id)}>Delete</button>
        </div>
      ))}
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ExpenseList;
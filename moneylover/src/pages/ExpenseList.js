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
    createExpense(data)
      .then((res) => {
        setExpenses([...expenses, { ...data, id: res.data.id }]);
      })
      .catch((err) => console.error("Lỗi khi tạo expense:", err));
  };

  return (
    <div>
      <h2>Expense List</h2>
      {expenses.map((expense) => (
        <div key={expense.id}>
          <span>{expense.title} - ${expense.amount} - {expense.date} - Category: {expense.category_id}</span>
          <button onClick={() => deleteExpense(expense.id)}>Delete</button>
        </div>
      ))}
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ExpenseList;
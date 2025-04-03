import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense, createExpense } from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import "./ExpenseList.css";

const ExpenseList = ({ onUpdate }) => {
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
      wallet_id: parseInt(data.wallet_id),
    };
    console.log("📌 Dữ liệu gửi đi:", formattedData);
    createExpense(formattedData)
      .then((res) => {
        console.log("✅ Server phản hồi:", res.data);
        return getExpenses();
      })
      .then((res) => {
        setExpenses(res.data);
        if (onUpdate) onUpdate();
      })
      .catch((err) => console.error("❌ Lỗi khi tạo expense:", err));
  };

  const handleDelete = (id) => {
    deleteExpense(id)
      .then(() => {
        console.log("✅ Đã xóa expense với ID:", id);
        return getExpenses();
      })
      .then((res) => {
        setExpenses(res.data);
        if (onUpdate) onUpdate();
      })
      .catch((err) => console.error("❌ Lỗi khi xóa expense:", err));
  };

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = {
        date,
        totalBalance: 0,
        items: [],
      };
    }

    const type = expense.category?.type || (expense.amount >= 0 ? "income" : "outcome");
    const amount = Math.abs(expense.amount); // đảm bảo dương

    // ✅ Trừ vào tổng nếu là outcome, cộng nếu là income
    acc[date].totalBalance += type === "income" ? amount : -amount;

    acc[date].items.push({
      id: expense.id,
      title: expense.title,
      description: `Category: ${expense.category?.name || expense.category_id}`,
      amount: amount,
      type: type,
    });

    return acc;
  }, {});


  // Convert grouped expenses to array and sort by date (desc)
  const groupedExpensesArray = Object.values(groupedExpenses).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="expense-list-container">
      <div className="expense-list-header">
        <h2>Tất cả giao dịch</h2>
        <div className="wallet-selection">
          <span>Ví tiền mặt</span>
          <span className="balance">Hiện có (số tiền)</span>
        </div>
      </div>

      {groupedExpensesArray.length === 0 ? (
        <p>Chưa có giao dịch nào.</p>
      ) : (
        <div className="expense-list">
          {groupedExpensesArray.map((group, index) => (
            <div key={index} className="expense-group">
              <div className="expense-group-header">
                <h3 className="transaction-date">
                  {new Date(group.date).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </h3>
                <p
                  className="expense-total"
                  style={{ color: group.totalBalance >= 0 ? "blue" : "red" }}
                >
                  {group.totalBalance >= 0 ? "+" : "-"}
                  {Math.abs(group.totalBalance).toLocaleString()} VND
                </p>
              </div>

              {group.items.map((item) => (
                <div key={item.id} className="expense-item">
                  <div className="expense-avatar">
                    <div className="avatar-placeholder"></div>
                  </div>
                  <div className="expense-details">
                    <p className="expense-title">{item.title}</p>
                    <p className="expense-description">{item.description}</p>
                  </div>
                  <div className="expense-actions">
                    <p
                      className="expense-amount"
                      style={{ color: item.type === "income" ? "blue" : "red" }}
                    >
                      {item.type === "income" ? "+" : "-"}
                      {Math.abs(item.amount).toLocaleString()} VND
                    </p>
                    <button onClick={() => handleDelete(item.id)}>Xóa</button>
                  </div>
                </div>
              ))}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense, createExpense } from "../services/api";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Thêm icon từ react-icons
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

  // Group expenses by date
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const dateObj = new Date(expense.date);
    const date = dateObj.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }); // Định dạng ngày thành DD/MM/YYYY
    const time = dateObj.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }); // Định dạng thời gian thành HH:mm

    const dateKey = date; // Nhóm theo ngày (không bao gồm thời gian)
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date,
        originalDate: expense.date, // Lưu ngày gốc để tính ngày trong tuần
        totalIncome: 0,
        totalExpense: 0,
        items: [],
      };
    }

    const type = expense.category?.type || "expense";
    const amount = expense.amount;

    if (type === "income") {
      acc[dateKey].totalIncome += amount;
    } else {
      acc[dateKey].totalExpense += amount;
    }

    acc[dateKey].items.push({
      id: expense.id,
      title: expense.title,
      description: `Danh mục: ${expense.category?.name || expense.category_id}, Ví: ${
        expense.wallet?.name || expense.wallet_id
      }`,
      amount: expense.amount,
      type: type,
      categoryName: expense.category?.name || "Không xác định",
      time: time, // Lưu thời gian của giao dịch
    });

    return acc;
  }, {});

  // Convert grouped expenses to an array and sort by date (descending)
  const groupedExpensesArray = Object.values(groupedExpenses).sort(
    (a, b) => new Date(b.originalDate) - new Date(a.originalDate)
  );

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  const getIconForExpense = (type, categoryName) => {
    if (type === "income") {
      return <FaArrowUp className="expense-icon income-icon" />;
    }
    switch (categoryName.toLowerCase()) {
      case "ăn uống":
        return <FaArrowDown className="expense-icon expense-icon" />;
      case "mua sắm":
        return <FaArrowDown className="expense-icon expense-icon" />;
      default:
        return <FaArrowDown className="expense-icon expense-icon" />;
    }
  };

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
        <p className="no-expenses">Chưa có giao dịch nào.</p>
      ) : (
        <div className="expense-list">
          {groupedExpensesArray.map((group, index) => (
            <div key={index} className="expense-group">
              <div className="expense-group-header">
                <h3 className="expense-date">
                  {getDayOfWeek(group.date)}, ngày {group.date}
                </h3>
                <p
                  className="expense-total"
                  style={{ color: group.totalBalance >= 0 ? "blue" : "red" }}
                >
                  {group.totalBalance >= 0 ? "+" : ""}
                  {group.totalBalance.toLocaleString()} VND
                </p>
              </div>
              <div className="expense-items">
                {group.items.map((item) => (
                  <div key={item.id} className="expense-item">
                    <div className="expense-icon-wrapper">
                      {getIconForExpense(item.type, item.categoryName)}
                    </div>
                    <div className="expense-details">
                      <div className="expense-header">
                        <p className="expense-title">{item.title}</p>
                        <p className="expense-time">{item.time}</p>
                      </div>
                      <p className="expense-description">{item.description}</p>
                    </div>
                    <div className="expense-actions">
                      <p
                        className="expense-amount"
                        style={{ color: item.type === "income" ? "#1a73e8" : "#d32f2f" }}
                      >
                        {item.type === "income" ? "+" : "-"}
                        {Math.abs(item.amount).toLocaleString()} VND
                      </p>
                      <button className="delete-button" onClick={() => handleDelete(item.id)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
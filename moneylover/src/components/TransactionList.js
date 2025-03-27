import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./TransactionList.css";

const TransactionList = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="transaction-list">
        <p className="no-transactions">Chưa có giao dịch nào.</p>
      </div>
    );
  }

  const groupedTransactions = expenses.reduce((acc, expense) => {
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
      name: expense.title,
      note: `Danh mục: ${expense.category?.name || expense.category_id}, Ví: ${
        expense.wallet?.name || expense.wallet_id
      }`,
      amount: expense.amount,
      type: type,
      categoryName: expense.category?.name || "Không xác định",
      time: time, // Lưu thời gian của giao dịch
    });

    return acc;
  }, {});

  const transactions = Object.values(groupedTransactions);
  // Sắp xếp theo ngày giảm dần (mới nhất trước)
  transactions.sort((a, b) => new Date(b.originalDate) - new Date(a.originalDate));

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  const getIconForTransaction = (type, categoryName) => {
    if (type === "income") {
      return <FaArrowUp className="transaction-icon income-icon" />;
    }
    switch (categoryName.toLowerCase()) {
      case "ăn uống":
        return <FaArrowDown className="transaction-icon expense-icon" />;
      case "mua sắm":
        return <FaArrowDown className="transaction-icon expense-icon" />;
      default:
        return <FaArrowDown className="transaction-icon expense-icon" />;
    }
  };

  return (
    <div className="transaction-list">
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-group">
          <div className="transaction-group-header">
            <h3 className="transaction-date">
              {transaction.date} ({getDayOfWeek(transaction.originalDate)})
            </h3>
            <div className="transaction-total">
              <p>
                Thu nhập: <span className="income">+{transaction.totalIncome.toLocaleString()} VND</span>
              </p>
              <p>
                Chi tiêu: <span className="expense">-{transaction.totalExpense.toLocaleString()} VND</span>
              </p>
              <p>
                Tổng:{" "}
                <span
                  className={transaction.totalIncome - transaction.totalExpense >= 0 ? "income" : "expense"}
                >
                  {transaction.totalIncome - transaction.totalExpense >= 0 ? "+" : "-"}
                  {Math.abs(transaction.totalIncome - transaction.totalExpense).toLocaleString()} VND
                </span>
              </p>
            </div>
          </div>
          <div className="transaction-items">
            {transaction.items.map((item) => (
              <div key={item.id} className="transaction-item">
                <div className="transaction-icon-wrapper">
                  {getIconForTransaction(item.type, item.categoryName)}
                </div>
                <div className="transaction-details">
                  <div className="transaction-header">
                    <p className="transaction-name">{item.name}</p>
                    <p className="transaction-time">{item.time}</p>
                  </div>
                  <p className="transaction-note">{item.note}</p>
                </div>
                <p
                  className="transaction-amount"
                  style={{ color: item.type === "income" ? "#1a73e8" : "#d32f2f" }}
                >
                  {item.type === "income" ? "+" : "-"}
                  {Math.abs(item.amount).toLocaleString()} VND
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
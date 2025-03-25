import React from "react";
import "./TransactionList.css";

const TransactionList = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="transaction-list">
        <p>Chưa có giao dịch nào.</p>
      </div>
    );
  }

  const groupedTransactions = expenses.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = {
        date,
        totalIncome: 0,
        totalExpense: 0,
        items: [],
      };
    }

    const type = expense.category?.type || "expense";
    const amount = expense.amount;

    if (type === "income") {
      acc[date].totalIncome += amount;
    } else {
      acc[date].totalExpense += amount;
    }

    acc[date].items.push({
      id: expense.id,
      name: expense.title,
      note: `Category: ${expense.category?.name || expense.category_id}, Wallet: ${
        expense.wallet?.name || expense.wallet_id
      }`,
      amount: expense.amount,
      type: type,
    });

    return acc;
  }, {});

  const transactions = Object.values(groupedTransactions);
  // Sort transactions by date in descending order (most recent first)
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  return (
    <div className="transaction-list">
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-group">
          <div className="transaction-group-header">
            <h3 className="transaction-date">
              {transaction.date}, {getDayOfWeek(transaction.date)}
            </h3>
            <div className="transaction-total">
              <p>
                Thu nhập: <span className="income">+{transaction.totalIncome.toLocaleString()} VND</span>
              </p>
              <p>
                Chi tiêu: <span className="expense">-{transaction.totalExpense.toLocaleString()} VND</span>
              </p>
              <p>
                Tổng: <span className={transaction.totalIncome - transaction.totalExpense >= 0 ? "income" : "expense"}>
                  {transaction.totalIncome - transaction.totalExpense >= 0 ? "+" : "-"}
                  {Math.abs(transaction.totalIncome - transaction.totalExpense).toLocaleString()} VND
                </span>
              </p>
            </div>
          </div>
          {transaction.items.map((item) => (
            <div key={item.id} className="transaction-item">
              <div className="transaction-details">
                <p className="transaction-name">{item.name}</p>
                <p className="transaction-note">{item.note}</p>
              </div>
              <p
                className="transaction-amount"
                style={{ color: item.type === "income" ? "blue" : "red" }}
              >
                {item.type === "income" ? "+" : "-"}
                {Math.abs(item.amount).toLocaleString()} VND
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
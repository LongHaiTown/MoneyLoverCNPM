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
      amount: `${type === "income" ? "+" : "-"}${amount}`,
    });

    return acc;
  }, {});

  const transactions = Object.values(groupedTransactions);

  return (
    <div className="transaction-list">
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-group">
          <h3 className="transaction-date">{transaction.date}</h3>
          <div className="transaction-total">
            <p>
              Thu nhập: <span className="income">+${transaction.totalIncome}</span>
            </p>
            <p>
              Chi tiêu: <span className="expense">-${transaction.totalExpense}</span>
            </p>
            <p>
              Tổng: $
              {transaction.totalIncome - transaction.totalExpense >= 0
                ? `+${transaction.totalIncome - transaction.totalExpense}`
                : `-${Math.abs(transaction.totalIncome - transaction.totalExpense)}`}
            </p>
          </div>
          {transaction.items.map((item) => (
            <div key={item.id} className="transaction-item">
              <div>
                <p className="transaction-name">{item.name}</p>
                <p className="transaction-note">{item.note}</p>
              </div>
              <p
                className={`transaction-amount ${
                  item.amount.includes("+") ? "income" : "expense"
                }`}
              >
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
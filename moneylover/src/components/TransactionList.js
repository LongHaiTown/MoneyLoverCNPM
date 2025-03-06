import React from "react";
import "./TransactionList.css";

const transactions = [
  {
    date: "Thứ tư, ngày 9/9/2025",
    total: "+ 89.820.000 VND",
    items: [
      { id: 1, name: "Ăn uống", note: "Ăn tobboki with friends", amount: "-90.000 VND" },
      { id: 2, name: "Lương", note: "Job mới done", amount: "+90.000.000 VND" },
      { id: 3, name: "Ăn uống", note: "(ghi chú nếu có)", amount: "-90.000 VND" }
    ],
  },
  {
    date: "Thứ ba, ngày 8/9/2025",
    total: "+ 89.820.000 VND",
    items: [
      { id: 4, name: "Ăn uống", note: "Ăn tobboki with friends", amount: "-90.000 VND" },
      { id: 5, name: "Lương", note: "Job mới done", amount: "+90.000.000 VND" },
      { id: 6, name: "Ăn uống", note: "(ghi chú nếu có)", amount: "-90.000 VND" }
    ],
  }
];

const TransactionList = () => {
  return (
    <div className="transaction-list">
      {transactions.map((transaction, index) => (
        <div key={index} className="transaction-group">
          <h3 className="transaction-date">{transaction.date}</h3>
          <p className="transaction-total">{transaction.total}</p>
          {transaction.items.map((item) => (
            <div key={item.id} className="transaction-item">
              <div>
                <p className="transaction-name">{item.name}</p>
                <p className="transaction-note">{item.note}</p>
              </div>
              <p className={`transaction-amount ${item.amount.includes("+") ? "income" : "expense"}`}>
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

import React, { useEffect, useState } from "react";
import { getWallets, getExpenses, createExpense } from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";
import ExpenseList from "../pages/ExpenseList";
import "./Transactions.css";

const Transactions = () => {
  const [wallets, setWallets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showExpenseList, setShowExpenseList] = useState(false);
  const [quickTransaction, setQuickTransaction] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null); // Trạng thái để lưu wallet được chọn
  const [showWalletTransactions, setShowWalletTransactions] = useState(false);

  const fetchWallets = async () => {
    try {
      const res = await getWallets();
      console.log("📌 Danh sách ví nhận được:", res.data);
      setWallets(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy ví:", err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      console.log("📌 Danh sách giao dịch nhận được:", res.data);
      setExpenses(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy giao dịch:", err);
    }
  };

  useEffect(() => {
    fetchWallets();
    fetchExpenses();
  }, []);

  const handleQuickTransaction = async () => {
    if (!quickTransaction) return;

    try {
      const data = {
        title: quickTransaction,
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        category_id: 1,
        wallet_id: 1,
      };
      await createExpense(data);
      setQuickTransaction("");
      fetchExpenses();
      fetchWallets();
    } catch (err) {
      console.error("❌ Lỗi khi tạo giao dịch nhanh:", err);
    }
  };

  const handleCreateExpense = (data) => {
    const formattedData = {
      title: data.title,
      amount: parseFloat(data.amount),
      date: data.date,
      category_id: parseInt(data.category_id),
      wallet_id: parseInt(data.wallet_id),
    };
    createExpense(formattedData)
      .then(() => {
        fetchExpenses();
        fetchWallets();
        setShowForm(false);
      })
      .catch((err) => console.error("❌ Lỗi khi tạo giao dịch:", err));
  };

  // Hàm xử lý khi nhấn vào wallet
  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setShowWalletTransactions(true);
  };

  // Lọc các giao dịch theo wallet được chọn
  const walletTransactions = selectedWallet
    ? expenses.filter((expense) => expense.wallet_id === selectedWallet.id)
    : [];

  return (
    <div className="transactions-container" id="transactions">
      <header className="header">
        <h1>Money lover fake</h1>
        <p>Fake nhưng thu chi là chuẩn</p>
      </header>

      <section className="wallet-section">
        <h2>Ví của bạn</h2>
        <div className="wallet-container">
          {wallets.length > 0 ? (
            wallets.map((wallet) => {
              const displayBalance = isNaN(wallet.balance)
                ? 0
                : parseFloat(wallet.balance);
              return (
                <div
                  key={wallet.id}
                  className="wallet-card"
                  onClick={() => handleWalletClick(wallet)} // Thêm sự kiện click
                >
                  <p className="wallet-title">{wallet.name}</p>
                  <p className="wallet-balance">
                    Hiện có <br />
                    <span
                      style={{
                        color: displayBalance >= 0 ? "blue" : "red",
                      }}
                    >
                      {displayBalance >= 0 ? "+" : ""}
                      {displayBalance < 0 ? "-" : ""}
                      {Math.abs(displayBalance).toLocaleString()} VND
                    </span>
                  </p>
                </div>
              );
            })
          ) : (
            <p>Chưa có ví nào.</p>
          )}
        </div>
      </section>

      <section className="transaction-section">
        <h2>Giao dịch</h2>
        <div className="quick-transaction">
          <input
            type="text"
            placeholder="Hôm nay bạn tieu gì 🤑🤔?"
            value={quickTransaction}
            onChange={(e) => setQuickTransaction(e.target.value)}
          />
          <button onClick={handleQuickTransaction}>Gửi</button>
        </div>
        <div className="transaction-buttons">
          <button className="primary" onClick={() => setShowForm(true)}>
            Nhập giao dịch mới
          </button>
          <button onClick={() => setShowExpenseList(true)}>
            Xem tất cả giao dịch
          </button>
        </div>
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  className="close-button"
                  onClick={() => setShowForm(false)}
                >
                  Đóng
                </button>
                <h3>Thêm mới giao dịch</h3>
              </div>
              <ExpenseForm onSubmit={handleCreateExpense} />
            </div>
          </div>
        )}
        {showExpenseList && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  className="close-button"
                  onClick={() => setShowExpenseList(false)}
                >
                  Đóng
                </button>
                <h3>Tất cả giao dịch</h3>
              </div>
              <ExpenseList onUpdate={fetchExpenses} expenses={expenses} />
            </div>
          </div>
        )}
        {showWalletTransactions && selectedWallet && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  className="close-button"
                  onClick={() => setShowWalletTransactions(false)}
                >
                  Đóng
                </button>
                <h3>Giao dịch của {selectedWallet.name}</h3>
              </div>
              <div className="wallet-transaction-list">
                {walletTransactions.length > 0 ? (
                  walletTransactions.map((expense) => (
                    <div key={expense.id} className="transaction-item">
                      <div className="transaction-details">
                        <p className="transaction-title">{expense.title}</p>
                        <p className="transaction-date">
                          {new Date(expense.date).toLocaleDateString("vi-VN", {
                            weekday: "long",
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="transaction-category">
                          {expense.category?.name || "Không có danh mục"}
                        </p>
                      </div>
                      <div className="transaction-amount">
                        <span
                          style={{
                            color:
                              expense.category?.type === "income"
                                ? "blue"
                                : "red",
                          }}
                        >
                          {expense.category?.type === "income" ? "+" : "-"}
                          {expense.amount.toLocaleString()} VND
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Chưa có giao dịch nào cho ví này.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="recent-transactions">
        <h2>Giao dịch gần đây</h2>
        <TransactionList expenses={expenses} />
      </section>
    </div>
  );
};

export default Transactions;
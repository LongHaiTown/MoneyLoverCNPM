import React, { useEffect, useState } from "react";
import TransactionList from "../components/TransactionList";
import ExpenseForm from "../components/ExpenseForm";
import { getWallets, getExpenses, createExpense } from "../services/api";
import "../pages/page.css";

const Transactions = () => {
  const [wallets, setWallets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false); // Hiển thị form nhập giao dịch
  const [quickTransaction, setQuickTransaction] = useState(""); // Lưu giá trị input giao dịch nhanh

  // Lấy danh sách ví
  const fetchWallets = async () => {
    try {
      const res = await getWallets();
      console.log("📌 Danh sách ví nhận được:", res.data);
      setWallets(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy ví:", err);
    }
  };

  // Lấy danh sách giao dịch
  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      console.log("📌 Danh sách giao dịch nhận được:", res.data);
      setExpenses(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy giao dịch:", err);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchWallets();
    fetchExpenses();
  }, []);

  // Xử lý tạo giao dịch nhanh từ input
  const handleQuickTransaction = async () => {
    if (!quickTransaction) return;

    try {
      const data = {
        title: quickTransaction,
        amount: 0, // Có thể thêm logic để người dùng nhập số tiền
        date: new Date().toISOString().split("T")[0], // Ngày hiện tại
        category_id: 1, // Mặc định category_id (có thể thêm logic để chọn)
        wallet_id: 1, // Mặc định wallet_id (có thể thêm logic để chọn)
      };
      await createExpense(data);
      setQuickTransaction(""); // Reset input
      fetchExpenses(); // Cập nhật danh sách giao dịch
    } catch (err) {
      console.error("❌ Lỗi khi tạo giao dịch nhanh:", err);
    }
  };

  // Xử lý tạo giao dịch từ form
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
        fetchExpenses(); // Cập nhật danh sách giao dịch
        setShowForm(false); // Ẩn form sau khi tạo
      })
      .catch((err) => console.error("❌ Lỗi khi tạo giao dịch:", err));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div
          className="header-title"
          style={{
            backgroundColor: "gray",
            width: "100%",
            height: "110px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: "0px" }}>Money lover fake</h1>
          <p>Fake nhưng thu chi là chuẩn</p>
        </div>
      </header>

      <section className="wallet-section">
        <h2>Ví của bạn</h2>
        <div className="wallet-container">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="wallet-card">
              <p className="header">{wallet.name}</p>
              <p>Hiện có: ${wallet.balance}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="transaction-section">
        <h2>Giao dịch</h2>
        <div className="transaction-input">
          <input
            type="text"
            placeholder="Hôm nay bạn tiêu gì 🤑🤔?"
            value={quickTransaction}
            onChange={(e) => setQuickTransaction(e.target.value)}
          />
          <button onClick={handleQuickTransaction}>Gửi</button>
        </div>
        <div className="transaction-buttons">
          <button className="primary" onClick={() => setShowForm(true)}>
            Nhập giao dịch mới
          </button>
          <button onClick={fetchExpenses}>Xem tất cả giao dịch</button>
        </div>
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <button onClick={() => setShowForm(false)}>Đóng</button>
              <ExpenseForm onSubmit={handleCreateExpense} />
            </div>
          </div>
        )}
        <TransactionList expenses={expenses} />
      </section>
    </div>
  );
};

export default Transactions;
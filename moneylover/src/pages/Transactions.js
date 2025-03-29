import React, { useEffect, useState } from "react";
import { getWallets, getExpenses, createExpense } from "../services/api"; // Đảm bảo đường dẫn đúng
import ExpenseForm from "../components/ExpenseForm"; // Đảm bảo đường dẫn đúng
import TransactionList from "../components/TransactionList"; // Đảm bảo đường dẫn đúng
import ExpenseList from "../pages/ExpenseList"; // Đảm bảo đường dẫn đúng
import "./Transactions.css"; // Import file CSS

const Transactions = () => {
  const [wallets, setWallets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showExpenseList, setShowExpenseList] = useState(false);
  const [quickTransaction, setQuickTransaction] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showWalletTransactions, setShowWalletTransactions] = useState(false);

  // Hàm lấy danh sách ví
  const fetchWallets = async () => {
    try {
      const res = await getWallets();
      console.log("📌 Danh sách ví nhận được:", res.data);
      setWallets(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy ví:", err);
    }
  };

  // Hàm lấy danh sách giao dịch
  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      console.log("📌 Danh sách giao dịch nhận được:", res.data);
      // Sắp xếp giao dịch theo ngày mới nhất trước khi set state (tùy chọn)
      const sortedExpenses = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setExpenses(sortedExpenses);
    } catch (err) {
      console.error("❌ Lỗi khi lấy giao dịch:", err);
    }
  };

  // Gọi API khi component mount lần đầu
  useEffect(() => {
    fetchWallets();
    fetchExpenses();
  }, []);

  // Xử lý tạo giao dịch nhanh
  const handleQuickTransaction = async () => {
    if (!quickTransaction.trim()) return; // Bỏ qua nếu input rỗng

    // Chọn ví đầu tiên làm mặc định nếu có, nếu không thì cần xử lý logic khác (ví dụ: báo lỗi)
    const defaultWalletId = wallets.length > 0 ? wallets[0].id : null;
    if (!defaultWalletId) {
      console.error("❌ Không tìm thấy ví để tạo giao dịch nhanh.");
      // Có thể hiển thị thông báo cho người dùng ở đây
      return;
    }

    // Giả sử category mặc định là 1 (cần điều chỉnh theo thực tế)
    const defaultCategoryId = 1;

    try {
      const data = {
        title: quickTransaction,
        amount: 0, // Giao dịch nhanh mặc định số tiền 0 (hoặc bạn có thể thêm input cho số tiền)
        date: new Date().toISOString().split("T")[0], // Lấy ngày hiện tại
        category_id: defaultCategoryId,
        wallet_id: defaultWalletId,
      };
      await createExpense(data);
      setQuickTransaction(""); // Xóa input sau khi gửi
      // Lấy lại dữ liệu mới
      fetchExpenses();
      fetchWallets();
    } catch (err) {
      console.error("❌ Lỗi khi tạo giao dịch nhanh:", err);
      // Hiển thị thông báo lỗi cho người dùng nếu cần
    }
  };

  // Xử lý tạo giao dịch từ form
  const handleCreateExpense = (data) => {
    // Chuyển đổi amount từ string (có thể có dấu phẩy/chấm) thành number
    const amountValue = parseFloat(String(data.amount).replace(/[,.]/g, ''));
    if (isNaN(amountValue)) {
        console.error("❌ Số tiền không hợp lệ:", data.amount);
        // Thông báo lỗi cho người dùng
        return;
    }

    const formattedData = {
      title: data.title,
      amount: amountValue,
      date: data.date,
      category_id: parseInt(data.category_id),
      wallet_id: parseInt(data.wallet_id),
    };
    createExpense(formattedData)
      .then(() => {
        // Lấy lại dữ liệu mới
        fetchExpenses();
        fetchWallets();
        setShowForm(false); // Đóng form sau khi thành công
      })
      .catch((err) => {
          console.error("❌ Lỗi khi tạo giao dịch:", err);
          // Hiển thị thông báo lỗi cho người dùng nếu cần
       });
  };

  // Xử lý khi nhấn vào một ví
  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setShowWalletTransactions(true); // Mở modal hiển thị giao dịch của ví đó
  };

  // Lọc các giao dịch thuộc về ví đang được chọn
  const walletTransactions = selectedWallet
    ? expenses.filter((expense) => expense.wallet_id === selectedWallet.id)
    : [];

  return (
    <div className="transactions-container" id="transactions">
      {/* Header chính của trang */}
      <header className="header">
        <h1>Money lover fake</h1>
        <p>Fake nhưng thu chi là chuẩn</p>
      </header>

      {/* Phần hiển thị các ví */}
      <section className="wallet-section">
        <h2>Ví của bạn</h2>
        <div className="wallet-container">
          {wallets.length > 0 ? (
            wallets.map((wallet) => {
              // Xử lý trường hợp balance không phải là số
              const displayBalance = isNaN(parseFloat(wallet.balance))
                ? 0
                : parseFloat(wallet.balance);
              return (
                <div
                  key={wallet.id}
                  className="wallet-card"
                  onClick={() => handleWalletClick(wallet)}
                >
                  <p className="wallet-title">{wallet.name}</p>
                  <p className="wallet-balance">
                    Hiện có <br />
                    <span
                      style={{
                        color: displayBalance >= 0 ? "#2a9d8f" : "#e76f51", // Màu sắc tùy chỉnh
                      }}
                    >
                      {/* Thêm dấu + hoặc - và định dạng số */}
                      {displayBalance >= 0 ? "+" : "-"}
                      {Math.abs(displayBalance).toLocaleString("vi-VN")} VND
                    </span>
                  </p>
                </div>
              );
            })
          ) : (
            <p>Chưa có ví nào. Hãy tạo ví mới!</p> // Thông báo thân thiện hơn
          )}
        </div>
      </section>

      {/* Phần nhập liệu và nút chức năng */}
      <section className="transaction-section">
        <h2>Giao dịch</h2>
        {/* Input nhập giao dịch nhanh */}
        <div className="quick-transaction">
          <input
            type="text"
            placeholder="Hôm nay bạn tiêu gì 🤑🤔?"
            value={quickTransaction}
            onChange={(e) => setQuickTransaction(e.target.value)}
            // Cho phép gửi bằng Enter
            onKeyPress={(e) => { if (e.key === 'Enter') handleQuickTransaction(); }}
          />
          <button onClick={handleQuickTransaction}>Gửi</button>
        </div>
        {/* Các nút mở modal */}
        <div className="transaction-buttons">
          <button className="primary" onClick={() => setShowForm(true)}>
            Nhập giao dịch mới
          </button>
          <button onClick={() => setShowExpenseList(true)}>
            Xem tất cả giao dịch
          </button>
        </div>

        {/* --- Modal Thêm mới giao dịch --- */}
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              {/* Header của Modal */}
              <div className="modal-header">
                <div className="modal-header-title">
                   <h3>Thêm mới giao dịch</h3>
                </div>
                <div className="modal-header-close">
                  <button
                    className="close-button"
                    title="Đóng" // Thêm tooltip
                    onClick={() => setShowForm(false)}
                  >
                    ✕ {/* Icon X */}
                  </button>
                </div>
              </div>
              {/* Nội dung của Modal */}
              <div className="modal-body">
                {/* Truyền danh sách ví vào Form để chọn */}
                <ExpenseForm onSubmit={handleCreateExpense} wallets={wallets} />
              </div>
            </div>
          </div>
        )}

        {/* --- Modal Danh sách tất cả giao dịch --- */}
        {showExpenseList && (
          <div className="modal">
            <div className="modal-content">
              {/* Header của Modal */}
              <div className="modal-header">
                 <div className="modal-header-title">
                    <h3>Danh sách</h3>
                 </div>
                 <div className="modal-header-close">
                    <button
                      className="close-button"
                      title="Đóng"
                      onClick={() => setShowExpenseList(false)}
                    >
                      ✕ {/* Icon X */}
                    </button>
                 </div>
              </div>
              {/* Nội dung của Modal */}
              <div className="modal-body">
                {/* Truyền hàm cập nhật và danh sách giao dịch */}
                <ExpenseList onUpdate={fetchExpenses} initialExpenses={expenses} />
              </div>
            </div>
          </div>
        )}

        {/* --- Modal Giao dịch của Ví cụ thể --- */}
        {showWalletTransactions && selectedWallet && (
          <div className="modal">
            <div className="modal-content">
              {/* Header của Modal */}
              <div className="modal-header">
                 <div className="modal-header-title">
                    {/* Hiển thị tên ví trong tiêu đề */}
                    <h3>Giao dịch của {selectedWallet.name}</h3>
                 </div>
                 <div className="modal-header-close">
                    <button
                      className="close-button"
                      title="Đóng"
                      onClick={() => setShowWalletTransactions(false)}
                    >
                       ✕ {/* Icon X */}
                    </button>
                 </div>
              </div>
              {/* Nội dung của Modal */}
              <div className="modal-body">
                <div className="wallet-transaction-list">
                  {walletTransactions.length > 0 ? (
                    // Nhóm giao dịch theo ngày (giống ExpenseList)
                    Object.entries(
                        walletTransactions.reduce((acc, expense) => {
                            const date = new Date(expense.date).toISOString().split('T')[0];
                            if (!acc[date]) acc[date] = [];
                            acc[date].push(expense);
                            return acc;
                        }, {})
                    )
                    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)) // Sắp xếp ngày mới nhất trước
                    .map(([date, items]) => (
                        <div key={date} className="expense-group">
                            <div className="expense-group-header">
                                <h4 className="expense-date">
                                    {new Date(date).toLocaleDateString("vi-VN", { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
                                </h4>
                                {/* Tính tổng tiền theo ngày nếu cần */}
                            </div>
                            {items.map((expense) => (
                                <div key={expense.id} className="transaction-item"> {/* Dùng class chung nếu muốn style giống */}
                                    <div className="expense-avatar"> {/* Thêm avatar nếu cần */}
                                        <div className="avatar-placeholder"></div>
                                    </div>
                                    <div className="expense-details">
                                        <p className="expense-title">{expense.title}</p>
                                        <p className="expense-description">{expense.category?.name || 'Chưa phân loại'}</p>
                                    </div>
                                    <div className="expense-amount-container">
                                        <p className="expense-amount" style={{ color: expense.category?.type === 'income' ? '#2a9d8f' : '#e76f51', margin: 0 }}>
                                            {expense.category?.type === 'income' ? '+' : '-'}
                                            {Math.abs(expense.amount).toLocaleString('vi-VN')} VND
                                        </p>
                                    </div>
                                    {/* Thêm nút Sửa/Xóa ở đây nếu cần cho danh sách này */}
                                    {/* <div className="expense-action-buttons">
                                        <button>Sửa</button>
                                        <button>Xóa</button>
                                    </div> */}
                                </div>
                             ))}
                        </div>
                    ))
                  ) : (
                    <p>Chưa có giao dịch nào cho ví này.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Phần hiển thị giao dịch gần đây */}
      <section className="recent-transactions">
        <h2>Giao dịch gần đây</h2>
        {/* Giới hạn số lượng giao dịch hiển thị */}
        <TransactionList expenses={expenses.slice(0, 5)} /> {/* Hiển thị 5 giao dịch mới nhất */}
      </section>
    </div>
  );
};

export default Transactions;
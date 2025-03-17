import React from "react";
import TransactionList from "../components/TransactionList";
import "../pages/page.css";
const Transactions = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title" style={{backgroundColor: "gray", width:"100%", height:"110px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center", textAlign:"center"}}>
          <h1 style={{margin:"0px"}}>Money lover fake</h1>
          <p>Fake nhưng thu chi là chuẩn</p>
        </div>
      </header>
      
      <section className="wallet-section">
        <h2>Ví của bạn</h2>
        <div className="wallet-container">
          <div className="wallet-card" ><p className="header">Ví tiền mặt</p><p>Hiện có (số tiền)</p></div>
          <div className="wallet-card"><p className="header">Ví ngân hàng</p> <p>Title Description</p></div>
          <div className="wallet-card"><p className="header">Ví tiết kiệm</p> <p>Title Description</p></div>
        </div>
      </section>
      
      <section className="transaction-section">
        <h2>Giao dịch</h2>
        <div className="transaction-input">
          <input type="text" placeholder="Hôm nay bạn tiêu gì 🤑🤔?" />
          <button>Gửi</button>
        </div>
        <div className="transaction-buttons">
          <button className="primary">Nhập giao dịch mới</button>
          <button>Xem tất cả giao dịch</button>
        </div>
        <TransactionList />
      </section>
    </div>
  );
};

export default Transactions;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#fff",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}>
          🅱️🅱️
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ fontSize: "20px", fontWeight: "bold", cursor: "pointer", background: "none", border: "none" }}
        >
          ☰
        </button>
        {isOpen && (
          <ul
            style={{
              position: "absolute",
              top: "50px",
              left: "20px",
              background: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              listStyle: "none",
              padding: "10px",
              margin: "0",
              minWidth: "120px",
            }}
          >
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/Transactions">Giao dịch</Link></li>
            <li><Link to="/Budget">Ngân sách</Link></li>
          </ul>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link to="/Transactions" style={{ padding: "5px 10px", textDecoration: "none", color: "#333" }}>
          Giao dịch
        </Link>
        <Link to="/Statistics" style={{ padding: "5px 10px", textDecoration: "none", color: "#333" }}>
          Thống kê
        </Link>
        <Link to="/Budget" style={{ padding: "5px 10px", textDecoration: "none", color: "#333" }}>
          Ngân sách
        </Link>
        <button
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "5px 15px",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
          }}
        >
          Long Hai Town
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
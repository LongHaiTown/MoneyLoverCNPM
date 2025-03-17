import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavbuttonStyle } from "../GlobalStyle"; // Nếu có GlobalStyle

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{
        display: "flex",
        width:"100%",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#efeeee",
        borderBottom: "2px solid #ddd",
      }}
    >
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ fontSize: "24px", fontWeight: "bold", cursor: "pointer" }}
        >
          ☰
        </button>
        {isOpen && (
          <ul
            style={{
              position: "absolute",
              top: "40px",
              left: "0",
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

      <div>
        <Link to="/Transactions" style={NavbuttonStyle}>Giao dịch</Link>
        <Link to="/Statistics" style={NavbuttonStyle}>Thống kê</Link>
        <Link to="/Budget" style={NavbuttonStyle}>Ngân sách</Link>
        <button
          style={{
            backgroundColor: "#728156",
            color: "white",
            margin: "10px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
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

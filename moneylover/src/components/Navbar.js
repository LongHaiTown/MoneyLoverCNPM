import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo + Menu Toggle */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}>
          🅱️🅱️
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
        >
        </button>
      </div>

      {/* Navbar Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={() => handleScroll("transactions")} style={{ padding: "5px 10px", textDecoration: "none", color: "#333" }}>
          Giao dịch
        </button>
        <button onClick={() => handleScroll("budgets")} style={{ padding: "5px 10px", textDecoration: "none", color: "#333" }} >
          Ngân sách
        </button>
        <button onClick={() => handleScroll("statistics")} style={{ padding: "5px 10px", textDecoration: "none", color: "#333" }} >
          Thống kê
        </button>

        {/* Button chính */}
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
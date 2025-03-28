import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="Nav">
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
        <button className="Nav-Button-routing" onClick={() => handleScroll("transactions")}>
          Giao dịch
        </button>
        <button className="Nav-Button-routing" onClick={() => handleScroll("budgets")} >
          Ngân sách
        </button>
        <button className="Nav-Button-routing" onClick={() => handleScroll("statistics")}>
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
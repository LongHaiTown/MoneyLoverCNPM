import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import TransactionList from "./components/TransactionList";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Statistics from "./pages/Statistics";

function Information() { 
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
      <h1
        onClick={() => console.log("Clicked Tất cả giao dịch!")}
        style={{ cursor: "pointer", color: "#000", paddingLeft: "10px" }}
      >
        Tất cả giao dịch
      </h1>
      <div
        style={{
          width: "200px",
          paddingRight: "10px",
          marginRight: "10px",
          marginTop: "10px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#ddd",
            padding: "5px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Ví tiền mặt
        </div>
        <div style={{ marginTop: "10px" }}>
          <img
            src="https://i.pravatar.cc/40" 
            alt="Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "block",
              margin: "auto",
            }}
          />
          <p style={{ margin: "5px 0", fontWeight: "bold" }}>Hiện có</p>
          <p style={{ fontSize: "12px", color: "gray" }}>(500,000 VND)</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Information />
      <TransactionList />

      <Routes>
        <Route path="/Transactions" element={<Transactions />} />
        <Route path="/Budget" element={<Budget />} />
        <Route path="/Statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;

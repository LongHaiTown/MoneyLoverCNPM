import React, { useState } from "react";
import { NavbuttonStyle } from "./GlobalStyle";
import TransactionList from "./components/TransactionList";


function Navbar()
{
  const [isOpen, setIsOpen] = useState(false);

  return(
    <nav 
    style={{
        display: "flex", 
        justifyContent: "space-between", 
        padding: "10px 20px", 
        background: "#f8f8f8", 
        borderBottom: "2px solid #ddd" }} >
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
            <li >Mục 1</li>
            <li >Mục 2</li>
            <li >Mục 3</li>
          </ul>
        )}
      </div>
      <div>
          <button style={NavbuttonStyle}>Giao dịch</button>
          <button style={NavbuttonStyle}>Thống kê</button>
          <button style={NavbuttonStyle}>Ngân sách</button>
          <button style={{backgroundColor:"#728156", color:"white", margin:"10px", padding:"10px 20px", border: "none", borderRadius:"5px", cursor:"pointer" }}>Long Hai Town</button>
      </div>
    </nav>
  );
}
const Information = () => {
  return (

    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <h1
      onClick={() => console.log("Clicked Tất cả giao dịch!")}
      style={{cursor: "pointer", color: "red", paddingLeft:"10px" }}
    >
      Tất cả giao dịch
    </h1>
    <div
      style={{
        width: "200px",
        paddingRight: "10px",
        marginRight:"10px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display:"inline-block",
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
          src="https://i.pravatar.cc/40" // Ảnh avatar giả
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
};



function App() {
  return (
    <div><Navbar />
    <Information />
    <TransactionList /></div>
  );

}

export default App;

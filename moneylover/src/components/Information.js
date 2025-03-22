import { useEffect, useState } from 'react';
import axios from 'axios'; // Nếu dùng axios

function Information() { 
  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    // Gọi API từ backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hello');
        // Nếu dùng fetch:
        // const response = await fetch('http://localhost:5000/api/hello');
        // const data = await response.json();
        setMessage(response.data.message);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
      <p>Phản hồi từ backend: {message}</p>
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
export default Information;
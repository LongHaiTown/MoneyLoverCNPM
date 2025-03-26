import React from "react";
import ChartComponent from "../components/ChartComponent";
import "../pages/page.css"; // File CSS

const Statistics = () => {
  return (
    <div className="statistics-container" id="statistics">
      <h1>Thống kê</h1>
      <button className="summary-btn">Tóm tắt cho bạn 🌟🌟🌟</button>
      <button className="category-btn">Thống kê theo danh mục</button>
      
      <div className="chart-section">
        <ChartComponent />
      </div>
      
      <div className="ai-analysis">
        <h2>Phân tích của AI ✨</h2>
        <p>Phân Tích Tài Chính Tháng Này cho thấy:</p>
        <ul>
          <li>Chi tiêu nhiều nhất vào <strong>Ăn uống</strong></li>
          <li>Khoản tiết kiệm đạt 1,500,000 VND</li>
          <li>Mục tiêu đạt 5,000,000 VND đang tiến gần!</li>
        </ul>
      </div>
    </div>
  );
};

export default Statistics;

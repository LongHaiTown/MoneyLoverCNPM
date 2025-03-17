import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const ChartComponent = () => {
  // Dữ liệu biểu đồ cột
  const barData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
    datasets: [
      {
        label: "Thu nhập",
        data: [800, 1200, 950, 1100, 1400, 1600, 1800],
        backgroundColor: "#007bff",
      },
      {
        label: "Chi tiêu",
        data: [600, 900, 800, 950, 1000, 1200, 1500],
        backgroundColor: "#dc3545",
      },
    ],
  };

  // Dữ liệu biểu đồ tròn
  const doughnutData = {
    labels: ["Ăn uống", "Di chuyển", "Mua sắm", "Giải trí", "Khác"],
    datasets: [
      {
        data: [300, 200, 150, 100, 250],
        backgroundColor: ["#007bff", "#dc3545", "#ffc107", "#28a745", "#17a2b8"],
      },
    ],
  };

  // Dữ liệu biểu đồ đường
  const lineData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
    datasets: [
      {
        label: "Thu nhập",
        data: [800, 1200, 950, 1100, 1400, 1600, 1800],
        borderColor: "#007bff",
        fill: false,
      },
      {
        label: "Chi tiêu",
        data: [600, 900, 800, 950, 1000, 1200, 1500],
        borderColor: "#dc3545",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Biểu đồ cột</h2>
      <Bar data={barData} />
      
      <h2>Biểu đồ tròn</h2>
      <Doughnut data={doughnutData} />
      
      <h2>Biểu đồ đường</h2>
      <Line data={lineData} />
    </div>
  );
};

export default ChartComponent;

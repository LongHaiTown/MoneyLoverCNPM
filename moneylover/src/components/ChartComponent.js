import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import "./ChartComponent.css"; // ⚠️ Đảm bảo file tồn tại hoặc bỏ nếu chưa dùng

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
};

const ChartComponent = ({ expenses = [] }) => {
  const monthlyStats = Array.from({ length: 12 }, () => ({
    income: 0,
    outcome: 0,
  }));
  const categoryStats = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.getMonth(); // 0-11
    const type = expense.category?.type || (expense.amount >= 0 ? "income" : "outcome");
    const amount = Math.abs(expense.amount);

    if (type === "income") {
      monthlyStats[month].income += amount;
    } else {
      monthlyStats[month].outcome += amount;
      const category = expense.category?.name || `ID ${expense.category_id}`;
      categoryStats[category] = (categoryStats[category] || 0) + amount;
    }
  });

  const months = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
  const incomeData = monthlyStats.map((m) => m.income);
  const outcomeData = monthlyStats.map((m) => m.outcome);

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Thu nhập",
        data: incomeData,
        backgroundColor: "#007bff",
      },
      {
        label: "Chi tiêu",
        data: outcomeData,
        backgroundColor: "#dc3545",
      },
    ],
  };

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Thu nhập",
        data: incomeData,
        borderColor: "#007bff",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Chi tiêu",
        data: outcomeData,
        borderColor: "#dc3545",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        data: Object.values(categoryStats),
        backgroundColor: [
          "#007bff",
          "#dc3545",
          "#ffc107",
          "#28a745",
          "#17a2b8",
          "#6f42c1",
          "#fd7e14",
        ],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Biểu đồ cột</h2>
      <div className="chart-box">
        <Bar data={barData} options={defaultOptions} />
      </div>

      <h2 className="chart-title">Biểu đồ tròn</h2>
      <div className="chart-box">
        <Doughnut data={doughnutData} options={defaultOptions} />
      </div>

      <h2 className="chart-title">Biểu đồ đường</h2>
      <div className="chart-box">
        <Line data={lineData} options={defaultOptions} />
      </div>
    </div>
  );
};

export default ChartComponent;

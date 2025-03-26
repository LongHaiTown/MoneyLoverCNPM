import React, { useState, useEffect } from 'react';
import './Statistics.css';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const sampleExpenses = [
  {
    id: "1",
    name: "Mua sắm",
    type: "expense",
    date: "2025-01-15T00:00:00.000Z",
    amount: 2000000,
    title: "Mua quần áo",
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
  {
    id: "2",
    name: "Ăn uống",
    type: "expense",
    date: "2025-01-20T00:00:00.000Z",
    amount: 500000,
    title: "Ăn tối ngoài",
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
  {
    id: "3",
    name: "Lương",
    type: "income",
    date: "2025-01-05T00:00:00.000Z",
    amount: 10000000,
    title: "Lương tháng 1",
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
  {
    id: "4",
    name: "Du lịch",
    type: "expense",
    date: "2025-02-10T00:00:00.000Z",
    amount: 3000000,
    title: "Chuyến đi Đà Lạt",
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
  {
    id: "5",
    name: "Học tập",
    type: "expense",
    date: "2025-02-15T00:00:00.000Z",
    amount: 1500000,
    title: "Mua sách",
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
  {
    id: "6",
    name: "Lương",
    type: "income",
    date: "2025-02-05T00:00:00.000Z",
    title: "Lương tháng 2",
    amount: 10000000,
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
  {
    id: "7",
    name: "Mua sắm",
    type: "expense",
    date: "2025-03-10T00:00:00.000Z",
    amount: 2500000,
    title: "Mua giày",
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
  {
    id: "8",
    name: "Ăn uống",
    type: "expense",
    date: "2025-03-12T00:00:00.000Z",
    amount: 700000,
    title: "Ăn trưa",
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
  {
    id: "9",
    name: "Lương",
    type: "income",
    date: "2025-03-05T00:00:00.000Z",
    amount: 10000000,
    title: "Lương tháng 3",
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
  {
    id: "10",
    name: "Học tập",
    type: "expense",
    date: "2025-04-01T00:00:00.000Z",
    amount: 1000000,
    title: "Khóa học online",
    wallet: { id: 7, name: "Ví tiền mặt" },
  },
];
const Statistics = () => {
  const [expenses, setExpenses] = useState([]);

  // Use sample data instead of fetching from API
  useEffect(() => {
    setExpenses(sampleExpenses);
  }, []);

  // Process data for charts and summaries
  const processData = () => {
    if (!expenses.length) return { totalIncome: 0, totalExpense: 0, monthlyData: {}, categoryData: {}, balanceTrend: [] };

    // Calculate total income and expenses
    const totalIncome = expenses
      .filter(exp => exp.type === 'income')
      .reduce((sum, exp) => sum + exp.amount, 0);
    const totalExpense = expenses
      .filter(exp => exp.type === 'expense')
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Group expenses by month for the bar chart
    const monthlyData = {};
    expenses.forEach(exp => {
      const month = new Date(exp.date).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }
      if (exp.type === 'income') {
        monthlyData[month].income += exp.amount;
      } else {
        monthlyData[month].expense += exp.amount;
      }
    });

    // Group expenses by category for AI analysis
    const categoryData = {};
    expenses
      .filter(exp => exp.type === 'expense')
      .forEach(exp => {
        if (!categoryData[exp.name]) {
          categoryData[exp.name] = 0;
        }
        categoryData[exp.name] += exp.amount;
      });

    // Calculate running balance for the line chart
    const balanceTrend = [];
    let runningBalance = 0;
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedExpenses.forEach(exp => {
      if (exp.type === 'income') {
        runningBalance += exp.amount;
      } else {
        runningBalance -= exp.amount;
      }
      balanceTrend.push({ date: exp.date, balance: runningBalance });
    });

    return { totalIncome, totalExpense, monthlyData, categoryData, balanceTrend };
  };

  const { totalIncome, totalExpense, monthlyData, categoryData, balanceTrend } = processData();

  // Prepare data for the bar chart (monthly income vs expense)
  const barChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Thu nhập (VND)',
        data: Object.values(monthlyData).map(data => data.income),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Chi tiêu (VND)',
        data: Object.values(monthlyData).map(data => -data.expense), // Negative for visual effect
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // Prepare data for the line chart (balance trend)
  const lineChartData = {
    labels: balanceTrend.map(trend => new Date(trend.date).toLocaleString('default', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Số dư (VND)',
        data: balanceTrend.map(trend => trend.balance),
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="statistics-container">
      {/* Header */}
      <div className="header">
        <h1>Thống kê</h1>
        <button className="summary-btn">Tóm tắt cho bạn 😍😍</button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button>Thống kê theo thời gian</button>
        <button>Thống kê theo danh mục</button>
      </div>

      {/* Summary Section */}
      <div className="summary">
        <div className="summary-item">
          <h3>Thu nhập ròng</h3>
          <p>{totalIncome.toLocaleString()} VND</p>
        </div>
        <div className="summary-item">
          <h3>Khoản chi</h3>
          <p>{totalExpense.toLocaleString()} VND</p>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="chart-section">
        <h2>Biểu đồ</h2>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Thu nhập và Chi tiêu theo tháng' },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Số tiền (VND)' },
              },
            },
          }}
        />
      </div>

      {/* Line Chart Section */}
      <div className="chart-section">
        <h2>Biểu đồ dư</h2>
        <Line
          data={lineChartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Xu hướng số dư' },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Số dư (VND)' },
              },
            },
          }}
        />
      </div>

      {/* AI Analysis Section */}
      <div className="ai-analysis">
        <h2>Phân tích của AI ✨✨</h2>
        <p>
          <strong>Tổng Quan:</strong> Tháng này, bạn đã chi tiêu một cách khá hợp lý, nhưng vẫn có một số khoản chi có thể tiết kiệm được nhé!
        </p>
        <h3>Chi Tiêu Chính:</h3>
        <ul>
          {Object.entries(categoryData).map(([category, amount]) => (
            <li key={category}>
              {category}: {amount.toLocaleString()} VND
            </li>
          ))}
        </ul>
        <p>
          <strong>Khoản Tiết Kiệm:</strong> Bạn đã tiết kiệm được {totalIncome - totalExpense > 0 ? (totalIncome - totalExpense).toLocaleString() : 0} VND vào quỹ khẩn cấp! Cứ thế mà tiếp tục nhé!
        </p>
      </div>
    </div>
  );
};

export default Statistics;
import React, { useState, useEffect } from 'react';
import './Statistics.css';
import { getExpenses } from "../services/api";

import { Bar, Line, Pie } from 'react-chartjs-2';

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
  ArcElement,
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
  Legend,
  ArcElement
);

// const sampleExpenses = [
//   {
//     id: "1",
//     name: "Mua sắm",
//     type: "expense",
//     date: "2025-01-15T00:00:00.000Z",
//     amount: 2000000,
//     title: "Mua quần áo",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 2, category_name: "Mua sắm" },
//   },
//   {
//     id: "2",
//     name: "Ăn uống",
//     type: "expense",
//     date: "2025-01-20T00:00:00.000Z",
//     amount: 500000,
//     title: "Ăn tối ngoài",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 1, category_name: "Ăn uống" },
//   },
//   {
//     id: "3",
//     name: "Lương",
//     type: "income",
//     date: "2025-01-05T00:00:00.000Z",
//     amount: 10000000,
//     title: "Lương tháng 1",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 3, category_name: "Thu nhập" },
//   },
//   {
//     id: "4",
//     name: "Du lịch",
//     type: "expense",
//     date: "2025-02-10T00:00:00.000Z",
//     amount: 3000000,
//     title: "Chuyến đi Đà Lạt",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 4, category_name: "Du lịch" },
//   },
//   {
//     id: "5",
//     name: "Học tập",
//     type: "expense",
//     date: "2025-02-15T00:00:00.000Z",
//     amount: 1500000,
//     title: "Mua sách",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 5, category_name: "Học tập" },
//   },
//   {
//     id: "6",
//     name: "Lương",
//     type: "income",
//     date: "2025-02-05T00:00:00.000Z",
//     amount: 10000000,
//     title: "Lương tháng 2",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 3, category_name: "Thu nhập" },
//   },
//   {
//     id: "7",
//     name: "Mua sắm",
//     type: "expense",
//     date: "2025-03-10T00:00:00.000Z",
//     amount: 2500000,
//     title: "Mua giày",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 2, category_name: "Mua sắm" },
//   },
//   {
//     id: "8",
//     name: "Ăn uống",
//     type: "expense",
//     date: "2025-03-12T00:00:00.000Z",
//     amount: 700000,
//     title: "Ăn trưa",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 1, category_name: "Ăn uống" },
//   },
//   {
//     id: "9",
//     name: "Lương",
//     type: "income",
//     date: "2025-03-05T00:00:00.000Z",
//     amount: 10000000,
//     title: "Lương tháng 3",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 3, category_name: "Thu nhập" },
//   },
//   {
//     id: "10",
//     name: "Học tập",
//     type: "expense",
//     date: "2025-04-01T00:00:00.000Z",
//     amount: 1000000,
//     title: "Khóa học online",
//     wallet: { id: 7, name: "Ví tiền mặt" },
//     category: { category_id: 5, category_name: "Học tập" },
//   },
// ];
const Statistics = () => {
  const [expenses, setExpenses] = useState([]);
  const [timeRange, setTimeRange] = useState(2);
  const [chartType, setChartType] = useState('bar');
  const [activeTab, setActiveTab] = useState('time');
  const [selectedMonth, setSelectedMonth] = useState('Mar'); // Mặc định là tháng 3
  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      console.log("📌 Danh sách giao dịch nhận được cho thống kê:", res.data);
      setExpenses(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy giao dịch:", err);
    }
  };
  useEffect(() => {
    // Giả lập gọi API
    fetchExpenses();
  }, []);

  const processData = () => {
    if (!expenses.length) return { totalIncome: 0, totalExpense: 0, monthlyData: {}, categoryData: {}, balanceTrend: [] };
  
    const currentDate = new Date('2025-03-26');
    const startDate = new Date(currentDate);
    startDate.setMonth(currentDate.getMonth() - timeRange);
  
    const filteredExpenses = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate >= startDate && expDate <= currentDate;
    });
  
    const totalIncome = filteredExpenses
      .filter(exp => exp.category?.type === 'income') // Sử dụng exp.category.type
      .reduce((sum, exp) => sum + exp.amount, 0);
  
    const totalExpense = filteredExpenses
      .filter(exp => !exp.category?.type || exp.category.type === 'expense') // Giả định nếu không có type thì là expense
      .reduce((sum, exp) => sum + exp.amount, 0);
  
    const monthlyData = {};
    filteredExpenses.forEach(exp => {
      const month = new Date(exp.date).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }
      if (exp.category?.type === 'income') { // Sử dụng exp.category.type
        monthlyData[month].income += exp.amount;
      } else {
        monthlyData[month].expense += exp.amount;
      }
    });
  
    // Dữ liệu danh mục theo tháng được chọn
    const categoryData = {};
    filteredExpenses
      .filter(exp => new Date(exp.date).toLocaleString('default', { month: 'short' }) === selectedMonth)
      .forEach(exp => {
        // Lấy tên danh mục từ category.name, nếu không có thì dùng "Không xác định"
        const categoryName = exp.category?.name || "Không xác định";
  
        if (!categoryData[categoryName]) {
          categoryData[categoryName] = { income: 0, expense: 0 };
        }
        if (exp.category?.type === 'income') { // Sử dụng exp.category.type
          categoryData[categoryName].income += exp.amount;
        } else {
          categoryData[categoryName].expense += exp.amount;
        }
      });
  
    const balanceTrend = [];
    let runningBalance = 0;
    const sortedExpenses = [...filteredExpenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedExpenses.forEach(exp => {
      if (exp.category?.type === 'income') { // Sử dụng exp.category.type
        runningBalance += exp.amount;
      } else {
        runningBalance -= exp.amount;
      }
      balanceTrend.push({ date: exp.date, balance: runningBalance });
    });
  
    return { totalIncome, totalExpense, monthlyData, categoryData, balanceTrend };
  };
  
  const { totalIncome, totalExpense, monthlyData, categoryData, balanceTrend } = processData();
  
  // Dữ liệu cho biểu đồ cột theo thời gian
  const timeBarChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Thu nhập (VND)',
        data: Object.values(monthlyData).map(data => data.income),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Chi tiêu (VND)',
        data: Object.values(monthlyData).map(data => -data.expense),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };
  
  // Dữ liệu cho biểu đồ đường theo thời gian (số dư)
  const timeLineChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Số dư (VND)',
        data: Object.values(monthlyData).map(data => data.income - data.expense),
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
    ],
  };
  
  // Dữ liệu cho biểu đồ tròn thu nhập theo danh mục
  const incomePieChartData = {
    labels: Object.keys(categoryData).filter(category => categoryData[category].income > 0),
    datasets: [
      {
        label: 'Thu nhập (VND)',
        data: Object.values(categoryData)
          .filter(data => data.income > 0)
          .map(data => data.income),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Dữ liệu cho biểu đồ tròn chi tiêu theo danh mục
  const expensePieChartData = {
    labels: Object.keys(categoryData).filter(category => categoryData[category].expense > 0),
    datasets: [
      {
        label: 'Chi tiêu (VND)',
        data: Object.values(categoryData)
          .filter(data => data.expense > 0)
          .map(data => data.expense),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Dữ liệu cho biểu đồ số dư
  const balanceLineChartData = {
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

  // Lấy danh sách tháng từ dữ liệu
  const availableMonths = Array.from(new Set(expenses.map(exp => new Date(exp.date).toLocaleString('default', { month: 'short' }))));


  return (
    <div className="statistics-container">
      {/* Header */}
      <div className="header">
        <h1>Thống kê</h1>
        <button className="summary-btn">Tóm tắt cho bạn 😍😍</button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab('time')}
          style={{ backgroundColor: activeTab === 'time' ? '#2a9d8f' : '#f0f0f0' }}
        >
          Thống kê theo thời gian
        </button>
        <button
          onClick={() => setActiveTab('category')}
          style={{ backgroundColor: activeTab === 'category' ? '#2a9d8f' : '#f0f0f0' }}
        >
          Thống kê theo danh mục
        </button>
      </div>

      {/* Chart Section */}
      <h2>{activeTab === 'time' ? (chartType === 'bar' ? 'Biểu đồ cột' : 'Biểu đồ đường') : 'Biểu đồ tròn'}</h2>
      <div className="chart-section">
        <div className="chart">
          {activeTab === 'time' ? (
            chartType === 'bar' ? (
              <Bar
                data={timeBarChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Số tiền (VND)' },
                    },
                  },
                }}
              />
            ) : (
              <Line
                data={balanceLineChartData}
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
            )
          ) : (
            <div className="pie-charts-container">
              <div className="pie-chart">
                <h3>Thu nhập</h3>
                <Pie
                  data={incomePieChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' },
                      title: { display: true, text: `Thu nhập - ${selectedMonth}` },
                    },
                  }}
                />
              </div>
              <div className="pie-chart">
                <h3>Chi tiêu</h3>
                <Pie
                  data={expensePieChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' },
                      title: { display: true, text: `Chi tiêu - ${selectedMonth}` },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="chart-buttons">
          {/* Chart Type Buttons (chỉ hiển thị khi ở tab thời gian) */}
          {activeTab === 'time' && (
            <div className="chart-type-buttons">
              <button
                onClick={() => setChartType('bar')}
                style={{ backgroundColor: chartType === 'bar' ? '#2a9d8f' : '#f0f0f0' }}
              >
                Biểu đồ cột
              </button>
              <button
                onClick={() => setChartType('line')}
                style={{ backgroundColor: chartType === 'line' ? '#2a9d8f' : '#f0f0f0' }}
              >
                Biểu đồ đường
              </button>
            </div>
          )}

          {/* Time Range Buttons (chỉ hiển thị khi ở tab thời gian) */}
          {activeTab === 'time' && (
            <div className="time-range-buttons">
              <button
                onClick={() => setTimeRange(2)}
                style={{ backgroundColor: timeRange === 2 ? '#2a9d8f' : '#ddd' }}
              >
                2 tháng
              </button>
              <button
                onClick={() => setTimeRange(4)}
                style={{ backgroundColor: timeRange === 4 ? '#2a9d8f' : '#f0f0f0' }}
              >
                4 tháng
              </button>
              <button
                onClick={() => setTimeRange(6)}
                style={{ backgroundColor: timeRange === 6 ? '#2a9d8f' : '#f0f0f0' }}
              >
                6 tháng
              </button>
            </div>
          )}

          {/* Month Selection Buttons (chỉ hiển thị khi ở tab danh mục) */}
          {activeTab === 'category' && (
            <div className="month-selection-buttons">
              {availableMonths.map(month => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  style={{ backgroundColor: selectedMonth === month ? '#2a9d8f' : '#f0f0f0' }}
                >
                  {month}
                </button>
              ))}
            </div>
          )}

          {/* Summary */}
          <div className="chart-summary">
            <h3>Tóm tắt ({activeTab === 'time' ? `${timeRange} tháng` : `Tháng ${selectedMonth}`})</h3>
            <p><strong>Thu nhập:</strong> {totalIncome.toLocaleString()} VND</p>
            <p><strong>Chi tiêu:</strong> {totalExpense.toLocaleString()} VND</p>
            <p><strong>Số dư:</strong> {(totalIncome - totalExpense).toLocaleString()} VND</p>
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="ai-analysis">
        <h2>Phân tích của AI ✨✨</h2>
        <p>
          <strong>Tổng Quan:</strong> Trong {timeRange} tháng qua, bạn đã chi tiêu khá hợp lý, nhưng vẫn có thể tiết kiệm thêm!
        </p>
        <h3>Chi Tiêu Chính Theo Danh Mục (Tháng {selectedMonth}):</h3>
        <ul>
          {Object.entries(categoryData).map(([category, data]) => (
            <li key={category}>
              {category}: {data.expense.toLocaleString()} VND (Thu nhập: {data.income.toLocaleString()} VND)
            </li>
          ))}
        </ul>
        <p>
          <strong>Khoản Tiết Kiệm:</strong> Bạn đã tiết kiệm được{' '}
          {totalIncome - totalExpense > 0 ? (totalIncome - totalExpense).toLocaleString() : 0} VND!
        </p>
      </div>
    </div>
  );
};

export default Statistics;
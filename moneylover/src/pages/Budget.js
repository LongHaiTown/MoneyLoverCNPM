import React, { useState } from "react";
import "../pages/page.css";

const Budget = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Ăn uống", total: 5000000, spent: 2000000 },
    { id: 2, category: "Học phí", total: 10000000, spent: 5000000 },
  ]);
  const [newBudget, setNewBudget] = useState({ category: "", total: "" });

  // Thêm ngân sách mới
  const addBudget = () => {
    if (newBudget.category && newBudget.total) {
      setBudgets([
        ...budgets,
        { id: budgets.length + 1, category: newBudget.category, total: Number(newBudget.total), spent: 0 },
      ]);
      setNewBudget({ category: "", total: "" });
    }
  };

  return (
    <div className="budget-container">
      <h2 className="budget-header">Ngân sách</h2>

      {/* Nút tạo ngân sách */}
      <div className="budget-buttons">
        <input
          type="text"
          className="input-field"
          placeholder="Danh mục"
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
        />
        <input
          type="number"
          className="input-field"
          placeholder="Số tiền"
          value={newBudget.total}
          onChange={(e) => setNewBudget({ ...newBudget, total: e.target.value })}
        />
        <button className="btn-create" onClick={addBudget}>Tạo ngân sách mới</button>
      </div>

      {/* Tổng tiền có thể chi */}
      <div className="budget-balance">
        <p>Số tiền bạn có thể chi: </p>
        <span>9.999.999 VND</span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: "75%" }}></div>
      </div>

      {/* Danh sách ngân sách */}
      <div className="budget-list">
        {budgets.map((budget) => (
          <div key={budget.id} className="budget-category">
            <div className="category-details">
              <h3 className="category-title">{budget.category}</h3>
              <div className="category-progress">
                <div className="progress" style={{ width: `${(budget.spent / budget.total) * 100}%` }}></div>
              </div>
              <p className="total-spent">
                Tổng đã chi: {budget.spent.toLocaleString()} VND | Còn lại: {(budget.total - budget.spent).toLocaleString()} VND
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;

import React, { useState, useEffect } from "react";
import "../pages/Budgets.css"
import BudgetForm from "../components/BudgetForm"
import { getBudgets, createBudget } from "../services/api";

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchBudgets = () => {
    getBudgets({ params: { month, year } })
    
      .then((res) => {
        console.log("Danh sách Ngân sách nhận được ", res.data); // Kiểm tra dữ liệu từ server
        setBudgets(res.data);
      })  
      .catch((err) => console.error("❌ Lỗi khi lấy budgets:", err));
  };

  useEffect(() => {
    fetchBudgets();
  }, [month, year]);
 const handleCreateBudget = (data) => {
     console.log("📌 Dữ liệu gửi đi để tạo budget:", data);
     createBudget(data)
       .then((res) => {
         console.log("✅ Tạo budget thành công, phản hồi từ server:", res.data);
         fetchBudgets(); // Cập nhật danh sách sau khi tạo
       })
       .catch((err) => {
         console.error("❌ Lỗi khi tạo budget:", err.response ? err.response.data : err.message);
       });
   };
   
  return (
    <div className="budget-container" id="budgets">
      <div className="budget-header"><h1>Ngân sách</h1></div>
      <div className="budget-label">
        <label style={{paddingRight:"20px"}}>
          Month :
          <input style={{ textAlign:"center "}}
            type="number"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            min="1"
            max="12"
          />
        </label>
        <label>
          Year :
          <input style={{ textAlign:"center "}}
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            min="2000"
            max="2100"
          />
        </label>
      </div>
      <BudgetForm onSubmit={handleCreateBudget}/>
      {/* Tổng tiền có thể chi */}
      {/* <div className="budget-balance">
        <p>Số tiền bạn có thể chi: </p>
        <span>9.999.999 VND</span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: "75%" }}></div>
      </div> */}
      {/* Danh sách ngân sách */}
      <div className="budget-list">
        {budgets.map((budget) => 
        {
          const progress = budget.amount > 0 ? (budget.used_amount / budget.amount) * 100 : 0;
          return (
          <div key={budget.id} className="budget-category">
            <div className="category-details">
              <h3 className="category-title">{budget["category.name"]}</h3>
              <div className="category-progress">
                <div className="progress"  style={{ width: `${progress}%` }}></div>
              </div>
              <p className="total-spent">
                Tổng đã chi: {budget.used_amount.toLocaleString()} VND | Còn lại: {(budget.amount - budget.used_amount).toLocaleString()} VND
              </p>
            </div>
          </div>
        )} )}
        
      </div>
    </div>
  );
};

export default Budget;

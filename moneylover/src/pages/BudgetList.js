import { useEffect, useState } from "react";
import { getBudgets, createBudget } from "../services/api";
import BudgetForm from "../components/BudgetForm";

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchBudgets = () => {
    getBudgets({ params: { month, year } })
      .then((res) => setBudgets(res.data))
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
    <div>
      <BudgetForm onSubmit={handleCreateBudget} />
      <h2>Budget List</h2>
      <div>
        <label>
          Month:
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            min="1"
            max="12"
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            min="2000"
            max="2100"
          />
        </label>
      </div>
      {budgets.map((budget) => (
        <div key={budget.id} style={{ color: budget.near_limit ? "red" : "black" }}>
          <span>
            Category: {budget["category.name"]} - Budget: ${budget.amount} - Used: $
            {budget.used_amount}
            {budget.near_limit && " (Near Limit!)"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BudgetList;
import { useState, useEffect } from "react";
import { getCategories, createBudget } from "../services/api";

const BudgetForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    category_id: "",
    amount: "",
    date: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      category_id: parseInt(formData.category_id),
      amount: parseFloat(formData.amount),
      date: formData.date,
    };
    onSubmit(formattedData);
    setFormData({ category_id: "", amount: "", date: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Budget</h3>
      <select
        name="category_id"
        value={formData.category_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Budget</button>
    </form>
  );
};

export default BudgetForm;
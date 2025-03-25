import { useState, useEffect } from "react";
import { getWallets, getCategories } from "../services/api";
import "./ExpenseForm.css"; // Add a new CSS file for ExpenseForm

const ExpenseForm = ({ onSubmit, expense }) => {
  const [formData, setFormData] = useState(
    expense || { title: "", amount: "", date: "", category_id: "", wallet_id: "" }
  );
  const [wallets, setWallets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getWallets().then((res) => setWallets(res.data));
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="expense-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <input
        className="form-input"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Tiêu đề"
        required
      />
      <input
        className="form-input"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Số tiền"
        required
      />
      <input
        className="form-input"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <select
        className="form-select"
        name="category_id"
        value={formData.category_id}
        onChange={handleChange}
        required
      >
        <option value="">Chọn danh mục</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        className="form-select"
        name="wallet_id"
        value={formData.wallet_id}
        onChange={handleChange}
        required
      >
        <option value="">Chọn ví</option>
        {wallets.map((wallet) => (
          <option key={wallet.id} value={wallet.id}>
            {wallet.name}
          </option>
        ))}
      </select>
      <button className="form-submit" type="submit">Lưu</button>
    </form>
  );
};

export default ExpenseForm;
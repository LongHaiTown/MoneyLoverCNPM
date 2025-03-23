import { useState, useEffect } from "react";
import { getWallets, getCategories } from "../services/api";

const ExpenseForm = ({ onSubmit, expense }) => {
  const [formData, setFormData] = useState(
    expense || { title: "", amount: "", date: "", category_id: "", wallet_id: "" }
  );
  const [wallets, setWallets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getWallets().then((res) => setWallets(res.data));
    // getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="amount"
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
      <input
        name="category_id"
        value={formData.category_id}
        onChange={handleChange}
        required
      >
      </input>
      <select
        name="wallet_id"
        value={formData.wallet_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Wallet</option>
        {wallets.map((wallet) => (
          <option key={wallet.id} value={wallet.id}>
            {wallet.name}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default ExpenseForm;
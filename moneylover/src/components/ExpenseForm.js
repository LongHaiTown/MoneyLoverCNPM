import { useState } from "react";

const ExpenseForm = ({ onSubmit, expense }) => {
  const [formData, setFormData] = useState(
    expense || { title: "", amount: "", date: "" ,category_id: ""}
  );

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
        placeholder="Category ID"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ExpenseForm;

const Category = require("../models/CategoryModel");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll(); // Gọi hàm getAll
    res.json(categories);
  } catch (err) {
    console.error("❌ Lỗi trong getAllCategories:", err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const id = await Category.createCategory(req.body); // Gọi hàm createCategory
    res.status(201).json({ id });
  } catch (err) {
    console.error("❌ Lỗi trong createCategory:", err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.delete(req.params.id); // Gọi hàm delete
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Lỗi trong deleteCategory:", err.message);
    res.status(400).json({ error: err.message });
  }
};
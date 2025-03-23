const Category = require("../models/CategoryModel");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.getAll();
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const id = await Category.create(req.body);
  res.json({ id });
};

exports.deleteCategory = async (req, res) => {
  await Category.delete(req.params.id);
  res.sendStatus(200);
};

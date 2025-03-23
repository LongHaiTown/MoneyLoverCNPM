const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false,
      defaultValue: "expense",
    },
  },
  { timestamps: false }
);

// Lấy tất cả danh mục
Category.getAll = async () => {
  return await Category.findAll({
    attributes: ["id", "name", "type"],
  });
};

// Tạo danh mục mới
Category.createCategory = async (data) => {
  const { name, type } = data;

  if (!name || !type) {
    throw new Error("Category name and type are required!");
  }

  const category = await Category.create({ name, type });
  return category.id;
};

// Xóa danh mục
Category.delete = async (id) => {
  if (!id) {
    throw new Error("Category ID is required!");
  }

  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Category not found!");
  }

  await category.destroy();
};

module.exports = Category;
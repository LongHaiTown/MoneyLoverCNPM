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
  },
  { timestamps: false }
);

// Lấy tất cả danh mục
Category.getAll = async () => {
  return await Category.findAll({
    attributes: ["id", "name"], // Chỉ lấy id và name
  });
};

// Tạo danh mục mới
Category.createCategory = async (data) => {
  const { name } = data;

  if (!name) {
    throw new Error("Category name is required!");
  }

  const category = await Category.create({ name });
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
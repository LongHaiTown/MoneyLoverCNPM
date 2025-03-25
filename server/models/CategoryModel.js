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
// Hàm khởi tạo dữ liệu mẫu
Category.initializeSampleData = async () => {
  try {
    const count = await Category.count();
    if (count === 0) { // Chỉ tạo dữ liệu mẫu nếu bảng trống
      const sampleCategories = [
        { name: "Lương", type: "income" },
        { name: "Thưởng", type: "income" },
        { name: "Ăn uống", type: "expense" },
        { name: "Mua sắm", type: "expense" },
        { name: "Hóa đơn", type: "expense" },
        { name: "Du lịch", type: "expense" },
      ];

      await Category.bulkCreate(sampleCategories);
      console.log("✅ Dữ liệu mẫu cho Category đã được tạo.");
    } else {
      console.log("ℹ️ Bảng Category đã có dữ liệu, bỏ qua khởi tạo mẫu.");
    }
  } catch (err) {
    console.error("❌ Lỗi khi tạo dữ liệu mẫu:", err.message);
  }
};
module.exports = Category;
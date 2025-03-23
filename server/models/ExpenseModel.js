const sequelize = require("../config/db"); // Sequelize instance
const { DataTypes } = require("sequelize");

const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
  },
  category_id: {
    type: DataTypes.INTEGER,
  },
  
},{
  timestamps: false, // Tắt createdAt và updatedAt
});

// Phương thức getAll
Expense.getAll = async () => {
  return await Expense.findAll({
    include: [{ model: sequelize.models.category, attributes: ["name"] }],
  });
};

// Phương thức getById
Expense.getById = async (id) => {
  return await Expense.findOne({
    where: { id },
    include: [{ model: sequelize.models.category, attributes: ["name"] }],
  });
};

// Không cần định nghĩa create, Sequelize đã có sẵn Model.create

// Phương thức delete
Expense.delete = async (id) => {
  console.log("📌 ID nhận trong model:", id);
  if (!id) throw new Error("ID không được để trống!");
  await Expense.destroy({ where: { id } });
};

module.exports = Expense;
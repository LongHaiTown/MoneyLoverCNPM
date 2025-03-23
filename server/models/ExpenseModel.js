const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Expense = sequelize.define(
  "expense",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATE },
    category_id: { type: DataTypes.INTEGER },
    wallet_id: { type: DataTypes.INTEGER, allowNull: false }, // Thêm wallet_id
  },
  { timestamps: false }
);

// Phương thức getAll
Expense.getAll = async () => {
  return await Expense.findAll({
    include: [
      { model: sequelize.models.category, attributes: ["name"] },
      { model: sequelize.models.wallet, attributes: ["name"] }, // Thêm include wallet
    ],
  });
};

// Phương thức getById
Expense.getById = async (id) => {
  return await Expense.findOne({
    where: { id },
    include: [
      { model: sequelize.models.category, attributes: ["name"] },
      { model: sequelize.models.wallet, attributes: ["name"] },
    ],
  });
};

// Phương thức delete
Expense.delete = async (id) => {
  console.log("📌 ID nhận trong model:", id);
  if (!id) throw new Error("ID không được để trống!");
  await Expense.destroy({ where: { id } });
};

module.exports = Expense;
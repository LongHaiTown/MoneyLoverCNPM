const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Expense = sequelize.define(
  "expense",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATE },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    wallet_id: { type: DataTypes.INTEGER, allowNull: false }, // Thêm wallet_id
  },
  { timestamps: false }
);

// Phương thức getAll
Expense.getAll = async (filters = {}) => {
  const { date, startDate, endDate } = filters;
  const where = {};
  if (date) where.date = date;
  else if (startDate && endDate) {
    where.date = { [Op.between]: [startDate, endDate] };
  }

  return await Expense.findAll({
    where,
    include: [
      { model: sequelize.models.category, attributes: ["name", "type"] }, // Lấy cả name và type
      { model: sequelize.models.wallet, attributes: ["name"] },
    ],
  });
};

// Phương thức getById
Expense.getById = async (id) => {
  return await Expense.findOne({
    where: { id },
    include: [
      { model: sequelize.models.category, attributes: ["name", "type"] },
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
const sequelize = require("../config/db");
const { DataTypes, Op } = require("sequelize");

const Budget = sequelize.define(
  "budget",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { timestamps: false }
);

// Lấy tất cả ngân sách kèm số tiền đã sử dụng
Budget.getAllWithUsedAmount = async (month, year) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const budgets = await Budget.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: sequelize.models.category,
        attributes: ["name"],
      },
    ],
    raw: true,
  });

  const budgetsWithUsedAmount = await Promise.all(
    budgets.map(async (budget) => {
      const usedAmount = await sequelize.models.expense.sum("amount", {
        where: {
          category_id: budget.category_id,
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      return {
        ...budget,
        used_amount: usedAmount || 0,
        near_limit: (usedAmount || 0) >= budget.amount * 0.9,
      };
    })
  );

  return budgetsWithUsedAmount;
};

// Tạo ngân sách mới
Budget.createBudget = async (data) => {
  const { category_id, amount, date } = data;

  // Kiểm tra dữ liệu đầu vào
  if (!category_id || !amount || !date) {
    throw new Error("Category ID, amount, and date are required!");
  }

  // Kiểm tra xem category_id có tồn tại không
  const category = await sequelize.models.category.findByPk(category_id);
  if (!category) {
    throw new Error("Category not found!");
  }

  // Kiểm tra xem đã có ngân sách cho category_id trong tháng đó chưa
  const startDate = new Date(date);
  startDate.setDate(1); // Đầu tháng
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1); // Cuối tháng

  const existingBudget = await Budget.findOne({
    where: {
      category_id,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  if (existingBudget) {
    throw new Error("A budget for this category already exists in this month!");
  }

  // Tạo ngân sách mới
  const budget = await Budget.create({
    category_id,
    amount,
    date,
  });

  return budget;
};
// Xóa ngân sách
Budget.deleteBudget = async (id) => {
  const budget = await Budget.findByPk(id);
  if (!budget) {
    throw new Error("Budget not found!");
  }
  await budget.destroy();
  return { message: "Budget deleted successfully" };
};

module.exports = Budget;
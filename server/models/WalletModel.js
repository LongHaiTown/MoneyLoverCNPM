const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Wallet = sequelize.define(
  "wallet",
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

// Lấy tất cả ví (cho dropdown)
Wallet.getAll = async () => {
  return await Wallet.findAll({
    attributes: ["id", "name"], // Chỉ lấy id và name
  });
};

// Lấy tất cả ví kèm số dư (đã có từ trước)
Wallet.getAllWithBalance = async () => {
  const wallets = await Wallet.findAll({
    include: [
      {
        model: sequelize.models.expense,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [
          sequelize.fn("COALESCE", sequelize.fn("SUM", sequelize.col("expenses.amount")), 0),
          "balance",
        ],
      ],
    },
    group: ["wallet.id", "wallet.name"],
    raw: true,
  });
  return wallets;
};

module.exports = Wallet;
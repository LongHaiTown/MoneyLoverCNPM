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
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
      get() {
        const value = this.getDataValue("balance");
        return value === null || isNaN(value) ? 0.00 : parseFloat(value);
      },
    },
  },
  { timestamps: false }
);

// Lấy tất cả ví
Wallet.getAll = async () => {
  return await Wallet.findAll({
    attributes: ["id", "name", "balance"],
  });
};

// Tạo ví mới
Wallet.createWallet = async (data) => {
  const { name, balance } = data;

  if (!name) {
    throw new Error("Wallet name is required!");
  }

  const wallet = await Wallet.create({
    name,
    balance: isNaN(balance) ? 0.00 : parseFloat(balance) || 0.00,
  });
  return wallet.id;
};

// Xóa ví
Wallet.delete = async (id) => {
  if (!id) {
    throw new Error("Wallet ID is required!");
  }

  const wallet = await Wallet.findByPk(id);
  if (!wallet) {
    throw new Error("Wallet not found!");
  }

  await wallet.destroy();
};

// Hàm khởi tạo dữ liệu mẫu
Wallet.initializeSampleData = async () => {
  try {
    const count = await Wallet.count();
    if (count === 0) {
      const sampleWallets = [
        { name: "Ví tiền mặt", balance: 0.0 },
        { name: "Ngân hàng", balance: 0.0 },
        { name: "Ví điện tử", balance: 0.0 },
      ];

      await Wallet.bulkCreate(sampleWallets);
      console.log("✅ Dữ liệu mẫu cho Wallet đã được tạo.");
    } else {
      console.log("ℹ️ Bảng Wallet đã có dữ liệu, bỏ qua khởi tạo mẫu.");
    }
  } catch (err) {
    console.error("❌ Lỗi khi tạo dữ liệu mẫu:", err.message);
  }
};

module.exports = Wallet;
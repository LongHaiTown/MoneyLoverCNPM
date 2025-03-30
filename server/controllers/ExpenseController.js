const Expense = require("../models/ExpenseModel");
const Wallet = require("../models/WalletModel");
const sequelize = require("../config/db"); // Import sequelize từ file cấu hình

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();
// const genAI = new GoogleGenerativeAI(pAIzaSyBTl0pu_mgeRohVHdWAM_RZs6vswD80OAs);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// export const analyzeExpenses = async (req, res) => {
//   try {
//     const { user_id } = req.params;

//     // Lấy dữ liệu chi tiêu từ DB
//     const expenses = await Expense.findAll({
//       where: { user_id },
//       include: [{ model: sequelize.models.Category, attributes: ["name", "type"] }],
//       order: [["date", "ASC"]],
//     });

//     if (!expenses || expenses.length === 0) {
//       return res.status(404).json({ error: "Không có dữ liệu chi tiêu" });
//     }

//     // Chuẩn bị dữ liệu cho AI
//     const expenseData = expenses.map((expense) => ({
//       date: expense.date,
//       category: expense.Category.name,
//       amount: expense.amount,
//       description: expense.description || "",
//     }));

//     const prompt = `Phân tích chi tiêu và thu nhập của tôi và dự đoán chi tiêu trong tương lai của tôi dựa trên dự liệu này: ${JSON.stringify(expenseData)}`;

//     // Gửi yêu cầu đến Gemini AI
//     const response = await model.generateContent(prompt);
//     const analysis = await response.response.text(); // Lấy nội dung phản hồi

//     res.json({ analysis });
//   } catch (err) {
//     console.error("❌ Lỗi trong analyzeExpenses:", err);
//     res.status(500).json({ error: "Lỗi server khi phân tích chi tiêu" });
//   }
// };


exports.createExpense = async (req, res) => {
  try {
    console.log("📌 Dữ liệu nhận từ client:", req.body);
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Dữ liệu body rỗng" });
    }

    const { wallet_id, amount, category_id } = req.body;

    // Kiểm tra amount hợp lệ
    if (isNaN(amount) || amount === null) {
      return res.status(400).json({ error: "Số tiền không hợp lệ" });
    }

    // Lấy thông tin category để xác định type (income/expense)
    const category = await sequelize.models.category.findByPk(category_id);
    if (!category) {
      return res.status(400).json({ error: "Category không tồn tại" });
    }

    // Tạo expense
    const expense = await Expense.create(req.body);

    // Cập nhật balance của wallet
    const wallet = await Wallet.findByPk(wallet_id);
    if (!wallet) {
      return res.status(400).json({ error: "Wallet không tồn tại" });
    }

    const currentBalance = isNaN(wallet.balance) ? 0.00 : parseFloat(wallet.balance);
    const isIncome = category.type === "income";
    wallet.balance = isIncome
      ? currentBalance + parseFloat(amount)
      : currentBalance - parseFloat(amount);
    await wallet.save();

    res.status(201).json({ id: expense.id });
  } catch (err) {
    console.error("❌ Lỗi trong createExpense:", err);
    res.status(500).json({ error: "Lỗi server khi tạo expense" });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.getAll();
    res.json(expenses);
  } catch (err) {
    console.error("❌ Lỗi trong getAllExpenses:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.getById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense không tồn tại" });
    }

    const { wallet_id, amount, category_id } = expense;
    const category = await sequelize.models.category.findByPk(category_id);
    const wallet = await Wallet.findByPk(wallet_id);

    // Hoàn lại balance trước khi xóa
    const currentBalance = isNaN(wallet.balance) ? 0.00 : parseFloat(wallet.balance);
    const isIncome = category.type === "income";
    wallet.balance = isIncome
      ? currentBalance - parseFloat(amount)
      : currentBalance + parseFloat(amount);
    await wallet.save();

    await Expense.delete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Lỗi trong deleteExpense:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};
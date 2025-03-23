const db = require("../config/db");

class Expense {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT expenses.*, categories.name AS category_name 
      FROM expenses 
      LEFT JOIN categories ON expenses.category_id = categories.id
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      "SELECT expenses.*, categories.name AS category_name FROM expenses LEFT JOIN categories ON expenses.category_id = categories.id WHERE expenses.id = ?", 
      [id]
    );
    return rows[0];
  }

  static async create({ title, amount, date, category_id }) {
    const [result] = await db.query(
      "INSERT INTO expenses (title, amount, date, category_id) VALUES (?, ?, ?, ?)",
      [title, amount, date, category_id]
    );
    return result.insertId;
  }

  static async delete(id) {
    console.log("📌 Đang xóa expense với ID:", id); // Debug kiểm tra ID
    await db.query("DELETE FROM expenses WHERE id = ?", [id]);
  }
}

module.exports = Expense;

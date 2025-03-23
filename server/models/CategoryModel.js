const db = require("../config/db");

class Category {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM categories");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ name, type }) {
    const [result] = await db.query(
      "INSERT INTO categories (name, type) VALUES (?, ?)",
      [name, type]
    );
    return result.insertId;
  }

  static async delete(id) {
    await db.query("DELETE FROM categories WHERE id = ?", [id]);
  }
}

module.exports = Category;

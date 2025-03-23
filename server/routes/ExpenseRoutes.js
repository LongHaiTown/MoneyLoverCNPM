const express = require("express");
const router = express.Router();
const ExpenseController = require("../controllers/ExpenseController");

router.get("/", ExpenseController.getAllExpenses);
router.post("/", ExpenseController.createExpense);
router.delete("/:id", ExpenseController.deleteExpense);

module.exports = router;

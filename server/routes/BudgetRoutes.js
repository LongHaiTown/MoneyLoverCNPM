const express = require("express");
const router = express.Router();
const BudgetController = require("../controllers/BudgetController");

router.get("/", BudgetController.getAllBudgets);
router.post("/", BudgetController.createBudget);

module.exports = router;
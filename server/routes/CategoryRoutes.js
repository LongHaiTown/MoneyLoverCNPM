const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/", CategoryController.getAllCategories);
router.post("/", CategoryController.createCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;

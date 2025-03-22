// controllers/todoController.js
const Todo = require('../models/todo');

const getTodos = (req, res) => {
  const todos = Todo.getAllTodos();
  res.json(todos);
};

const createTodo = (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task là bắt buộc" });
  const newTodo = Todo.addTodo(task);
  res.status(201).json(newTodo);
};

module.exports = { getTodos, createTodo };
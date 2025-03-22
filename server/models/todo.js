// models/todo.js
let todos = [
    { id: 1, task: "Học React", completed: false },
    { id: 2, task: "Học Express", completed: true },
  ];
  
  const getAllTodos = () => todos;
  const addTodo = (task) => {
    const newTodo = { id: todos.length + 1, task, completed: false };
    todos.push(newTodo);
    return newTodo;
  };
  
  module.exports = { getAllTodos, addTodo };
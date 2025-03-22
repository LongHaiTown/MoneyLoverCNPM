import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import TransactionList from "./components/TransactionList";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Statistics from "./pages/Statistics";
import Information from "./components/Information.js";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Lấy danh sách todos từ backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy todos:", error);
      }
    };
    fetchTodos();
  }, []);

  // Component hiển thị danh sách todos (tách ra cho rõ ràng)
  const TodoList = () => (
    <div>
      <h2>Danh sách công việc</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nhập công việc mới"
      />
      <button onClick={handleAddTodo}>Thêm</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task} - {todo.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
          </li>
        ))}
      </ul>
    </div>
  );

  // Hàm thêm todo mới
  const handleAddTodo = async () => {
    if (!newTask) return;
    try {
      const response = await axios.post("http://localhost:5000/api/todos", { task: newTask });
      setTodos([...todos, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Lỗi khi thêm todo:", error);
    }
  };

  return (
    <Router>
      <Navbar />
      <Information />
      <Routes>
        <Route path="/" element={<TodoList />} /> {/* Trang chính hiển thị todos */}
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar"; 
// import TransactionList from "./components/TransactionList";
// import Budget from "./pages/Budget";
// import Transactions from "./pages/Transactions";
// import Statistics from "./pages/Statistics";
// import Information from "./components/Information.js";
// import axios from "axios";

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [newTask, setNewTask] = useState("");


//   return (
//     <Router>
//       <Navbar />
//       <Information />
//       <Routes>
//         <Route path="/transactions" element={<Transactions />} />
//         <Route path="/budget" element={<Budget />} />
//         <Route path="/statistics" element={<Statistics />} />
//         <></>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExpenseList from "./pages/ExpenseList";
import BudgetList from "./pages/BudgetList";

function App() {
  return (
    <div>
    <ExpenseList/>
    <BudgetList/>
    </div>
  );
}

export default App;

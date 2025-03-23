import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import TransactionList from "./components/TransactionList";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Statistics from "./pages/Statistics";
import Information from "./components/Information"; 
import ExpenseList from "./pages/ExpenseList";


function App() {
  return (
    <Router>
      <Navbar />
      <ExpenseList />
      <Transactions />
      <Budget />
      <Statistics />
      <Routes>
        <Route path="/Transactions" element={<Transactions />} />
        <Route path="/Budget" element={<Budget />} />
        <Route path="/Statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ExpenseList from "./pages/ExpenseList";
// import BudgetList from "./pages/BudgetList";

// function App() {
//   return (
//     <div>
//     <ExpenseList/>
//     <BudgetList/>
//     </div>
//   );
// }

// export default App;


import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Registration";
import ForgotPassword from "./ForgotPassword";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import IncomeExpenseChart from "./components/IncomeExpenseChart";
import ExpensePieChart from "./components/ExpensePieChart";
import Transactions from "./components/Transactions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <div className="dashboard">
              <Sidebar />
              <div className="main">
                <Header />
                <div className="charts">
                  <IncomeExpenseChart />
                  <ExpensePieChart />
                </div>
                <Transactions />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

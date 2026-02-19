import './App.css';
import Login from './Login';
import Register from './Registration';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import ExpensePieChart from './components/ExpensePieChart';
import Transactions from './components/Transactions';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Route */}
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

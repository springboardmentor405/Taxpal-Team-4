import "./App.css";
import Login            from "./Login";
import Register         from "./Registration";
import ForgotPassword   from "./ForgetPassword";
import VerificationCode from "./VerificationCode";
import ResetPassword    from "./ResetPassword";
import Home             from "./home";

// ── Dashboard Pages ──
import Dashboard    from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets      from "./pages/Budgets";
import TaxEstimator from "./pages/TaxEstimator";
import Reports      from "./pages/Reports";
import Settings     from "./pages/Settings";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Protected Route ──
function PrivateRoute({ children }) {
  const user = localStorage.getItem("taxpal_user");
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        {/* ── Auth Routes ── */}
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code"    element={<VerificationCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home"           element={<Home />} />

        {/* ── Dashboard Routes (Protected) ── */}
        <Route path="/"             element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
        <Route path="/budgets"      element={<PrivateRoute><Budgets /></PrivateRoute>} />
        <Route path="/tax"          element={<PrivateRoute><TaxEstimator /></PrivateRoute>} />
        <Route path="/reports"      element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/settings"     element={<PrivateRoute><Settings /></PrivateRoute>} />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
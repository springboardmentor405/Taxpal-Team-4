import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Registration";
import ForgotPassword from './ForgetPassword';
import VerificationCode from "./VerificationCode";
import ResetPassword from './ResetPassword';
import Dashboard from "./Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} />
        <Route path="/verify-code" element={<VerificationCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


import './App.css'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Registration";
import ForgotPassword from './ForgetPassword';
import VerificationCode from "./VerificationCode";
import ResetPassword from './ResetPassword';


function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} />
        <Route path="/verify-code" element={<VerificationCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App


import './App.css'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Registration";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App


import './App.css'
<<<<<<< HEAD
=======
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Registration";
>>>>>>> login-registration

function App() {
 
  return (
<<<<<<< HEAD
    <>
   
    </>
=======
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
>>>>>>> login-registration
  )
}

export default App

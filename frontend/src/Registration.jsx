import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



const [confirmPassword, setConfirmPassword] = useState("");



const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const naviate=useNavigate()




const isStrongPassword = (pwd) => {
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return strongRegex.test(pwd);
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill all fields");
    return;
  }

  if (!isStrongPassword(password)) {
    toast.error(
      "Password must be 8+ chars, include uppercase, number & special character"
    );
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match ❌");
    return;
  }

  axios.post('http://localhost:3001/register', { name, email, password })
    .then(result => {
      toast.success("Account created successfully 🎉");
      setTimeout(() => naviate('/login'), 1500);
    })
    .catch(err => {
      console.log(err);
      toast.error("Registration failed ❌");
    });
};

  return (<div
  className="d-flex"
  style={{
    position: "fixed",
    inset: 0,          // top:0 left:0 right:0 bottom:0
    width: "100vw",
    height: "100vh"
  }}
>

      {/* Left panel */}
      <div
        className="d-none d-lg-flex flex-column justify-content-center text-white p-5"
        style={{
          width: "50%",
          background: "linear-gradient(135deg,#1e3a8a,#4f46e5)"
        }}
      >
        <h1 className="fw-bold mb-3">TaxPal</h1>
        <h3 className="fw-semibold mb-3">
          Simplify your taxes. Automate your finances.
        </h3>
      </div>

      {/* Right panel */}
      <div className="flex-fill d-flex justify-content-center align-items-center bg-light">
        <div style={{ width: "380px" }} className="text-start">

          <h3 className="fw-bold mb-2">Create your account</h3>
          <p className="text-muted mb-4">
            It takes less than a minute to get started
          </p>

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-block">
                Full name
              </label>
              <input
                type="text"
                className="form-control py-2"
                placeholder="Enter your name"
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-block">
                Email address
              </label>
              <input
                type="email"
                className="form-control py-2"
                placeholder="name@company.com"
                 onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold d-block">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control py-2"
                placeholder="Enter password"
                 onChange={(e)=>setPassword(e.target.value)}
              />  
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "38px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#1e3a8a",
                  fontWeight: "500"
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold d-block">
                Confirm Password
              </label>
             <input
  type={showConfirmPassword ? "text" : "password"}
  className="form-control py-2"
  placeholder="Re-enter your password"
  onChange={(e)=>setConfirmPassword(e.target.value)}
/>
              <span
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "38px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#1e3a8a",
                  fontWeight: "500"
                }}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>

            {/* Button */}
           <button
  className="w-100 py-2 mb-3 text-white"
  style={{
    background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600"
  }}
>
  Create account
</button>
          </form>

          <p className="text-center small text-muted">
            Already registered?{" "}
            <Link to="/login" className="fw-semibold"  style={{ color: "#4f46e5", fontWeight: "600", textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>

  );
}
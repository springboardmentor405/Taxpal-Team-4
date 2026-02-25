import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);



const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate=useNavigate()

const handleSubmit=(e)=>{
  e.preventDefault();
  axios.post('http://localhost:3001/login',{email,password})
  .then(result=>{console.log(result)
    if(result.data==="success")
    {
 navigate('/home')
    }else{
      alert("Invalid credentials");
    }

})
  .catch(err=>console.log(err))
  
}




  return (
 <div
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

          <h3 className="fw-bold mb-2">Sign in to your account</h3>
          <p className="text-muted mb-4">
            Enter your credentials to access your dashboard
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email address</label>
              <input
                type="email"
                className="form-control py-2"
                placeholder="name@company.com"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold">Password</label>
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
                  color: "#555"
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-3 small">
              <div>
                <input type="checkbox" className="me-1" />
                Remember me
              </div>
              <Link
  to="/forgot-password"
  style={{
    textDecoration: "none",
    color: "#4f46e5",
    fontWeight: "500"
  }}
>
  Forgot password?
</Link>
            </div>

          <button
  className="w-100 py-2 mb-3 text-white"
  style={{
    background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600"
  }}
>
  Sign in
</button>
          </form>

          <p className="text-center small text-muted">
            Don’t have an account?{" "}
            <Link to="/register" className="fw-semibold"  style={{ color: "#4f46e5", fontWeight: "600", textDecoration: "none" }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

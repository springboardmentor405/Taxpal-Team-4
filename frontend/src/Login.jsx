import { useState } from "react";
import { Link } from "react-router-dom";



export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "24rem",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(255, 255, 255, 0.15)",
          color: "#fff",
        }}
      >
        <div className="card-body">
          <h3 className="text-center mb-4 fw-bold">Welcome Back</h3>

          {/* Email */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-pill ps-4"
              placeholder="Enter your email"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-2 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-pill ps-4"
              placeholder="Enter your password"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "15px",
                top: "38px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="text-end mb-3">
            <small style={{ cursor: "pointer" }}>
              Forgot password?
            </small>
          </div>

          {/* Button */}
          <button
            className="btn w-100 rounded-pill py-2 fw-semibold"
            style={{
              background: "#fff",
              color: "#764ba2",
              transition: "0.3s",
            }}
          >
            Login
          </button>

         <p className="text-center mt-3 mb-0 small">
  Don’t have an account?{" "}
  <Link
    to="/register"
    style={{ textDecoration: "none", fontWeight: "600", color: "#fff" }}
  >
    Sign up
  </Link>
</p>
        </div>
      </div>
    </div>
  );
}

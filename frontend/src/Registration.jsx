import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
          width: "25rem",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(255, 255, 255, 0.15)",
          color: "#fff",
        }}
      >
        <div className="card-body">
          <h3 className="text-center mb-4 fw-bold">Create Account </h3>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Enter your name"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-pill"
              placeholder="Enter password"
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

          {/* Confirm Password */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              className="form-control rounded-pill"
              placeholder="Confirm password"
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
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "Hide" : "Show"}
            </span>
          </div>

          {/* Register Button */}
          <button
            className="btn w-100 rounded-pill py-2 fw-semibold"
            style={{
              background: "#fff",
              color: "#764ba2",
              transition: "0.3s",
            }}
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center mt-3 mb-0 small">
            Already have an account?{" "}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

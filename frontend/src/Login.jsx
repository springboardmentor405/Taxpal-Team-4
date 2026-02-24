import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="d-flex vh-100">
      {/* Left panel */}
      <div
        className="d-none d-lg-flex flex-column justify-content-center text-white p-5"
        style={{
          width: "50%",
          background: "linear-gradient(135deg,#1e3a8a,#4f46e5)"
        }}
      >
        <h2 className="fw-bold mb-3">TaxPal</h2>
        <h3 className="fw-semibold mb-3">
          Simplify your taxes. Automate your finances.
        </h3>
      </div>

      {/* Right panel */}
      <div className="flex-fill d-flex justify-content-center align-items-center bg-light">
        <div style={{ width: "380px", textAlign: "left" }}>

          <h3 className="fw-bold mb-2">Sign in to your account</h3>
          <p className="text-muted mb-4">
            Enter your credentials to access your dashboard
          </p>

          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email address</label>
              <input
                type="email"
                className="form-control py-2"
                placeholder="name@company.com"
              />
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control py-2"
                placeholder="Enter password"
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

              <Link to="/forgot-password" className="text-decoration-none">
                Forgot password?
              </Link>
            </div>

            {/* 🔥 Custom Gradient Button */}
            <button
              type="submit"
              className="w-100 py-2 mb-3 text-white border-0"
              style={{
                borderRadius: "8px",
                background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                cursor: "pointer",
                transition: "0.3s ease"
              }}
              onMouseOver={(e) =>
                (e.target.style.opacity = "0.9")
              }
              onMouseOut={(e) =>
                (e.target.style.opacity = "1")
              }
            >
              Sign in
            </button>
          </form>

          <p className="small text-muted" style={{ textAlign: "left" }}>
            Don’t have an account?{" "}
            <Link to="/register" className="fw-semibold">
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
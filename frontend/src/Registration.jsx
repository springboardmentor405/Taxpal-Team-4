import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <h2 className="fw-bold mb-3">TaxPal</h2>
        <h3 className="fw-semibold mb-3">
          Start managing your finances smarter today
        </h3>
      </div>

      {/* Right panel */}
      <div className="flex-fill d-flex justify-content-center align-items-center bg-light">
        <div style={{ width: "380px" }}>

          <h3 className="fw-bold mb-2">Create your account</h3>
          <p className="text-muted mb-4">
            It takes less than a minute to get started
          </p>

          <form>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-block">
                Full name
              </label>
              <input
                type="text"
                className="form-control py-2"
                placeholder="Enter your name"
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

            <button className="btn btn-primary w-100 py-2 mb-3">
              Create account
            </button>
          </form>

          <p className="small text-muted" style={{ textAlign: "left" }}>
            Already registered?{" "}
            <Link to="/" className="fw-semibold"  style={{ color: "#4f46e5", fontWeight: "600", textDecoration: "none" }}>
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
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
          Start managing your finances smarter today
        </h3>
        {/* <p style={{ maxWidth: "420px", opacity: 0.9 }}>
          Create your account to generate invoices, track taxes,
          and gain financial insights in minutes.
        </p> */}
      </div>

      {/* Right panel */}
      <div className="flex-fill d-flex justify-content-center align-items-center bg-light">
        <div style={{ width: "380px" }}>

          <h3 className="fw-bold mb-2">Create your account</h3>
          <p className="text-muted mb-4">
            It takes less than a minute to get started
          </p>

          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full name</label>
              <input
                type="text"
                className="form-control py-2"
                placeholder="Enter your name"
              />
            </div>

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
                placeholder="Create a strong password"
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

            <button
  className="w-100 py-2 mb-3 text-white border-0"
  style={{
    background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
    cursor: "pointer",
  }}
>
  Sign in
  </button>
          </form>

          <p className="text-center small text-muted">
            Already registered?{" "}
            <Link to="/" className="fw-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

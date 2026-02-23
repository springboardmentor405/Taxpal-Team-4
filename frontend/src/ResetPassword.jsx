import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

      {/* Left Panel */}
      <div
        className="d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5"
        style={{
          width: "50%",
          background: "linear-gradient(135deg,#1e3a8a,#4f46e5)"
        }}
      >
        <h1 className="fw-bold mb-3">TaxPal</h1>
        <h5 className="fw-semibold text-center">
          Secure password reset
        </h5>
      </div>

      {/* Right Panel */}
      <div
        className="flex-fill d-flex justify-content-center align-items-center"
       
      >
        <div
          className="p-4"
          style={{
            width: "380px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
          }}
        >
          <h4 className="fw-bold text-center mb-3">
            Reset Password
          </h4>

          <p className="text-muted text-center mb-4" style={{ fontSize: "14px" }}>
            Create a new secure password for your account.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/");
            }} className="text-start"
          >
            {/* New Password */}
            <div className="mb-3 position-relative" >
              <label className="form-label fw-semibold" >
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control py-2"
                placeholder="Enter new password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "38px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#4f46e5"
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="mb-3 position-relative">
              <label className="form-label fw-semibold">
                Confirm Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                className="form-control py-2"
                placeholder="Confirm new password"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "38px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#4f46e5"
                }}
              >
                {showConfirm ? "Hide" : "Show"}
              </span>
            </div>

            <button
              type="submit"
              className="w-100 py-2 mb-3 text-white"
              style={{
                background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600"
              }}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
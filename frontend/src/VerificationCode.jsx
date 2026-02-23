import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VerificationCode() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate(); // ✅ Added

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // ✅ Added verify handler
  const handleVerify = () => {
    navigate("/reset-password");
  };

  return (
    <div
      className="d-flex"
      style={{
        position: "fixed",
        inset: 0,
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
          Secure verification process
        </h5>
      </div>

      {/* Right Panel */}
      <div className="flex-fill d-flex justify-content-center align-items-center">
        <div
          className="p-4 text-center"
          style={{
            width: "380px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
          }}
        >
          <h4 className="fw-bold mb-3">Verify Code</h4>
          <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
            Enter the 4-digit code sent to your email
          </p>

          <div className="d-flex justify-content-between mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className="form-control text-center"
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "20px",
                  borderRadius: "8px"
                }}
              />
            ))}
          </div>

          {/* ✅ Navigation Added Here */}
          <button
            onClick={handleVerify}
            className="w-100 py-2 mb-3 text-white"
            style={{
              background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600"
            }}
          >
            Verify
          </button>

          <p className="small text-muted">
            Didn’t receive the code?{" "}
            <span style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "500" }}>
              Resend
            </span>
          </p>

          <Link
            to="/"
            style={{ fontSize: "13px", textDecoration: "none", color: "#4f46e5" }}
          >
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join("").length !== 4) return;

    console.log("OTP Verified:", otp.join(""));
    navigate("/reset-password");
  };

  return (
    <>
      <div className="verify-container">

        {/* LEFT PANEL */}
        <div className="verify-left">
          <div className="branding">
            <h2>TaxPal</h2>
            <h3>Simplify your taxes. Automate your finances.</h3>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="verify-right">
          <div className="verify-card">

            <h3>Verify Code</h3>
            <p className="subtitle">
              Enter the 4-digit code sent to your email
            </p>

            <form onSubmit={handleSubmit}>
              <div className="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) =>
                      handleChange(e.target.value, index)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, index)
                    }
                  />
                ))}
              </div>

              <button
                type="submit"
                className="primary-btn"
                disabled={otp.join("").length !== 4}
              >
                Verify
              </button>
            </form>

            <p className="resend">
              Didn’t receive a code? <span>Resend</span>
            </p>

            <Link to="/" className="back-link">
              Back to sign in
            </Link>

          </div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Inter", sans-serif;
        }

        .verify-container {
          display: flex;
          height: 100vh;
        }

        /* LEFT PANEL */
        .verify-left {
          flex: 1;
          background: linear-gradient(135deg,#1e3a8a,#4f46e5);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
          text-align: left;
        }

        .branding {
          max-width: 400px;
        }

        .branding h2 {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .branding h3 {
          font-size: 22px;
          font-weight: 500;
        }

        /* RIGHT PANEL */
        .verify-right {
          flex: 1;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .verify-card {
          background: white;
          padding: 40px;
          width: 380px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          text-align: left;
        }

        .verify-card h3 {
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 25px;
        }

        .otp-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        .otp-container input {
          width: 60px;
          height: 55px;
          font-size: 22px;
          text-align: center;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          outline: none;
          transition: 0.2s ease;
        }

        .otp-container input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
        }

        .primary-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg,#1e3a8a,#4f46e5);
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: 0.3s ease;
          margin-bottom: 20px;
          opacity: ${
            otp.join("").length === 4 ? "1" : "0.6"
          };
        }

        .primary-btn:hover {
          opacity: 0.9;
        }

        .primary-btn:disabled {
          cursor: not-allowed;
        }

        .resend {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 10px;
        }

        .resend span {
          color: #2563eb;
          cursor: pointer;
          font-weight: 500;
        }

        .back-link {
          font-size: 14px;
          text-decoration: none;
          color: #2563eb;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .verify-left {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
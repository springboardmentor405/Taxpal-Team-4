import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) return;

    console.log("Reset email sent to:", email);
    navigate("/verify");
  };

  const isEnabled = isValidEmail(email);

  return (
    <>
      <div className="forgot-container">

        {/* LEFT PANEL */}
        <div className="forgot-left">
          <div className="branding">
            <h2>TaxPal</h2>
            <h3>Simplify your taxes. Automate your finances.</h3>
            <p>
              A modern platform to manage invoices, tax reports, and financial
              insights — built for professionals and businesses.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="forgot-right">
          <div className="forgot-card">

            <h3>Forgot password?</h3>
            <p className="subtitle">
              Don’t worry! It happens. Please enter the email associated with your account.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="primary-btn"
                disabled={!isEnabled}
              >
                Send Code
              </button>
            </form>

            <p className="bottom-text">
              Remember your password?{" "}
              <Link to="/">Sign in</Link>
            </p>

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

        .forgot-container {
          display: flex;
          height: 100vh;
        }

        /* LEFT PANEL */
        .forgot-left {
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
          max-width: 420px;
        }

        .branding h2 {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .branding h3 {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 18px;
        }

        .branding p {
          font-size: 15px;
          opacity: 0.9;
          line-height: 1.6;
        }

        /* RIGHT PANEL */
        .forgot-right {
          flex: 1;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .forgot-card {
          background: white;
          padding: 40px;
          width: 380px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          text-align: left;
        }

        .forgot-card h3 {
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        label {
          font-size: 14px;
          margin-bottom: 6px;
          font-weight: 500;
        }

        input {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          outline: none;
          font-size: 14px;
          transition: 0.2s ease;
        }

        input:focus {
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
          opacity: ${isEnabled ? "1" : "0.6"};
        }

        .primary-btn:hover {
          opacity: 0.9;
        }

        .primary-btn:disabled {
          cursor: not-allowed;
        }

        .bottom-text {
          margin-top: 20px;
          font-size: 14px;
          color: #6b7280;
        }

        .bottom-text a {
          color: #2563eb;
          font-weight: 500;
          text-decoration: none;
        }

        .bottom-text a:hover {
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .forgot-left {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
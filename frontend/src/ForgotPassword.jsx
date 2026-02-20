import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigation

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) return;

    console.log("Reset email sent to:", email);

    // ✅ Redirect to verify page
    navigate("/verify");
  };

  return (
    <>
      <div className="forgot-container">
        {/* LEFT SIDE */}
        <div className="forgot-left">
          <div className="branding">
            <h1>TaxPal</h1>
            <h2>Simplify your taxes. Automate your finances.</h2>
            <p>
              A modern platform to manage invoices, tax reports, and financial
              insights — built for professionals and businesses.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="forgot-right">
          <div className="forgot-card">
            <h2>Forgot password?</h2>
            <p className="subtitle">
              Don’t worry! It happens. Please enter the email associated with
              your account.
            </p>

            <form onSubmit={handleSubmit}>
              <label>Email address</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit" disabled={!isValidEmail(email)}>
                Send code
              </button>
            </form>

            <p className="login-link">
              Remember your password?{" "}
              <Link to="/" className="signin-link">
                Sign in
              </Link>
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
          width: 100%;
        }

        .forgot-left {
          flex: 1;
          background: linear-gradient(135deg, #1e3a8a, #4f46e5);
          color: white;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 60px 80px;
          text-align: left;
        }

        .branding {
          max-width: 420px;
        }

        .branding h1 {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .branding h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 18px;
        }

        .branding p {
          font-size: 15px;
          opacity: 0.9;
          line-height: 1.6;
        }

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
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          text-align: left;
        }

        .forgot-card h2 {
          margin-bottom: 10px;
          font-size: 24px;
          font-weight: 600;
        }

        .subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        form {
          display: flex;
          flex-direction: column;
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
          margin-bottom: 20px;
          font-size: 14px;
          outline: none;
          transition: 0.2s ease;
        }

        input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        button {
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: ${
            isValidEmail(email) ? "#2563eb" : "#cbd5e1"
          };
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: ${
            isValidEmail(email) ? "pointer" : "not-allowed"
          };
          transition: 0.3s ease;
        }

        button:hover {
          background: ${
            isValidEmail(email) ? "#1d4ed8" : "#cbd5e1"
          };
        }

        .login-link {
          font-size: 14px;
          margin-top: 20px;
          color: #6b7280;
        }

        .signin-link {
          color: #2563eb;
          font-weight: 500;
          text-decoration: none;
        }

        .signin-link:hover {
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
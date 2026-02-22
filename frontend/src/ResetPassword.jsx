import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="auth-container">

        {/* LEFT PANEL */}
        <div className="auth-left">
          <div className="branding">
            <h2>TaxPal</h2>
            <h3>Start managing your finances smarter today</h3>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">
          <div className="auth-card">

            <h3>Create your account</h3>
            <p className="subtitle">
              It takes less than a minute to get started
            </p>

            <form>
              <div className="form-group">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                />
              </div>

              <div className="form-group password-group">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <button type="submit" className="primary-btn">
                Sign up
              </button>
            </form>

            <p className="bottom-text">
              Already registered?{" "}
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

        .auth-container {
          display: flex;
          height: 100vh;
        }

        /* LEFT PANEL */
        .auth-left {
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
        .auth-right {
          flex: 1;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-card {
          background: white;
          padding: 40px;
          width: 380px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          text-align: left;
        }

        .auth-card h3 {
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 18px;
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
          outline: none;
          font-size: 14px;
          transition: 0.2s ease;
        }

        input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
        }

        .password-group {
          position: relative;
        }

        .toggle {
          position: absolute;
          right: 12px;
          top: 38px;
          cursor: pointer;
          font-size: 13px;
          color: #555;
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
          margin-top: 10px;
        }

        .primary-btn:hover {
          opacity: 0.9;
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
          .auth-left {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
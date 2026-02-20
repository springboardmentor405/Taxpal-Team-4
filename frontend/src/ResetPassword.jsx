import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const navigate = useNavigate();

  const isValid =
    password.length >= 6 && password === confirm;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("Password reset successful");

    // 🔥 After reset go to login
    navigate("/");
  };

  return (
    <>
      <div className="reset-container">
        {/* LEFT SIDE */}
        <div className="reset-left">
          <div>
            <h1>TaxPal</h1>
            <h2>Simplify your taxes. Automate your finances.</h2>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="reset-right">
          <div className="reset-card">
            <h2>Reset password</h2>
            <p className="subtitle">
              The password should have at least 6 characters
            </p>

            <form onSubmit={handleSubmit}>
              <label>New password</label>
              <div className="input-group">
                <input
                  type={show1 ? "text" : "password"}
                  placeholder="Create new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
                <span onClick={() => setShow1(!show1)}>
                  {show1 ? "Hide" : "Show"}
                </span>
              </div>

              <label>Confirm password</label>
              <div className="input-group">
                <input
                  type={show2 ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirm}
                  onChange={(e) =>
                    setConfirm(e.target.value)
                  }
                />
                <span onClick={() => setShow2(!show2)}>
                  {show2 ? "Hide" : "Show"}
                </span>
              </div>

              <button type="submit" disabled={!isValid}>
                Reset password
              </button>
            </form>

            <Link to="/" className="back">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;font-family:Inter,sans-serif}

        .reset-container{display:flex;height:100vh}

        .reset-left{
          flex:1;
          background:linear-gradient(135deg,#1e3a8a,#4f46e5);
          color:white;
          display:flex;
          align-items:center;
          justify-content:center;
          text-align:center;
        }

        .reset-left h1{font-size:42px;margin-bottom:20px}
        .reset-left h2{font-weight:500;font-size:20px}

        .reset-right{
          flex:1;
          background:#f9fafb;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .reset-card{
          background:white;
          padding:40px;
          width:380px;
          border-radius:12px;
          box-shadow:0 10px 25px rgba(0,0,0,0.05);
        }

        .reset-card h2{margin-bottom:8px}
        .subtitle{
          font-size:14px;
          color:#6b7280;
          margin-bottom:25px;
        }

        label{
          font-size:14px;
          margin-bottom:6px;
          display:block;
        }

        .input-group{
          position:relative;
          margin-bottom:20px;
        }

        .input-group input{
          width:100%;
          padding:12px;
          border-radius:8px;
          border:1px solid #d1d5db;
          outline:none;
        }

        .input-group span{
          position:absolute;
          right:12px;
          top:12px;
          cursor:pointer;
          font-size:13px;
          color:#555;
        }

        button{
          width:100%;
          padding:12px;
          border:none;
          border-radius:8px;
          background:${
            isValid ? "#2563eb" : "#cbd5e1"
          };
          color:white;
          cursor:${
            isValid ? "pointer" : "not-allowed"
          };
          margin-bottom:15px;
        }

        .back{
          font-size:14px;
          text-decoration:none;
          color:#2563eb;
        }

        @media(max-width:900px){
          .reset-left{display:none}
        }
      `}</style>
    </>
  );
}
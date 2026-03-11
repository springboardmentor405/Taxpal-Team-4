import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/forgot-password", {
        email,
      });

      if (res.data.Status === "OTP Sent") {
        localStorage.setItem("resetEmail", email);
        navigate("/verify-code");
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div
      className="d-flex"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}
    >
      <div
        className="d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5"
        style={{
          width: "50%",
          background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
        }}
      >
        <h1 className="fw-bold mb-3">TaxPal</h1>
        <h3 className="fw-semibold mb-3">
          Simplify your taxes. Automate your finances.
        </h3>
      </div>

      <div className="flex-fill d-flex justify-content-center align-items-center">
        <div
          className="p-4"
          style={{
            width: "380px",
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <h4 className="fw-bold text-center mb-3">Forgot Password?</h4>
          <p
            className="text-muted text-center mb-4"
            style={{ fontSize: "14px" }}
          >
            Don’t worry! Enter your email to receive OTP.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Email address</label>
              <input
                type="email"
                className="form-control py-2"
                placeholder="name@company.com"
                style={{ borderRadius: "8px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-100 py-2 mb-3 text-white"
              style={{
                background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                opacity: loading ? "0.7" : "1",
              }}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>

          <p className="text-center small text-muted">
            Remembered your password?{" "}
            <Link
              to="/"
              style={{
                color: "#4f46e5",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/reset-password", {
        email,
        password,
      });

      if (res.data === "Password updated") {
        toast.success("Password updated successfully");

        localStorage.removeItem("resetEmail");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="d-flex"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}
    >
      {/* LEFT PANEL */}
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

      {/* RIGHT PANEL */}
      <div
        className="flex-fill d-flex justify-content-center align-items-center"
        style={{ background: "#ffffff" }}
      >
        <div
          className="p-4"
          style={{
            width: "380px",
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <h4 className="fw-bold text-center mb-3">Reset Password</h4>

          <p
            className="text-muted text-center mb-4"
            style={{ fontSize: "14px" }}
          >
            Create a new secure password for your account
          </p>

          <form onSubmit={handleSubmit}>
            {/* Password */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">New Password</label>

              <div style={{ position: "relative " }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control py-2"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: "60px" }}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "13px",
                    cursor: "pointer",
                    color: "#4f46e5",
                    fontWeight: "500",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Confirm Password</label>

              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control py-2"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingRight: "60px" }}
                />

                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "13px",
                    cursor: "pointer",
                    color: "#4f46e5",
                    fontWeight: "500",
                  }}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-100 py-2 text-white"
              style={{
                background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
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

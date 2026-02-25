import { Link, useNavigate } from "react-router-dom";
export default function ForgotPassword() {
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

       <h3 className="fw-semibold mb-3">
          Simplify your taxes. Automate your finances.
        </h3>

    
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
            Forgot Password?
          </h4>

          <p className="text-muted text-center mb-4" style={{ fontSize: "14px" }}>
            Don’t worry! It happens. Please enter the email associated with your account.
          </p>
<form
  onSubmit={(e) => {
    e.preventDefault();
    navigate("/verify-code");
  }}
>
  <div className="mb-3 text-start">
    <label className="form-label fw-semibold">
      Email address
    </label>
    <input
      type="email"
      className="form-control py-2"
      placeholder="name@company.com"
      style={{ borderRadius: "8px" }}
    />
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
    Send Code
  </button>
</form>

          <p className="text-center small text-muted">
            Remembered your password?{" "}
            <Link to="/" style={{ color: "#4f46e5", fontWeight: "600", textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
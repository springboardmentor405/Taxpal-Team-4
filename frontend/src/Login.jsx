export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ width: "22rem", borderRadius: "15px" }}
      >
        <div className="card-body">
          <h4 className="text-center mb-4 fw-bold">Welcome Back</h4>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-end mb-3">
            <small className="text-muted">Forgot password?</small>
          </div>

          <button className="btn btn-dark w-100 rounded-pill py-2">
            Login
          </button>

          <p className="text-center mt-3 mb-0 text-muted small">
            Don’t have an account? <span className="fw-semibold">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

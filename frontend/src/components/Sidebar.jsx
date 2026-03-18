import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaWallet,
  FaCalculator,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const navItems = [
  { path: "/", icon: <FaTachometerAlt />, label: "Dashboard" },
  { path: "/transactions", icon: <FaExchangeAlt />, label: "Transactions" },
  { path: "/budgets", icon: <FaWallet />, label: "Budgets" },
  { path: "/tax", icon: <FaCalculator />, label: "Tax Estimator" },
  { path: "/reports", icon: <FaChartBar />, label: "Reports" },
  { path: "/settings", icon: <FaCog />, label: "Settings" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("taxpal_user");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: 240,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1e3a8a 0%, #2d4eaa 100%)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 24px 20px",
          color: "white",
          fontWeight: 700,
          fontSize: 22,
          borderBottom: "1px solid rgba(255,255,255,.1)",
        }}
      >
        TaxPal
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 31px",
                color: active ? "white" : "rgba(255,255,255,.7)",
                textDecoration: "none",
                background: active ? "rgba(255,255,255,.18)" : "transparent",
                borderRadius: active ? "0 24px 24px 0" : 0,
                marginRight: active ? 16 : 0,
                fontWeight: active ? 600 : 400,
                fontSize: 15,
                transition: "all .2s",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid rgba(255,255,255,.1)",
        }}
      >
        <button
          onClick={logout}
          style={{
            background: "rgba(255,255,255,.1)",
            border: "1px solid rgba(255,255,255,.2)",
            color: "white",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 13,
            cursor: "pointer",
            width: "100%",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { MdEdit } from "react-icons/md";

const allCategories = [
  "Groceries",
  "Bills",
  "Internet",
  "Food",
  "Salary",
  "Freelance",
  "Shopping",
  "Utilities",
  "Rent",
  "Transport",
  "Marketing",
  "Business",
];

export default function Settings() {
  const [tab, setTab] = useState("Profile");

  const user = JSON.parse(localStorage.getItem("taxpal_user") || "{}");

  const [selectedCats, setSelectedCats] = useState(
    JSON.parse(localStorage.getItem("taxpal_categories") || "[]"),
  );
  const [notifications, setNotifications] = useState(
    JSON.parse(
      localStorage.getItem("taxpal_notifications") ||
        '{"email":true,"app":true,"marketing":true}',
    ),
  );
  const [twoFA, setTwoFA] = useState(
    JSON.parse(localStorage.getItem("taxpal_2fa") || "false"),
  );

  const toggleCat = (cat) => {
    const updated = selectedCats.includes(cat)
      ? selectedCats.filter((c) => c !== cat)
      : [...selectedCats, cat];
    setSelectedCats(updated);
    localStorage.setItem("taxpal_categories", JSON.stringify(updated));
  };

  const toggleNotif = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem("taxpal_notifications", JSON.stringify(updated));
  };

  const tabs = ["Profile", "Category", "Notifications", "Security"];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: 240,
          width: "calc(100% - 240px)",
          padding: "0px 0px",
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        <h4 style={{ fontWeight: 700, fontSize: 24, marginBottom: 4 }}>
          Settings
        </h4>
        <p style={{ color: "#6b7280", marginBottom: 24 }}>
          Manage profile, category, notifications and security
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}
        >
          {/* Tab List */}
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: 12,
              boxShadow: "0 2px 10px rgba(0,0,0,.06)",
              height: "fit-content",
            }}
          >
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "11px 16px",
                  borderRadius: 8,
                  marginBottom: 4,
                  border: "none",
                  cursor: "pointer",
                  background:
                    tab === t
                      ? "linear-gradient(135deg,#1e3a8a,#4f46e5)"
                      : "transparent",
                  color: tab === t ? "white" : "#374151",
                  fontWeight: tab === t ? 600 : 400,
                  fontSize: 14,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: 28,
              boxShadow: "0 2px 10px rgba(0,0,0,.06)",
            }}
          >
            {/* PROFILE */}
            {tab === "Profile" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 24,
                      }}
                    >
                      {(user.name || user.fullName || "U")[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>
                        {user.name || user.fullName || "User"}
                      </div>
                      <div style={{ color: "#6b7280", fontSize: 14 }}>
                        {user.email || "No email available"}
                      </div>
                      <div
                        style={{ color: "#9ca3af", fontSize: 12, marginTop: 4 }}
                      >
                        Profile is view-only here (edit on registration or
                        profile page).
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 18, cursor: "pointer" }}>
                    <MdEdit style={{ fontSize: 18, cursor: "pointer" }} />
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 20,
                    padding: "12px 16px",
                    background: "#f8fafc",
                    borderRadius: 8,
                  }}
                >
                  <button
                    style={{
                      background: "none",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    📷 Change
                  </button>
                </div>
              </div>
            )}

            {/* CATEGORY */}
            {tab === "Category" && (
              <div>
                <h6 style={{ fontWeight: 700, marginBottom: 8 }}>
                  Select categories you commonly used
                </h6>
                <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 20 }}>
                  Selected categories are saved locally and used across the app
                  UI.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCat(cat)}
                      style={{
                        padding: "7px 16px",
                        borderRadius: 20,
                        border: "1.5px solid",
                        borderColor: selectedCats.includes(cat)
                          ? "#4f46e5"
                          : "#e2e8f0",
                        background: selectedCats.includes(cat)
                          ? "#ede9fe"
                          : "white",
                        color: selectedCats.includes(cat)
                          ? "#4f46e5"
                          : "#374151",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all .2s",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {tab === "Notifications" && (
              <div>
                <h6 style={{ fontWeight: 700, marginBottom: 4 }}>
                  Notifications settings
                </h6>
                <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 20 }}>
                  These toggles are saved locally only.
                </p>
                {[
                  { key: "email", label: "Email notification" },
                  { key: "app", label: "App Alerts" },
                  { key: "marketing", label: "Marketing message" },
                ].map((n) => (
                  <div
                    key={n.key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 16px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 10,
                      marginBottom: 12,
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{n.label}</span>
                    <div
                      onClick={() => toggleNotif(n.key)}
                      style={{
                        width: 44,
                        height: 24,
                        borderRadius: 12,
                        cursor: "pointer",
                        background: notifications[n.key]
                          ? "#1e3a8a"
                          : "#e2e8f0",
                        position: "relative",
                        transition: "background .2s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          left: notifications[n.key] ? 22 : 2,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "white",
                          transition: "left .2s",
                          boxShadow: "0 1px 4px rgba(0,0,0,.2)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SECURITY */}
            {tab === "Security" && (
              <div>
                <h6 style={{ fontWeight: 700, marginBottom: 4 }}>Security</h6>
                <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 20 }}>
                  Control basic security options for your account (local-only
                  UI).
                </p>

                {/* 2FA */}
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700 }}>
                        Two factor Authentication
                      </div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>
                        Toggle to enable/disable a mock 2FA (local only)
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setTwoFA(!twoFA);
                        localStorage.setItem(
                          "taxpal_2fa",
                          JSON.stringify(!twoFA),
                        );
                      }}
                      style={{
                        width: 44,
                        height: 24,
                        borderRadius: 12,
                        cursor: "pointer",
                        background: twoFA ? "#1e3a8a" : "#e2e8f0",
                        position: "relative",
                        transition: "background .2s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          left: twoFA ? 22 : 2,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "white",
                          transition: "left .2s",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    Change password
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#4f46e5", marginBottom: 16 }}
                  >
                    Password change requires backend - placeholder UI below.
                  </div>
                  <input
                    placeholder="New password"
                    type="password"
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      marginBottom: 10,
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                  <input
                    placeholder="Confirm password"
                    type="password"
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>

                {/* Logged in device */}
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 10,
                    padding: 20,
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    Logged in device
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}
                  >
                    Manage device that have access to your account (local mock)
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        Android chrome (old device)
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>
                        05/12/2025
                      </div>
                    </div>
                    <span
                      style={{
                        background: "#e2e8f0",
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      Current
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

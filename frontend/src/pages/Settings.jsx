import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { MdEdit } from "react-icons/md";
import {
  getProfile,
  updateProfile,
  updateCategories,
  updateNotifications,
  update2FA,
  changePassword,
} from "../api/api";

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

// ✅ Component starts here — ALL useState must be INSIDE this function
export default function Settings() {
  // ✅ All states here at top level

  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem("profile_photo") || "",
  );

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result); // set state
      localStorage.setItem("profile_photo", reader.result); // save to localStorage
    };
    reader.readAsDataURL(file); // convert to base64
  };

  const [tab, setTab] = useState("Profile");
  const [user, setUser] = useState({});
  const [selectedCats, setSelectedCats] = useState([]);
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    marketing: true,
  });
  const [twoFA, setTwoFA] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveMsg, setSaveMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMsg, setEditMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passMsg, setPassMsg] = useState("");

  // ✅ useEffect here
  const load = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      const u = res.data.data;
      setUser(u);
      setSelectedCats(u.categories || []);
      setNotifications(
        u.notifications || { email: true, app: true, marketing: true },
      );
      setTwoFA(u.twoFA || false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ── Save Categories ──
  const saveCategories = async (updated) => {
    try {
      await updateCategories({ categories: updated });
      setSaveMsg("✅ Categories saved!");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCat = (cat) => {
    const updated = selectedCats.includes(cat)
      ? selectedCats.filter((c) => c !== cat)
      : [...selectedCats, cat];
    setSelectedCats(updated);
    saveCategories(updated);
  };

  // ── Save Notifications ──
  const toggleNotif = async (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    try {
      await updateNotifications({ notifications: updated });
      setSaveMsg("✅ Notifications saved!");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Save 2FA ──
  const toggle2FA = async () => {
    const updated = !twoFA;
    setTwoFA(updated);
    try {
      await update2FA({ twoFA: updated });
      setSaveMsg(`✅ 2FA ${updated ? "enabled" : "disabled"}!`);
      setTimeout(() => setSaveMsg(""), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Change Password ──
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassMsg("");

    if (newPassword !== confirmPassword) {
      setPassMsg("❌ Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setPassMsg("❌ Minimum 6 characters required");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setPassMsg("✅ Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPassMsg("❌ " + (err.response?.data?.message || "Failed to update"));
    }
  };

  const tabs = ["Profile", "Category", "Notifications", "Security"];

  // Toggle switch component
  const Toggle = ({ value, onToggle }) => (
    <div
      onClick={onToggle}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        cursor: "pointer",
        background: value ? "#1e3a8a" : "#e2e8f0",
        position: "relative",
        transition: "background .2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: value ? 22 : 2,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "white",
          transition: "left .2s",
          boxShadow: "0 1px 4px rgba(0,0,0,.2)",
        }}
      />
    </div>
  );

  if (loading)
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div
          style={{
            marginLeft: 240,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "#9ca3af" }}>Loading settings...</p>
        </div>
      </div>
    );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: 240,
          width: "calc(100% - 240px)",
          padding: "8px 10px",
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        <h4 style={{ fontWeight: 700, fontSize: 20, marginBottom: 0 }}>
          Settings
        </h4>
        <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 8 }}>
          Manage profile, category, notifications and security
        </p>

        {/* Save Message */}
        {saveMsg && (
          <div
            style={{
              background: "#dcfce7",
              border: "1px solid #86efac",
              borderRadius: 8,
              padding: "6px 12px",
              color: "#16a34a",
              fontSize: 13,
              marginBottom: 8,
            }}
          >
            {saveMsg}
          </div>
        )}

        <div
          style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 10 }}
        >
          {/* Tab List */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 6,
              boxShadow: "0 2px 8px rgba(0,0,0,.06)",
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
                  padding: "8px 12px",
                  borderRadius: 8,
                  marginBottom: 2,
                  border: "none",
                  cursor: "pointer",
                  background:
                    tab === t
                      ? "linear-gradient(135deg,#1e3a8a,#4f46e5)"
                      : "transparent",
                  color: tab === t ? "white" : "#374151",
                  fontWeight: tab === t ? 600 : 400,
                  fontSize: 13,
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
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            }}
          >
            {/* ── PROFILE ── */}
            {/* ── PROFILE ── */}
            {tab === "Profile" && (
              <div>
                {/* Avatar + Name Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    {/* Avatar Circle */}
                    {/* Avatar Circle */}
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
                        fontSize: 26,
                        flexShrink: 0,
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        document.getElementById("avatarInput").click()
                      }
                    >
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="Avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        (user.name || "U")[0].toUpperCase()
                      )}
                    </div>
                    <input
                      type="file"
                      id="avatarInput"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfilePhoto(reader.result); // update local avatar
                          localStorage.setItem("profile_photo", reader.result); // persist locally
                        };
                        reader.readAsDataURL(file);
                      }}
                      style={{ display: "none" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>
                        {user.name || "User"}
                      </div>
                      <div style={{ color: "#6b7280", fontSize: 13 }}>
                        {user.email || "No email"}
                      </div>
                      <div
                        style={{ color: "#9ca3af", fontSize: 11, marginTop: 2 }}
                      >
                        Member since{" "}
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("en-IN")
                          : "—"}
                      </div>
                    </div>
                  </div>

                  {/* Edit Button */}
                  {!editMode && (
                    <button
                      onClick={() => {
                        setEditName(user.name || "");
                        setEditEmail(user.email || "");
                        setEditMsg("");
                        setEditMode(true);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#ede9fe",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 14px",
                        cursor: "pointer",
                        color: "#4f46e5",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      <MdEdit size={16} /> Edit Profile
                    </button>
                  )}
                </div>

                {/* ── Edit Form ── */}
                {editMode ? (
                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: 12,
                      padding: 16,
                      border: "1.5px solid #e2e8f0",
                    }}
                  >
                    <h6
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 14,
                      }}
                    >
                      Edit Profile
                    </h6>

                    {/* Message */}
                    {editMsg && (
                      <div
                        style={{
                          padding: "6px 10px",
                          borderRadius: 6,
                          marginBottom: 12,
                          fontSize: 12,
                          background: editMsg.includes("✅")
                            ? "#dcfce7"
                            : "#fee2e2",
                          color: editMsg.includes("✅") ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {editMsg}
                      </div>
                    )}

                    {/* Name */}
                    <div style={{ marginBottom: 12 }}>
                      <label
                        style={{
                          display: "block",
                          fontWeight: 600,
                          fontSize: 12,
                          marginBottom: 4,
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Enter your name"
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          border: "1.5px solid #e2e8f0",
                          borderRadius: 8,
                          fontSize: 13,
                          outline: "none",
                          background: "white",
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: 16 }}>
                      <label
                        style={{
                          display: "block",
                          fontWeight: 600,
                          fontSize: 12,
                          marginBottom: 4,
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="Enter your email"
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          border: "1.5px solid #e2e8f0",
                          borderRadius: 8,
                          fontSize: 13,
                          outline: "none",
                          background: "white",
                        }}
                      />
                    </div>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={async () => {
                          if (!editName.trim() || !editEmail.trim()) {
                            setEditMsg("❌ All fields are required");
                            return;
                          }
                          setSaving(true);
                          try {
                            const res = await updateProfile({
                              name: editName,
                              email: editEmail,
                            });

                            // update localStorage
                            const stored = JSON.parse(
                              localStorage.getItem("taxpal_user") || "{}",
                            );
                            localStorage.setItem(
                              "taxpal_user",
                              JSON.stringify({
                                ...stored,
                                name: editName,
                                email: editEmail,
                              }),
                            );

                            setUser(res.data.data);
                            setEditMsg("✅ Profile updated successfully!");
                            setTimeout(() => {
                              setEditMode(false);
                              setEditMsg("");
                            }, 1500);
                          } catch (err) {
                            setEditMsg(
                              "❌ " +
                                (err.response?.data?.message ||
                                  "Failed to update"),
                            );
                          } finally {
                            setSaving(false);
                          }
                        }}
                        disabled={saving}
                        style={{
                          background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                          color: "white",
                          border: "none",
                          borderRadius: 8,
                          padding: "8px 20px",
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: saving ? "not-allowed" : "pointer",
                          opacity: saving ? 0.7 : 1,
                        }}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>

                      <button
                        onClick={() => {
                          setEditMode(false);
                          setEditMsg("");
                        }}
                        style={{
                          background: "white",
                          border: "1.5px solid #e2e8f0",
                          borderRadius: 8,
                          padding: "8px 20px",
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                          color: "#374151",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── View Mode ── */
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                    }}
                  >
                    {[
                      { label: "Full Name", value: user.name || "—" },
                      { label: "Email", value: user.email || "—" },
                      {
                        label: "Member Since",
                        value: user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("en-IN")
                          : "—",
                      },
                      { label: "Account Status", value: "Active ✅" },
                    ].map((info) => (
                      <div
                        key={info.label}
                        style={{
                          background: "#f8fafc",
                          borderRadius: 8,
                          padding: "10px 14px",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 11,
                            color: "#9ca3af",
                            marginBottom: 3,
                          }}
                        >
                          {info.label}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>
                          {info.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── CATEGORY ── */}
            {tab === "Category" && (
              <div>
                <h6 style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>
                  Select categories you commonly use
                </h6>
                <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 14 }}>
                  Click to select/deselect. Changes are saved automatically to
                  database.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCat(cat)}
                      style={{
                        padding: "6px 14px",
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
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all .2s",
                      }}
                    >
                      {selectedCats.includes(cat) ? "✓ " : ""}
                      {cat}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 12 }}>
                  {selectedCats.length} categories selected
                </p>
              </div>
            )}

            {/* ── NOTIFICATIONS ── */}
            {tab === "Notifications" && (
              <div>
                <h6 style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>
                  Notification Settings
                </h6>
                <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 14 }}>
                  Changes are saved automatically to database.
                </p>
                {[
                  {
                    key: "email",
                    label: "Email notification",
                    desc: "Receive updates via email",
                  },
                  {
                    key: "app",
                    label: "App Alerts",
                    desc: "In-app notifications",
                  },
                  {
                    key: "marketing",
                    label: "Marketing messages",
                    desc: "Offers and promotions",
                  },
                ].map((n) => (
                  <div
                    key={n.key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 14px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>
                        {n.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>
                        {n.desc}
                      </div>
                    </div>
                    <Toggle
                      value={notifications[n.key]}
                      onToggle={() => toggleNotif(n.key)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ── SECURITY ── */}
            {tab === "Security" && (
              <div>
                <h6 style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>
                  Security
                </h6>
                <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 14 }}>
                  Manage your account security settings.
                </p>

                {/* 2FA */}
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 10,
                    padding: 14,
                    marginBottom: 12,
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
                      <div style={{ fontWeight: 700, fontSize: 13 }}>
                        Two Factor Authentication
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>
                        {twoFA ? "✅ 2FA is enabled" : "2FA is disabled"}
                      </div>
                    </div>
                    <Toggle value={twoFA} onToggle={toggle2FA} />
                  </div>
                </div>

                {/* Change Password */}
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 10,
                    padding: 14,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}
                  >
                    Change Password
                  </div>

                  {passMsg && (
                    <div
                      style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        marginBottom: 10,
                        fontSize: 12,
                        background: passMsg.includes("✅")
                          ? "#dcfce7"
                          : "#fee2e2",
                        color: passMsg.includes("✅") ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {passMsg}
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange}>
                    <input
                      // type="password"
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px 12px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: 8,
                        marginBottom: 8,
                        fontSize: 13,
                        outline: "none",
                      }}
                    />
                    <input
                      // type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px 12px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: 8,
                        marginBottom: 8,
                        fontSize: 13,
                        outline: "none",
                      }}
                    />
                    <input
                      // type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px 12px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: 8,
                        marginBottom: 10,
                        fontSize: 13,
                        outline: "none",
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 20px",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Logged in device */}
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 10,
                    padding: 14,
                  }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}
                  >
                    Logged in Device
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#6b7280", marginBottom: 10 }}
                  >
                    Devices that have access to your account
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>
                        {navigator.userAgent.includes("Chrome")
                          ? "Chrome Browser"
                          : "Web Browser"}
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>
                        {new Date().toLocaleDateString("en-IN")}
                      </div>
                    </div>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#16a34a",
                        borderRadius: 6,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 600,
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

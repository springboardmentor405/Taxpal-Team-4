import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  getBudgets,
  createBudget,
  deleteBudget,
  getTransactions,
} from "../api/api";
import { MdDelete } from "react-icons/md";

const categories = [
  "Freelance",
  "Salary",
  "Investments",
  "Business",
  "Food",
  "Shopping",
  "Utilities",
  "Marketing",
  "Rent",
  "Transport",
  "Web design",
  "Other",
];

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      // ── Load both budgets AND transactions together ──
      const [bRes, tRes] = await Promise.all([getBudgets(), getTransactions()]);
      setBudgets(bRes.data.data);
      setTransactions(tRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ── Calculate how much spent in a category for a month ──
  const getSpent = (category, month) => {
    return transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          t.category === category &&
          t.date?.slice(0, 7) === month, // match "2025-01"
      )
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // ── Get color based on percentage ──
  const getColor = (percent) => {
    if (percent >= 100)
      return { bar: "#dc2626", bg: "#fee2e2", text: "#dc2626" }; // red
    if (percent >= 75)
      return { bar: "#f97316", bg: "#fff7ed", text: "#f97316" }; // orange
    if (percent >= 50)
      return { bar: "#eab308", bg: "#fefce8", text: "#ca8a04" }; // yellow
    return { bar: "#16a34a", bg: "#dcfce7", text: "#16a34a" }; // green
  };

  const saveBudget = async (e) => {
    e.preventDefault();
    try {
      await createBudget({
        category,
        amount: parseFloat(amount),
        month,
        description,
      });
      setCategory("");
      setAmount("");
      setMonth("");
      setDescription("");
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to save budget");
    }
  };

  const removeBudget = async (id) => {
    if (!window.confirm("Delete this budget?")) return;
    try {
      await deleteBudget(id);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      <Sidebar />
      <div style={{ marginLeft: 240, flex: 1, padding: "16px 20px" }}>
        <h4 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>
          Budget Planner
        </h4>

        {/* ── Create Budget Form ── */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            marginBottom: 16,
          }}
        >
          <h6 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>
            Create New Budget
          </h6>
          <form onSubmit={saveBudget}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                    background: "white",
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  Amount (Budget Limit)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder="0.00"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  Month
                </label>
                <input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  Description (optional)
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details..."
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 22px",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Save Budget
              </button>
            </div>
          </form>
        </div>

        {/* ── Budget Progress Cards ── */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          }}
        >
          <h6 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>
            Budget vs Spending
          </h6>

          {loading ? (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                padding: "32px 0",
              }}
            >
              Loading...
            </div>
          ) : budgets.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                padding: "32px 0",
              }}
            >
              No budgets saved yet. Create one above!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {budgets.map((b) => {
                const spent = getSpent(b.category, b.month);
                const percent = Math.round((spent / b.amount) * 100);
                const colors = getColor(percent);
                const remaining = b.amount - spent;
                const exceeded = spent > b.amount;

                return (
                  <div
                    key={b._id}
                    style={{
                      background: colors.bg,
                      borderRadius: 12,
                      padding: 16,
                      border: `1.5px solid ${colors.bar}22`,
                    }}
                  >
                    {/* Top row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span style={{ fontWeight: 700, fontSize: 15 }}>
                          {b.category}
                        </span>
                        <span style={{ fontSize: 11, color: "#6b7280" }}>
                          {b.month}
                        </span>
                        {b.description && (
                          <span style={{ fontSize: 11, color: "#9ca3af" }}>
                            — {b.description}
                          </span>
                        )}
                      </div>

                      {/* Status badge */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 700,
                            background: colors.bar,
                            color: "white",
                          }}
                        >
                          {percent >= 100
                            ? "❌ Exceeded"
                            : percent >= 75
                              ? "⚠️ Almost Full"
                              : percent >= 50
                                ? "🟡 Halfway"
                                : "✅ Safe"}
                        </span>

                        {/* Delete button */}
                        <button
                          onClick={() => removeBudget(b._id)}
                          style={{
                            background: "#fee2e2",
                            border: "none",
                            borderRadius: 8,
                            width: 28,
                            height: 28,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <MdDelete size={14} color="#dc2626" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        background: "rgba(0,0,0,.08)",
                        borderRadius: 10,
                        height: 10,
                        marginBottom: 8,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(percent, 100)}%`,
                          height: "100%",
                          background: colors.bar,
                          borderRadius: 10,
                          transition: "width .5s ease",
                        }}
                      />
                    </div>

                    {/* Bottom row — amounts */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", gap: 20 }}>
                        <div>
                          <div style={{ fontSize: 10, color: "#6b7280" }}>
                            Spent
                          </div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              color: colors.text,
                            }}
                          >
                            ₹{spent.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#6b7280" }}>
                            Budget
                          </div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              color: "#1e3a8a",
                            }}
                          >
                            ₹{b.amount.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#6b7280" }}>
                            {exceeded ? "Exceeded by" : "Remaining"}
                          </div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              color: exceeded ? "#dc2626" : "#16a34a",
                            }}
                          >
                            ₹{Math.abs(remaining).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Percentage */}
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 20,
                          color: colors.text,
                        }}
                      >
                        {percent}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

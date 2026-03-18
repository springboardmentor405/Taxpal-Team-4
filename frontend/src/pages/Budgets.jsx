import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getBudgets, createBudget, deleteBudget } from "../api/api";
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
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getBudgets();
      setBudgets(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

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

        {/* Form */}
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
                  Amount
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

        {/* Saved Budgets */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          }}
        >
          <h6 style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>
            Saved Budget
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
              No budgets saved yet.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid #f1f5f9",
                    background: "#fafafa",
                  }}
                >
                  {["Category", "Amount", "Month", "Description", "Action"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 14px",
                          textAlign: "center",
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {budgets.map((b, i) => (
                  <tr
                    key={b._id}
                    style={{
                      borderBottom:
                        i < budgets.length - 1 ? "1px solid #f1f5f9" : "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f8fafc")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "white")
                    }
                  >
                    <td style={{ padding: "12px 14px", fontSize: 13 }}>
                      {b.category}
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#16a34a",
                      }}
                    >
                      +₹{b.amount.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: 13,
                        color: "#6b7280",
                      }}
                    >
                      {b.month}
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: 13,
                        color: "#6b7280",
                      }}
                    >
                      {b.description || "—"}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <button
                        onClick={() => removeBudget(b._id)}
                        style={{
                          background: "#fee2e2",
                          border: "none",
                          borderRadius: 8,
                          width: 32,
                          height: 32,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MdDelete size={16} color="#dc2626" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

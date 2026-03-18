import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { MdDelete, MdEdit } from "react-icons/md"; // ← both in one import
import TransactionModal from "../components/TransactionModal";
import { getTransactions, deleteTransaction } from "../api/api";

export default function Transactions() {
  const [modal, setModal] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTx, setEditTx] = useState(null); // ← ADD THIS
  const [editModal, setEditModal] = useState(false); // ← ADD THIS

  const load = async () => {
    try {
      setLoading(true);
      const res = await getTransactions();
      setTransactions(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteTx = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await deleteTransaction(id);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      <Sidebar />
      <div style={{ marginLeft: 240, flex: 1, padding: "16px 20px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h4 style={{ fontWeight: 700, fontSize: 22, margin: 0 }}>
            Transactions
          </h4>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => setModal("income")}
              style={{
                background: "none",
                border: "none",
                color: "#4f46e5",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              +Record Income
            </button>
            <button
              onClick={() => setModal("expense")}
              style={{
                background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "8px 18px",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              -Record Expense
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: "8px 0",
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          }}
        >
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 0",
                color: "#9ca3af",
              }}
            >
              Loading...
            </div>
          ) : transactions.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 0",
                color: "#9ca3af",
              }}
            >
              No transactions yet. Add your first one!
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "16%" }} /> {/* ← wider for 2 buttons */}
              </colgroup>
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid #f1f5f9",
                    background: "#fafafa",
                  }}
                >
                  {[
                    "Date",
                    "Description",
                    "Category",
                    "Amount",
                    "Type",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: h === "Action" ? "center" : "center",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr
                    key={tx._id}
                    style={{
                      borderBottom:
                        i < transactions.length - 1
                          ? "1px solid #f1f5f9"
                          : "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f8fafc")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "white")
                    }
                  >
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: 13,
                        color: "#6b7280",
                      }}
                    >
                      {new Date(tx.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {tx.description}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: 13,
                        color: "#6b7280",
                      }}
                    >
                      {tx.category}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: 14,
                        fontWeight: 700,
                        color: tx.type === "income" ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {tx.type === "income" ? "+" : "-"}₹
                      {tx.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          padding: "3px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          background:
                            tx.type === "income" ? "#dcfce7" : "#fee2e2",
                          color: tx.type === "income" ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {tx.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>

                    {/* ── Action Column — Edit + Delete ── */}
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          justifyContent: "center",
                        }}
                      >
                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            setEditTx(tx);
                            setEditModal(true);
                          }}
                          style={{
                            background: "#ede9fe",
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
                          <MdEdit size={16} color="#4f46e5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteTx(tx._id)}
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add/Record Modal */}
      {modal && (
        <TransactionModal
          type={modal}
          onClose={() => setModal(null)}
          onSave={load}
        />
      )}

      {/* Edit Modal */}
      {editModal && editTx && (
        <EditModal
          tx={editTx}
          onClose={() => {
            setEditModal(false);
            setEditTx(null);
          }}
          onSave={() => {
            setEditModal(false);
            setEditTx(null);
            load();
          }}
        />
      )}
    </div>
  );
}

// ── Edit Modal Component ──
function EditModal({ tx, onClose, onSave }) {
  const [description, setDescription] = useState(tx.description);
  const [amount, setAmount] = useState(tx.amount);
  const [category, setCategory] = useState(tx.category);
  const [date, setDate] = useState(tx.date);
  const [notes, setNotes] = useState(tx.notes || "");

  const incomeCategories = [
    "Freelance",
    "Salary",
    "Investments",
    "Business",
    "Other",
  ];
  const expenseCategories = [
    "Food",
    "Shopping",
    "Utilities",
    "Marketing",
    "Rent",
    "Transport",
    "Other",
  ];
  const categories =
    tx.type === "income" ? incomeCategories : expenseCategories;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("taxpal_user") || "{}");
      await fetch(`http://localhost:3001/api/transactions/${tx._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          category,
          date,
          notes,
        }),
      });
      onSave();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 28,
          width: 520,
          maxWidth: "95vw",
          boxShadow: "0 20px 60px rgba(0,0,0,.2)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <h5 style={{ fontWeight: 700, fontSize: 17, margin: 0 }}>
            ✏️ Edit Transaction
          </h5>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            ✕
          </button>
        </div>
        <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 20 }}>
          Update your transaction details below.
        </p>

        <form onSubmit={handleSave}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "9px 11px",
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
                  marginBottom: 5,
                }}
              >
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "9px 11px",
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
                  marginBottom: 5,
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
                  padding: "9px 11px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 13,
                  outline: "none",
                  background: "white",
                }}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  fontSize: 12,
                  marginBottom: 5,
                }}
              >
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: 12,
                marginBottom: 5,
              }}
            >
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "9px 11px",
                border: "1.5px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "9px 20px",
                border: "1.5px solid #e2e8f0",
                borderRadius: 8,
                background: "white",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "9px 20px",
                background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

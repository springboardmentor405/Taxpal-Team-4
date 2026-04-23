import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TransactionModal from "../components/TransactionModal";
import { getTransactions } from "../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#ef4444",
  "#f97316",
  "#22c55e",
  "#a855f7",
  "#06b6d4",
];

export default function Dashboard() {
  const [modal, setModal] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // ── Summary Cards ──
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  // ── Bar Chart Data ──
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const barData = monthNames
    .map((month, i) => {
      const txs = transactions.filter((t) => new Date(t.date).getMonth() === i);
      return {
        month,
        income: txs
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0),
        expense: txs
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0),
      };
    })
    .filter((d) => d.income > 0 || d.expense > 0);

  // ── Pie Chart Data ──
  const totalExp = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value: Math.round((value / totalExp) * 100) || 0,
  }));

  // ── Recent 5 transactions ──
  const recent = transactions.slice(0, 5);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: 240,
          flex: 1,
          padding: "16px 20px",
          background: "#f1f5f9",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h4 style={{ fontWeight: 700, fontSize: 22, margin: 0 }}>
            Financial Dashboard
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

        {/* ── Summary Cards ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
            marginBottom: 16,
          }}
        >
          {[
            {
              label: "Total Income",
              value: totalIncome,
              color: "#16a34a",
              bg: "#dcfce7",
              icon: "📈",
            },
            {
              label: "Total Expense",
              value: totalExpense,
              color: "#dc2626",
              bg: "#fee2e2",
              icon: "📉",
            },
            {
              label: "Net Balance",
              value: netBalance,
              color: netBalance >= 0 ? "#1e3a8a" : "#dc2626",
              bg: "#ede9fe",
              icon: "💰",
            },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                background: "white",
                borderRadius: 12,
                padding: "16px 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                borderLeft: `4px solid ${card.color}`,
              }}
            >
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                {card.icon} {card.label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: card.color }}>
                ₹{Math.abs(card.value).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 16,
          }}
        >
          {/* Bar Chart */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            }}
          >
            <h6
              style={{
                fontWeight: 600,
                marginBottom: 12,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Income vs Expenses
            </h6>
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#9ca3af",
                  padding: "40px 0",
                }}
              >
                Loading...
              </div>
            ) : barData.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#9ca3af",
                  padding: "40px 0",
                  fontSize: 13,
                }}
              >
                No data yet. Add transactions!
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="expense" fill="#ef4444" />
                  <Bar dataKey="income" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Pie Chart */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            }}
          >
            <h6
              style={{
                fontWeight: 600,
                marginBottom: 12,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Expense Breakdown
            </h6>
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#9ca3af",
                  padding: "40px 0",
                }}
              >
                Loading...
              </div>
            ) : pieData.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#9ca3af",
                  padding: "40px 0",
                  fontSize: 13,
                }}
              >
                No expense data yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ── Recent Transactions ── */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          }}
        >
          <h6
            style={{
              fontWeight: 600,
              marginBottom: 12,
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Recent Transactions
          </h6>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                padding: "24px 0",
              }}
            >
              Loading...
            </div>
          ) : recent.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                padding: "24px 0",
                fontSize: 13,
              }}
            >
              No transactions yet.
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
                  {["Date", "Description", "Category", "Amount", "Type"].map(
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
                {recent.map((tx, i) => (
                  <tr
                    key={tx._id}
                    style={{
                      borderBottom:
                        i < recent.length - 1 ? "1px solid #f1f5f9" : "none",
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
                        padding: "12px 14px",
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
                        padding: "12px 14px",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {tx.description}
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: 13,
                        color: "#6b7280",
                      }}
                    >
                      {tx.category}
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: 14,
                        fontWeight: 700,
                        color: tx.type === "income" ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {tx.type === "income" ? "+" : "-"}₹
                      {tx.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background:
                            tx.type === "income" ? "#dcfce7" : "#fee2e2",
                          color: tx.type === "income" ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {tx.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modal && (
        <TransactionModal
          type={modal}
          onClose={() => setModal(null)}
          onSave={load}
        />
      )}
    </div>
  );
}

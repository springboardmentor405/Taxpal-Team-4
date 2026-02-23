import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Dashboard() {
  const incomeExpenseData = [
    { month: "Jan", income: 3500, expense: 2200 },
    { month: "Feb", income: 4800, expense: 1800 },
    { month: "Mar", income: 3200, expense: 2500 },
    { month: "Apr", income: 6000, expense: 2300 }
  ];

  const expenseBreakdown = [
    { name: "Rent", value: 60 },
    { name: "Marketing", value: 15 },
    { name: "Utilities", value: 9 },
    { name: "Tools", value: 7 },
    { name: "Other", value: 5 }
  ];

  const COLORS = ["#4f46e5", "#ef4444", "#f97316", "#22c55e", "#3b82f6"];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>

      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#f3f4f6",
          padding: "30px"
        }}
      >
        <h2 style={{ color: "#1e3a8a", marginBottom: "40px" }}>TaxPal</h2>

        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "10px" }}>MAIN</p>
        <div style={menuItemActive}>Dashboard</div>
        <div style={menuItem}>Transactions</div>
        <div style={menuItem}>Budgets</div>

        <p style={{ fontSize: "13px", color: "#6b7280", margin: "20px 0 10px" }}>FINANCE</p>
        <div style={menuItem}>Tax Estimator</div>
        <div style={menuItem}>Reports</div>

        <p style={{ fontSize: "13px", color: "#6b7280", margin: "20px 0 10px" }}>ACCOUNT</p>
        <div style={menuItem}>Settings</div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px", background: "#f9fafb", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
          <h1>Financial Dashboard</h1>

          <div style={{ display: "flex", gap: "15px" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: 500
              }}
            >
              + Record Income
            </button>

            <button
              style={{
                background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              - Record Expense
            </button>
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>

          {/* Bar Chart */}
          <div style={cardStyle}>
            <h3 style={{ marginBottom: "20px" }}>Income vs Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeExpenseData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="expense" fill="#ef4444" />
                <Bar dataKey="income" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={cardStyle}>
            <h3 style={{ marginBottom: "20px" }}>Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={expenseBreakdown} dataKey="value" outerRadius={100}>
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "20px" }}>Recent Transactions</h3>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: "#6b7280", fontSize: "14px" }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>May 5, 2025</td>
                <td style={tdStyle}>Marketing Tools</td>
                <td style={tdStyle}>Marketing</td>
                <td style={{ ...tdStyle, color: "#ef4444" }}>-$75.00</td>
                <td style={{ ...tdStyle, color: "#ef4444" }}>expense</td>
              </tr>
              <tr>
                <td style={tdStyle}>Apr 15, 2025</td>
                <td style={tdStyle}>Blog Revenue</td>
                <td style={tdStyle}>Freelance</td>
                <td style={{ ...tdStyle, color: "#22c55e" }}>+$420.00</td>
                <td style={{ ...tdStyle, color: "#22c55e" }}>income</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* Inline style objects */
const menuItem = {
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "8px"
};

const menuItemActive = {
  ...menuItem,
  background: "#c7d2fe",
  color: "#1e3a8a"
};

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
};

const thStyle = {
  textAlign: "left",
  padding: "10px 8px"
};

const tdStyle = {
  padding: "10px 8px"
};
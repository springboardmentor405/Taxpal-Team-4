import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function TaxEstimator() {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [result, setResult] = useState(null);
  const [calendar, setCalendar] = useState([]);

  const calculate = (e) => {
    e.preventDefault();
    const net = parseFloat(income) - parseFloat(expense || 0);
    const taxable = Math.max(0, net);
    let tax = 0;

    // Simple India slab
    if (taxable <= 250000) tax = 0;
    else if (taxable <= 500000) tax = (taxable - 250000) * 0.05;
    else if (taxable <= 1000000) tax = 12500 + (taxable - 500000) * 0.2;
    else tax = 112500 + (taxable - 1000000) * 0.3;

    const quarterly = tax / 4;

    setResult({ net, taxable, tax, quarterly });

    setCalendar([
      { quarter: "Q1", due: `15 Jun ${year}`, amount: quarterly },
      { quarter: "Q2", due: `15 Sep ${year}`, amount: quarterly },
      { quarter: "Q3", due: `15 Dec ${year}`, amount: quarterly },
      { quarter: "Q4", due: `15 Mar ${parseInt(year) + 1}`, amount: quarterly },
    ]);
  };

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
          Tax Estimator
        </h4>
        <p style={{ color: "#6b7280", marginBottom: 24 }}>
          Calculate your estimated tax obligations.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 24,
            marginBottom: 24,
            alignItems: "start",
          }}
        >
          {/* Calculator */}
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: 28,
              boxShadow: "0 2px 10px rgba(0,0,0,.06)",
            }}
          >
            <h6 style={{ fontWeight: 700, marginBottom: 20 }}>
              Quarterly Tax Calculator
            </h6>
            <form onSubmit={calculate}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    Income
                  </label>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    Expense
                  </label>
                  <input
                    type="number"
                    value={expense}
                    onChange={(e) => setExpense(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    Tax Year
                  </label>
                  <input
                    type="number"
                    placeholder="YYYY"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="eg. India"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8,
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "11px 24px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Calculate Tax Estimator
              </button>
            </form>
          </div>

          {/* Summary */}
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: 28,
              minWidth: 220,
              boxShadow: "0 2px 10px rgba(0,0,0,.06)",
            }}
          >
            <h6 style={{ fontWeight: 700, marginBottom: 12 }}>Tax Summary</h6>
            {result ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  {
                    label: "Net Income",
                    value: `₹${result.net.toLocaleString()}`,
                  },
                  {
                    label: "Taxable Income",
                    value: `₹${result.taxable.toLocaleString()}`,
                  },
                  {
                    label: "Annual Tax",
                    value: `₹${result.tax.toLocaleString()}`,
                  },
                  {
                    label: "Quarterly Tax",
                    value: `₹${result.quarterly.toLocaleString()}`,
                  },
                ].map((r) => (
                  <div key={r.label}>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      {r.label}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#1e3a8a",
                        fontSize: 16,
                      }}
                    >
                      {r.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#9ca3af", fontSize: 13 }}>
                Enter your details to calculate quarterly estimator tax.
              </p>
            )}
          </div>
        </div>

        {/* Tax Calendar */}
        <div
          style={{
            background: "white",
            borderRadius: 14,
            padding: 28,
            boxShadow: "0 2px 10px rgba(0,0,0,.06)",
          }}
        >
          <h6 style={{ fontWeight: 700, marginBottom: 16 }}>Tax Calendar</h6>
          {calendar.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                padding: "32px 0",
              }}
            >
              No result found
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 16,
              }}
            >
              {calendar.map((c) => (
                <div
                  key={c.quarter}
                  style={{
                    background: "#f8fafc",
                    borderRadius: 10,
                    padding: 16,
                    textAlign: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#4f46e5",
                      fontSize: 18,
                      marginBottom: 4,
                    }}
                  >
                    {c.quarter}
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}
                  >
                    Due: {c.due}
                  </div>
                  <div style={{ fontWeight: 700, color: "#1e3a8a" }}>
                    ₹{c.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

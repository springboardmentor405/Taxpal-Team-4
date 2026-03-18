import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getReports, generateReport, getTransactions } from "../api/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Reports() {
  const [reportType, setReportType] = useState("Income Statement");
  const [period, setPeriod] = useState("Current Month");
  const [format, setFormat] = useState("PDF");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getReports();
      setReports(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ── Filter transactions by period ──
  const filterByPeriod = (transactions, period) => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      if (period === "Current Month")
        return txDate.getMonth() === month && txDate.getFullYear() === year;
      if (period === "Last Month") {
        const lastMonth = month === 0 ? 11 : month - 1;
        const lastYear = month === 0 ? year - 1 : year;
        return (
          txDate.getMonth() === lastMonth && txDate.getFullYear() === lastYear
        );
      }
      if (period === "Last 3 Months")
        return txDate >= new Date(year, month - 3, 1);
      if (period === "Last 6 Months")
        return txDate >= new Date(year, month - 6, 1);
      if (period === "Current Year") return txDate.getFullYear() === year;
      if (period === "Last Year") return txDate.getFullYear() === year - 1;
      return true;
    });
  };

  // ── Generate & Download PDF ──
  const downloadPDF = (transactions) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(30, 58, 138);
    doc.text("TaxPal — " + reportType, 14, 20);

    // Subtitle
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Period: ${period}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, 14, 37);

    // Summary
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total Income:  Rs. ${income.toLocaleString()}`, 14, 50);
    doc.text(`Total Expense: Rs. ${expense.toLocaleString()}`, 14, 58);
    doc.text(`Net Balance:   Rs. ${balance.toLocaleString()}`, 14, 66);

    // Table
    autoTable(doc, {
      startY: 75,
      head: [["Date", "Description", "Category", "Amount", "Type"]],
      body: transactions.map((tx) => [
        new Date(tx.date).toLocaleDateString("en-IN"),
        tx.description,
        tx.category,
        `${tx.type === "income" ? "+" : "-"} Rs.${tx.amount.toLocaleString()}`,
        tx.type === "income" ? "Income" : "Expense",
      ]),
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [30, 58, 138],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [241, 245, 249] },
      columnStyles: {
        3: {
          textColor: (row) =>
            row.raw[4] === "Income" ? [22, 163, 74] : [220, 38, 38],
        },
      },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(
        `TaxPal Report — Page ${i} of ${pageCount}`,
        14,
        doc.internal.pageSize.height - 10,
      );
    }

    doc.save(`TaxPal_${reportType}_${period}.pdf`);
  };

  // ── Download CSV ──
  const downloadCSV = (transactions) => {
    const headers = ["Date", "Description", "Category", "Amount", "Type"];
    const rows = transactions.map((tx) => [
      new Date(tx.date).toLocaleDateString("en-IN"),
      tx.description,
      tx.category,
      tx.amount,
      tx.type,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TaxPal_${reportType}_${period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Main Generate Function ──
  const generate = async () => {
    try {
      // 1. Get transactions
      const txRes = await getTransactions();
      const allTx = txRes.data.data;

      // 2. Filter by period
      const filtered = filterByPeriod(allTx, period);

      if (filtered.length === 0) {
        alert("No transactions found for this period!");
        return;
      }

      // 3. Download file
      if (format === "PDF") {
        downloadPDF(filtered);
      } else if (format === "CSV" || format === "Excel") {
        downloadCSV(filtered);
      }

      // 4. Save to database
      await generateReport({ type: reportType, period, format });
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to generate report");
    }
  };

  // ── Download again from history ──
  const downloadAgain = async (r) => {
    try {
      const txRes = await getTransactions();
      const allTx = txRes.data.data;
      const filtered = filterByPeriod(allTx, r.period);

      if (r.format === "PDF") {
        downloadPDF(filtered);
      } else {
        downloadCSV(filtered);
      }
    } catch (err) {
      alert("Failed to download");
    }
  };

  const selectStyle = {
    width: "100%",
    padding: "6px 8px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 6,
    fontSize: 12,
    outline: "none",
    background: "white",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div
        style={{
          marginLeft: 240,
          flex: 1,
          padding: "6px 0",
          background: "#f1f5f9",
        }}
      >
        <h4 style={{ fontWeight: 700, fontSize: 20, margin: "0 0 2px 0" }}>
          Financial Reports
        </h4>
        <p style={{ color: "#6b7280", fontSize: 12, margin: "0 0 6px 0" }}>
          Generate and download your financial reports.
        </p>

        {/* Generator */}
        <div
          style={{
            background: "white",
            padding: "10px 12px",
            boxShadow: "0 1px 4px rgba(0,0,0,.06)",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  fontSize: 11,
                  marginBottom: 3,
                }}
              >
                Report type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={selectStyle}
              >
                <option>Income Statement</option>
                <option>Expense Report</option>
                <option>Profit & Loss</option>
                <option>Tax Summary</option>
                <option>Monthly Summary</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  fontSize: 11,
                  marginBottom: 3,
                }}
              >
                Period
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                style={selectStyle}
              >
                <option>Current Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>Current Year</option>
                <option>Last Year</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  fontSize: 11,
                  marginBottom: 3,
                }}
              >
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                style={selectStyle}
              >
                <option>PDF</option>
                <option>CSV</option>
                <option>Excel</option>
              </select>
            </div>
          </div>

          <button
            onClick={generate}
            style={{
              background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
              color: "white",
              border: "none",
              borderRadius: 6,
              padding: "5px 14px",
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            ⬇ Generate & Download
          </button>
        </div>

        {/* Recent Reports */}
        <div
          style={{
            background: "white",
            padding: "10px 12px",
            border: "1.5px solid #bfdbfe",
            boxShadow: "0 1px 4px rgba(0,0,0,.06)",
          }}
        >
          <h6 style={{ fontWeight: 700, fontSize: 13, margin: "0 0 6px 0" }}>
            Recent reports
          </h6>

          {loading ? (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                padding: "16px 0",
                fontSize: 12,
              }}
            >
              Loading...
            </div>
          ) : reports.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#9ca3af",
                padding: "16px 0",
                fontSize: 12,
              }}
            >
              No result found
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <colgroup>
                <col style={{ width: "22%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>
              <thead>
                <tr
                  style={{
                    borderBottom: "1.5px solid #f1f5f9",
                    background: "#fafafa",
                  }}
                >
                  {[
                    "Type",
                    "Period",
                    "Format",
                    "Date",
                    "Records",
                    "Download",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "7px 8px",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr
                    key={r._id}
                    style={{
                      borderBottom:
                        i < reports.length - 1 ? "1px solid #f8fafc" : "none",
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
                        padding: "7px 8px",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {r.type}
                    </td>
                    <td
                      style={{
                        padding: "7px 8px",
                        fontSize: 12,
                        color: "#6b7280",
                      }}
                    >
                      {r.period}
                    </td>
                    <td style={{ padding: "7px 8px", fontSize: 12 }}>
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                          background:
                            r.format === "PDF"
                              ? "#fee2e2"
                              : r.format === "Excel"
                                ? "#dcfce7"
                                : "#dbeafe",
                          color:
                            r.format === "PDF"
                              ? "#dc2626"
                              : r.format === "Excel"
                                ? "#16a34a"
                                : "#1d4ed8",
                        }}
                      >
                        {r.format}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "7px 8px",
                        fontSize: 12,
                        color: "#6b7280",
                      }}
                    >
                      {r.date}
                    </td>
                    <td style={{ padding: "7px 8px", fontSize: 12 }}>
                      {r.records} records
                    </td>
                    <td style={{ padding: "7px 8px" }}>
                      {/* Download Again Button */}
                      <button
                        onClick={() => downloadAgain(r)}
                        style={{
                          background: "linear-gradient(135deg,#1e3a8a,#4f46e5)",
                          color: "white",
                          border: "none",
                          borderRadius: 6,
                          padding: "3px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        ⬇ Download
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

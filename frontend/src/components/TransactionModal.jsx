import { createTransaction } from "../api/api";

export default function TransactionModal({ type, onClose, onSave }) {
  const isIncome = type === "income";

  const categories = isIncome
    ? ["Freelance","Salary","Investments","Business","Other"]
    : ["Food","Shopping","Utilities","Marketing","Rent","Transport","Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await createTransaction({
        description: form.description.value,
        amount:      parseFloat(form.amount.value),
        category:    form.category.value,
        date:        form.date.value,
        notes:       form.notes.value,
        type
      });
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save transaction");
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,.45)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "white", borderRadius: 16,
        padding: 28, width: 520, maxWidth: "95vw",
        boxShadow: "0 20px 60px rgba(0,0,0,.2)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h5 style={{ fontWeight: 700, fontSize: 17, margin: 0 }}>
            {isIncome ? "Record New Income" : "Record New Expense"}
          </h5>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>✕</button>
        </div>
        <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 20 }}>
          Add details about your {type} to track your finances better.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 12, marginBottom: 5 }}>Description</label>
              <input name="description" required placeholder="eg. FREELANCE"
                style={{ width: "100%", padding: "9px 11px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 12, marginBottom: 5 }}>Amount</label>
              <input name="amount" type="number" required min="0" step="0.01" placeholder="0.00"
                style={{ width: "100%", padding: "9px 11px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 12, marginBottom: 5 }}>Category</label>
              <select name="category" required
                style={{ width: "100%", padding: "9px 11px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", background: "white" }}>
                <option value="">Select a category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 12, marginBottom: 5 }}>Date</label>
              <input name="date" type="date" required
                defaultValue={new Date().toISOString().split("T")[0]}
                style={{ width: "100%", padding: "9px 11px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none" }} />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontWeight: 600, fontSize: 12, marginBottom: 5 }}>Notes (optional)</label>
            <textarea name="notes" rows={3} placeholder="Add any details.."
              style={{ width: "100%", padding: "9px 11px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" onClick={onClose}
              style={{ padding: "9px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "white", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
              Cancel
            </button>
            <button type="submit"
              style={{ padding: "9px 20px", background: "linear-gradient(135deg,#1e3a8a,#4f46e5)", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
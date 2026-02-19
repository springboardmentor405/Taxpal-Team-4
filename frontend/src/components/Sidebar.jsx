import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">TaxPal</h2>

      <div className="menu">
        <p className="menu-title">MAIN</p>
        <div className="menu-item active">Dashboard</div>
        <div className="menu-item">Transactions</div>
        <div className="menu-item">Budgets</div>

        <p className="menu-title">FINANCE</p>
        <div className="menu-item">Tax Estimator</div>
        <div className="menu-item">Reports</div>

        <p className="menu-title">ACCOUNT</p>
        <div className="menu-item">Settings</div>
      </div>
    </div>
  );
}

export default Sidebar;

import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h1>Financial Dashboard</h1>

      <div className="buttons">
        <button className="income-btn">+ Record Income</button>
        <button className="expense-btn">- Record Expense</button>
      </div>
    </div>
  );
}

export default Header;


function Transactions() {
  return (
    <div className="card">
      <h3>Recent Transactions</h3>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>May 5, 2025</td>
            <td>Marketing Tools</td>
            <td>Marketing</td>
            <td className="expense">-$75.00</td>
            <td><span className="expense-tag">expense</span></td>
          </tr>

          <tr>
            <td>Apr 15, 2025</td>
            <td>Blog Revenue</td>
            <td>Freelance</td>
            <td className="income">+$420.00</td>
            <td><span className="income-tag">income</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;

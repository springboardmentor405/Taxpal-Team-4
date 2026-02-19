import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Rent", value: 60 },
  { name: "Food", value: 15 },
  { name: "Entertainment", value: 9 },
  { name: "Utilities", value: 7 },
  { name: "Marketing", value: 5 },
];

const COLORS = ["#2563eb", "#ef4444", "#f59e0b", "#22c55e", "#8b5cf6"];

function ExpensePieChart() {
  return (
    <div className="card">
      <h3>Expense Breakdown</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;

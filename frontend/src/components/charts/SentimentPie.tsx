
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Positive", value: 450 },
  { name: "Neutral", value: 320 },
  { name: "Negative", value: 180 },
];

const COLORS = ["#4caf50", "#ffeb3b", "#f44336"];

const SentimentPie = () => {
  return (
    <div className="w-full h-64">
      <h2 className="text-lg font-semibold mb-4">Sentiment Distribution</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default SentimentPie;

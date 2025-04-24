
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Login", value: 400 },
  { name: "Crash", value: 300 },
  { name: "UI", value: 250 },
  { name: "Performance", value: 350 },
];

const KeywordBar = () => {
  return (
    <div className="w-full h-64">
      <h2 className="text-lg font-semibold mb-4">Top Keywords</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KeywordBar;

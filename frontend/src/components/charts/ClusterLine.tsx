
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 1", clusterA: 400, clusterB: 240 },
  { name: "Week 2", clusterA: 500, clusterB: 280 },
  { name: "Week 3", clusterA: 600, clusterB: 320 },
  { name: "Week 4", clusterA: 700, clusterB: 350 },
];

const ClusterLine = () => {
  return (
    <div className="w-full h-64">
      <h2 className="text-lg font-semibold mb-4">Cluster Trends Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clusterA" stroke="#4caf50" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="clusterB" stroke="#ffeb3b" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClusterLine;

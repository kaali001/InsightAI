
import { Card } from "../../components/ui/Card";
import SentimentPie from "../../components/charts/SentimentPie";
import ClusterLine from "../../components/charts/ClusterLine";
import KeywordBar from "../../components/charts/KeywordBar";

const Overview = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Comments">8,432</Card>
        <Card title="Clusters Identified">37</Card>
        <Card title="Avg. Sentiment Score">+0.68</Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card title="Sentiment Overview" className="lg:col-span-1">
          <SentimentPie />
        </Card>
        <Card title="Cluster Trends" className="lg:col-span-2">
          <ClusterLine />
        </Card>
      </div>

      <Card title="Top Keywords">
        <KeywordBar />
      </Card>
    </div>
  );
};

export default Overview;

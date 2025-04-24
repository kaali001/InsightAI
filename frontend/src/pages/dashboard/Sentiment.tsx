
import ClusterLine from "../../components/charts/ClusterLine";

const Sentiment = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Sentiment Trends</h1>
      <ClusterLine />
    </div>
  );
};

export default Sentiment;

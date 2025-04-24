

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
        <ol className="space-y-8">
          <li>
            <h3 className="text-xl font-semibold">📱 Add Your App</h3>
            <p className="text-gray-600">Input your app details and let us gather user reviews automatically.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">📤 Upload Feedback</h3>
            <p className="text-gray-600">Drop in CSV/JSON from web, surveys, or support platforms.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">🧠 AI Analysis</h3>
            <p className="text-gray-600">Our LLM-based engine clusters and summarizes key issues.</p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">📊 View Reports</h3>
            <p className="text-gray-600">Visual dashboards and exportable reports keep your team in the loop.</p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default Features;
